const { User } = require("../models");


// signup a user
const createUser = async (req, res) => {
    const {email, username, password} = req.body
  
    try {
      const user = await User.signup(email, username, password)
  
  
      res.status(200).json({email, user})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
  
  module.exports = { createUser }