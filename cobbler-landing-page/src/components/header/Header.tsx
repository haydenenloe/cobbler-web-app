"use client";
import * as React from "react";
import { NavigationLinks } from "./NavigationLinks";
import { MobileMenuButton } from "./MobileMenuButton";

export const Header: React.FC = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-9 py-0 w-full bg-white h-[80px] max-sm:px-5 max-sm:py-0 max-sm:h-16 shadow-sm">
        <img
          src="images/cobbler_logo.png"
          className="object-contain h-[60px] w-[60px] max-sm:w-20 max-sm:h-20"
          alt="Cobbler Logo"
        />
        <div className="flex justify-end flex-1 pr-4">
          <NavigationLinks />
          <MobileMenuButton />
        </div>
      </header>
    </>
  );
};

export default Header;
