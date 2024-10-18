const mongoose = require("mongoose");
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    required: [true, "youe must set a name"],
    default: "no name",
    unique: true,
  },
  cal: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});
const Food = mongoose.model("Food", foodSchema);
module.exports = Food;
