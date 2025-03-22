"use client";
import * as React from "react";
import { SignUpSection } from "./SignUpSection";

function SignUpLanding() {
  return (
    <section
      id="signup"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <main className="flex flex-col w-full bg-white min-h-[screen] mt-16">
        <SignUpSection />
      </main>
    </section>
  );
}

export default SignUpLanding;
