const express = require("express");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const authUser = require("../middleware/auth");
const router = express.Router();

// ROUTE 1 :  Add a new Note
router.post(
  "/",
  authUser,
  [
    body("title", "Title length should have atleast 5 chars").isLength({
      min: 5,
    }),
    body("description", "Enter description").exists(),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send({ errors: result.array() });
    const { title, description, tags } = req.body;
    try{
      const note = new Note({
        title,
        description,
        tags,
        user: req.user.id
      });
      const savedNote = await note.save();
      res.json({msg:"Note added successfully",note:savedNote})
    }catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: error.message, msg: "Something went wrong" });
    }
    
  }
);

// ROUTE 2 :  Get all Notes
router.get(
  "/getall",
  authUser,
  async (req, res) => {
    try{
      const note = await Note.find({user:req.user.id})
      res.json({msg:"Notes fetched successfully",notes:note})
    }catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: error.message, msg: "Something went wrong" });
    }
    
  }
);

module.exports = router;
