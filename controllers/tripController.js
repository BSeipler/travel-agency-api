const Trip = require('./../models/tripModel')
const authController = require('./authController')

const verifyToken = authController.verifyToken

/*****************************************************************
 get all trips (READ)
 ********************************************************************/

exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
    res.json({
      trips
    })
  } catch (error) {
    console.log(error.message)
  }
}

/*****************************************************************
 create new trip (CREATE)
 ********************************************************************/

exports.createTrip = async (req, res) => {
  try {
    const adminInfo = await verifyToken(req.headers.authorization)
    if (adminInfo.admin) {
      const newTrip = await Trip.create(req.body)
      res.json({
        newTrip
      })
    } else {
      res.json({
        error: 'User does not have permission.'
      })
    }
  } catch (error) {
    console.log(error.message)
  }
}

/*****************************************************************
 update trip (UPDATE)
 ********************************************************************/

exports.updateTrip = async (req, res) => {
  try {
    const adminInfo = await verifyToken(req.headers.authorization)
    if (adminInfo.admin) {
      const updatedTrip = await Trip.updateOne({ _id: req.params.id }, req.body)
      res.json({
        success: true,
        updatedTrip
      })
    } else {
      res.json({
        error: 'User does not have permission'
      })
    }
  } catch (error) {
    console.log(error.message)
  }
}

/*****************************************************************
 delete trip (DELETE)
 ********************************************************************/

exports.deleteTrip = async (req, res) => {
  try {
    const adminInfo = await verifyToken(req.headers.authorization)
    if (adminInfo.admin) {
      await Trip.deleteOne({ _id: req.params.id })
      res.json({
        success: true
      })
    } else {
      res.json({
        error: 'User does not have permission'
      })
    }
  } catch (error) {
    console.log(error.message)
  }
}

/*****************************************************************
 get specific trip
 ********************************************************************/

exports.getTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id })
    res.json({
      success: true,
      trip
    })
  } catch (error) {
    console.log(error.message)
  }
}

/*****************************************************************
 filter trips based on region (UPDATE)
 ********************************************************************/

exports.getTripsByRegion = async (req, res) => {
  try {
    const trips = await Trip.find({ region: req.params.region })
    res.json({
      success: true,
      trips
    })
  } catch (error) {
    console.log(error.message)
  }
}
