"use client";
import React from "react";
import { serviceData } from "../../assets/assets";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Services = () => {
  return (
    <div
      id="services"
      className="w-full px-[20px] py-10 scroll-mt-20 overflow-hidden"
    >
      <motion.h4
        initial={{ opacity: 0, letterSpacing: "-5px" }}
        whileInView={{ opacity: 1, letterSpacing: "4px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-2 text-sm md:text-base font-medium tracking-[0.3em] uppercase text-blue-600 dark:text-blue-400"
      >
        what i offer
      </motion.h4>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center text-4xl md:text-6xl font-ovo capitalize flex flex-row items-center justify-center gap-3"
      >
        <span className="text-gray-900 dark:text-white">My</span>
        <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-400 bg-clip-text text-transparent animate-gradient-x font-serif italic pb-2">
          Services
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo text-gray-700 dark:text-white/80 text-base md:text-lg"
      >
        I am a Frontend Developer specializing in React and Next.js, based in
        <span className="text-black dark:text-white font-medium">
          {" "}
          Tetouan Morocco
        </span>
        , focusing on building high-performance responsive web applications with
        modern UI implementations.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-10"
      >
        {serviceData.map(({ Icon, title, description, link }, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            className="group relative bg-white dark:bg-[#1a1625]/40 border border-gray-200 dark:border-white/10 rounded-2xl px-8 py-12 cursor-pointer transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 backdrop-blur-sm"
          >
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

            <div className="relative z-10">
              <div className="text-blue-600 dark:text-blue-400 mb-4 bg-blue-50 dark:bg-white/5 w-fit p-4 rounded-xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                <Icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl my-4 font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {title}
              </h3>

              <p className="text-sm text-gray-600 leading-7 dark:text-white/70">
                {description}
              </p>

              <a
                href={link}
                className="flex items-center gap-2 text-sm mt-6 font-semibold text-blue-600 dark:text-blue-400 group/link overflow-hidden w-fit"
              >
                <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-current after:translate-x-[-100%] group-hover/link:after:translate-x-0 after:transition-transform duration-300">
                  Read more
                </span>
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform duration-300" />
              </a>
            </div>

            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-blue-500/20 transition-colors duration-500" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Services;
