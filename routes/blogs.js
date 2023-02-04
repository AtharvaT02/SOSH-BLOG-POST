const express = require("express");
console.log("blogs.js");
const Blog = require("../models/blogs");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");
// route to create blog


router.post("/create", async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    let user = await User.findById(decoded.user.id);

  } catch (e) {
    console.log(e);
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
  blogPost = new Blog({
    title: req.body.title,
    description: req.body.description,
    createdBy: decoded.user.id,
    createdOn: new Date(),
  })

  blogPost.save((err, blogPost) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Error saving blog post",
      });
    }

    res.status(201).json({
      message: "Blog post created successfully",
    });
  });
});
// route to get all blogs

router.get("/all", async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
    }
);

// route to get a single blog

router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.json(blog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
    }
);

// route to update a blog

router.put("/update/:id", async (req, res) => {

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send("Blog not found");
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
      });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);


    if (blog.createdBy.toString() !== decoded.user.id.toString())
      return res.status(401).send("You are not authorized to edit this blog post");

    blog.title = req.body.title;
    blog.description = req.body.description;

    const updatedBlog = await blog.save();
    res.send(updatedBlog);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// route to delete a blog

router.delete("/delete/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send("Blog not found");
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
      });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);


    if (blog.createdBy.toString() !== decoded.user.id.toString())
      return res.status(401).send("You are not authorized to delete this blog post");

      await blog.remove();
      res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).send(error.message);
  }
    }
);


module.exports = router;

