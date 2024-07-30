import React from "react";
import { Link } from "react-router-dom";

function HotelCardItem({ item }) {
  console.log("Salman", item); // Debugging line

  return (
    <div>
      <Link
        to={
          "https://www.google.com/maps/search/?api=1&query=" +
          item?.name +
          "," +
          item?.address
        }
        target="_blank"
      >
        <div className="hover:scale-105 transition-all cursor-pointer">
          <img
            src="/placeholder.jpg" // Ensure this path is correct
            className="rounded-xl h-[180px] w-full object-cover"
            alt={item?.name}
          />
          <div className="my-3 py-2">
            <h2 className="font-medium">{item?.name}</h2>
            <h2 className="text-xs text-gray-500">📍{item?.address} </h2>
            <h2 className="text-sm">💰{item?.price}</h2>
            <h2 className="text-sm">⭐{item?.rating} </h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelCardItem;
