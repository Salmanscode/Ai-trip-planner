import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import TripPlace from "../components/TripPlace";
import Footer from "../components/Footer";

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);

  const GetTripData = async () => {
    try {
      const docRef = doc(db, "AITrips", tripId);
      console.log("Document reference:", docRef);
      const docSnap = await getDoc(docRef);
      console.log("Document snapshot:", docSnap);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log("No such document!");
        toast.error("No trip found!");
      }
    } catch (error) {
      console.error("Error fetching trip data:", error);
      toast.error("Failed to fetch trip data.");
    }
  };

  useEffect(() => {
    if (tripId) {
      console.log("Fetching data for trip ID:", tripId);
      GetTripData();
    }
  }, [tripId]);

  return (
    <div className="p-12 md:px-25 lg:px-44 xl:px-56">
      <InfoSection trip={trip} />
      <Hotels trip={trip} />
      <TripPlace trip={trip} />
      <Footer trip={trip} />
    </div>
  );
}

export default Viewtrip;
