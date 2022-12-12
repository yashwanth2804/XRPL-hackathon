import logo from "./logo.svg";
import "./App.css";
import Nav from "./Components/Nav";
import Right from "./Sections/Right";
import Left from "./Sections/Left";
import Middle from "./Sections/Middle";
import { createGlobalState } from "react-hooks-global-state";
import { useGlobalState } from "./state";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const l_addr = localStorage.getItem("addr") || "";
  const l_pin = localStorage.getItem("pin") || "";
  const l_isLoggedIn = localStorage.getItem("loggedin") || false;

  const [addr, setAddr] = useState(l_addr);
  const [pin, setPin] = useState(l_pin);

  const [hotelname, sethotelname] = useState("");
  const [city, setcity] = useState("");
  const [hotelimage, sethotelimage] = useState("");

  const [logged, setLogged] = useState(l_isLoggedIn);

  const [admin, setAdmin] = useGlobalState("admin");
  const [addRoom, setAddRoom] = useGlobalState("addRoom");
  const [roomsList, setroomsList] = useGlobalState("roomsList");
  const [currentMinter, setcurrentMinter] = useGlobalState("currentMinter");

  useEffect(() => {
    localStorage.setItem("addr", addr);
    localStorage.setItem("pin", pin);
    localStorage.setItem("loggedin", true);
  }, [addr, pin, logged]);

  useEffect(() => {
    console.log("useeffect Appjs");
    if (logged) {
      login();
      getCurrentMinter();
    }
  }, []);

  const login = async () => {
    console.log("@@ ", pin, addr);
    const resp = await axios.post("http://localhost:4000/hadmin/login", {
      pin,
      xrpaddr: addr,
      hotelname,
      hotelimage,
      city,
    });

    console.log(resp);
    if (resp.status == 200) {
      setLogged(true);
      const { user } = resp.data;
      setAdmin({ ...user });
    }
  };
  const getCurrentMinter = async () => {
    console.log("@@ loading cuurent minter");
    const resp = await axios.get("http://localhost:4000/hotel/currentMinter");
    setcurrentMinter(resp.data.minter);
    console.log("@@ current minter", resp.data.minter);
  };
  return (
    <div className="bg-bgcolor h-screen w-screen">
      <div className="container mx-auto">
        <Nav />
        {logged ? (
          <div className="mt-6 grid grid-cols-5 gap-2 ">
            <div class="col-span-1">
              <Left />
            </div>
            <div class="col-span-3">
              <Middle />
            </div>
            <div class="col-span-1">
              <Right />
            </div>
          </div>
        ) : (
          <div className="w-96 mx-auto mt-20 bg-bgcolorSec rounded-md h-48 flex flex-col gap-y-4">
            <input
              type={"text"}
              placeholder="xrp addr"
              className="px-4 py-2 rounded-sm"
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
            />
            <input
              type={"text"}
              value={pin}
              placeholder="pin"
              className="px-4 py-2 rounded-sm"
              onChange={(e) => setPin(e.target.value)}
            />
            <input
              type={"text"}
              placeholder="Hotel Name"
              className="px-4 py-2 rounded-sm"
              value={hotelname}
              onChange={(e) => sethotelname(e.target.value)}
            />
            <input
              type={"text"}
              placeholder="Hotel Image"
              className="px-4 py-2 rounded-sm"
              value={hotelimage}
              onChange={(e) => sethotelimage(e.target.value)}
            />
            <input
              type={"text"}
              placeholder="City"
              className="px-4 py-2 rounded-sm"
              value={city}
              onChange={(e) => setcity(e.target.value)}
            />

            <button className="btn-primary py-2" onClick={() => login()}>
              Login/Signup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
