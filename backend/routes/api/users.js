const express = require("express");
const mongoose = require("mongoose");
const api = express.Router();
const User = require("../../models/user");
const path = "http://localhost:5000/api/users/";

// Create a new user
api.post("/", (req, res) => {
  // TODO: add password encryption
  let newUser = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    role: req.body.role
  });

  newUser.save(err => {
    if (err) {
      res.sendStatus(500);
      return console.error(err);
    }

    console.log("Inserted a new user to collection");
    res.status(201);
    res.location(path + newUser._id);
    res.json(newUser);
  });
});

// Get all users
api.get("/", (req, res) => {
  console.log("Fetching users from backend");

  User.find((err, users) => {
    if (err) {
      res.sendStatus(404);
      return console.error(err);
    }

    if (!users) {
      res.sendStatus(404);
    } else {
      res.status(200);
      res.location(path);
      res.json({ users: users });
    }
  });
});

module.exports = api;
