const mongoose = require("mongoose");

const Hotel = new mongoose.Schema({
  ownerxrpaddr: {
    type: String,
  },
  issuerxrpaddr: {
    type: String,
  },
  hoteltaxon: {
    type: Number,
  },
  city: {
    type: String,
  },
  price: {
    type: Number,
  },
  isrentable: {
    //set buy hotel admin
    type: Boolean,
  },
  availableforrent: {
    // set when hotel was booked
    type: Boolean,
  },
  roomNum: {
    type: Number,
  },
  image: {
    type: String,
  },
  nftaddr: {
    type: String,
  },
  nftokenid: {
    type: String,
  },
  type: {
    type: String,
  },
  isMinted: {
    type: Boolean,
  },
  hotelname: {
    type: String,
  },
  sellofferid: {
    type: String,
  },
  sellofferhash: {
    type: String,
  },
  isbooked: {
    type: Boolean,
  },
  bookeraddr: {
    type: String,
  },
});

//Hotel.index({ name: "text", description: "text" });
// WildCard Indexing
//Hotel.index({ "$**" : 'text' });

module.exports = mongoose.model("Hotel", Hotel);
