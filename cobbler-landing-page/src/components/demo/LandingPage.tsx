"use client";
import * as React from "react";
import { Link } from "react-scroll";
import { ArrowDown } from "../common/icons/ArrowDown";

export default function DemoLandingPage() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section
      id="demo"
      className="flex flex-col items-center justify-between min-h-screen px-4 py-16"
    >
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="mt-20 text-6xl text-black text-left mb-6 max-md:text-5xl max-sm:mt-10 max-sm:text-4xl">
          watch what we want to build here:
        </h1>

        {/* Video container with centered video and rounded corners */}
        <div className="w-full flex justify-center mb-12">
          <div className="w-full max-w-3xl overflow-hidden rounded-2xl shadow-lg">
            <video
              ref={videoRef}
              className="w-full h-auto object-cover bg-white"
              controls
              onClick={togglePlay}
            >
              <source src="/video/cobbler_demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 mt-8">
        <h2 className="text-xl text-black">sign Up</h2>
        <Link to="signup" smooth={true} duration={500}>
          <ArrowDown className="w-6 h-6 cursor-pointer" />
        </Link>
      </div>
    </section>
  );
}
