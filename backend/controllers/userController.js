const User = require("../models/user.js").User;
const bcrypt = require("bcryptjs");

// Return ALL the users form the db.
exports.index = (req, res) => {
  User.find({}, req.body, (err, users) => {
    if (err) {
      console.error(err);
      res.send(err);
      return;
    }

    res.json(users);
  });
};

// Add a new user to the db.
exports.create = (req, res) => {
  if (
    req.body === null ||
    !req.body.email ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.password ||
    !req.body.email
  ) {
    console.error(`Failed to add a user to the database. Request: ${req.body}`);
    res.sendStatus(400);
    res.end(req.body.err);
    return;
  }

  // Encrypt the password.
  bcrypt.getSalt(10, (err, salt) => {
    if (err) {
      res.sendStatus(500);
      console.error(err);
      return;
    }

    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) {
        res.sendStatus(500);
        console.error(err);
        return;
      }

      let newUser = {
        firstname: req.body.firstName,
        lastNameName: req.body.lastName,
        email: req.body.email,
        password: hash
      };
      newUser.save((err, user) => {
        if (err) {
          console.error(`Failed to add user to the db. ${err}`);
          res.sendStatus(500);
          res.send(null);
          return;
        }

        console.log(`Added new user (${user.email}) to the db!`);
        res.json(user);
      });
    });
  });
};

exports.show = (req, res) => {
  User.findById(req.params.id, req.body, (err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
};
