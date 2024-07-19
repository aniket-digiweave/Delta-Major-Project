const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("./models/listing.js");
const path = require("path");

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(" u r on root path");
});

//INDEX ROUTE
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

//SHOW ROUTE
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

//NEW ROUTE
app.get("/listing/new", (req, res) => {
  res.render("listings/new.ejs");
});

//CREATE ROUTE
app.post("/listings", async (req, res) => {
  let newListing = new Listing(req.body.listing);
  await newListing.save().then(() => {
    res.send("newlisting saved succefully");
  });
});
