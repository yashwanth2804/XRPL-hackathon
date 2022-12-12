require("../models/db");
const bcrypt = require("bcrypt");
const Hotel = require("../models/Hotel");
const bulkMint = require("./XRPL/bulkmint");
const mongoose = require("mongoose");

exports.getCurrentMinter = async (req, res) => {
  console.log("@@ get current miter");
  res.status(200).json({ minter: process.env.xrpaddr });
};
/**
 * GET /
 * Homepage
 */
exports.getHotels = async (req, res) => {
  try {
    let hoteltaxon = req.query.taxonid;
    console.log("@@ hoteltacon", hoteltaxon);

    const hotelsList = await Hotel.find({ hoteltaxon });
    console.log("@@ hotelsList", hotelsList);
    // await bulkMint.bulkmint();
    res.status(200).json({ hotelsList });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error Occured" });
  }
};

//getUserBookings
exports.getUserBookings = async (req, res) => {
  console.log(req);
  try {
    let xrpaddr = req.query.xrpaddr;
    console.log("@@ XRP addr", xrpaddr);
    const bookings = await Hotel.find({ bookeraddr: xrpaddr });
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error Occured" });
  }
};

exports.makeAuthorizedMinter = async (req, res) => {
  console.log(req);
  try {
    let xrpaddr = req.query.xrpaddr;
    console.log("@@ XRP addr", xrpaddr);
    const payload = await bulkMint.authorizeMinter(xrpaddr);
    res.status(200).json({ auth: payload });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error Occured" });
  }
};

//acceptNFTOffer
exports.acceptNFTOffer = async (req, res) => {
  try {
    let xrpaddr = req.body.xrpaddr;
    let nftokenid = req.body.nftokenid;
    let price = req.body.price;

    console.log(
      "@@ XRP addr for NFT offer and NFT id",
      xrpaddr,
      nftokenid,
      price
    );
    // const resp = await Hotel.findOneAndUpdate(
    //   { nftokenid },
    //   { isbooked: true, bookeraddr: xrpaddr }
    // );
    const result = await Hotel.findOneAndUpdate(
      { nftokenid },
      {
        $set: {
          bookeraddr: xrpaddr,
          isbooked: true,
        },
      },
      {
        new: true, // Return the updated document
      }
    );
    if (result) {
      //send XRP 80% to Owner adderess
      //ownerxrpaddr
      const r = await bulkMint.sendXRP(
        parseInt(price) * 0.8,
        result.ownerxrpaddr
      );
      console.log("RR ===>", r);
    }
    console.log("@@ resp --->", result);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error Occured" });
  }
};

/**
 *
 * @param {xrpaddr,offerid} req
 * @param {*} res
 */
exports.makeAuthorizedNFTAcceptOffer = async (req, res) => {
  console.log(req);
  try {
    let xrpaddr = req.query.xrpaddr;
    let offerid = req.query.offerid;
    console.log("@@ XRP addr for NFT offer", xrpaddr);
    const payload = await bulkMint.authorizeNFTAcceptOffer(xrpaddr, offerid);
    res.status(200).json({ auth: payload });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error Occured" });
  }
};

exports.saveHotels = async (req, res) => {
  const { hotelList } = req.body;
  const hoteslListObj = hotelList.map((el) => ({
    ...el,
    _id: new mongoose.Types.ObjectId(),
    isMinted: false,
    nftaddr: "",
    availableforrent: true,
    isbooked: false,
    bookeraddr: "",
  }));

  const NftsIDs = await bulkMint.bulkmint(hoteslListObj);
  if (NftsIDs.length === 0) {
    res.status(501).json({ mintedNFTHotelListObj: [] });
  }
  const mintedNFTHotelListObj = hoteslListObj.map((el, i) => ({
    ...el,
    nftaddr: NftsIDs[i].LedgerHash,
    nftokenid: NftsIDs[i].NFTID,
    isMinted: true,
    sellofferid: NftsIDs[i].sellOfferId,
    sellofferhash: NftsIDs[i].sellOfferHash,
  }));

  try {
    await Hotel.insertMany(mintedNFTHotelListObj);

    // res.status(200).json({ ress });
    res.status(200).json({ mintedNFTHotelListObj });
  } catch (error) {
    console.log("Insertmany ", error);
    res.status(500).json({ message: error.message || "Error Occured" });
  }
};
