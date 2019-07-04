const express = require('express')
const PostModel = require('../model/post')
const router = express.Router()
const UserModel = require('../model/user')
const webPush = require('web-push')
const SubscriptionModel = require('../model/subscription_model')
router.get('/me', async (req, res) => {
  let posts = await PostModel.find({ author_id: req.user._id })
  res.json({
    message: 'HI',
    user: req.user,
    posts: posts
  })
})
router.post('/addPost', async (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.content,
    createdAt: new Date().getDate(),
    author_id: req.user._id
  }
  try {
    let doc = await PostModel.create(post)
    UserModel.findByIdAndUpdate(req.user._id, { $push: {
      'posts': doc._id
    } }).then((data) => {
      res.json(doc)
    })
  } catch (error) {
    res.json(error)
  }
})
router.post('/subscribe', async (req, res) => {
  const subscription = req.body.subscription
  res.status(201).json({})
  var sub = SubscriptionModel.findOne({ endpoint: subscription.endpoint })
  if (!sub) {
    sub = await SubscriptionModel.create(subscription)
    await UserModel.findByIdAndUpdate(req.body.id, { $push: {
      'Subscribers': sub._id
    } })
  }
  const payload = JSON.stringify({
    'notification': {
      'title': 'Push notifications with Service Workers'
    }
  })
  webPush.sendNotification(subscription, payload)
    .then(result => console.log(result))
    .catch(error => console.error(error))
})

module.exports = router
