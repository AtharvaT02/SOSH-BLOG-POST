const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");
const uuid = require("uuid");
const id = uuid.v4();

const blogPostSchema = new Schema({
  _id: {
    type: String,
    default: id,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdOn: { type: Date, default: Date.now }
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;