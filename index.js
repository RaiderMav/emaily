
const express = require('express'),
  mongoose = require('mongoose'),
  cookieSession = require('cookie-session'),
  passport = require('passport'),
  bodyParser = require('body-parser'),
  keys = require('./config/keys')

require('./models/user')

require('./services/passport')
mongoose.connect(keys.mongoURI)

const port = process.env.PORT || 5000,
  app = express()

app.use(bodyParser.json())

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}))

app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // Like our main.js file, or main.css!

  app.use(express.static('client/build'))
    // Express will serve up the index.html file
    // if it doesn't recognize the route
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(port)
