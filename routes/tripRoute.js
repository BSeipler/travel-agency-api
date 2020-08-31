const express = require('express')
const router = express.Router()

const tripController = require('./../controllers/tripController')

const {
  getTrips,
  createTrip,
  updateTrip,
  deleteTrip,
  getTrip,
  getTripsByRegion
} = tripController

router
  .route('/')
  .get(getTrips)
  .post(createTrip)

router
  .route('/:id')
  .get(getTrip)
  .put(updateTrip)
  .delete(deleteTrip)

router.get('/filter/:region', getTripsByRegion)

module.exports = router
