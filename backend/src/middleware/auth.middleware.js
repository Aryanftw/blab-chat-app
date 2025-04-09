import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req,res,next) => {
  const token = req.cookies.jwt
  try {
    if(!token){
      res.status(401).json({message : "Unauthorized , no token provided"})
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    if(!decoded){
      res.status(401).json({message : "Unauthorized , invalid token"})
    }

    const user = await User.findById(decoded.userId).select("-password")
    if(!user){
      res.status(401).json({message : "Unauthorized , user not found"})
    }

    req.user = user
    next()
  } catch (error) {
    console.log("Error in protectRoute ",error.message)
    res.status(501).json({message:"Internal server error"})
  }
}