// import React, { useState, useEffect } from "react";
// import OpenCageAutocomplete from "@/components/OpenCageAutocomplete";
// import { apiurl } from "@/components/Constant";
// import {
//   SelectBudgetOptions,
//   SelectTravelsList,
// } from "@/components/Constants/Option";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { chatSession } from "@/service/AiModel";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { FcGoogle } from "react-icons/fc";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "@/service/firebaseConfig";

// const getAIPrompt = (formData) => `
//   Generate Travel plan for Location: ${formData.location},
//   for ${formData.numberOfDays} days for ${formData.traveler} with a ${formData.budget} budget.
//   Provide hotel options with name, address, price, image URL, geo coordinates, and rating.
//   Suggest an itinerary with placeName, placeDetails, placeImageUrl, geoCoordinates, ticketPricing, rating, and timeToTravel.
//   Include a daily plan for ${formData.numberOfDays} days with the best time to visit in JSON format.
// `;

// function CreateTrip() {
//   const [place, setPlace] = useState("");
//   const [formData, setFormData] = useState({
//     location: "",
//     numberOfDays: "",
//     budget: "",
//     traveler: "",
//   });

//   const [openDialog, setOpenDialog] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleInputChange = (name, value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSelect = (suggestion) => {
//     setPlace(suggestion.formatted);
//     handleInputChange("location", suggestion.formatted);
//   };

//   useEffect(() => {
//     console.log(formData);
//   }, [formData]);

//   const login = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       // Use the token to get user profile
//       await GetUserProfile(tokenResponse.access_token);
//     },
//     onError: (error) => {
//       console.error("Login Error:", error);
//     },
//   });

//   const OnGenerateTrip = async () => {
//     if (
//       !formData.location ||
//       !formData.numberOfDays ||
//       !formData.budget ||
//       !formData.traveler
//     ) {
//       toast("Please input data in all fields");
//       return;
//     }
//     setIsLoading(true);
//     setOpenDialog(true);
//     const AI_PROMPT = getAIPrompt(formData);
//     try {
//       const result = await chatSession.sendMessage(AI_PROMPT);
//       console.log(result.response.text());
//       saveAiTrip(result.response.text());
//     } catch (error) {
//       console.error("Error generating trip:", error);
//       toast("Failed to generate trip. Please try again.");
//     }
//     setIsLoading(false);
//     setOpenDialog(false);
//   };

//   // saving data into the firebase
//   const saveAiTrip = async (TripData) => {
//     setIsLoading(true);
//     const user = JSON.parse(localStorage.getItem("user"));
//     const docId = Date.now().toString();

//     let parsedTripData;

//     try {
//       parsedTripData = JSON.parse(TripData);
//     } catch (error) {
//       console.error("Error parsing trip data:", error);
//       toast.error("Failed to parse trip data.");
//       setIsLoading(false);
//       return;
//     }

//     await setDoc(doc(db, "AITrips", docId), {
//       userSelection: formData,
//       tripData: parsedTripData,
//       userEmail: user?.email,
//       id: docId,
//     });
//     setIsLoading(false);
//     // navigate('/view-trip/' + docId);
//   };

//   const GetUserProfile = async (accessToken) => {
//     try {
//       const response = await axios.get(
//         "https://www.googleapis.com/oauth2/v3/userinfo",
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             Accept: "application/json",
//           },
//         }
//       );
//       console.log(response.data);
//       localStorage.setItem("user", JSON.stringify(response.data));
//       setOpenDialog(false);
//       await OnGenerateTrip();
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//       toast("Failed to fetch user profile. Please try again.");
//       setOpenDialog(false); // Ensure dialog closes even if there is an error
//     }
//   };

//   return (
//     <div className="relative min-h-screen bg-gray-100 p-5 md:p-10 lg:p-20">
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{ backgroundImage: 'url("/bgform.jpg")' }}
//       ></div>
//       <div className="relative flex flex-col items-center justify-center min-h-screen">
//         <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
//           <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
//             Tell us your travel preferences 🏕️🌴
//           </h2>
//           <p className="text-xl text-gray-600 mb-8 text-center">
//             Just provide some basic information, and our trip planner will
//             generate a customized itinerary based on your preferences.
//           </p>

//           <div className="space-y-8">
//             <div>
//               <h2 className="text-2xl font-semibold mb-4 text-gray-700">
//                 What is your destination of choice?
//               </h2>
//               <OpenCageAutocomplete
//                 apiKey={apiurl}
//                 onSelect={handleSelect}
//                 selectProps={{
//                   place,
//                   onChange: (v) => {
//                     setPlace(v);
//                     handleInputChange("location", v);
//                   },
//                 }}
//               />
//             </div>

