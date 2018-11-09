var user = require('./mongo_util').User;

function login(loginId,_password){

  user.find({ login: loginId, password:_password },
    function (err, users) {
        console.log(users);
    }
  );

}

exports.login = login;
