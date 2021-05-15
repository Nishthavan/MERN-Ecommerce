import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"
// @ROUTE - /api/users/ + "whatever"

// @Desc - Fetch all products
// @Extended Route - /login PUBLIC
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.name),
    })
  } else {
    res.status(401)
    throw new Error("Invalid Email or Password")
  }
})

// @Desc - GET USSER PROFILE
// @Extended Route - /profile PRIVATE
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error("User Not Found")
  }
})

export { authUser, getUserProfile }