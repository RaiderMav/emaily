const mongoose = require('mongoose'),
  {Schema} = mongoose,

  userSchema = new Schema({
    googleId: String
  })

mongoose.model('users', userSchema)
