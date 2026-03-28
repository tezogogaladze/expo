"use client";

import { motion } from "framer-motion";

interface MinimalOverlayTextProps {
  lines: string[];
  position?: "center" | "bottom-left" | "bottom-right";
  size?: "large" | "small";
}

export default function MinimalOverlayText({
  lines,
  position = "bottom-left",
  size = "large",
}: MinimalOverlayTextProps) {
  const positionClass = {
    center: "inset-0 flex items-center justify-center text-center",
    "bottom-left": "inset-0 flex items-end p-8 lg:p-16",
    "bottom-right": "inset-0 flex items-end justify-end p-8 lg:p-16",
  }[position];

  return (
    <motion.div
      className={`absolute z-10 ${positionClass}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
    >
      <div>
        {lines.map((line, i) => (
          <p
            key={i}
            className={
              size === "large"
                ? i === 0
                  ? "text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-tight"
                  : "mt-3 text-sm md:text-base text-white/60 tracking-tight"
                : "text-xs text-neutral-300 tracking-tight"
            }
          >
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
}
