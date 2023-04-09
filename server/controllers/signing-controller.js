const { User } = require("../models");
const jwt = require('jsonwebtoken')
require("dotenv").config();

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// sign Up a user
const createUser = async (req, res) => {
  const {email, username, password} = req.body

  try {
    const user = await User.signup(email, username, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// sign In a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { createUser, loginUser }