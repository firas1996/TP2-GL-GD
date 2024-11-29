const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      age: req.body.age,
    });
    console.log("user added");
    const token = jwt.sign(
      { id: newUser._id, name: newUser.name },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "90d",
      }
    );
    console.log(token);
    res.status(201).json({
      message: "User added !!!",
      token,
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: "fail",
      err,
    });
  }
};
