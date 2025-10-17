const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cart: [{
    type: Schema.Types.ObjectId,
  }]
})

module.exports = mongoose.model('User', userSchema)