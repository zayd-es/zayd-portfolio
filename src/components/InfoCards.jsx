"use client";
import { motion } from "framer-motion";

const InfoCards = ({ infoList = [] }) => {
  return (
    <motion.ul
      className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
    >
      {infoList?.map((item, index) => (
        <motion.li
          key={index}
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ y: -8 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="group relative"
        >
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-500 dark:border-white/10 dark:bg-[#1a1625] group-hover:border-transparent group-hover:bg-gray-50 dark:group-hover:bg-[#221d2e]">
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 blur-2xl transition-all duration-500 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 group-hover:opacity-100" />

            <motion.div
              className="mb-4 text-2xl text-gray-700 dark:text-white/90"
              whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              {item.Icon && <item.Icon />}
            </motion.div>

            <h3 className="mb-2 font-semibold text-gray-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
              {item.title}
            </h3>

            <p className="text-sm text-gray-600 transition-colors duration-300 dark:text-white/70 group-hover:text-gray-700 dark:group-hover:text-white/90">
              {item.description}
            </p>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default InfoCards;
