'use strict'
require('dotenv').config()
const AWS = require('aws-sdk')
const S3 = new AWS.S3()

const uploadFile = function (file) {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: 'ekmy318-sei',
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

module.exports = uploadFile
