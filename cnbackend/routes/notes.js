const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// Route:1 Fetching all notes using:GET "/api/notes/fetchnotes" require login

router.get("/fetchnotes", fetchuser, async (req, res) => {
  // console.log("here");
  try {
    const notes = await Note.find({ user: req.user.id });
    // console.log(req.user.id);
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("interal server error");
  }
});

// Route:2 Adding notes using:POST "/api/notes/addnote" require login

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a valid name of min length 3").isLength({ min: 3 }),
    body("description", "enter a valid email").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, tag } = req.body;
    try {
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// Route:3 Updating notes using:PUT "/api/notes/updatenote" require login
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  // const id=req.user.id
  // const user=await User.find({user:req.user.id})
  // if(note.isEmpty()){
  //   return res.status(400).send("no such user found")
  // }
  const { title, description, tag } = req.body;
  // create a newNote object
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // find the note to be updated
    // const note=Note.findByIdAndUpdate() use findById() so that authenticate the user first
    // verifying notes existence
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    // verifying the user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route:4 delete notes using:DELETE "/api/notes/delete/:id" require login
router.delete("/delete/:id", fetchuser, async (req, res) => {
  // check existence of the note to be deleted
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    // verifying the user to delete his notes only
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
module.exports = router;