//             <div>
//               <h2 className="text-2xl font-semibold mb-4 text-gray-700">
//                 How many days are you planning your trip?
//               </h2>
//               <input
//                 placeholder="Ex. 3"
//                 type="number"
//                 className="p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 onChange={(e) =>
//                   handleInputChange("numberOfDays", e.target.value)
//                 }
//               />
//             </div>

//             <div>
//               <h2 className="text-2xl font-semibold mb-4 text-gray-700">
//                 What is Your Budget?
//               </h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
//                 {SelectBudgetOptions.map((item, index) => (
//                   <div
//                     key={index}
//                     onClick={() => handleInputChange("budget", item.title)}
//                     className={`p-5 border cursor-pointer rounded-lg transition-shadow duration-300 ease-in-out
//                                 ${
//                                   formData.budget === item.title
//                                     ? "border-2 border-indigo-500 shadow-lg"
//                                     : "border-gray-300"
//                                 }`}
//                   >
//                     <h2 className="text-3xl mb-2 text-gray-800">{item.icon}</h2>
//                     <h2 className="font-bold text-xl mb-1 text-gray-800">
//                       {item.title}
//                     </h2>
//                     <h2 className="text-sm text-gray-600">{item.desc}</h2>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h2 className="text-2xl font-semibold mb-4 text-gray-700">
//                 Who do you plan on traveling with on your next adventure?
//               </h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
//                 {SelectTravelsList.map((item, index) => (
//                   <div
//                     key={index}
//                     onClick={() => handleInputChange("traveler", item.people)}
//                     className={`p-5 border cursor-pointer rounded-lg transition-shadow duration-300 ease-in-out
//                                 ${
//                                   formData.traveler === item.people
//                                     ? "border-2 border-indigo-500 shadow-lg"
//                                     : "border-gray-300"
//                                 }`}
//                   >
//                     <h2 className="text-3xl mb-2 text-gray-800">{item.icon}</h2>
//                     <h2 className="font-bold text-xl mb-1 text-gray-800">
//                       {item.title}
//                     </h2>
//                     <h2 className="text-sm text-gray-600">{item.desc}</h2>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="mt-10 flex justify-end">
//             <Button
//               className="bg-orange-500 hover:bg-indigo-600 text-white"
//               disabled={isLoading}
//               onClick={OnGenerateTrip}
//             >
//               {isLoading ? (
//                 <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
//               ) : (
//                 "Generate Trip"
//               )}
//             </Button>
//           </div>
//           <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle className="text-xl font-bold">
//                   Authentication Required
//                 </DialogTitle>
//                 <DialogDescription>
//                   <div>
//                     <h2 className="font-bold text-lg mb-3">
//                       Sign In With Google
//                     </h2>
//                     <p className="mb-3">
//                       Sign in to the App with Google authentication securely
//                     </p>
//                   </div>

//                   <Button
//                     onClick={() => login()}
//                     className="bg-black hover:bg-blue-600 text-white w-full mt-5 flex items-center justify-center gap-4"
//                   >
//                     <FcGoogle className="h-7 w-7" />
//                     Sign in with Google
//                   </Button>
//                 </DialogDescription>
//               </DialogHeader>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateTrip;

import React, { useState, useEffect } from "react";
import OpenCageAutocomplete from "@/components/OpenCageAutocomplete";
import { apiurl } from "@/components/Constant";
import {
  SelectBudgetOptions,
  SelectTravelsList,
} from "@/components/Constants/Option";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AiModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";

const getAIPrompt = (formData) => `
  Generate Travel plan for Location: ${formData.location},
  for ${formData.numberOfDays} days for ${formData.traveler} with a ${formData.budget} budget.
  Provide hotel options with name, address, price, image URL, geo coordinates, and rating.
  Suggest an itinerary with placeName, placeDetails, placeImageUrl, geoCoordinates, ticketPricing, rating, and timeToTravel.
  Include a daily plan for ${formData.numberOfDays} days with the best time to visit in JSON format.
`;

