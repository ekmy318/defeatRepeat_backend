const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  note: {
    type: String
  },
  type: {
    type: String
  },
  url: {
    type: String,
    required: true
  },
  tag: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Post', postSchema)
