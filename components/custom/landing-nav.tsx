"use client";

import { SignInButton } from "@clerk/nextjs";
import Hamburger from "hamburger-react";

function LandingNav() {
  return (
    <div className="flex bg-gray-900 justify-between items-center px-6 py-6">
      <div>Logo</div>
      <div className="sm:hidden flex">
        <Hamburger />
      </div>
      <div className="flex space-x-8 xs:hidden">
        <div>About</div>
        <div><SignInButton>Login</SignInButton></div>
      </div>
    </div>
  );
}

export default LandingNav;
