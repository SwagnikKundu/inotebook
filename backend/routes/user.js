const express = require("express");
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authUser = require("../middleware/auth");

const JWT_SECRET_TOKEN = "fh?P26#sU:NP5s4";

//ROUTE 1  :   Create User
router.post(
  "/createUser",
  [
    body("name", "Name should contain atleast 5 characters").isLength({
      min: 3,
    }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password should contain atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send({ errors: result.array() });
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) return res.status(404).json({ msg: "Email already exists" });
      const salt = await bcrypt.genSalt(12);
      const securedPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPass,
      });
      res.status(200).json({ msg: "User registered successfully" });
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: error.message, msg: "Something went wrong" });
    }
  }
);

//ROUTE 2  :  Authenticate User
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send({ errors: result.array() });
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email: email });
      if (!user)
        return res
          .status(404)
          .json({ msg: "Please try to login with valid credentials" });
      const passComp = await bcrypt.compare(password, user.password);
      if (!passComp)
        return res
          .status(404)
          .json({ msg: "Please try to login with valid credentials" });
      const payLoad = {
        user: {
          id: user._id,
        },
      };
      const authToken = jwt.sign(payLoad, JWT_SECRET_TOKEN);
      res
        .status(200)
        .json({ msg: "User login successfully", token: authToken });
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: error.message, msg: "Something went wrong" });
    }
  }
);

//ROUTE 2  :  Get User details
router.post("/getuser", authUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message, msg: "Something went wrong" });
  }
});

module.exports = router;
