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
      className="w-full px-6 md:px-[9%]  scroll-mt-20 overflow-hidden"
    >
      <motion.h4
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mb-2 text-lg font-ovo dark:text-white"
      >
        introduction
      </motion.h4>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-3xl md:text-5xl font-ovo capitalize dark:text-white"
      >
        about me
      </motion.h2>
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-10 my-16 md:my-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="w-fit mx-auto lg:mx-0 shrink-0"
        >
          <div className="w-[260px] sm:w-[300px] md:w-[380px] mx-auto lg:mx-0">
            <ProfileCard
              name="Zayd Elabbous"
              title="Front-end Developer"
              status="Online"
              avatarUrl="/meZayd.jpeg"
              avatarClassName="object-bottom"
              contactText="Contact Me"
              showUserInfo={false}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => console.log("Contact clicked")}
              behindGlowColor="rgba(125, 190, 255, 0.67)"
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
          <p className="mb-10 text-center lg:text-left font-ovo dark:text-white/80 leading-relaxed text-sm md:text-base">
            I am an experienced Frontend Developer specializing in React and
            Next.js, with a strong focus on building fast, modern, and
            responsive web applications. As a freelancer, I have had the
            privilege of working with a diverse range of clients, delivering
            high-quality solutions tailored to their needs.
          </p>

          <div className="w-full">
            <InfoCards infoList={infoList} />
          </div>

          <div className="w-full mt-10">
            <ToolsMarquee tools={tools} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
