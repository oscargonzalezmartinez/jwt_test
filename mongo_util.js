const MONGO_URL = process.env.MONGO_URL;
var mongoose = require('mongoose');
mongoose.connect(MONGO_URL);

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
  console.log(`db connected to ${MONGO_URL}`);
})

var userSchema = mongoose.Schema({
  name: String,
  login: String,
  password: String
})
exports.User = mongoose.model('user', userSchema)
