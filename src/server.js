require('dotenv').config({ path: '.././variables.env' })
const webPush = require('web-push')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes/login.routes')
const passport = require('passport')
const Userroutes = require('./routes/secure-routes')
const app = express()
const path = require('path')
require('./auth/auth')
const publicVapidKey = 'BGPSyR5LnDepb4Qe3OioEPXIwElsvaE0Xf53lFfBKvh14YR3diCdoDINnyQyGemV1ijq_yVXBQFbeq04agznoXg'
const privateVapidKey = '38v49vFTpygCD13-AxSJWOedg-PXxHN6usWPlkd99-I'
webPush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/public')))
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true }, (err) => {
  if (err) return console.log('DB FAILED TO CONNECT')
  console.log('DB CONNECTED')
})
app.get('/myself', (req, res) => {
  res.json({
    message: 'Welcome'
  })
})

app.use('/auth', routes)
app.use('/user', passport.authenticate('jwt', { session: false }), Userroutes)
app.listen(3000, () => {
  console.log('Server started at 3000')
})
