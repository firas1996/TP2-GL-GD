const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const createToken = (id, name) => {
  return jwt.sign({ id, name }, process.env.JWT_SECRET_KEY, {
    expiresIn: "90d",
  });
};
exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      age: req.body.age,
    });
    console.log("user added");
    const token = createToken(newUser._id, newUser.name);
    res.status(201).json({
      message: "User added !!!",
      token,
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

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "email and pass are required !!!",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !user.validPass(password, user.password)) {
      return res.status(400).json({
        message: "email or pass are invalid !!!",
      });
    }
    const token = createToken(user._id, user.name);
    res.status(200).json({
      message: "User logged in !!!",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "fail",
      error,
    });
  }
};

exports.protectorMW = async (req, res, next) => {
  try {
    let token;

    // 1) vérifier si l'utilisateur est connecter ou bien non

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        message: "You are not logged in !!!",
      });
    }

    // 2) vérifier la validité du token

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_KEY
    );
    console.log(decoded);

    // 3) vérifier si l'utilisateur est toujour existe

    const user = await User.findById(decoded.id).select("+pass_update_date");

    if (!user) {
      return res.status(401).json({
        message: "the user belonging to this token no longer exist !!!",
      });
    }

    // 4) vérifier si la token et générer apres ou avant la modification du pass

    if (!user.changedPasswordTime(decoded.iat, user.pass_update_date)) {
      return res.status(401).json({
        message: "token no longer valid !!!",
      });
    }

    next();
  } catch (error) {
    res.status(400).json({
      message: "fail",
      error,
    });
  }
};
