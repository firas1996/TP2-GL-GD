const User = require("../models/userModel");
const APIFeatures = require("../utils/APIFeatures");

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
    const features = new APIFeatures(User.find(), req.query)
      .filter()
      .sort()
      .pagination();

    const users = await features.queryData;
    if (users.length === 0) {
      res.status(404).json({
        message: "this page does not exist yet !!!",
      });
    }
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

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      message: "Users fetched !!!",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: "fail",
      err,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "Users Updated !!!",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: "fail",
      err,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(203).json({
      message: "Users Deleted !!!",
    });
  } catch (err) {
    res.status(400).json({
      message: "fail",
      err,
    });
  }
};
