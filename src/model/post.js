const mongoose = require('mongoose')
const Schema = mongoose.Schema

const post = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  createdAt: {
    type: String
  }
})

const PostModel = mongoose.model('post', post)
module.exports = PostModel
