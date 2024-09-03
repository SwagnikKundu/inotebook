const express = require("express");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const authUser = require("../middleware/auth");
const router = express.Router();

// ROUTE 1 :  Add a new Note   using {ip}:8080/api/notes/
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

// ROUTE 2 :  Get all Notes using {ip}:8080/api/notes/getall
router.get(
  "/getall",
  authUser,
  async (req, res) => {
    try{
      const note = await Note.find({user:req.user.id})
      if(note.length===0)
        return res.json({msg:"No notes to fetch",notes:note})
      res.json({msg:"Notes fetched successfully",notes:note})
    }catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: error.message, msg: "Something went wrong" });
    }
    
  }
);

// ROUTE 3 :  Get a specific Note using {ip}:8080/api/notes/{id}
router.get(
  "/:id",
  authUser,
  async (req, res) => {
    try{
      const note = await Note.find({user:req.user.id, _id:req.params.id});
      if(note.length===0)
        return res.json({msg:"No notes to fetch",notes:note})
      res.json({msg:"Note fetched successfully",note:note})
    }catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: error.message, msg: "Something went wrong" });
    }
    
  }
);

// ROUTE 4 :  Update a Note using {ip}:8080/api/notes/{id}
router.put(
  "/:id",
  authUser,
  async (req, res) => {
    try{
      let {title,description,tags} = req.body;
      let newNote = {};
      if(title){newNote.title = title};
      if(description){newNote.description = description};
      if(tags){newNote.tags = tags};
      
      let note = await Note.findOne({_id:req.params.id});
      if(!note)
        return res.status(404).json({error:"Note not found" , msg:"Please enter a valid id"});
      if(note.user.toString() !== req.user.id)
        return res.status(401).json({error:"Access denied" , msg:"Please enter a valid id"});

      note = await  Note.findOneAndUpdate({_id:req.params.id},{$set: newNote},{new:true})
      res.json({msg:"Note updated successfully",note:note})
    }catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: error.message, msg: "Something went wrong" });
    }
    
  }
);


// ROUTE 5 :  Delete a Note using {ip}:8080/api/notes/{id}
router.delete(
  "/:id",
  authUser,
  async (req, res) => {
    try{
      let {title,description,tags} = req.body;
      let newNote = {};
      if(title){newNote.title = title};
      if(description){newNote.description = description};
      if(tags){newNote.tags = tags};
      
      let note = await Note.findOne({_id:req.params.id});
      if(!note)
        return res.status(404).json({error:"Note not found" , msg:"Please enter a valid id"});
      if(note.user.toString() !== req.user.id)
        return res.status(401).json({error:"Access denied" , msg:"Please enter a valid id"});

      note = await  Note.findOneAndDelete({_id:req.params.id})
      res.json({msg:"Note deleted successfully",note:note})
    }catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: error.message, msg: "Something went wrong" });
    }
    
  }
);

module.exports = router;
