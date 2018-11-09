require('dotenv').config();

const express = require("express");

const app = express();
const PORT = process.env.PORT | 8888;


var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
  console.log('db connected to ${process.env.MONGO_UR}');
})

app.get("/status", (req, res) => {
    const localTime = (new Date()).toLocaleTimeString();

    res
    .status(200)
    .send(`Server time is ${localTime}.`);
});

app.get("*", (req, res) => {
    res.sendStatus(404);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
