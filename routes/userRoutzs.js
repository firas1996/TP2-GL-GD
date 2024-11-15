const {
  createUser,
  getAllUsers,
  getUserById,
} = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.route("/").post(createUser).get(getAllUsers);
router.route("/:id").get(getUserById);

module.exports = router;
