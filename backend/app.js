const express = require("express");
const app = express();

const port = 5000;

app.get("/users", (req, res) => {
  console.log("Client fetching users from backend.");
  res.json({ username: "asd123", password: 12345 });
});

app.listen(port, () => console.log(`Backend running on port ${port}`));
