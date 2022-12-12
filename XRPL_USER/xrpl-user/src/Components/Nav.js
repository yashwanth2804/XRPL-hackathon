import React from "react";
import { useGlobalState } from "../state";

function Nav() {
  const [selectedTab, setselectedTab] = useGlobalState("selectedTab");
  const [addr, setAddr] = useGlobalState("useraddr");

  return (
    <div className="bg-brand h-[60px] flex justify-between mx-4 py-2 px-2 content-center">
      <img
        width={"50px"}
        height={"50px"}
        src="https://cdn.dribbble.com/userupload/3158902/file/original-7c71bfa677e61dea61bc2acd59158d32.jpg?resize=400x0"
      />

      <div className="flex flex-row justify-between items-center">
        <div
          className="mx-5 text-white cursor-pointer hover:text-green-100"
          onClick={() => setselectedTab(0)}
        >
          Home
        </div>
        {addr !== "" && (
          <div
            className="mx-5 text-white cursor-pointer hover:text-green-100"
            onClick={() => setselectedTab(1)}
          >
            My Bookings
          </div>
        )}

        <img
          width={"50px"}
          height={"50px"}
          src="https://cdn.dribbble.com/userupload/3158902/file/original-7c71bfa677e61dea61bc2acd59158d32.jpg?resize=400x0"
        />
      </div>
    </div>
  );
}

export default Nav;
