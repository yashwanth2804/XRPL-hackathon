import React from "react";
import SplineChart from "../../Components/Dashboard/SplineChat";
import TodayEarnings from "../../Components/Dashboard/TodayEarnings";
import TotalBookings from "../../Components/Dashboard/TotalBookings";
import TotalRipple from "../../Components/Dashboard/TotalRipple";
import TotalRoomsMinted from "../../Components/Dashboard/TotalRoomsMinted";

function index() {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-1">
          <TotalRipple />
        </div>
        <div className="col-span-1">
          <TotalBookings />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-2">
        <div className="col-span-2">
          <TodayEarnings />
        </div>
        <div className="col-span-1">
          <TotalRoomsMinted />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 mt-2">
        <div className="col-span-1">
          <SplineChart />
        </div>
      </div>
    </>
  );
}

export default index;
