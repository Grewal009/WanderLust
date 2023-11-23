const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");

const MONGODB_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGODB_URL);
}

main()
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("root route working!");
});

app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});
