const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");
const path = "http://localhost:5000/api/items/";

router.get("/", (req, res) => {
  /*
  res.json({
    items: [
      { _id: "5099803df3f4948bd2f98391", name: "tuote1", price: 50 },
      { _id: "5099803df3f4948bd2f93233", name: "tutoe2", price: 100 }
    ]
  });
  */
  console.log("Fetching users from backend");

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
