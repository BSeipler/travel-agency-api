require('dotenv').config()

const express = require('express')
const db = require('./utils/database')
const usersRoute = require('./routes/usersRoute')
const tripRoute = require('./routes/tripRoute')
const bookingRoute = require('./routes/bookingRoute')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()

// middleware
app.use(cors())

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a'
})

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use('/users', usersRoute)
app.use('/trips', tripRoute)
app.use('/bookings', bookingRoute)

const port = process.env.PORT || 5723

// start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
  db()
})
