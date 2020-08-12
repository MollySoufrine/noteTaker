const fs = require("fs");
const express = require("express");
const app = express.Router();
const uuidv1 = require("uuidv1");
const { notEqual } = require("assert");
const { isBuffer } = require("util");

app.get("/api/notes", (req, res) => {
  let savedNote = fs.readFileSync(__dirname + "/../db/db.json");
  savedNote = JSON.parse(savedNote);

  res.json(savedNote);
});

app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  newNote.id = uuidv1();

  // add to array, save array to JSON file

  let notes = fs.readFileSync(__dirname + "/../db/db.json");
  notes = JSON.parse(notes);
  notes.push(newNote);

  fs.writeFileSync(__dirname + "/../db/db.json", JSON.stringify(notes));

  res.json(notes);
});

app.delete("/api/notes/:id", function (req, res) {
  let noteID = req.params.id;

  let allNotes = fs.readFileSync(__dirname + "/../db/db.json");
  allNotes = JSON.parse(allNotes);

  let deletThisNote = allNotes.filter((note) => note.id != noteID);

  fs.writeFileSync(__dirname + "/../db/db.json", JSON.stringify(deletThisNote));

  res.json(deletThisNote);
  console.log("DELETED");
});

module.exports = app;
