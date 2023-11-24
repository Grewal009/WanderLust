const express = require("express");
const app = express();
const port = 8080;

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const Listing = require("./models/listing");

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

app.get("/listings", async (req, res) => {
  const allListings = await Listing.find();
  res.render("index.ejs", { allListings });
});

app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("show.ejs", { listing });
});

app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});
