const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userId: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, required: true },
  tokencode: String,
  verifycode:String,
});
const UserModel = mongoose.model('user',userSchema);

module.exports = {UserModel}