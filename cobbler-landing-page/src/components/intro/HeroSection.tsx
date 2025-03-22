import * as React from "react";
import { Link } from "react-scroll";
import { ArrowDown } from "../common/icons/ArrowDown";

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="flex flex-col items-center justify-between min-h-screen p-0 m-0"
    >
      <div className="flex-grow flex items-center justify-center w-min-h-screen px-4 py-16">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-auto object-cover bg-white"
      >
        <source src="/video/cobbler_intro_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      </div>
      <div className="flex flex-col items-center gap-4 mb-16">
        <h2 className="text-xl text-black">about us</h2>
        <Link to="about" smooth={true} duration={500}>
          <ArrowDown className="w-6 h-6 cursor-pointer" />
        </Link>
      </div>
    </section>
  );
};
