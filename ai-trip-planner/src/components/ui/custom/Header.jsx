import React from "react";
import { Button } from "../button";

function Header() {
  return (
    <div className="p-1 shadow-sm flex justify-between items-center px-6 ">
      <img className=" w-auto h-20  " src="/public/logo.png" />
      <div>
        <Button>Sign in</Button>
      </div>
    </div>
  );
}

export default Header;
