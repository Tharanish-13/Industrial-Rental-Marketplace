const mongoose = require('mongoose');
const Address = require('./Address'); // Import the Address model

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
