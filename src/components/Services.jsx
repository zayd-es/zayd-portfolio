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
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-2 text-lg font-ovo capitalize dark:text-white"
      >
        what i offer
      </motion.h4>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center text-5xl font-ovo capitalize dark:text-white"
      >
        my services
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo dark:text-white/80"
      >
        I am a Frontend Developer specializing in React and Next.js, based in
        Tetouan Morocco, focusing on building high-performance responsive web
        applications with modern UI implementations.
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
            className="group relative border border-gray-400 rounded-2xl px-8 py-12 cursor-pointer transition-all duration-500 dark:border-white/20 dark:bg-[#1a1625]/40 backdrop-blur-sm"
          >
            {/* Background Glow on Hover */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

            <div className="relative z-10">
              <div className="text-gray-700 dark:text-white mb-4 bg-lightHover dark:bg-darkHover w-fit p-3 rounded-lg group-hover:scale-110 transition-transform duration-500">
                <Icon className="w-6 h-6" />
              </div>

              <h3 className="text-lg my-4 font-semibold text-gray-700 dark:text-white">
                {title}
              </h3>

              <p className="text-sm text-gray-600 leading-6 dark:text-white/70">
                {description}
              </p>

              <a
                href={link}
                className="flex items-center gap-2 text-sm mt-5 font-medium dark:text-white group/link"
              >
                Read more
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Border Glow Effect */}
            <div className="absolute inset-0 rounded-2xl border border-blue-500/0 group-hover:border-blue-500/30 transition-colors duration-500" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Services;
