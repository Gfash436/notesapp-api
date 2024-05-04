const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

router.get('/list', async function (req, res) {
    var note = await Note.find();
    res.json(note);
});

router.get('/list/:userid', async function (req, res) {
    var note = await Note.find({ userid: req.params.userid });
    res.json(note);
});

router.post('/add', async function (req, res) {
    var newNote = new Note({
        id: req.body.id,
        userid: req.body.userid,
        title: req.body.title,
        content: req.body.content
    });
    await newNote.save();
    const response = {
        message: `New Note Created with id : ${req.body.id}`
    };
    res.json(response);
});

router.put('/update', async function (req, res) {
    var updateNote = await Note.findOneAndUpdate(
        { id: req.body.id }, //Condition to update data
        {
            title: req.body.title,
            content: req.body.content
        },
        {
            new: true
        } // return the updated data
    );
    const response = {
        message: "Note has been updated successfully",
        note: updateNote
    };
    res.json(response);
});

router.delete('/delete', async function (req, res) {
    var deleteNote = await Note.deleteOne({ id: req.body.id });
    const response = {
        message: "Note deleted successfully.",
        note: deleteNote
    };
    res.json(response);
});

module.exports = router;