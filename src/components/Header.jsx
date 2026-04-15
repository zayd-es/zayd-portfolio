"use client";
import Image from "next/image";
import React from "react";
import { ArrowRight, Hand } from "lucide-react";
import { toast } from "sonner";

const Header = () => {
  return (
    <div className="w-11/12 max-w-3xl text-center mx-auto h-screen pt-20 flex flex-col items-center justify-center gap-4">
      <div>
        <Image
          src="/meZayd.jpeg"
          alt="Me"
          width={128}
          height={128}
          className="rounded-full w-32 h-32 object-cover border-2 border-purple-500 p-1"
        />
      </div>

      <h3 className="flex items-end gap-2 text-xl md:text-2xl mb-3 font-ovo dark:text-white">
        Hi I&apos;m Zayd Elabbous{" "}
        {/* <Image src={assets.hand_icon} className="w-6" alt="Hand icon" /> */}
        <Hand />
      </h3>

      <h1 className="capitalize font-ovo text-3xl sm:text-6xl lg:text-[66px] dark:text-white">
        front end developer based in morocco
      </h1>

      <p className="max-w-2xl mx-auto font-ovo dark:text-white/80">
        I am a passionate frontend developer with 1 year of hands-on experience
        through personal and self-driven projects. I am constantly growing and
        always excited to learn new technologies.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <a
          className="px-10 py-3 border border-transparent  rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center gap-2 transition-all duration-300 hover:bg-gray-800 dark:hover:bg-gray-200 hover:-translate-y-1 hover:shadow-lg"
          href="#contact"
        >
          contact me <ArrowRight className="w-4 h-4" />
        </a>

        <button
          onClick={() =>
            toast.info(
              "The resume is being updated and will be available soon!",
            )
          }
          className="px-10 py-4 border border-gray-500 rounded-full flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
        >
          My Resume
        </button>
      </div>
    </div>
  );
};

export default Header;
