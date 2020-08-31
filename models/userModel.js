const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true
}

const userSchema = mongoose.Schema({
  firstName: reqString,
  lastName: reqString,
  email: reqString,
  password: reqString,
  trips: [String],
  admin: Boolean
})

module.exports = mongoose.model('User', userSchema)
