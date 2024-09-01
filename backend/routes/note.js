const express = require("express");
const Note = require("../models/Notes");
const router = express.Router();

// Create User
router.post("/", (req, res) => {
  const note = Note(req.body);
  user.save();
});

module.exports = router;
