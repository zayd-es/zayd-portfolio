"use client";
import React, { useEffect, useRef, useState } from "react";
import { Moon, Sun, Menu, X, ArrowRight } from "lucide-react";
import GradientText from "./GradientText";

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const sideMenuRef = useRef();
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { label: "Home", href: "#top" },
    { label: "About me", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "My Work", href: "#work" },
    { label: "Contact me", href: "#contact" },
  ];

  const openMenu = () => {
    sideMenuRef.current.style.transform = "translateX(-16rem)";
  };
  const closeMenu = () => {
    sideMenuRef.current.style.transform = "translateX(16rem)";
  };

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
            ? "bg-white/80 dark:bg-[#0b0118]/80 backdrop-blur-md shadow-sm"
            : ""
        }`}
      >
        <div>
          <GradientText
            colors={
              isDarkMode
                ? ["#94A3B8", "#E2E8F0", "#38BDF8"]
                : ["#0F172A", "#334155", "#1D4ED8"]
            }
            animationSpeed={2.5}
            className="text-4xl p-4 font-bold tracking-wide"
          >
            Zayd
          </GradientText>
        </div>

        <ul
          className={`hidden md:flex items-center gap-4 lg:gap-8 rounded-full px-12 py-3 transition-all duration-500 ${
            isScrolled
              ? "bg-transparent"
              : "bg-white dark:bg-[#2a004a] shadow-sm"
          }`}
        >
          {navLinks.map((link, index) => (
            <li key={index}>
              <a
                className="font-ovo dark:text-white hover:text-purple-500 transition-colors"
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            className="w-6 cursor-pointer dark:text-white"
            onClick={() => setIsDarkMode((prev) => !prev)}
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>

          <a
            href="#contact"
            className="hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 font-ovo rounded-full ml-4 dark:text-white dark:border-white/50 hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
          >
            Contact
            <ArrowRight size={16} />
          </a>

          <button
            className="flex md:hidden ml-4 cursor-pointer dark:text-white"
            onClick={openMenu}
          >
            <Menu size={28} />
          </button>
        </div>

        <ul
          ref={sideMenuRef}
          className="flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 h-screen bg-rose-50 dark:bg-[#11001f] transition duration-500 z-50"
        >
          <div className="absolute right-6 top-6" onClick={closeMenu}>
            <X size={24} className="cursor-pointer dark:text-white" />
          </div>

          {navLinks.map((link, index) => (
            <li key={index} onClick={closeMenu}>
              <a
                className="font-ovo dark:text-white text-lg block"
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
