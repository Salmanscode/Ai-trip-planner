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

function Createtrip() {
  const [place, setPlace] = useState("");
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSelect = (suggestion) => {
    setPlace(suggestion.formatted);
    handleInputChange("location", suggestion.formatted);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const OnGenerateTrip = () => {
    if (
      (formData?.days > 9 && !formData?.location) ||
      !formData?.budget ||
      !formData?.travelPreference ||
      !formData?.days
    ) {
      toast("Please fill all details.");

      return;
    }
  };
  console.log(formData);
  return (
    <div className="flex flex-col items-center sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-4xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      {/* form */}
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
            className="p-2 w-full border border-gray-300 rounded"
            onChange={(e) => handleInputChange("days", e.target.value)}
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
                      formData?.budget === item.title
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
            The budget is exclusively allocated for activities and dining
            purposes.
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5 text-center">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() =>
                  handleInputChange("travelPreference", item.title)
                }
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg 
                                    ${
                                      formData?.travelPreference === item.title
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

          <div className="my-10 justify-end flex">
            <Button onClick={OnGenerateTrip}>Generate Trip</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createtrip;
