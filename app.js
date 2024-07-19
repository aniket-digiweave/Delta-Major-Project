const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("./models/listing.js");

async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("error while connecting to database");
  });
const PORT = 8000;

app.listen(PORT, () => {
  console.log("app is listening on port", PORT);
});

app.get("/", (req, res) => {
  res.send(" u r on root path");
});

app.get("/testListings", async (req, res) => {
  let sampleListing = new Listing({
    title: "my new villa",
    description: "By the beach",
    image: "",
    price: 0,
    location: "Mumbai",
    country: "India",
  });

  sampleListing
    .save()
    .then(() => {
      console.log("sample listing is saved");
    })
    .catch(() => console.log("error while inserting data"));
    res.send("successfull testing")
});
