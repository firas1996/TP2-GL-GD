const FoodController = require("../controllers/FoodController");
const express = require("express");
const router = express.Router();

router.route("/").post(FoodController.createFood);

module.exports = router;
