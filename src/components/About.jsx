import React from "react";
import ProfileCard from "./ProfileCard";
import InfoCards from "./InfoCards";
import { infoList, tools } from "../../assets/assets";
import ToolsMarquee from "./ToolsMarquee";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      id="about"
      className="w-full px-6 mt-5 md:px-[9%] scroll-mt-20 overflow-hidden"
    >
      <motion.h4
        initial={{ opacity: 0, letterSpacing: "-5px" }}
        whileInView={{ opacity: 1, letterSpacing: "4px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-2 text-sm md:text-base font-medium tracking-[0.3em] uppercase text-blue-600 dark:text-blue-400"
      >
        Introduction
      </motion.h4>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="text-center text-4xl md:text-6xl font-ovo flex flex-row items-center justify-center gap-3"
      >
        <span className="text-gray-900 dark:text-white">About</span>
        <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-400 bg-clip-text text-transparent animate-gradient-x font-serif italic">
          Me
        </span>
      </motion.h2>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-10 my-16 md:my-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="w-fit mx-auto lg:mx-0 shrink-0"
        >
          <div className="w-[260px]  sm:w-[300px] md:w-[380px] mx-auto lg:mx-0 shadow-2xl shadow-blue-500/5 rounded-3xl">
            <ProfileCard
              name={<div className="pb-3">Zayd Elabbous</div>}
              title="Front-end Developer"
              status="Online"
              avatarUrl="/meZayd.jpeg"
              avatarClassName="object-bottom"
              contactText="Contact Me"
              showUserInfo={false}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => console.log("Contact clicked")}
              behindGlowColor="rgba(125, 190, 255, 0.4)"
              behindGlowEnabled
              innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex-1 min-w-0 w-full"
        >
          <p className="mb-10 text-center lg:text-left font-ovo text-gray-700 dark:text-white/80 leading-relaxed text-base md:text-lg max-w-2xl mx-auto lg:mx-0">
            I am an experienced{" "}
            <span className="text-black dark:text-white font-medium underline decoration-blue-500/30 underline-offset-4">
              Frontend Developer
            </span>{" "}
            specializing in React and Next.js, with a strong focus on building
            fast, modern, and responsive web applications. As a freelancer, I
            have had the privilege of working with a diverse range of clients,
            delivering high-quality solutions tailored to their needs.
          </p>

          <div className="w-full">
            <InfoCards infoList={infoList} />
          </div>

          <div className="w-full mt-10 md:mt-14">
            <ToolsMarquee tools={tools} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
