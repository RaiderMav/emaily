
const express = require('express'),
  port = process.env.PORT || 5000,
  mongoose = require('mongoose'),
  keys = require('./config/keys'),
  cookieSession = require('cookie-session'),
  passport = require('passport'),
  bodyParser = require('body-parser')

require('./models/user')

require('./services/passport')
mongoose.connect(keys.mongoURI)
const app = express()

app.use(bodyParser.json())

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}))

app.use(passport.initialize())
app.use(passport.session())

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
require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)

app.listen(port, () => {
  console.log(`Server listening on port:${port}`)
})
