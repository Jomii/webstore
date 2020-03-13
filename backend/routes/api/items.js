const express = require("express");
const router = express.Router();
const Item = require("../../models/item.js").Item;
const User = require("../../models/user.js").User;
const path = "http://localhost:5000/api/items/";
const requireRole = require("../../utils/accessControl/jwtAuth").requireRole;

router.get("/", requireRole(["admin", "user", "shopkeeper"]), (req, res) => {
  console.log("Fetching items from backend");
  if (req.query.status == "listed") {
    Item.find({ status: "listed" }).then(results => {
      res.status(200);
      res.location(path);
      res.json({ items: results });
    });
  } else if (req.query.status == "pending") {
    Item.find({ status: "pending" }).then(results => {
      res.status(200);
      res.location(path);
      res.json({ items: results });
    });
  } else {
    Item.find((err, items) => {
      if (err) {
        res.sendStatus(404);
        return console.error(err);
      }
      if (!items) {
        res.sendStatus(404);
      } else {
        res.status(200);
        res.location(path);
        res.json({ items: items });
      }
    });
  }
});

router.get("/:id", requireRole(["admin", "user", "shopkeeper"]), (req, res) => {
  console.log("Fetching single item from backend");
  Item.findOne({ _id: req.params.id }, (err, item) => {
    if (err) {
      res.sendStatus(404);
      return console.error(err);
    }
    if (!item) {
      res.sendStatus(404);
    } else {
      res.status(200);
      res.location(path + item._id);
      res.json({ item: item });
    }
  });
});

router.post("/", requireRole(["admin", "user", "shopkeeper"]), (req, res) => {
  User.findOne({ _id: req.token.id })
    .then(user => {
      let newItem = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        seller: user
      });

      console.log(user);
      console.log(newItem);

      newItem.save(err => {
        if (err) {
          res.sendStatus(500);
          return console.error(err);
        }
        console.log("Inserted a new item to collection");
        res.status(201);
        res.location(path + newItem._id);
        res.json(newItem);
      });
    })
    .catch(e => res.sendStatus(500));
});

router.put("/:id", requireRole(["admin", "shopkeeper", "user"]), (req, res) => {
  if (req.token.role === "shopkeeper" && req.body.margin && req.body.status) {
    Item.findOneAndUpdate(
      { _id: req.params.id },
      { status: req.body.status, margin: req.body.margin }
    ).exec(err => {
      if (err) {
        res.sendStatus(500);
        return console.error(err);
      }
      res.sendStatus(201);
      return;
    });
  }
});

router.delete("/", requireRole(["admin"]), (req, res) => {
  Item.remove()
    .then(() => res.sendStatus(201))
    .catch(() => res.status(500));
});

router.delete("/:id", requireRole(["admin"]), (req, res) => {
  Item.deleteOne({ _id: req.params.id })
    .then(() => res.sendStatus(201))
    .catch(e => res.status(500));
});

module.exports = router;
