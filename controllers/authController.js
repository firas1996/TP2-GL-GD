const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const createToken = (id, name) => {
  return jwt.sign({ id, name }, process.env.JWT_SECRET_KEY, {
    expiresIn: "90d",
  });
};
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
    const token = createToken(newUser._id, newUser.name);
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

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "email and pass are required !!!",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !user.validPass(password, user.password)) {
      return res.status(400).json({
        message: "email or pass are invalid !!!",
      });
    }
    const token = createToken(user._id, user.name);
    res.status(200).json({
      message: "User logged in !!!",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "fail",
      error,
    });
  }
};
