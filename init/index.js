const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

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

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
};

initDB();
