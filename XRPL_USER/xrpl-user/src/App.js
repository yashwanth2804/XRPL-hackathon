import {
  Tabs,
  TabsBody,
  TabsHeader,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useEffect } from "react";
import Nav from "./Components/Nav";
import Bookings from "./Section/Bookings";
import Rooms from "./Section/Rooms";
import Search from "./Section/Search";
import { useGlobalState } from "./state";

function App() {
  const [selectedTab, setSelectedTab] = useGlobalState("selectedTab");
  return (
    <div className="bg-bgcolor h-full w-screen">
      <div className="container mx-auto">
        <Nav />
        {selectedTab == 0 ? (
          <div className=" grid grid-cols-5 gap-x-4   ">
            <div className="grid col-span-1 bg-bgcolorSec  h-[90vh]">
              <Search />
            </div>
            <div className="grid col-span-4 bg-bgcolorSec  h-[90vh]">
              <Rooms />
            </div>
          </div>
        ) : (
          <Bookings />
        )}
      </div>
    </div>
  );
}

export default App;
