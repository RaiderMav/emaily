const express = require('express'),
  port = process.env.PORT || 5000,
  mongoose = require('mongoose'),
  keys = require('./config/keys'),
  cookieSession = require('cookie-session'),
  passport = require('passport')

require('./models/user')

require('./services/passport')
mongoose.connect(keys.mongoURI)
const app = express()

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}))

app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)

app.listen(port, () => {
  console.log(`Server listening on port:${port}`)
})
