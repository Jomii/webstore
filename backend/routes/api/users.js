const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("fetching users from backend");
  res.json({ username: "user1", password: "12345" });
});

module.exports = router;
