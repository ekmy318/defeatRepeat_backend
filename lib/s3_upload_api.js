'use strict'
require('dotenv').config()
const AWS = require('aws-sdk')
const S3 = new AWS.S3()

const s3Upload = function (file) {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `${Date.now()}_${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    }
    S3.upload(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const s3Delete = params => (
  new Promise((resolve, reject) => {
    S3.deleteObject(params, (err) => {
      if (err) {
        reject(err)
      }
      resolve('success')
    })
  })
)

module.exports = {
  s3Upload,
  s3Delete
}
