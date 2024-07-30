import React from "react";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  // const [photoUrl, setPhotoUrl] = useState();
  return (
    <div>
      <h2 className="font-bold text-xl my-7">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {trip?.tripData?.hotels?.map((item, index) => (
          <HotelCardItem item={item} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
