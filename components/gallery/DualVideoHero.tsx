"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface VideoOverlay {
  title: string;
  ctaLabel: string;
  ctaHref: string;
}

interface DualVideoHeroProps {
  videoLeft: string;
  videoRight: string;
  overlayLeft: VideoOverlay;
  overlayRight: VideoOverlay;
}

function VideoPanel({
  videoSrc,
  overlay,
  preload,
  delay = 0,
}: {
  videoSrc: string;
  overlay: VideoOverlay;
  preload: "auto" | "metadata";
  delay?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <div className="relative w-full md:w-1/2 h-screen md:h-full overflow-hidden">
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload={preload}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/15" />

      <div className="absolute top-[55%] left-0 right-0 -translate-y-1/2 z-10 pointer-events-none flex items-center justify-center">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay }}
        >
          <div className="w-full bg-white/10 backdrop-blur-md px-4 md:px-6 py-1.5">
            <h2 className="text-center text-sm md:text-base lg:text-lg font-medium text-white tracking-tight">
              {overlay.title}
            </h2>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: delay + 0.2 }}
        className="absolute bottom-10 md:bottom-16 lg:bottom-20 left-0 right-0 flex justify-center z-10"
      >
        <a
          href={overlay.ctaHref}
          className="inline-flex items-center justify-center gap-2 md:gap-3 px-5 md:px-8 py-2.5 md:py-3 bg-white/10 backdrop-blur-md text-white text-base md:text-xl lg:text-2xl tracking-tight transition-opacity duration-300 hover:opacity-70"
        >
          {overlay.ctaLabel}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="text-white/60"
          >
            <path
              d="M1 7h12m0 0L8 2.5M13 7l-5 4.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </motion.div>
    </div>
  );
}

export default function DualVideoHero({
  videoLeft,
  videoRight,
  overlayLeft,
  overlayRight,
}: DualVideoHeroProps) {
  return (
    <section data-nav-theme="light" className="relative flex flex-col md:flex-row w-full h-[200vh] md:h-screen bg-black">
      <VideoPanel
        videoSrc={videoLeft}
        overlay={overlayLeft}
        preload="auto"
        delay={0.3}
      />
      <VideoPanel
        videoSrc={videoRight}
        overlay={overlayRight}
        preload="metadata"
        delay={0.5}
      />

      {/* Desktop: split across video seam */}
      <motion.div
        className="absolute top-24 left-0 right-0 z-20 pointer-events-none hidden md:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      >
        <div className="flex justify-center">
          <h1 className="text-6xl lg:text-7xl font-medium tracking-tight flex">
            <span
              className="text-right text-white/75"
              style={{ width: "50vw", paddingRight: "0.15em", textShadow: "0 0 20px rgba(255,255,255,0.15), 0 0 60px rgba(255,255,255,0.05)" }}
            >
              Expo
            </span>
            <span
              className="text-left text-black/75"
              style={{ width: "50vw", paddingLeft: "0.15em", textShadow: "0 0 20px rgba(0,0,0,0.15), 0 0 60px rgba(0,0,0,0.05)" }}
            >
              Home
            </span>
          </h1>
        </div>
        <p
          className="mt-3 text-base tracking-tight text-center text-white/75"
          style={{ textShadow: "0 0 15px rgba(255,255,255,0.1)" }}
        >
          Multi-Brand Furniture Store | Tbilisi, Georgia
        </p>
      </motion.div>

      {/* Mobile: centered on first video */}
      <motion.div
        className="absolute top-20 left-0 right-0 z-20 pointer-events-none md:hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      >
        <h1 className="text-3xl font-medium tracking-tight text-center">
          <span
            className="text-white/50"
            style={{ textShadow: "0 0 20px rgba(255,255,255,0.15), 0 0 60px rgba(255,255,255,0.05)" }}
          >
            Expo
          </span>{" "}
          <span
            className="text-black/50"
            style={{ textShadow: "0 0 20px rgba(0,0,0,0.15), 0 0 60px rgba(0,0,0,0.05)" }}
          >
            Home
          </span>
        </h1>
        <p
          className="mt-2 text-xs tracking-tight text-center text-white/75"
          style={{ textShadow: "0 0 15px rgba(255,255,255,0.1)" }}
        >
          Multi-Brand Furniture Store | Tbilisi, Georgia
        </p>
      </motion.div>
    </section>
  );
}
