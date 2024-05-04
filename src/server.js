const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Note = require('./models/Note');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://rubies:rubies0004@femibackend.vg8mocb.mongodb.net/notesdb').then(function () {
    app.get('/', function (req, res) {
        res.json({
            message: "API is working !"
        });
    });

    const noteRouter = require('./routes/Note');
    app.use('/notes', noteRouter);

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running at PORT: 3000" + PORT);
})