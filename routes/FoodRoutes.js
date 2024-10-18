const express = require("express");
const FoodController = require("../controllers/FoodController");
const router = express.Router();

router.route("/").post(FoodController.createFood);

module.exports = router;
