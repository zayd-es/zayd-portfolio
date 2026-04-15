"use client";
import React, { useRef, useState } from "react";

export const MagicCard = ({
  children,
  className = "",
  gradientSize = 200,
  gradientColor = "#38bdf8",
  gradientOpacity = 0.8,
}) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setPosition({ x, y });
    divRef.current.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05) translateY(-6px)`;
    divRef.current.style.boxShadow = `
      ${rotateY * -1}px ${rotateX}px 30px rgba(0,0,0,0.2),
      0 20px 60px rgba(0,0,0,0.15),
      0 0 40px ${gradientColor}33
    `;
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    if (divRef.current) {
      divRef.current.style.transform =
        "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0px)";
      divRef.current.style.boxShadow = "none";
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`magic-card relative overflow-hidden rounded-xl border border-gray-300/60 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.03] ${className}`}
      style={{
        transition: "transform 0.08s ease-out, box-shadow 0.08s ease-out",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* Spotlight glow */}
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(${gradientSize}px circle at ${position.x}px ${position.y}px, ${gradientColor}55, transparent 100%)`,
        }}
      />

      {/* Spinning border */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
        style={{
          opacity,
          padding: "1.5px",
          background: `conic-gradient(from var(--magic-angle, 0deg), transparent 0%, #38bdf8 20%, #818cf8 40%, transparent 60%)`,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: opacity ? "magic-spin 2s linear infinite" : "none",
        }}
      />

      {/* Content lifted in Z */}
      <div
        className="relative z-10"
        style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
};
