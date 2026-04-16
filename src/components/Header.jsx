"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { ArrowRight, Hand } from "lucide-react";
import { toast } from "sonner";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Header = () => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen flex-col items-center justify-center pt-32 pb-40 px-6 overflow-hidden group"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 block dark:hidden"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) =>
              `radial-gradient(600px circle at ${x}px ${y}px, rgba(59,130,246,0.15), transparent 80%)`,
          ),
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden dark:block"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) =>
              `radial-gradient(600px circle at ${x}px ${y}px, rgba(168,85,247,0.12), transparent 80%)`,
          ),
        }}
      />

      <div className="absolute inset-0 -z-20 w-screen h-full pointer-events-none [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]" />
        <motion.div
          animate={{
            background: [
              "radial-gradient(800px circle at 0% 0%, rgba(59,130,246,0.1), transparent 60%)",
              "radial-gradient(800px circle at 100% 100%, rgba(168,85,247,0.1), transparent 60%)",
              "radial-gradient(800px circle at 0% 100%, rgba(59,130,246,0.1), transparent 60%)",
              "radial-gradient(800px circle at 100% 0%, rgba(168,85,247,0.1), transparent 60%)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="absolute inset-0"
        />
        <div className="absolute top-1/4 left-[10%] text-gray-500/10 dark:text-white/5 text-6xl font-mono">{`</>`}</div>
        <div className="absolute bottom-1/3 right-[15%] text-gray-500/10 dark:text-white/5 text-4xl font-mono">{`{ }`}</div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-white dark:to-zinc-950 pointer-events-none" />

      <div className="relative w-full max-w-5xl text-center mx-auto flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="relative mb-6"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="absolute inset-0 bg-blue-500/30 rounded-full blur-2xl"
          />
          <Image
            src="/meZayd.jpeg"
            alt="Zayd Elabbous"
            width={120}
            height={120}
            className="relative rounded-full w-28 h-28 md:w-32 md:h-32 object-cover border-2 border-white dark:border-white/10 shadow-xl bg-white"
            priority
          />
          <motion.div
            animate={{ rotate: [0, 20, -10, 20, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 3 }}
            className="absolute -bottom-1 -right-1 bg-white dark:bg-zinc-800 p-1.5 rounded-full shadow-lg border border-gray-100 dark:border-white/10"
          >
            <Hand className="w-4 h-4 text-yellow-500" />
          </motion.div>
        </motion.div>

        <h3 className="text-lg md:text-xl font-ovo mb-2 dark:text-white/90">
          Hi I&apos;m{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            Zayd Elabbous
          </span>
        </h3>

        <h1 className="font-ovo text-5xl sm:text-7xl lg:text- leading-[1] tracking-tight dark:text-white flex flex-col items-center">
          <div className="text-gray-900 mt-10 dark:text-white h- sm:h- lg:h- flex items-center">
            <TypeAnimation
              sequence={["Front End", 2000, "React.js", 2000, "Next.js", 2000]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>

          <motion.span
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="relative inline-block  bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-400 bg-[length:200%_auto] bg-clip-text text-transparent font-serif italic py-2"
          >
            Developer
          </motion.span>

          <span className="text-gray-900 dark:text-white text-3xl sm:text-5xl lg:text-">
            Based In Morocco
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-xl mx-auto mt-6 font-ovo text-gray-600 dark:text-white/60 text-base md:text-lg leading-relaxed"
        >
          Building high-performance interfaces with{" "}
          <span className="text-black dark:text-white font-medium">
            React & Next.js
          </span>
          . 1 year of turning ideas into clean, functional code.
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-4 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center gap-3 overflow-hidden"
          >
            <motion.span
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                ease: "linear",
                repeatDelay: 1,
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            />
            <span className="relative">Contact Me</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform relative" />
          </motion.a>

          <button
            onClick={() => toast.info("Resume coming soon!")}
            className="px-10 py-4 border border-gray-200 dark:border-white/10 rounded-full text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center gap-2"
          >
            Resume
            <motion.span
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 rounded-full bg-blue-500"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
