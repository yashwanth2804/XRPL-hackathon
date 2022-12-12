import { createGlobalState } from "react-hooks-global-state";
const initialState = {
  Rooms: 0,
  selectedHotelTaxon: 0,
  selectedTab: 0, //home,mybookings
  useraddr: "",
  text: "hello",
  defaultTab: 0,
  showRoomEdit: false,
  roomsList: [],
  addRoom: {
    type: 0,
    roomNum: "",
    isrentable: false,
    price: 0,
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
