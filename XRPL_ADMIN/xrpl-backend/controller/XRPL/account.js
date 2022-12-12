//import xrpl from "xrpl";
const xrpl = require("xrpl");
//rss2snJN8u2Gtnu2jYWm9sqp9UeK975uSj
const minter = xrpl.Wallet.fromSeed(process.env.seed);

exports.minter = minter;
