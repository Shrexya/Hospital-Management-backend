// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    console.log("entered value");
    const { email, password, fullName} = req.body;
    const user = new User({ email, password, fullName });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(400).send("Error registering user");
  }
});

router.post("/Login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }
    const token = jwt.sign({ _id: user._id }, "secretKey", {
      expiresIn: "1h",
    });
    res.send({ token });
  } catch (error) {
    res.status(400).send("Error logging in");
  }
});

module.exports = router;
