const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  name: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
  notes: {
    type: String
  },
  type: {
    type: String
  },
  file: {
    type: String
  },
  tags: [{
    type: String
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Post', postSchema)
