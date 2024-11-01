const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
  },
  email: {
    type: String,
    required: [true, "The email is required"],
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
  age: {
    type: Number,
    default: 20,
  },
  created_at: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
