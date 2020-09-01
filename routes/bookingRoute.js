const express = require('express')
const router = express.Router()
const bookingController = require('./../controllers/bookingController')

const { getBookings, createBooking, deleteBooking } = bookingController

router
  .route('/')
  .get(getBookings)
  .patch(createBooking)
  .delete(deleteBooking)

module.exports = router
