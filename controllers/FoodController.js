const Food = require("../models/FoodModel");

exports.createFood = async (req, res) => {
  try {
    const newFood = await Food.create(req.body);
    res.status(201).json({
      message: "Food added !!!",
      data: {
        newFood,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: "fail",
      err,
    });
  }
};
