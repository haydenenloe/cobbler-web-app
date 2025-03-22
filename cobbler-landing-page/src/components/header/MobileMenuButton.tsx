import * as React from "react";
import { IconMenu2 } from "@tabler/icons-react";

export const MobileMenuButton: React.FC = () => {
  const handleClick = () => {
    // Mobile menu toggle functionality can be implemented here
    console.log("Mobile menu clicked");
  };

  return (
    <button
      className="hidden text-2xl cursor-pointer max-sm:block"
      onClick={handleClick}
      aria-label="Toggle mobile menu"
    >
      <IconMenu2 size={24} />
    </button>
  );
};