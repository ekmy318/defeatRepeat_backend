// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for posts
const Post = require('../models/post')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()
const { s3Upload, s3Delete } = require('../../lib/s3_upload_api')
const multer = require('multer')
const multerUpload = multer()

// INDEX
// GET /posts
router.get('/posts', requireToken, (req, res, next) => {
  Post.find()
    .populate('owner')
    .then(posts => {
      // `posts` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return posts.map(post => post.toObject())
    })
    // respond with status 200 and JSON of the posts
    .then(posts => res.status(200).json({ posts: posts }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /posts/5a7db6c74d55bc51bdf39793
router.get('/posts/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Post.findById(req.params.id)
    .populate('owner')
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "post" JSON
    .then(post => res.status(200).json({ post: post.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /posts
router.post('/posts', requireToken, multerUpload.single('file'), (req, res, next) => {
  console.log('req.file:', req.file)
  s3Upload(req.file)
    .then(awsRes => {
      return Post.create({
        name: awsRes.Key,
        date: req.body.date,
        notes: req.body.notes,
        type: req.body.mimetype,
        file: awsRes.Location,
        tag: req.body.tag,
        owner: req.user.id
      })
    })
    .then(post => res.status(201).json({ post: post.toObject() }))
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// // UPDATE
// // PATCH /posts/5a7db6c74d55bc51bdf39793
router.patch('/posts/:id', requireToken, multerUpload.single('file'), (req, res, next) => {
  req.body.owner = req.user.id
  delete req.body.owner
  if (req.file) {
    s3Upload(req.file)
      .then(awsRes => {
        Post.findById(req.params.id)
          .then(handle404)
          .then(post => {
            requireOwnership(req, post)
            if (post.file) {
              s3Delete({
                Bucket: process.env.BUCKET_NAME,
                Key: post.file.split('/').pop()
              })
            }
            return post.update({
              ...req.body,
              file: awsRes.Location
            })
          })
          .then(() => res.sendStatus(204))
          .catch(next)
      })
  } else {
    Post.findById(req.params.id)
      .then(handle404)
      .then(post => {
        requireOwnership(req, post)
        return post.update(req.body)
      })
      .then(() => res.sendStatus(204))
      .catch(next)
  }
})

// // DESTROY
// // DELETE /posts/5a7db6c74d55bc51bdf39793
router.delete('/posts/:id', requireToken, (req, res, next) => {
  Post.findById(req.params.id)
    .then(handle404)
    .then(post => {
      // throw an error if current user doesn't own `post`
      requireOwnership(req, post)
      // delete the post ONLY IF the above didn't throw
      post.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
