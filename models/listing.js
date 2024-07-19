const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: {
      type: String,
      default:
        "https://img.freepik.com/premium-photo/beach-with-beach-chair-parasol-it_865967-40513.jpg?w=740",
      set: (v) =>
        v === ""
          ? "https://img.freepik.com/premium-photo/beach-with-beach-chair-parasol-it_865967-40513.jpg?w=740"
          : v,
    },
    filename: {
      type: String,
    },
  },
  price: {
    type: Number,
    set: (v) => (v <= 0 ? 1 : v),
  },
  location: String,
  country:String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
