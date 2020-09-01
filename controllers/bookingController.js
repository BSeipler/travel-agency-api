const User = require('./../models/userModel')
const authController = require('./authController')
const { verifyToken } = authController

exports.getBookings = async (req, res) => {
  try {
    const token = await verifyToken(req.headers.authorization)
    const user = await User.find({ _id: token.id })
    res.json({
      trips: user[0].trips
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.createBooking = async (req, res) => {
  try {
    const token = await verifyToken(req.headers.authorization)
    await User.findOneAndUpdate(
      { _id: token.id },
      { $push: { trips: req.body.trip } }
    )
    res.json({
      success: true
    })
  } catch (error) {
    console.log(error.message)
  }
}

exports.deleteBooking = async (req, res) => {
  try {
    const token = await verifyToken(req.headers.authorization)
    await User.findOneAndUpdate(
      { _id: token.id },
      { $pull: { trips: req.body.trip } }
    )
    res.json({
      success: true
    })
  } catch (error) {
    console.log(error.message)
  }
}
