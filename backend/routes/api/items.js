const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");
const path = "http://localhost:5000/api/items/";

router.get("/", (req, res) => {
  console.log("Fetching items from backend");
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
});

router.post("/", (req, res) => {
  console.log("posting");
  let newItem = new Item({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  });

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
});

module.exports = router;
