import React from "react";
import { Button } from "../button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="relative w-full h-screen bg-[url('/public/newbg.png')] bg-cover bg-center flex flex-col items-center justify-center text-white">
      <div className="absolute inset-0 bg-black opacity-40"></div>{" "}
      {/* Optional overlay */}
      <div className="relative z-10 flex flex-col items-center gap-9 px-6">
        <h1 className="font-extrabold text-[60px] text-center">
          <span className="text-[#ee3c24]">
            Discover Your Next Adventure with Ai:
          </span>
          Personalized Itineraries at Your Fingertips
        </h1>
        <p className="text-2xl text-gray-100 text-center">
          Your personal trip planner and travel curator, creating custom
          itineraries tailored to your interests and budget.
        </p>
        <Link to={"/create-trip"}>
          <Button className="bg-orange-500 hover:bg-indigo-600 text-white">
            Get Started, It's Free
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
