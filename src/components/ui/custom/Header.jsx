import React from "react";
import { Button } from "../button";

function Header() {
  return (
    <div className="p-3 shadow-sm flex flex-col md:flex-row justify-between items-center px-4 md:px-6">
      <img className="w-auto h-16 md:h-20" src="/logo.png" alt="Logo" />
      <div className="mt-2 md:mt-0">
        <Button className="bg-black hover:bg-blue-600 text-white px-4 py-2 text-sm md:text-base">
          Sign in
        </Button>
      </div>
    </div>
  );
}

export default Header;
