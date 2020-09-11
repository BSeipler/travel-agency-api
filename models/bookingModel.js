const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true
}
const bookingSchema = mongoose.Schema({
  tripId: reqString,
  userId: reqString,
  bookingNumber: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Booking', bookingSchema)