function CreateTrip() {
  const [place, setPlace] = useState("");
  const [formData, setFormData] = useState({
    location: "",
    numberOfDays: "",
    budget: "",
    traveler: "",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelect = (suggestion) => {
    setPlace(suggestion.formatted);
    handleInputChange("location", suggestion.formatted);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // Use the token to get user profile
      await GetUserProfile(tokenResponse.access_token);
    },
    onError: (error) => {
      console.error("Login Error:", error);
    },
  });

  const OnGenerateTrip = async () => {
    if (
      !formData.location ||
      !formData.numberOfDays ||
      !formData.budget ||
      !formData.traveler
    ) {
      toast("Please input data in all fields");
      return;
    }
    setIsLoading(true);
    setOpenDialog(true);
    const AI_PROMPT = getAIPrompt(formData);
    try {
      const result = await chatSession.sendMessage(AI_PROMPT);
      console.log(result.response.text());
      saveAiTrip(result.response.text());
    } catch (error) {
      console.error("Error generating trip:", error);
      toast("Failed to generate trip. Please try again.");
    }
    setIsLoading(false);
    setOpenDialog(false);
  };

  // saving data into the firebase
  const saveAiTrip = async (TripData) => {
    setIsLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    let parsedTripData;

    try {
      parsedTripData = JSON.parse(TripData);
    } catch (error) {
      console.error("Error parsing trip data:", error);
      toast.error("Failed to parse trip data.");
      setIsLoading(false);
      return;
    }

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: parsedTripData,
      userEmail: user?.email,
      id: docId,
    });
    setIsLoading(false);
    // navigate('/view-trip/' + docId);
  };

  const GetUserProfile = async (accessToken) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setOpenDialog(false);
      await OnGenerateTrip();
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast("Failed to fetch user profile. Please try again.");
      setOpenDialog(false); // Ensure dialog closes even if there is an error
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 p-5 md:p-10 lg:p-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/bgform.jpg")' }}
      ></div>
      <div className="relative flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
            Tell us your travel preferences 🏕️🌴
          </h2>
          <p className="text-xl text-gray-600 mb-8 text-center">
            Just provide some basic information, and our trip planner will
            generate a customized itinerary based on your preferences.
          </p>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                What is your destination of choice?
              </h2>
              <OpenCageAutocomplete
                apiKey={apiurl}
                onSelect={handleSelect}
                selectProps={{
                  place,
                  onChange: (v) => {
                    setPlace(v);
                    handleInputChange("location", v);
                  },
                }}
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                How many days are you planning your trip?
              </h2>
              <input
                placeholder="Ex. 3"
                type="number"
                className="p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) =>
                  handleInputChange("numberOfDays", e.target.value)
                }
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                What is Your Budget?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {SelectBudgetOptions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleInputChange("budget", item.title)}
                    className={`p-5 border cursor-pointer rounded-lg transition-shadow duration-300 ease-in-out
                                ${
                                  formData.budget === item.title
                                    ? "border-2 border-indigo-500 shadow-lg"
                                    : "border-gray-300"
                                }`}
                  >
                    <h2 className="text-3xl mb-2 text-gray-800">{item.icon}</h2>
                    <h2 className="font-bold text-xl mb-1 text-gray-800">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-600">{item.desc}</p>{" "}
                    {/* Changed from <h2> to <p> */}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                Who do you plan on traveling with on your next adventure?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {SelectTravelsList.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleInputChange("traveler", item.people)}
                    className={`p-5 border cursor-pointer rounded-lg transition-shadow duration-300 ease-in-out
                                ${
                                  formData.traveler === item.people
                                    ? "border-2 border-indigo-500 shadow-lg"
                                    : "border-gray-300"
                                }`}
                  >
                    <h2 className="text-3xl mb-2 text-gray-800">{item.icon}</h2>
                    <h2 className="font-bold text-xl mb-1 text-gray-800">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-600">{item.desc}</p>{" "}
                    {/* Changed from <h2> to <p> */}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <Button
              className="bg-orange-500 hover:bg-indigo-600 text-white"
              disabled={isLoading}
              onClick={OnGenerateTrip}
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
              ) : (
                "Generate Trip"
              )}
            </Button>
          </div>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">
                  Authentication Required
                </DialogTitle>
                <DialogDescription>
                  <div>
                    <h2 className="font-bold text-lg mb-3">
                      Sign In With Google
                    </h2>
                    <p className="mb-3">
                      Sign in to the App with Google authentication securely
                    </p>
                  </div>

                  <Button
                    onClick={() => login()}
                    className="bg-black hover:bg-blue-600 text-white w-full mt-5 flex items-center justify-center gap-4"
                  >
                    <FcGoogle className="h-7 w-7" />
                    Sign in with Google
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
