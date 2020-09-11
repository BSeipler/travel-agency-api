const jwt = require('jsonwebtoken')

exports.createToken = async (id, admin) => {
  try {
    // create the payload for the token
    let payload
    if (admin) {
      payload = {
        id,
        admin
      }
    } else {
      payload = {
        id
      }
    }
    // create the token
    const token = await jwt.sign(payload, process.env.JWT_SECRET)
    return token
  } catch (error) {
    console.log(error.message)
  }
}
