const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true
}

const reqDate = {
  type: Date,
  required: true
}

const tripSchema = mongoose.Schema({
  title: reqString,
  description: reqString,
  image: reqString,
  cost: {
    type: Number,
    required: true
  },
  startDate: reqDate,
  endDate: reqDate,
  region: reqString
})

module.exports = mongoose.model('Trip', tripSchema)
