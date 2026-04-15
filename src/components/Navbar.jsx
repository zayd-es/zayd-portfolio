"use client";
import React, { useEffect, useState } from "react";
import { Moon, Sun, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Zid hadi
import GradientText from "./GradientText";

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State blast Ref

  const navLinks = [
    { label: "Home", href: "#top" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#work" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/70 dark:bg-[#0b0118]/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/5 shadow-sm"
            : ""
        }`}
      >
        {/* Logo Section */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <GradientText
            colors={
              isDarkMode
                ? ["#94A3B8", "#E2E8F0", "#38BDF8"]
                : ["#0F172A", "#334155", "#1D4ED8"]
            }
            animationSpeed={2.5}
            className="text-3xl p-2 font-bold tracking-tighter"
          >
            Zayd<span className="text-purple-500">.</span>
          </GradientText>
        </motion.div>

        {/* Desktop Nav */}
        <ul
          className={`hidden md:flex items-center gap-6 lg:gap-10 rounded-full px-10 py-2.5 transition-all duration-500 ${
            isScrolled
              ? "bg-transparent"
              : "bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10"
          }`}
        >
          {navLinks.map((link, index) => (
            <li key={index} className="relative group">
              <a
                className="text-sm font-medium dark:text-gray-300 dark:hover:text-white transition-colors"
                href={link.href}
              >
                {link.label}
              </a>
              {/* Animated Underline */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full" />
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/5 cursor-pointer dark:text-white"
            onClick={() => setIsDarkMode((prev) => !prev)}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          <a
            href="#contact"
            className="hidden lg:flex items-center gap-2 px-7 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            Hire Me
            <ArrowRight size={14} />
          </a>

          {/* Hamburger Menu */}
          <button
            className="flex md:hidden p-2 dark:text-white"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>

        {/* Mobile Menu with Framer Motion */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
              />
              {/* Menu Drawer */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 bottom-0 w-[75%] max-w-sm h-screen bg-white dark:bg-[#0b0118] p-10 z-[70] md:hidden shadow-2xl"
              >
                <button
                  className="absolute right-8 top-8 dark:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X size={30} />
                </button>

                <ul className="flex flex-col gap-8 mt-20">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <a
                        className="text-2xl font-bold dark:text-white"
                        href={link.href}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
