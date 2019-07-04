const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const UserModel = require('../model/user')

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An Error occured')
        return next(error)
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)
        const body = { _id: user._id, email: user.email }
        const token = jwt.sign({ user: body }, 'top_secret')
        return res.json({ token })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
})
router.post('/signup', async (req, res, next) => {
  var data = await UserModel.findOne({ email: req.body.email })
  if (data) return res.json({ message: 'User Exists' })
  data = await UserModel.create({ email: req.body.email, password: req.body.password })
  if (!data) return res.json({ message: 'FailedTo add user' })
  res.json({
    message: 'Successfully signed In',
    user: data.email
  })
})
module.exports = router
