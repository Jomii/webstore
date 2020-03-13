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
    .then(() => {
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
    })
    .catch(e => res.sendStatus(500));
});

router.put("/:id", requireRole(["admin", "shopkeeper"]), (req, res) => {
  Item.findOneAndUpdate(
    { _id: req.params.id },
    { status: req.body.status, margin: req.body.margin }
  ).exec(err => {
    if (err) {
      res.sendStatus(500);
      return console.error(err);
    }
    console.log("Updated an item in collection");
    res.sendStatus(201);
  });
});

//testaamista varten, lisää userin itemiin
router.post("/test", async (req, res) => {
  let user = await User.findOne(/*{_id: jwt.id}*/); //id jwt:eestä jonka avulla etitään oikea useri db:eestä?
  let newItem = new Item({
    name: "testi tuote",
    description: "kuvaus",
    price: 15,
    owner: user
  });

  newItem.save(err => {
    if (err) {
      res.sendStatus(500);
      return console.error(err);
    }

    console.log("Inserted a new item to collection with user ref");
    res.status(201);
    res.location(path + newItem._id);
    res.json(newItem);
  });
});

module.exports = router;
