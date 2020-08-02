const express = require("express");
const path = require("path");
const fs = require("fs");
// const fs = require("fs");
//any other required goes here

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3000;

const logger = (req, res, next) => {};
// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/notes", (req, res) => {
  res.sendfile(path.join(__dirname, "/public/notes.html"));
});
app.get("/api/notes", (req, res) => {
  res.sendfile(path.join(__dirname, "/db/db.JSON"));
});
app.get("/api/notes/:id", (req, res) => {
  let savedNotes = JSON.parse(fs.readFileSync(".db/db.json"));
  res.json(savedNotes[Number(req.params.id)]);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/notes", function (req, res) {
  let savedNotes = JSON.parse(fs.writeFileSync("./db/db.json", "utf8"));
  let newNote = req.body;
  let uniqueID = savedNotes.length.toString();
  newNote.id = uniqueID;
  savedNotes.push(newNote);
});

fs.writeFileSync(".db/db/json", JSON.stringify);
// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
