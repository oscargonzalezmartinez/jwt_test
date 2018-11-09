require('dotenv').config();

const express = require("express");

const app = express();
const PORT = process.env.PORT | 8888;


var user = require('./mongo_util').User;

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


    user.find({}, function (err, users) {
      console.log(users);

    });

});
