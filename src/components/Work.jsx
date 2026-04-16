"use client";
import { useState, useCallback, useEffect } from "react";
import { workData } from "../../assets/assets";
import { ArrowRight, ArrowLeft, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const StarRating = ({ level }) => (
  <div className="flex gap-[1px] sm:gap-[2px]">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg
        key={s}
        width="8"
        height="8"
        className="sm:w-[10px] sm:h-[10px]"
        viewBox="0 0 10 10"
      >
        <path
          d="M5 1l1.12 2.27L9 3.64l-2 1.95.47 2.75L5 7.01 2.53 8.34 3 5.59 1 3.64l2.88-.37L5 1z"
          fill={s <= level ? "#facc15" : "none"}
          stroke={s <= level ? "#facc15" : "rgba(156, 163, 175, 0.4)"}
          strokeWidth="0.8"
        />
      </svg>
    ))}
  </div>
);

const ProjectCard = ({ project, isCurrent }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full h-full rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1625] shadow-xl transition-all duration-500"
      onMouseEnter={() => isCurrent && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={project.bgImage}
          alt={project.title}
          fill
          className={`object-cover object-top transition-transform duration-700 ${isCurrent && hovered ? "scale-110" : "scale-100"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-full p-4 sm:p-7 flex flex-col justify-end overflow-hidden">
        {isCurrent ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <span className="inline-block text-[8px] sm:text-[9px] font-black text-white bg-blue-600 px-2 py-0.5 rounded-full mb-2 uppercase font-ovo">
              {project.type?.split(" ")[0] || "PRO"}
            </span>

            <h3 className="text-lg sm:text-2xl font-black text-white leading-tight mb-1 uppercase italic font-ovo line-clamp-1">
              {project.title}
            </h3>

            <p className="text-[9px] sm:text-[11px] text-gray-300 mb-3 sm:mb-5 line-clamp-2 font-ovo leading-relaxed">
              {project.description}
            </p>

            <div className="space-y-1.5 bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10">
              {project.tags?.slice(0, 4).map((tag, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-white font-ovo uppercase font-bold text-[8px] sm:text-[10px]"
                >
                  <span className="truncate mr-2">{tag.name}</span>
                  <StarRating level={tag.level} />
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="text-center pb-4 opacity-30">
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase italic truncate font-ovo">
              {project.title}
            </h3>
          </div>
        )}
      </div>

      {/* Hover Overlay Button */}
      {isCurrent && (
        <div
          className={`absolute inset-0 z-20 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 flex items-center justify-center ${hovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <a
            href={project.link}
            target="_blank"
            className="bg-white text-black text-[10px] font-black px-6 py-2.5 rounded-full hover:scale-105 transition-transform shadow-2xl"
          >
            VIEW CASE
          </a>
        </div>
      )}
    </div>
  );
};

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useCallback((dir) => {
    setCurrentIndex((prev) => (prev + dir + workData.length) % workData.length);
  }, []);

  const cards = [
    {
      id: "prev",
      index: (currentIndex - 1 + workData.length) % workData.length,
    },
    { id: "current", index: currentIndex },
    { id: "next", index: (currentIndex + 1) % workData.length },
  ];

  return (
    <section
      id="work"
      className="relative w-full px-4 py-16 sm:py-24 overflow-hidden  transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        <div className="text-center mb-10 sm:mb-16">
          <h4 className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-blue-600 font-bold font-ovo mb-2">
            Portfolio
          </h4>
          <h2 className="text-3xl sm:text-5xl font-black dark:text-white uppercase font-ovo tracking-tighter">
            Latest{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">
              Works
            </span>
          </h2>
        </div>

        <div
          className="relative w-full h-[380px] sm:h-[500px] flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 sm:left-10 z-50 p-3 rounded-full bg-white dark:bg-white/5 shadow-lg border border-gray-100 dark:border-white/10 hover:bg-gray-50 active:scale-90 transition-all"
          >
            <ArrowLeft className="w-5 h-5 dark:text-white" />
          </button>

          <div className="relative w-full max-w-[280px] sm:max-w-[340px] h-full">
            {cards.map(({ id, index }) => (
              <motion.div
                key={`${index}-${id}`}
                animate={{
                  x:
                    id === "prev"
                      ? isMobile
                        ? "-70%"
                        : "-85%"
                      : id === "next"
                        ? isMobile
                          ? "70%"
                          : "85%"
                        : "0%",
                  scale: id === "current" ? 1 : 0.7,
                  opacity: id === "current" ? 1 : 0.3,
                  rotateY: id === "prev" ? 25 : id === "next" ? -25 : 0,
                  zIndex: id === "current" ? 40 : 10,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                className="absolute inset-0"
              >
                <ProjectCard
                  project={workData[index]}
                  isCurrent={id === "current"}
                />
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => navigate(1)}
            className="absolute right-0 sm:right-10 z-50 p-3 rounded-full bg-white dark:bg-white/5 shadow-lg border border-gray-100 dark:border-white/10 hover:bg-gray-50 active:scale-90 transition-all"
          >
            <ArrowRight className="w-5 h-5 dark:text-white" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-10">
          {workData.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all ${currentIndex === i ? "w-8 bg-blue-600" : "w-2 bg-gray-300 dark:bg-white/10"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
