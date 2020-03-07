const express = require("express");
const router = express.Router();
const Item = require("../../models/item.js").Item;
const path = "http://localhost:5000/api/items/";

router.get("/", (req, res) => {
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

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
  Item.findOneAndUpdate(
    { _id: req.params.id },
    { status: req.body.status }
  ).exec(err => {
    if (err) {
      res.sendStatus(500);
      return console.error(err);
    }
    console.log("Updated an item in collection");
    res.sendStatus(201);
  });
});

module.exports = router;
