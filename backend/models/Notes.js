const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  tags: { type: String, default: "General" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("note", noteSchema);
