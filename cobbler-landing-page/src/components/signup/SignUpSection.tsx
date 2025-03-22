import * as React from "react";

export function SignUpSection() {
  const signUpUrl = "https://docs.google.com/forms/d/19TUG-OPjfo5TuQtwG8p6tEm3EGWKWlGfOoHtfKCTxjs/viewform?edit_requested=true";
  
  return (
    <section className="flex flex-col items-center px-24 max-sm:px-4">
      <h1 className="text-6xl text-left text-black max-md:text-5xl max-sm:text-3xl max-w-[1235px]">
        click or scan to sign up here for our beta test and help make the future more human.
      </h1>
      
      <div className="mt-8">
        
        {/* QR Code with image swap on hover */}
        <div className="flex justify-center mt-12">
          <a
            href={signUpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block cursor-pointer group"
          >
            {/* Default black QR code */}
            <img
              src="/images/cobbler_qr_code_black.png"
              alt="QR Code - Scan to sign up"
              className="w-[363px] h-[363px] max-sm:w-[280px] max-sm:h-[280px] transition-opacity duration-300 group-hover:opacity-0"
            />
            
            {/* Green QR code that appears on hover */}
            <img
              src="/images/cobbler_qr_code_green.png"
              alt="QR Code - Scan to sign up"
              className="w-[363px] h-[363px] max-sm:w-[280px] max-sm:h-[280px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-0 left-0"
            />
            
            {/* Optional: Add a text indicator for better UX */}
            <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm font-medium">
                Click to sign up
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}