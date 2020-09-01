require('dotenv').config()

const express = require('express')
const db = require('./utils/database')
const usersRoute = require('./routes/usersRoute')
const tripRoute = require('./routes/tripRoute')
const bookingRoute = require('./routes/bookingRoute')

const app = express()

// middleware
app.use(express.json())
app.use('/users', usersRoute)
app.use('/trips', tripRoute)
app.use('/bookings', bookingRoute)

const port = process.env.PORT || 5723

// start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
  db()
})
