"use client";
import * as React from "react";

interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <nav className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 p-6">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-2xl"
        aria-label="Close menu"
      >
        ×
      </button>
      <div className="flex flex-col gap-6 mt-12">
        <a href="#" className="text-base text-black hover:text-gray-700">
          home
        </a>
        <a href="#" className="text-base text-black hover:text-gray-700">
          about us
        </a>
        <a href="#" className="text-base text-black hover:text-gray-700">
          demo
        </a>
        <a href="#" className="text-base text-black hover:text-gray-700">
          sign up
        </a>
      </div>
    </nav>
  );
}