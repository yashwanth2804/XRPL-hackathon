import React, { useEffect, useState, Fragment } from "react";
import {
  Checkbox,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { useGlobalState } from "../../state";
import _ from "lodash";

import { BsCheckCircleFill } from "react-icons/bs";

import { IoCloseCircle } from "react-icons/io5";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import Pop from "./Pop";
function Rooms() {
  const [roomsList, setroomsList] = useGlobalState("roomsList");
  const [roomEdit, setroomEdit] = useGlobalState("showRoomEdit");
  const [addRoom, setAddRoom] = useGlobalState("addRoom");
  const [admin, setAdmin] = useGlobalState("admin");

  const [roomsListWithId, setRoomseLitWithId] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isMinting, setisMinting] = useState(false);
  const [hasError, sethasError] = useState(false);

  //Dialog
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const rooms = roomsList.map((e, i) => ({
      ...e,
      id: i,
      selected: false,
    }));
    setRoomseLitWithId(rooms);

    return () => {};
  }, [roomsList]);

  useEffect(() => {
    loadHotelsList();
  }, []);

  const loadHotelsList = async () => {
    //hoteltaxon
    const resp = await axios.get("http://localhost:4000/hotel", {
      params: { taxonid: admin.hoteltaxon },
    });
    //console.log("@@ load hotels ,====>", { taxonid: admin.hoteltaxon });
    if (resp.status == 200) {
      setroomsList(resp.data.hotelsList);
    }
  };

  const updateCheckedRooms = (index) => {
    const updateListRooms = roomsListWithId.map((r) =>
      r.id === index ? { ...r, selected: !r.selected } : r
    );
    setRoomseLitWithId(updateListRooms);
  };

  const selectAllRooms = () => {
    setSelectAll(!selectAll);
    const updateListRooms = roomsListWithId.map((r) => ({
      ...r,
      selected: !selectAll,
    }));
    setRoomseLitWithId(updateListRooms);
  };

  const editRoom = (i) => {
    setroomEdit(true);
    const updateListRooms = roomsListWithId.find((r) => r.id == i);

    setAddRoom({
      type: updateListRooms.type,
      roomNum: updateListRooms.roomNum,
      isrentable: updateListRooms.isrentable,
      price: updateListRooms.price,
    });
  };
  const selectedRooms = () =>
    _.filter(roomsListWithId, function (o) {
      return o.selected;
    }).length;

  //dialog
  const handleOpen = () => setOpen(!open);

  const bulkMintRooms = async () => {
    setisMinting(true);
    if (!admin.hasNftMinter) {
      handleOpen();
      //return;
    }

    const roomsObj = roomsListWithId.map((el) => ({
      ...el,
      ownerxrpaddr: admin.xrpaddr,
      hoteltaxon: admin.hoteltaxon,
      city: admin.city,
      hotelname: admin.hotelname,
      image: "",
    }));

    const resp = await axios.post("http://localhost:4000/hotel/list", {
      hotelList: roomsObj,
    });
    if (resp.status == 200) {
      //gelates Hotles list and set
      await loadHotelsList();
      setisMinting(false);
    } else {
      sethasError(true);
    }
  };
  return (
    <div className="flex flex-col relative h-[80vh]  p-2">
      {hasError && (
        <div className="block w-full bg-red-200 text-red-600  h-10 rounded-md text-center p-2">
          Unable to mint try later!
        </div>
      )}

      {/* Table start */}
      {isMinting ? (
        <div>
          <div className="block w-full bg-brand animate-pulse h-2"></div>
          <div className="text-green-700">Minting ...</div>
        </div>
      ) : (
        ""
      )}
      <div
        className={`overflow-x-auto sm:-mx-6 lg:-mx-8   ${
          isMinting ? "bg-gray-700 opacity-25 hover:cursor-not-allowed" : ""
        }  `}
      >
        <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center">
              <thead className="border-b bg-brand rounded-md">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-white px-2 py-2"
                  >
                    {" "}
                    <Checkbox
                      color="blue"
                      checked={selectAll}
                      onChange={() => selectAllRooms()}
                    />
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-white px-4 py-4"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-white px-6 py-4"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-white px-6 py-4"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-white px-6 py-4"
                  >
                    Minted
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-white px-6 py-4"
                  >
                    Rentable
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-white px-6 py-4"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {roomsListWithId.map((td, i) => {
                  return (
                    <tr className="bg-white border-b cursor-pointer">
                      <td className="px-2 whitespace-nowrap text-sm  font-medium text-gray-900">
                        <Checkbox
                          color="teal"
                          checked={td.selected}
                          onChange={() => updateCheckedRooms(i)}
                        />
                      </td>
                      <td className=" whitespace-nowrap text-sm font-medium text-gray-900">
                        {td.roomNum}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {td.type == 0 ? (
                          <div className={"chip"}>Single</div>
                        ) : (
                          <div className={"chip"}>Double</div>
                        )}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {td.price + " XPR"}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {td.isrentable ? (
                          <div className="flex justify-center flex-col">
                            <BsCheckCircleFill
                              size={"20px"}
                              fill="#497174"
                              className="ml-8"
                            />
                            <a
                              className="text-green-700 bg-red-100  w-full mt-2  "
                              target={"_blank"}
                              href={`https://test.bithomp.com/explorer/${td.nftokenid}`}
                            >
                              NFTID
                            </a>
                          </div>
                        ) : (
                          <IoCloseCircle
                            size={"35px"}
                            fill="#f94449"
                            className="ml-12"
                          />
                        )}
                      </td>

                      <td class="text-sm text-gray-900 font-light  whitespace-nowrap justify-center">
                        {td.isrentable ? (
                          <BsCheckCircleFill
                            size={"25px"}
                            fill="#497174"
                            className="ml-12"
                          />
                        ) : (
                          <IoCloseCircle
                            size={"35px"}
                            fill="#f94449"
                            className="ml-12"
                          />
                        )}
                      </td>
                      <td
                        class="text-sm text-blue-900 font-bold hover:cursor-pointer px-6 py-4 whitespace-nowrap"
                        onClick={() => editRoom(i)}
                      >
                        Edit
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Table end */}
      <button
        className={`btn-primary w-48 mx-[35%] absolute bottom-2 ${
          selectedRooms() > 0 ? "" : "disabled opacity-75 cursor-not-allowed"
        }`}
        disabled={selectedRooms() > 0 ? false : true}
        //onClick={handleOpen}
        onClick={bulkMintRooms}
      >
        Bulk Mint Rooms ({selectedRooms()})
      </button>
      {/* Dialog */}
      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogHeader>Need to send some Ripple !</DialogHeader>
        <DialogBody divider className="flex flex-col">
          <div className=" w-full text-red-600 bg-red-200 rounded-md px-4 py-2">
            XRP needed to reserve for tickets for bulk minting. Currently 2 XRP
            for Transactions
          </div>
          <div className="w-full text-5xl font-bold text-brand text-center mt-2">
            {parseInt(selectedRooms()) * 2} XRP
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
