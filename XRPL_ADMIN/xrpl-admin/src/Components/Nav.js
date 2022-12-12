import React from "react";
import { useGlobalState } from "../state";

function Nav() {
  const [admin, setAdmin] = useGlobalState("admin");

  return (
    <div className="bg-brand h-[60px] flex justify-between mx-4 py-2 px-2 content-center">
      <img
        width={"50px"}
        height={"50px"}
        src="https://cdn.dribbble.com/userupload/3158902/file/original-7c71bfa677e61dea61bc2acd59158d32.jpg?resize=400x0"
      />

      <div className="flex flex-row justify-between items-center">
        <div className="mx-5 text-white">{admin.xrpaddr}</div>
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
