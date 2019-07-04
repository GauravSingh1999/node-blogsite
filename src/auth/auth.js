const passport = require('passport')
const JWTStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const UserModel = require('.././model/user')
passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  const user = await UserModel.findOne({ email })
  if (!user) return done(null, false, { message: 'User Not Found' })
  const validate = await user.isValidPassword(password)
  if (validate) return done(null, user)
  return done(null, false, { message: 'Wrong Password' })
}))

passport.use(new JWTStrategy(
  {
    secretOrKey: 'top_secret',
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
  },
  (token, next) => {
    try {
      next(null, token.user)
    } catch (err) {
      next(err)
    }
  }
))
