import React, { useEffect, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import axios from "axios";
import { useGlobalState } from "../state";

function Search() {
  //Globals
  const [rooms, setRooms] = useGlobalState("Rooms");
  const [selectedHotelTaxon, setselectedHotelTaxon] =
    useGlobalState("selectedHotelTaxon");

  const [hotels, setHotels] = useState([]);
  //const [hotelList, setHotelList] = useState([]);

  useEffect(() => {
    loadSerch();
  }, []);

  const loadSerch = async () => {
    const resp = await axios.get("http://localhost:4000/hadmin/city", {
      params: { city: "Tirupati" },
    });
    setHotels(resp.data.hotels);
  };

  const handleCardClick = async (taxon) => {
    const resp = await axios.get("http://localhost:4000/hotel", {
      params: { taxonid: taxon },
    });

    const { hotelsList } = resp.data;
    const y = Array(10).fill(hotelsList[0]);

    setRooms(hotelsList);
    setselectedHotelTaxon(taxon);
  };

  return (
    <div className="mt-12 w-full px-1">
      <Select color="teal" label="City" success>
        <Option>Tirupati</Option>
        <Option>SriKalahasti</Option>
        <Option>Bengaluru</Option>
      </Select>

      {/** results window */}
      <div className="w-full mt-4">
        {hotels.length > 0 &&
          hotels.map((el) => (
            <div
              className="bg-bgcolor p-1  border border-greeb-600 hover:cursor-pointer hover:border-2"
              onClick={() => handleCardClick(el.hoteltaxon)}
            >
              <div class="flex justify-center h-24 ">
                <div class="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-sm">
                  <img
                    class="     object-cover md:w-24 rounded-t-lg md:rounded-none md:rounded-l-lg"
                    src={el.hotelimage}
                    alt=""
                  />
                  <div class="p-2 flex flex-col justify-start w-36 text-brand">
                    <div className="font-bold first-letter:uppercase text-2xl">
                      {el.hotelname}
                    </div>
                    <div>{el.city}</div>
                    <div>{el.hoteltaxon}</div>
                  </div>
                </div>
              </div>
              <a
                className="mx-1 mt-6 text-brand"
                target={"_blank"}
                href={`https://test.bithomp.com/explorer/${el.xrpaddr}`}
              >
                Owner XPR addess
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Search;
