"use client";
import React from "react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mt-20 py-12"
    >
      <div className="text-center">
        <motion.h2
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          className="w-max mx-auto mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Zayd<span className="text-purple-600"> .</span>
        </motion.h2>

        <motion.a
          whileHover={{ scale: 1.05 }}
          target="_blank"
          href="https://mail.google.com/mail/?view=cm&fs=1&to=elabbouszayd@gmail.com"
          className="w-max flex items-center gap-2 mx-auto text-gray-600 dark:text-white/70 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
        >
          <IoMailOutline size={20} />
          <span className="text-sm font-medium">elabbouszayd@gmail.com</span>
        </motion.a>
      </div>

      <div className="mx-[10%] mt-12 flex flex-col items-center justify-between border-t border-gray-400 dark:border-white/20 py-8 sm:flex-row gap-6">
        <p className="text-sm font-medium text-gray-500 dark:text-white/50">
          © {new Date().getFullYear()} Zayd. All rights reserved.
        </p>

        <ul className="flex items-center gap-8">
          {[
            {
              icon: <FaGithub size={22} />,
              label: "GitHub",
              href: "https://github.com/zayd-es",
              hover: "group-hover:text-black dark:group-hover:text-white",
            },
            {
              icon: <FaLinkedin size={22} />,
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/zayd-el-abbous-9a505b289/",
              hover: "group-hover:text-[#0077b5]",
            },
            {
              icon: <FaXTwitter size={22} />,
              label: "X",
              href: "https://x.com/m4be_zayd",
              hover: "group-hover:text-black dark:group-hover:text-white",
            },
          ].map((social, index) => (
            <motion.li
              key={index}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={social.href}
                className="group flex items-center gap-2 text-gray-600 dark:text-white/70 transition-all duration-300"
              >
                <span className={`${social.hover} transition-colors`}>
                  {social.icon}
                </span>
                <span
                  className={`hidden md:inline text-sm font-semibold ${social.hover} transition-colors`}
                >
                  {social.label}
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.footer>
  );
};

export default Footer;
