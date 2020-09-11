const express = require('express')
const router = express.Router()
const bookingController = require('./../controllers/bookingController')
const authenticateToken = require('./../middlewares/authMiddleware')

const {
  getBookings,
  createBooking,
  deleteBooking,
  getBooking
} = bookingController

router.get('/', authenticateToken, getBookings)

router.post('/', authenticateToken, createBooking)

router.delete('/', authenticateToken, deleteBooking)

router.get('/:id', authenticateToken, getBooking)

module.exports = router
