const ApiError = require("../utils/ApiError")
const jwt = require("jsonwebtoken")
const userModel = require("../model/userModel")

exports.protect = async ( req , res , next) => {
   try {
    const authorization = req.headers.authorization
    if(!authorization){
        throw new ApiError("no JWT" , 400)
    }
    const token = authorization.split(" ")[1]
    const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY)
    const user = await userModel.findById(decoded.id)
    if(!user){
        throw new ApiError("user Deleted" , 400)
    }
    const changedDate = new Date(user.passwordChangedAt).getTime() / 1000;
    if (changedDate > decoded.iat) {
      return res.status(401).send({
        status: "fail",
        message:
          "Password has been changed since last time, please login again",
      });
    }
    req.user = user;
    next()
   } catch (error) {
    next(error)
   }
}