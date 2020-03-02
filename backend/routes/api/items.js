const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("fetching items from backend");
  res.json({
    items: [
      { name: "tuote1", price: 50 },
      { name: "tutoe2", price: 100 }
    ]
  });
});

module.exports = router;
