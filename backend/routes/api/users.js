const express = require("express");
const api = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const path = "http://localhost:5000/api/users/";

const saltRounds = 12;

// Create a new user
api.post("/", (req, res) => {
  if (
    !req.body ||
    !req.body.email ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.password
  ) {
    res.sendStatus(400);
    // Unsafe logging, can expose users password
    return console.error(
      `Failed to add a user to the database. Request: ${JSON.stringify(
        req.body
      )}`
    );
  }

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      res.sendStatus(500);
      return console.error(err);
    }

    let newUser = new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hash,
      role: req.body.role
    });

    newUser.save(err => {
      if (err) {
        res.sendStatus(500);
        return console.error(err);
      }

      console.log(`Inserted a new user (${newUser.email}) to collection`);
      res.status(201);
      res.location(path + newUser._id);
      res.json({ user: newUser });
    });
  });
});

// Update user
api.put("/:id", (req, res) => {
  console.log("Updating user by id: " + req.params.id);

  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, user) => {
      if (err) {
        res.sendStatus(400);
        return console.error(err);
      }

      if (!user) {
        res.sendStatus(404);
      } else {
        res.status(200);
        res.location(path + user._id);
        res.json({ user: user });
      }
    }
  );
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

// Get user by id
api.get("/:id", (req, res) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      res.sendStatus(404);
      return console.error(err);
    }

    if (!user) {
      res.sendStatus(404);
    } else {
      res.status(200);
      res.location(path + user._id);
      res.json({ user: user });
    }
  });
});

// Delete user by id
api.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) {
      res.sendStatus(404);
      return console.error(err);
    }

    if (!user) {
      res.sendStatus(404);
    } else {
      res.status(204);
      res.json();
      console.log("Deleted user by id: " + req.params.id);
    }
  });
});

api.delete("/", (req, res) => {
  console.log("Deleting all users");
  User.deleteMany().exec();
  res.sendStatus(200);
});

module.exports = api;
