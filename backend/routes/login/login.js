const express = require("express");
const router = express.Router();

// Import User-model
const User = require("../../model/user.js");

router.post("/register", (req, res) => {
  if (req.body && req.body.username && req.password) {
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
});

router.post("login", (req, res) => {
  if (req.body && req.body.username && req.password) {
  }
});
