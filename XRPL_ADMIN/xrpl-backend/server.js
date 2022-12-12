const app = require("express")();
const cors = require("cors");

require("dotenv").config();
app.use(cors());
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
const userRoutes = require("./routes/userRoutes.js");
app.use("/hadmin", userRoutes);

const hotelRoutes = require("./routes/hotelroute.js");
app.use("/hotel", hotelRoutes);

const server = app.listen(4000, () =>
  console.info(`Example app listening on port 4000!`)
);
