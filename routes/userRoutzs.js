const {
  signUp,
  signin,
  protectorMW,
  verifyRole,
} = require("../controllers/authController");
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
router.post("/signin", signin);
router
  .route("/")
  .post(createUser)
  .get(protectorMW, verifyRole("admin", "user"), getAllUsers);
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;
