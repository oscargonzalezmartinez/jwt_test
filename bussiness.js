const user = require('./mongo_util').User;
const jwt = require("jsonwebtoken");

function login(loginId,_password,callback){

  user.find({ login: loginId, password:_password },
    function (err, user) {
        console.log("Login success " + user);
        var token = null;
        if (user!=null){
          token = jwt.sign({
              sub: user.id,
              username: user.username
          }, process.env.JWT_SECRET, {expiresIn: "3 hours"});
        }

        callback(token);
    }
  );

}

exports.login = login;
