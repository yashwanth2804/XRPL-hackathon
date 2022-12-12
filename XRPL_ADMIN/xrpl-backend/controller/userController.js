require("../models/db");
const bcrypt = require("bcrypt");
const User = require("../models/User");

//Login
exports.login = async (req, res) => {
  // Get user input from the request body
  const { xrpaddr, pin } = req.body;

  try {
    const user = await User.find({ xrpaddr: xrpaddr });

    if (user.length === 0) {
      // sign up the user
      const re = saveuser(req.body);
      if (re) {
        res.status(200).json({ user: re });
      } else {
        res.status(500).json({ message: error.message || "Error Occured" });
      }
    } else {
      const userAr = await User.find({ xrpaddr: xrpaddr });
      const user = userAr[0];

      try {
        const passwordIsCorrect = bcrypt.compareSync(pin, user.pin);
        if (passwordIsCorrect) {
          res.status(200).json({ user });
        } else {
          res.status(401).json({ message: "Userfailed" });
        }
      } catch (error) {}
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Error Occured" });
  }
};

const saveuser = async (_data) => {
  const { pin, xrpaddr, hotelname, city, hotelimage } = _data;

  // Generate a salt for the user
  const salt = bcrypt.genSaltSync(10);

  // Hash the user's password using the salt
  const passwordHash = bcrypt.hashSync(pin, salt);

  try {
    const usr = new User({
      city,
      hotelname,
      hoteltaxon: Math.floor(100000 + Math.random() * 900000),
      pin: passwordHash,
      xrpaddr,
      hasNftMinter: false,
      hotelimage,
    });

    const g = await usr.save();
    return g;
  } catch (error) {
    return;
  }
};

exports.getHotelDetailsByLoc = async (req, res) => {
  try {
    let city = req.query.city;
    let cityresp = await User.find({ city });
    res.status(200).json({ hotels: cityresp });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error Occured" });
  }
};

exports.updateUser = async (req, res) => {
  const { xrpaddr, ...restObj } = req.body;

  try {
    const resp = await User.findOneAndUpdate(xrpaddr, restObj);
    res.status(200).json({ user: resp });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error Occured" });
  }
};
