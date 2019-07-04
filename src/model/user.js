const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  posts: {
    type: [String]
  },
  Subscribers: {
    type: Schema.Types.ObjectId,
    ref: 'subscription'
  }
})
UserSchema.pre('save', async function (next) {
  const user = this
  const hash = await bcrypt.hash(user.password, 10)
  this.password = hash
  next()
})
UserSchema.methods.isValidPassword = async function (password) {
  const user = this
  const compare = await bcrypt.compare(password, user.password)
  return compare
}
const UserModel = mongoose.model('user', UserSchema)
module.exports = UserModel
