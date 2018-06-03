const mongoose = require('mongoose'),
  {Schema} = mongoose,

  recipientSchema = new Schema({
    email: String,
    responded: {
      type: Boolean,
      default: false
    }

  })

module.exports = recipientSchema
