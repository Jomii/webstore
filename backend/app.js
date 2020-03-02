const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();

//routes
const users = require("./routes/api/users");
const items = require("./routes/api/items");

const port = 5000;
app.use(helmet());
app.use(cors());
app.use(express.json());

//users & items routes
app.use("/api/users", users);
app.use("/api/items", items);

app.listen(port, () => console.log(`Backend running on port ${port}.`));
