import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { GrMapLocation } from "react-icons/gr";
import { useGlobalState } from "../state";
function Left() {
  const [defaultTab, setDefaultTab] = useGlobalState("defaultTab");
  const [admin, setAdmin] = useGlobalState("admin");

  return (
    <div className="flex flex-col h-[90vh] justify-between p-2">
      <div className="relative col-span-1  ">
        <img
          class="block object-cover object-center w-full h-[200px] rounded-lg "
          src={admin.hotelimage}
        />
        <div className="absolute bg-gray-900   text-white rounded-md mt-[-50px] p-2 opacity-75 shadow-sm   w-full">
          <span className="text-xl">{admin.hotelname}</span>
        </div>
        <div className="mt-2 mx-auto flex flex-row gap-4 ">
          <div>
            <GrMapLocation className="text-3xl" />
          </div>
          <div className="flex flex-col text-gray-600">
            <span>{admin.city} </span>
          </div>
        </div>
      </div>

      {/* Actions Section */}

      <div>
        <div className="flex flex-col gap-2">
          <button
            className={` px-4 mt-3  rounded-md w-full h-12  font-bold ${
              defaultTab == 0 ? "bg-brand text-white" : ""
            }`}
            onClick={() => setDefaultTab(0)}
          >
            Dashboard
          </button>
          <button
            className={` px-4 mt-3  rounded-md w-full h-12  font-bold ${
              defaultTab == 1 ? "bg-brand text-white" : ""
            }`}
            onClick={() => setDefaultTab(1)}
          >
            Rooms
          </button>
        </div>
      </div>

      {/* Actions Section */}

      <div className="mb-48">
        <div className="flex flex-col gap-2">
          <button className=" p-4 rounded-sm w-full h-12  font-bold">
            Settings
          </button>
          <div className="flex flex-row items-center mx-auto text-red-500 ">
            <AiOutlineLogout />
            <button className="  rounded-sm   font-bold ml-2">LogOut</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Left;
