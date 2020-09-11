const express = require('express')
const router = express.Router()
const userController = require('./../controllers/userController')
const authenticateToken = require('../middlewares/authMiddleware')

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

router.put('/', authenticateToken, updateUser)

router.delete('/', authenticateToken, deleteUser)

router.post('/login', userLogin)

router.get('/getUser', authenticateToken, getUser)

module.exports = router
