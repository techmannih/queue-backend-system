const express = require("express");
const app = express();

require("dotenv").config();

const port = process.env.PORT || 8880;

app.use(express.json());
app.get("/", function (req, res) {
  res.send("Hello from server");
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
