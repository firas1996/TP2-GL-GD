const { signUp } = require("../controllers/authController");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const express = require("express");
const router = express.Router();
router.post("/signup", signUp);
router.route("/").post(createUser).get(getAllUsers);
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;
