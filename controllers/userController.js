const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      message: "User added !!!",
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

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users fetched !!!",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: "fail",
      err,
    });
  }
};
