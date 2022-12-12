import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  CardHeader,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useGlobalState } from "../state";
import { MdLocationCity } from "react-icons/md";
import { IoCloseCircle, IoPricetags } from "react-icons/io5";
import { BsCheckCircleFill } from "react-icons/bs";
import axios from "axios";
import xrplogo from "../Img/ripple.png";

function Rooms() {
  //const l_addr = localStorage.getItem("addr") || "";
  //const [addr, setAddr] = useState("");
  const [addr, setAddr] = useGlobalState("useraddr");
  const [rooms, setRooms] = useGlobalState("Rooms");
  const [selectedHotelTaxon, setselectedHotelTaxon] =
    useGlobalState("selectedHotelTaxon");
  //Dialog
  const [open, setOpen] = useState(false);
  const [ws, setWs] = useState(null);
  const [txStatus, setTxStatus] = useState("");

  //dialog
  const handleOpen = () => setOpen(!open);

  const [selectedSellOffer, setselectedSellOffer] = useState("");
  const [selecteNFT, setselecteNFT] = useState("");
  const [selectePrice, setselectePrice] = useState(0);

  const [authorisingResp, setAuthorisingResp] = useState({});

  useEffect(() => {
    setAddr(localStorage.getItem("addr") || "");
  }, []);

  useEffect(() => {
    localStorage.setItem("addr", addr);
  }, [addr]);

  useEffect(() => {
    let socket;
   
      "### called  ---------------------------->",
      Object.keys(authorisingResp).length
    );
    if (Object.keys(authorisingResp).length !== 0) {
      // Create a new WebSocket connection
      socket = new WebSocket(authorisingResp.websocket_status);

      // Set up event listeners to handle incoming messages
      socket.onmessage = async (event) => {
        // Handle incoming message
       
        const dataparsed = JSON.parse(event.data);
        if (dataparsed.signed !== undefined) {
          // has signed or rejected
         
          if (dataparsed.signed == true) {
            // make api call update
           
           
            const resp = await axios.post(
              "http://localhost:4000/hotel/acceptoffer",
              {
                xrpaddr: addr,
                nftokenid: selecteNFT,
                price: selectePrice,
              }
            );
           
           
            if (resp.status == 200) {
              const { result } = resp.data;
             

              handleOpen();
            }
          } else {
           
          }
          setTxStatus(dataparsed.signed);
          loadRooms();
          resetStates();
        }
      };

      socket.onclose = (event) => {
        // Handle WebSocket close
       
      };

      // Save the WebSocket connection in state
      setWs(socket);

      // Return a cleanup function to close the WebSocket connection
      // when the component is unmounted
    }
    return () => socket?.close();
  }, [authorisingResp]);

  const resetStates = () => {
    setselectedSellOffer("");
    setselecteNFT("");
    setselectePrice(0);
    setAuthorisingResp({});
    setTxStatus("");
  };

  const handleOnchange = (v) => {
    setAddr(v);
  };

  const submitRequest = async () => {
    const resp = await axios.get(
      "http://localhost:4000/hotel/makeAuthorizedNFTAcceptOffer",
      {
        params: { xrpaddr: addr, offerid: selectedSellOffer },
      }
    );
    if (resp.status == 200) {
      const { refs } = resp.data.auth;
     
      setAuthorisingResp(refs);
    }
  };
  const bookRoom = (_sellofferid, _nftid, _price) => {
   
    setselectedSellOffer(_sellofferid);
    setselecteNFT(_nftid);
    setselectePrice(_price);

    handleOpen();
  };

  const loadRooms = async () => {
    const resp = await axios.get("http://localhost:4000/hotel", {
      params: { taxonid: selectedHotelTaxon },
    });
    const { hotelsList } = resp.data;
    setRooms(hotelsList);
  };

  return (
    <div className="   p-4  h-[90vh]  overflow-y-auto">
      <div className="grid grid-cols-3 gap-x-1 gap-y-12 mt-12">
        {rooms.length > 0 &&
          rooms.map((el) => (
            <Card
              className={`w-72 grid-cols-1   ${
                el.isbooked ? "bg-gray-100" : ""
              } `}
            >
              <CardHeader
                className={`relative h-42   items-center ${
                  el.isbooked ? "bg-gray-300" : "bg-brand"
                } `}
              >
                <div
                  className={`text-bold text-green-100 text-9xl text-center `}
                >
                  {el.roomNum}
                </div>
                <div className="text-bold text-gray-400 text-2xl text-center ">
                  Room No.
                </div>
                <div className=" backdrop-blur-md  bg-white/10  absolute top-2 right-2   rounded-md px-1 py-2 text-green-100 font-bold  flex flex-cols gap-2 items-center">
                  <img width={"25px"} height={"25px"} src={xrplogo} />{" "}
                  <span>{el.price} XRP</span>
                </div>
              </CardHeader>
              <CardBody className="text-center">
                <Typography
                  variant="h5"
                  className="mb-2 first-letter:uppercase text-brand text-2xl"
                >
                  {el.hotelname} Apartment
                </Typography>
                <Typography>
                  The place is close to Barceloneta Beach and bus stop just 2
                  min by walk and near to "Naviglio"
                </Typography>
                <div className="flex flex-col">
                  <a
                    href={`https://test.bithomp.com/explorer/${el.sellofferhash}`}
                    target={"_blank"}
                    className="text-brand "
                  >
                    See Offer on Ledger
                  </a>
                  <a
                    href={`https://test.bithomp.com/explorer/${el.nftaddr}`}
                    target={"_blank"}
                    className="text-brand w-full"
                  >
                    See Token on Ledger
                  </a>
                </div>
              </CardBody>
              <CardFooter
                divider
                className="flex items-center justify-between py-3 px-2"
              >
                <Typography variant="small">
                  <button
                    onClick={() =>
                      bookRoom(el.sellofferid, el.nftokenid, el.price)
                    }
                    className={`${
                      el.isbooked
                        ? "hover:cursor-not-allowed opacity-75 bg-red-400"
                        : "bg-brand "
                    } rounded-md px-4 py-2 text-white text-xl hover:cursor-pointer hover:shadow-md hover:border-1 hover:border-green-200`}
                    disabled={el.isbooked ? true : false}
                  >
                    {el.isbooked ? "Booked" : " Book Now"}
                  </button>
                </Typography>
                <Typography className="flex gap-1 text-xl text-gray-600 text">
                  <MdLocationCity size={"25px"} />
                  {el.city}
                </Typography>
              </CardFooter>
            </Card>
          ))}
      </div>

      {/* Dialog */}
      <Dialog open={open} handler={handleOpen} size="md">
        <DialogHeader>Accept Sell Offer !</DialogHeader>
        <DialogBody divider className="flex flex-col">
          <div className="text-xs text-gray-500 text-center">
            Your XRP address
          </div>
          <div className="flex flex-row w-2/3 mx-auto items-center mt-1">
            <input
              className="px-4 py-2 w-2/3 mx-auto bg-gray-100"
              placeholder="Enter your rippple addr"
              onChange={(e) => handleOnchange(e.target.value)}
              value={addr}
            />
            <div
              className="text-brand text-center text-xl hover:cursor-pointer"
              onClick={submitRequest}
            >
              Submit
            </div>
          </div>
          <div className=" w-full text-red-600 bg-gray-50 rounded-md px-4 py-2 mt-4">
            {Object.keys(authorisingResp).length > 0 && (
              <>
                <img
                  src={authorisingResp.qr_png}
                  width={"500px"}
                  height={"500px"}
                  className="mx-auto"
                />
                <div className="mt-2 flex flex-row  justify-evenly bg-green-500  w-2/3 p-2">
                  <div className="block w-5 h-5 rounded-full bg-yellow-400 animate-pulse"></div>
                  <div className="text-green-100 font-bold">
                    Plese authorize the transaction using XUMM App
                  </div>
                </div>
                {txStatus === false ? (
                  <div className="w-full">
                    <div className="flex flex-row w-2/3 bg-red-200 mx-auto mt-4 items-center p-4 gap-x-4">
                      <IoCloseCircle
                        size={"35px"}
                        fill="#f94449"
                        className="ml-12"
                      />
                      <div className="text-red-600 font-bold">
                        Transaction failed or rejected
                      </div>
                    </div>{" "}
                  </div>
                ) : (
                  ""
                )}

                {txStatus === true ? (
                  <div className="w-full">
                    <div className="flex flex-row w-2/3 bg-red-200 mx-auto mt-4 items-center p-4 gap-x-4">
                      <BsCheckCircleFill
                        size={"35px"}
                        fill="teal"
                        className="ml-12"
                      />
                      <div className="text-red-600 font-bold">
                        Transaction failed or rejected
                      </div>
                    </div>{" "}
                  </div>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      {/* Dialog */}
    </div>
  );
}

export default Rooms;

// {
//     "_id": "639585433a9799e6205469f6",
//     "ownerxrpaddr": "rJc394zYj1wRwYL8qAwuovCEoPJrYMoPnD",
//     "hoteltaxon": 122148,
//     "city": "Tirupati",
//     "price": 25,
//     "isrentable": true,
//     "availableforrent": true,
//     "roomNum": 1,
//     "image": "",
//     "nftaddr": "49A8438A29A33EF86FE0B9C248DF497CAF26ACAF909BE98562CA1B29159AEEE7",
//     "nftokenid": "00010000C11EA93002F19C865718882CF7203CFEF563A3B9DCBBF49F00000020",
//     "type": "0",
//     "isMinted": true,
//     "hotelname": "viceroy",
//     "__v": 0
// }
