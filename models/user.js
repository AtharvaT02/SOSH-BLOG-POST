const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("uuid");
const id = uuid.v4();
const userSchema = new Schema({
  //id just string and uuid
  _id: {
    type: String,
    default: id,
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

module.exports = User;


