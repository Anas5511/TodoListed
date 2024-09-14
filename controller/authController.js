const userModel = require("../model/userModel");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res, next) => {
  const body = req.body;
  try {
    if (body.password !== body.confirmPassword) {
      throw new ApiError("Passwords should be match", 400);
    }
    const hashedPassword = await bcrypt.hash(body.password, 12);
    body.password = hashedPassword;
    const user = await userModel.create(body);
    res.status(201).redirect("/api/v1/auth/login")
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const body = req.body;
  try {
    if (!body.email || !body.password) {
      throw new ApiError("Please add an email and password.");
    }

    const user = await userModel.findOne({ email: body.email });
    if (!user) {
      throw new ApiError("User not found!", 404);
    }

    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      throw new ApiError("Incorrect email or password.");
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRED_DATE,
    });

    // Set token as a cookie
    res.cookie('authToken', token, {
      httpOnly: true,  // Ensures the cookie is not accessible via client-side JS
      secure: process.env.NODE_ENV === 'production',  // Sends cookie only over HTTPS in production
      maxAge: 24 * 60 * 60 * 1000  // Cookie expiry: 1 day
    });

    res.status(200).redirect("/api/v1/projects/createTask")
  } catch (error) {
    next(error);
  }
};




exports.getAllUsers = async( req , res , next) => {
  try {
    const users = await userModel.find()
    res.status(200).send({status : "Success" , result : users.length , data : users})
  } catch (error) {
    next(error)
  }
}


exports.deleteUser = async( req , res , next) => {
  const id = req.params.userId
  try {
    const user = await userModel.findByIdAndDelete(id)
    if(!user){
      throw new ApiError("user Not Found!" , 404)
    }
    res.status(200).send({status : "Success" , message : "user Deleted Successfully"})
  } catch (error) {
    next(error)
  }
}