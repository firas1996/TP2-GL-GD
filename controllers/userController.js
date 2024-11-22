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
    // const users = await User.find().where("name").equals(req.query.name);
    let extraQuery = ["sort", "page", "limit"];
    let queryObj = { ...req.query };
    extraQuery.forEach((el) => delete queryObj[el]);
    // 1) Filtring:
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|let)\b/g, (x) => `$${x}`);
    queryObj = JSON.parse(queryStr);
    let querry = User.find(queryObj);
    // 2) Pagination:
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit || 2;
    const skip = (page - 1) * limit;
    querry = querry.skip(skip).limit(limit);
    const nbrUsers = await User.countDocuments();
    if (nbrUsers <= skip) {
      // throw new Error("This page in not .....");
      res.status(404).json({
        message: "404",
      });
    }
    const users = await querry;
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
