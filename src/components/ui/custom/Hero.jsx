import React from "react";
import { Button } from "../button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="relative w-full h-screen bg-[url('/newbg.png')] bg-cover bg-center flex flex-col items-center justify-center text-white">
      <div className="absolute inset-0 bg-black opacity-40"></div>{" "}
      {/* Optional overlay */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 md:px-6 lg:px-8">
        <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl text-center">
          <span className="text-[#ee3c24]">
            Discover Your Next Adventure with Ai:
          </span>
          <br className="hidden md:block" />
          Personalized Itineraries at Your Fingertips
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-100 text-center">
          Your personal trip planner and travel curator, creating custom
          itineraries tailored to your interests and budget.
        </p>
        <Link to={"/create-trip"}>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 md:py-3 md:px-6 rounded-lg">
            Get Started, It's Free
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
