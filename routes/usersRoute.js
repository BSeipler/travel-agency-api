const express = require('express')
const router = express.Router()
const userController = require('./../controllers/userController')

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  userLogin,
  getUser
} = userController

router
  .route('/')
  .get(getUsers)
  .post(createUser)
  .put(updateUser)
  .delete(deleteUser)

router.get('/login', userLogin)

router.route('/:id').get(getUser)

module.exports = router
