import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGlobalState } from "../state";
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
import xrplogo from "../Img/ripple.png";
import { MdLocationCity } from "react-icons/md";

function Bookings() {
  const [addr, setAddr] = useGlobalState("useraddr");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const resp = await axios.get(
      "http://localhost:4000/hotel/getUserBookings",
      {
        params: { xrpaddr: addr },
      }
    );
    console.log(resp);
    setBookings(resp.data.bookings);
  };

  return (
    <div className="mt-20">
      {bookings.length > 0 &&
        bookings.map((el) => {
          return (
            <Card className={`w-72 grid-cols-1    `}>
              <CardHeader
                className={`relative h-42   items-center $ bg-brand
                 `}
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
                <Typography className="font-semibold text-brand text-xl">
                  Booked by you
                </Typography>
                <Typography className="flex gap-1 text-xl text-gray-600 text">
                  <MdLocationCity size={"25px"} />
                  {el.city}
                </Typography>
              </CardFooter>
            </Card>
          );
        })}
    </div>
  );
}

export default Bookings;
