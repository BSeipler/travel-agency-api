const User = require('./../models/userModel')
const Booking = require('./../models/bookingModel')

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
    res.json({
      success: true,
      bookings
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.createBooking = async (req, res) => {
  try {
    let bookingNumber =
      Math.floor(Math.random() * (9999999 - 1000000)) + 1000000
    let doesExist = await Booking.exists({ bookingNumber })
    while (doesExist) {
      bookingNumber = Math.floor(Math.random() * (9999999 - 1000000)) + 1000000
      doesExist = await Booking.exists({ bookingNumber })
    }
    if (!doesExist) {
      const booking = await Booking.create({
        tripId: req.body.tripId,
        userId: req.user.id,
        bookingNumber
      })
      res.json({
        success: true,
        booking
      })
    }
  } catch (error) {
    console.log(error.message)
  }
}

exports.deleteBooking = async (req, res) => {
  try {
    await Booking.deleteOne({ _id: req.body.bookingId })
    res.json({
      success: true
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.getBooking = async (req, res) => {
  try {
    const bookings = await Booking.find({ _id: req.params.id })
    res.json({
      success: true,
      bookings
    })
  } catch (error) {
    console.log(error.message)
  }
}
