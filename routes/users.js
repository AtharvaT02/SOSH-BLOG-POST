const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require ('dotenv').config();

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
        console.log("user already exists")
      return res.status(400).json({ msg: 'User already exists' });
    }
    

    user = new User({
      name,
      email,
      password,
    });

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        user.token = token;
        res.json({ token });
      }
    );



    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    res.json(user.token);
    } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
    }
});

module.exports = router;