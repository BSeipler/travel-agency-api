const User = require('./../models/userModel')
const bcrypt = require('bcrypt')
const authController = require('./authController')
const { verifyToken, createToken } = authController

/*****************************************************************
 get all users (READ)
 ********************************************************************/
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json({
      users
    })
  } catch (error) {
    console.log(error.message)
  }
}

/*****************************************************************
 create user (CREATE)
 ********************************************************************/

exports.createUser = async (req, res) => {
  try {
    // destructure the req.body
    const { firstName, lastName, email, password } = req.body
    // check if user already exists in the db
    const match = await User.exists({ email })
    if (match) {
      res.json({
        error: 'User already exists'
      })
    } else {
      // encrypt the password
      const hash = await bcrypt.hash(password, 10)
      // create new user object with the encrypted password
      const userInfo = {
        firstName,
        lastName,
        email,
        password: hash
      }
      // add user to the database
      const newUser = await User.create(userInfo)
      // find the new user in the db
      const user = await User.find({ email })
      const userId = user[0]._id
      // create the token
      const token = await createToken(userId)
      res.json({
        newUser,
        token
      })
    }
  } catch (error) {
    console.log(error.message)
  }
}

/*****************************************************************
 update user (UPDATE)
 ********************************************************************/

exports.updateUser = async (req, res) => {
  try {
    const userId = await verifyToken(req.headers.authorization)
    // update the user based on the ID in the token
    await User.updateOne({ _id: userId }, req.body)
    res.json({
      message: 'User has been updated'
    })
  } catch (error) {
    console.log(error.message)
  }
}

/*****************************************************************
 delete user (DELETE)
 ********************************************************************/

exports.deleteUser = async (req, res) => {
  try {
    const userId = await verifyToken(req.headers.authorization)
    // delete the user based on the ID in the token
    await User.deleteOne({ _id: userId })
    res.json({
      message: 'User has been deleted'
    })
  } catch (error) {
    console.log(error.message)
  }
}

/*****************************************************************
 login existing user
 ********************************************************************/

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    // check if user exists
    const match = await User.exists({ email })
    // if they don't, send an error / else find the user in the db
    if (!match) {
      res.json({
        message: 'User does not exist'
      })
    } else {
      const user = await User.find({ email })
      const dbPassword = user[0].password
      const userId = user[0]._id
      // compare the password from the body with the password in the db
      const doesMatch = await bcrypt.compare(password, dbPassword)
      // if they don't match, send back an error / else login the user
      if (!doesMatch) {
        res.json({
          error: 'Credentials do not match'
        })
      } else {
        const token = await createToken(userId)
        res.json({
          message: 'User is now logged in',
          token
        })
      }
    }
  } catch (error) {
    console.log(error.message)
  }
}

/*****************************************************************
 get specific user
 ********************************************************************/

exports.getUser = async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.id })
    res.json({
      user
    })
  } catch (error) {
    console.log(error.message)
  }
}
