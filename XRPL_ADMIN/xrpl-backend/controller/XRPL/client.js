//import xrpl from "xrpl";
const xrpl = require("xrpl");
// devnet --> wss://s.devnet.rippletest.net:51233
// test net --> "wss://s.altnet.rippletest.net:51233"

exports.client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
//export.xr { xrpl };
