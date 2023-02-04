const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./db");
const User = require("./models/user");
const Blog = require("./models/blogs");



// Connect to MongoDB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/blog", require("./routes/blogs"));
app.use("/api/user", require("./routes/users"));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;

