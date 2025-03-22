import * as React from "react";
import { Link } from "react-scroll";
import { ArrowDown } from "../common/icons/ArrowDown";

export const Hero: React.FC = () => {
  return (
    <main className="px-24 py-0 max-md:px-10 max-md:py-0 max-sm:px-5 max-sm:py-0">
      <section className="mt-20 text-6xl text-black max-w-[1235px] max-md:text-5xl max-sm:mt-10 max-sm:text-4xl">
        <h1>we hated networking, so we made an app to help us with it.</h1>
      </section>

      <section className="mt-20 text-2xl text-black max-w-[1229px] max-md:text-xl max-sm:mt-10 max-sm:text-lg">
        <p className="mb-5">
          As students, we have struggled with trying to connect with our peers
          and trying to get jobs with the current infrastructure. LinkedIn has
          not helped us. It does not make money off our success, but from
          selling our information to ads.
        </p>
        <p className="mb-5 font-bold text-[#01462B]">Enough is enough.</p>
        <p className="mb-5">
          From our experience and education, we are making an app that rewards
          and promotes you strengthening your relationships
          <strong className="font-bold"> in the real world.</strong>
        </p>
      </section>

      <section className="flex flex-col items-center mt-32">
        <h2 className="mb-2.5 text-2xl text-black">demo</h2>
        <Link to="demo" smooth={true} duration={500}>
          <ArrowDown className="w-6 h-6 cursor-pointer" />
        </Link>
      </section>
    </main>
  );
};
