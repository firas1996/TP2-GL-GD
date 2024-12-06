const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
  },
  email: {
    type: String,
    required: [true, "The email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Email format is not valid !!!"],
  },
  password: {
    type: String,
    required: [true, "The password is required"],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "The password is required"],
    minlength: 8,
    validate: {
      validator: function (cPass) {
        return cPass === this.password;
      },
      message: "Password does not match !!!!",
    },
    // select: false,
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
userSchema.pre("save", async function (next) {});
const User = mongoose.model("User", userSchema);
module.exports = User;
