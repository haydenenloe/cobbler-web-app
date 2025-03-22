import * as React from "react";
import { Link } from "react-scroll";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => (
  <Link
    to={to}
    smooth={true}
    duration={500}
    className="px-2 text-base text-black cursor-pointer hover:text-[#1C8757] transition-colors"
  >
    {children}
  </Link>
);

export const NavigationLinks: React.FC = () => {
  return (
    <nav className="flex items-center gap-2 max-sm:hidden">
      <NavLink to="hero">home</NavLink>
      <NavLink to="about">about us</NavLink>
      <NavLink to="demo">demo</NavLink>
      <NavLink to="signup">sign up</NavLink>
    </nav>
  );
};
