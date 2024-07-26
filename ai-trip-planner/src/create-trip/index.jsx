import React from "react";
import { useState, useEffect } from "react";
import OpenCageAutocomplete from "@/components/OpenCageAutocomplete";
import { apiurl } from "@/components/Constant";
import {
  SelectBudgetOptions,
  SelectTravelsList,
} from "@/components/Constants/Option";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AiModel";

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

  const OnGenerateTrip = async () => {
    if (
      !formData.location ||
      !formData.numberOfDays ||
      !formData.budget ||
      !formData.traveler
    ) {
      toast("Please input data in all fields");
    } else {
      const AI_PROMPT = getAIPrompt(formData);
      try {
        console.log(AI_PROMPT);
        const result = await chatSession.sendMessage(AI_PROMPT);
        console.log(result.response.text());
      } catch (error) {
        console.error("Error generating trip:", error);
        toast("Failed to generate trip. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
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
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <input
            placeholder="Ex.3"
            type="number"
            className="p-2 w-1/2 border border-gray-300 rounded"
            onChange={(e) => handleInputChange("numberOfDays", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5 text-center">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg 
                                    ${
                                      formData.budget === item.title
                                        ? "border-2 border-black shadow-lg"
                                        : "border-gray-300"
                                    }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5 text-center">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg 
                                    ${
                                      formData.traveler === item.people
                                        ? "border-2 shadow-lg border-black"
                                        : ""
                                    }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button onClick={OnGenerateTrip}>Generate Trip</Button>
      </div>
    </div>
  );
}

export default CreateTrip;
