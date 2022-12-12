import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Rooms from "./Rooms";
import { useGlobalState } from "../state";
import axios from "axios";

import { BsCheckCircleFill } from "react-icons/bs";

import { IoCloseCircle } from "react-icons/io5";

function Middle() {
  const [defaultTab] = useGlobalState("defaultTab");
  const [admin, setAdmin] = useGlobalState("admin");
  const [currentMinter, setcurrentMinter] = useGlobalState("currentMinter");

  //const [authorising, setAuthorising] = useState(false);
  const [authorisingResp, setAuthorisingResp] = useState({});

  const [ws, setWs] = useState(null);
  const [txStatus, setTxStatus] = useState("");

  const setAuthorizedMinter = async () => {
    const resp = await axios.get("http://localhost:4000/hotel/makeAuthorized", {
      params: { xrpaddr: admin.xrpaddr },
    });
    if (resp.status == 200) {
      const { refs } = resp.data.auth;
      console.log(refs);
      setAuthorisingResp(refs);
    }
  };

  useEffect(() => {
    let socket;
    console.log("### called  ----------------------------");
    if (Object.keys(authorisingResp).length !== 0) {
      console.log("Empty");

      // Create a new WebSocket connection
      socket = new WebSocket(authorisingResp.websocket_status);

      // Set up event listeners to handle incoming messages
      socket.onmessage = async (event) => {
        // Handle incoming message
        console.log(event);
        console.log("@@ on mEssage", event.data);
        const dataparsed = JSON.parse(event.data);
        console.log(dataparsed);
        console.log("### ", dataparsed.signed);
        if (dataparsed.signed !== undefined) {
          // has signed or rejected
          console.log("----------$$------>", dataparsed.signed);
          if (dataparsed.signed == true) {
            // make api call update
            const resp = await axios.post(
              "http://localhost:4000/hadmin/update",
              {
                xrpaddr: admin.xrpaddr,
                hasNftMinter: true,
              }
            );
            const { user } = resp.data;
            setAdmin({ ...user });
          }
          setTxStatus(dataparsed.signed);
        }
        //setMsg(JSON.parse(event.data));
      };

      socket.onclose = (event) => {
        // Handle WebSocket close
        console.log(event);
      };

      // Save the WebSocket connection in state
      setWs(socket);

      // Return a cleanup function to close the WebSocket connection
      // when the component is unmounted
    }
    return () => socket?.close();
  }, [authorisingResp]);

  return (
    <div className="p-4 bg-bgcolorSec">
      {defaultTab == 0 ? (
        <Dashboard />
      ) : admin.hasNftMinter ? (
        <Rooms />
      ) : (
        <>
          <div>
            <div className=" w-full text-red-600 bg-red-200 rounded-md px-4 py-2">
              Need to set the ({currentMinter}) as Authorized Minter
            </div>
            <div
              className="w-full text-3xl font-bold text-brand text-center mt-2 cursor-pointer hover:underline"
              onClick={setAuthorizedMinter}
            >
              Set Minter
            </div>
          </div>

          {Object.keys(authorisingResp).length > 0 && (
            <div className="w-full bg-gray-200 flex flex-col justify-between items-center p-4">
              <div>
                <img
                  src={authorisingResp.qr_png}
                  width={"500px"}
                  height={"500px"}
                />
              </div>
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
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Middle;
