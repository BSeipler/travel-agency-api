const Trip = require('./../models/tripModel')

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
    const newTrip = await Trip.create(req.body)
    res.json({
      newTrip
    })
  } catch (error) {
    console.log(error.message)
  }
}

/*****************************************************************
 update trip (UPDATE)
 ********************************************************************/

exports.updateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip.updateOne({ _id: req.params.id }, req.body)
    res.json({
      success: true,
      updatedTrip
    })
  } catch (error) {
    console.log(error.message)
  }
}

/*****************************************************************
 delete trip (UPDATE)
 ********************************************************************/

exports.deleteTrip = async (req, res) => {
  try {
    await Trip.deleteOne({ _id: req.params.id })
    res.json({
      success: true
    })
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
