const express = require("express");
const app = express();
const port = 8080;

const path = require("path");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
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

// index route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find();
  res.render("index.ejs", { allListings });
});

// new route
app.get("/listings/new", (req, res) => {
  res.render("new.ejs");
});

//show listing route
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("show.ejs", { listing });
});

// add new listind
app.post("/listings", async (req, res) => {
  console.log(req.body.listing);
  const newListing = new Listing(req.body.listing);
  await newListing
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/listings");
});

// edit route
app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  console.log(listing);

  res.render("edit.ejs", { listing });
});

// update listing
app.patch("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const updateListing = req.body.listing;
  await Listing.findByIdAndUpdate(id, updateListing)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/listings");
});

app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});
