"use client";
import { useEffect, useRef, useState } from "react";
import { workData } from "../../assets/assets";
import { ArrowRight, ArrowLeft, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const Work = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      id="work"
      className="w-full px-[12%] py-10 scroll-mt-20 overflow-hidden"
    >
      <motion.h4
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mb-2 text-lg font-ovo capitalize dark:text-white"
      >
        my portfolio
      </motion.h4>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-5xl font-ovo capitalize dark:text-white"
      >
        my latest work
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo dark:text-white/80"
      >
        Explore a collection of projects showcasing my expertise in React,
        Next.js, and high-end UI implementation.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative"
      >
        <button
          ref={prevRef}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-11 h-11 rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 text-gray-700 dark:text-white" />
        </button>

        <button
          ref={nextRef}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-11 h-11 rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 backdrop-blur-sm"
        >
          <ArrowRight className="w-4 h-4 text-gray-700 dark:text-white" />
        </button>

        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectCoverflow]}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 80,
            modifier: 2.5,
            slideShadows: false,
          }}
          centeredSlides={true}
          slidesPerView={1.2}
          spaceBetween={20}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-bullet",
            bulletActiveClass: "swiper-bullet-active",
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onSwiper={(swiper) => {
            setTimeout(() => {
              if (swiper.params?.navigation) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              }
            });
          }}
          breakpoints={{
            640: { slidesPerView: 1.5, spaceBetween: 24 },
            768: { slidesPerView: 2.2, spaceBetween: 28 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
            1280: { slidesPerView: 3.5, spaceBetween: 32 },
          }}
          className="!pb-12"
        >
          {workData.map((project, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <motion.a
                  href={project.link}
                  target="_blank"
                  whileHover="hover"
                  className={`group relative block rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                    isActive
                      ? "shadow-2xl shadow-black/30 scale-100"
                      : "opacity-70 scale-95"
                  }`}
                  style={{ aspectRatio: "3/4" }}
                >
                  {/* Image */}
                  <motion.div
                    variants={{ hover: { scale: 1.04 } }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={project.bgImage}
                      alt={project.title}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 80vw, 33vw"
                    />
                  </motion.div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Live badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 text-[10px] text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <ExternalLink className="w-3 h-3" />
                    Live
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 w-full p-5">
                    <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {project.type || "Project"}
                    </p>
                    <div className="flex items-end justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white leading-tight drop-shadow-md">
                          {project.title}
                        </h3>
                        <p className="text-xs text-gray-300 mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                          {project.description}
                        </p>
                      </div>
                      <div className="shrink-0 w-9 h-9 bg-white rounded-full flex items-center justify-center text-black shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.a>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Custom pagination styles */}
      <style jsx global>{`
        .swiper-bullet {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: rgba(150, 150, 150, 0.4);
          margin: 0 3px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .swiper-bullet-active {
          width: 24px;
          background: #fff;
          opacity: 1;
        }
        .dark .swiper-bullet {
          background: rgba(255, 255, 255, 0.25);
        }
        .dark .swiper-bullet-active {
          background: #ffffff;
        }
      `}</style>
    </motion.div>
  );
};

export default Work;
