require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const expressjwt = require("express-jwt");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8888;

app.use(bodyParser.json());
app.use(cors());

const jwtCheck = expressjwt({
    secret: process.env.JWT_SECRET
});

var bussiness = require('./bussiness');

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);


});

app.get("/status", (req, res) => {
    const localTime = (new Date()).toLocaleTimeString();

    res
    .status(200)
    .send(`Server time is ${localTime}.`);
});

app.get("*", (req, res) => {
    res.sendStatus(404);
});

app.get("/resource/secret", jwtCheck, (req, res) => {
    res
    .status(200)
    .send("Secret resource, you should be logged in to see this");
});

app.post("/login", (req, res) => {
    if (!req.body.username || !req.body.password) {
        res
        .status(400)
        .send("You need a username and password");
        return;
    }

    // const user = users.find((u) => {
    //     return u.username === req.body.username && u.password === req.body.password;
    // });
    //
    // if (!user) {
    //     res
    //     .status(401)
    //     .send("User not found");
    //     return;
    // }

bussiness.login(req.body.username,req.body.password,
  function (token) {
    if (!token){
      res.status(401).send("User not found");
    }
    else{
      res
      .status(200)
      .send({access_token: token});
    }
  }
);


});
