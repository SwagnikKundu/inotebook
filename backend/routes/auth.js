const express = require("express");
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// Create User
router.post("/", [body("email").isEmail()], (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.send({ errors: result.array() });
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => res.json(user))
    .catch((err) => res.json({ error: err.message }));
});

module.exports = router;
