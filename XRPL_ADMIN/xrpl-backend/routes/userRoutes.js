const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

/**
 * App Routes
 */

//router.post("/save", userController.saveuser);
router.post("/login", userController.login);
router.post("/update", userController.updateUser);
router.get("/city", userController.getHotelDetailsByLoc);
module.exports = router;
