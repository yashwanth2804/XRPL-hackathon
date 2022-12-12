import { createGlobalState } from "react-hooks-global-state";
const initialState = {
  count: 0,
  text: "hello",
  defaultTab: 0,
  showRoomEdit: false,
  currentMinter: "",
  roomsList: [
    // {
    //   roomNum: "2",
    //   type: 1,
    //   price: "44",
    //   isrentable: true,
    //   minted: false,
    // },
  ],
  addRoom: {
    type: 0,
    roomNum: "",
    isrentable: false,
    price: null,
  },
  admin: {
    hotelname: "",
    xrpaddr: "",
    pin: "",
    hoteltaxon: 0,
    city: "",
    hasNftMinter: false,
    hotelimage: "",
  },
};
export const { setGlobalState, useGlobalState } =
  createGlobalState(initialState);

/*
 {"_id":{"$oid":"639418f791cf6347b3e18079"},
 "hotelname":"viceroy",
 "xrpaddr":"rss2snJN8u2Gtnu2jYWm9sqp9UeK975uSj",
 "pin":"$2b$10$eC19MRBEjNByF.0D/iLSneCcoeDlseud0iXWq0JPLhGkowrkVgM0C",
 "hoteltaxon":{"$numberInt":"164866"},
 "city":"tirupati",
 "hasNftMinter":false,"__v":{"$numberInt":"0"}}

  */
