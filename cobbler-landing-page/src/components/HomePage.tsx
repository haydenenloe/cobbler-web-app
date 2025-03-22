"use client";
import * as React from "react";
import { Header } from "./header/Header";
import { HeroSection } from "./intro/HeroSection";
import LandingPage from "./about/LandingPage";
import DemoLandingPage from "./demo/LandingPage";
import SignUpLanding from "./signup/SignUpLanding";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex flex-col items-center">
        <section className="min-h-screen w-full flex items-center justify-center pt-[80px]">
          <HeroSection />
        </section>
        <section className="min-h-screen w-full flex items-center justify-center">
          <LandingPage />
        </section>
        <section className="min-h-screen w-full flex items-center justify-center">
          <DemoLandingPage />
        </section>
        <section className="min-h-screen w-full flex items-center justify-center">
          <SignUpLanding />
        </section>
      </main>
    </div>
  );
};

export default HomePage;