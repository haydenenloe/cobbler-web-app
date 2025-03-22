"use client";
import * as React from "react";
import { Hero } from "./Hero";

export default function LandingPage() {
  return (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <Hero />
    </section>
  );
}