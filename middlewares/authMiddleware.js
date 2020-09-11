const jwt = require('jsonwebtoken')

const authenticateToken = async (req, res, next) => {
  // extract the token from the header
  const token = req.headers.authorization.split(' ')[1]
  // verified the token and decoded it
  if (token == null) {
    return res.status(401)
  }
  await jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false
      })
    }
    req.user = user
    next()
  })
}

module.exports = authenticateToken
