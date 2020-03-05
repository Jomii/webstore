const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("fetching items from backend");
  res.json({
    items: [
      { _id: "5099803df3f4948bd2f98391", name: "tuote1", price: 50 },
      { _id: "5099803df3f4948bd2f93233", name: "tutoe2", price: 100 }
    ]
  });
});

module.exports = router;
