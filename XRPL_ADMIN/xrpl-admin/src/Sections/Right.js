import { Checkbox } from "@material-tailwind/react";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { useGlobalState } from "../state";

function Right() {
  const [roomsList, setroomsList] = useGlobalState("roomsList");
  const [addRoom, setAddRoom] = useGlobalState("addRoom");

  // const [type, setType] = useState(0);
  // const [roomNum, setRoomNum] = useState("");
  //const [showRoomEdit, setShowroomEdit] = useState(false);
  const [showRoomEdit, setShowroomEdit] = useGlobalState("showRoomEdit");
  const [admin, setAdmin] = useGlobalState("admin");

  // const [isrentable, setIsrentable] = useState(false);
  // const [price, setPrice] = useState(0);
  const mintRooms = async () => {
    // ownerxrpaddr: issuerxrpaddr;
    // hoteltaxon: city: price: isrentable: availableforrent: roomnumber: image: nftaddr: type: isMinted: hotelname;

    //check if room exist

    // const roomObj = {
    //   ownerxrpaddr: admin.xrpaddr,
    //   hoteltaxon: admin.hoteltaxon,
    //   city: admin.city,
    //   price: addRoom.price,
    //   isrentable: addRoom.isrentable,

    //   roomnumber: addRoom.roomNum,
    //   image: "",
    //   type: addRoom.type,
    //   hotelname: admin.hotelname,
    // };
    const matched = roomsList.find((r) => {
      return r.roomNum == addRoom.roomNum;
    });

    if (matched) {
      const updateRooms = roomsList.map((r) =>
        r.roomNum === addRoom.roomNum ? { ...addRoom } : r
      );
      setroomsList(updateRooms);
    } else {
      setroomsList([...roomsList, { ...addRoom }]);
    }
    //setroomsList([...roomsList, { ...addRoom }]);

    //Make backend API
    // await addRoomtoList(roomObj);
    resetState();
  };
  // const addRoomtoList = (obj) => {
  //
  // };
  const resetState = () => {
    // setType(0);
    // setRoomNum("");
    // setIsrentable(false);
    // setPrice(0);
    setAddRoom({
      type: 0,
      roomNum: "",
      isrentable: false,
      price: 0,
    });
  };
  return (
    <div>
      <div className="grid grid-cols-3 items-center gap-6">
        <button
          className="col-span-2 bg-brand px-4   rounded-md w-full h-12 text-white font-bold"
          onClick={() => setShowroomEdit(true)}
        >
          Add room
        </button>{" "}
        {showRoomEdit ? (
          <div>
            <MdClose
              className="hover:cursor-pointer hover:text-gray-600 text-5xl"
              onClick={() => setShowroomEdit(false)}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      {/* Add Room functions */}

      {showRoomEdit ? (
        <div className="grid bg-bgcolorSec mt-12 gap-y-4">
          <img
            class="block object-cover object-center w-full h-[200px] rounded-lg "
            src="https://pravase.co.in/admin_pravase/uploads/roomimage/2-Bed-AC-Room-Hotel-Madhav-Guest-House-Virpur-Jalaramdham-Gujarat-India_1626504144.JPG"
          />
          <input
            type={"number"}
            className="bg-gray-200 rounded-md px-4 py-2"
            placeholder="Room No"
            value={addRoom.roomNum}
            onChange={(e) =>
              setAddRoom({ ...addRoom, roomNum: e.target.value })
            }
          />
          <input
            type={"number"}
            className="bg-gray-200 rounded-md px-4 py-2"
            placeholder="Price/day in XRP"
            value={addRoom.price}
            onChange={(e) => setAddRoom({ ...addRoom, price: e.target.value })}
          />
          <div className="flex flex-row gap-2 ">
            <div
              className={addRoom.type == 0 ? "chip" : "chip-dis"}
              onClick={() => setAddRoom({ ...addRoom, type: 0 })}
            >
              Single
            </div>
            <div
              className={addRoom.type == 1 ? "chip" : "chip-dis"}
              onClick={() => setAddRoom({ ...addRoom, type: 1 })}
            >
              Double
            </div>
          </div>

          <Checkbox
            color="blue"
            checked={addRoom.isrentable}
            label="Rentable"
            onChange={() =>
              setAddRoom({ ...addRoom, isrentable: !addRoom.isrentable })
            }
          />

          <button
            className="bg-brand px-4 mt-3  rounded-md w-full h-12 text-white font-bold"
            onClick={() => mintRooms()}
          >
            Update/Add Room
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Right;
