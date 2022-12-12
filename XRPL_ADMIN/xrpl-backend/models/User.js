const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: {
    type: String,
  },
  hotelname: {
    type: String,
  },
  xrpaddr: {
    type: String,
  },
  pin: {
    type: String,
  },
  hoteltaxon: {
    type: Number,
  },
  city: {
    type: String,
  },
  hasNftMinter: {
    type: Boolean,
  },
  hotelimage: {
    type: String,
  },
});

//User.index({ name: "text", description: "text" });
// WildCard Indexing
//User.index({ "$**" : 'text' });

module.exports = mongoose.model("User", User);
