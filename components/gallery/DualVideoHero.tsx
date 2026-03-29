"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  onReady,
  hovered,
  onHover,
  onLeave,
}: {
  videoSrc: string;
  overlay: VideoOverlay;
  preload: "auto" | "metadata";
  onReady?: () => void;
  hovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const handleCanPlay = () => {
      vid.play().catch(() => {});
      onReady?.();
    };

    if (vid.readyState >= 3) {
      handleCanPlay();
    } else {
      vid.addEventListener("canplay", handleCanPlay, { once: true });
      return () => vid.removeEventListener("canplay", handleCanPlay);
    }
  }, [onReady]);

  return (
    <a
      href={overlay.ctaHref}
      className="relative w-full md:w-1/2 h-[50vh] md:h-full overflow-hidden block cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
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

      <div className="absolute left-0 right-0 -translate-y-1/2 z-10 pointer-events-none flex items-center justify-center top-[60%] md:top-[calc(50%_+_1rem_+_6vw)]">
        <div className={`w-full backdrop-blur-md px-4 md:px-6 py-1.5 transition-colors duration-300 ${hovered ? "bg-white/20" : "bg-white/10"}`}>
          <h2
            className={`text-center text-sm md:text-base lg:text-lg font-light tracking-tight transition-colors duration-300 ${hovered ? "text-white" : "text-white/70"}`}
            style={{ fontFamily: "var(--font-mkafio), sans-serif" }}
          >
            {overlay.title}
          </h2>
        </div>
      </div>

      <div className="absolute bottom-4 md:bottom-10 lg:bottom-14 left-0 right-0 flex justify-center z-10 pointer-events-none">
        <span
          className={`inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-12 py-1 md:py-2 backdrop-blur-md text-base md:text-2xl lg:text-3xl tracking-tight transition-all duration-300 ${
            hovered
              ? "bg-white/90 text-neutral-900"
              : "bg-white/10 text-white"
          }`}
          style={{ fontFamily: "var(--font-gordeziani), sans-serif" }}
        >
          {overlay.ctaLabel}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className={`transition-colors duration-300 ${hovered ? "text-neutral-900/60" : "text-white/60"}`}
          >
            <path
              d="M1 7h12m0 0L8 2.5M13 7l-5 4.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </a>
  );
}

const leftDesigners = [
  { name: "Angelo Donghia", font: "'Playfair Display', serif", className: "italic" },
  { name: "Warren Platner", font: "'Josefin Sans', sans-serif", className: "font-light" },
  { name: "Gerrit Rietveld", font: "'Space Mono', monospace", className: "text-lg lg:text-xl" },
];

const rightDesigners = [
  { name: "David Nightingale Hicks", font: "'Bodoni Moda', serif", className: "italic" },
  { name: "Terje Ekstrøm", font: "'Fredoka', sans-serif", className: "font-semibold" },
  { name: "Pierre Paulin", font: "'Comfortaa', sans-serif", className: "font-light" },
];

export default function DualVideoHero({
  videoLeft,
  videoRight,
  overlayLeft,
  overlayRight,
}: DualVideoHeroProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [lineComplete, setLineComplete] = useState(false);
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);
  const ready = videoLoaded && lineComplete;

  const onVideoReady = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  return (
    <section data-nav-theme="light" className="relative flex flex-col md:flex-row w-full h-screen bg-white">
      <VideoPanel
        videoSrc={videoLeft}
        overlay={overlayLeft}
        preload="auto"
        onReady={onVideoReady}
        hovered={leftHovered}
        onHover={() => setLeftHovered(true)}
        onLeave={() => setLeftHovered(false)}
      />
      <VideoPanel
        videoSrc={videoRight}
        overlay={overlayRight}
        preload="auto"
        onReady={onVideoReady}
        hovered={rightHovered}
        onHover={() => setRightHovered(true)}
        onLeave={() => setRightHovered(false)}
      />

      {/* Loading cover */}
      <AnimatePresence>
        {!ready && (
          <motion.div
            className="absolute inset-0 z-30 bg-white flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="w-[1px] rounded-full"
              initial={{
                height: "20px",
                backgroundColor: "rgba(0,0,0,0.12)",
                boxShadow: "0 0 12px rgba(0,0,0,0.03)",
              }}
              animate={videoLoaded ? {
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.25)",
                boxShadow: "0 0 30px rgba(0,0,0,0.06)",
              } : {
                height: "40vh",
                backgroundColor: "rgba(0,0,0,0.18)",
                boxShadow: "0 0 20px rgba(0,0,0,0.04)",
              }}
              transition={videoLoaded
                ? { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                : { duration: 4, ease: "easeInOut" }
              }
              onAnimationComplete={() => {
                if (videoLoaded) setLineComplete(true);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Designer names */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-20 pointer-events-none select-none"
        style={{ height: "100vh" }}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      >
        {/* Desktop */}
        <div className="hidden md:flex h-screen pt-20 lg:pt-24">
          <div className="w-1/2 flex flex-col items-center gap-4 lg:gap-5">
            {leftDesigners.map((d) => (
              <span
                key={d.name}
                className={`text-2xl lg:text-3xl transition-colors duration-300 ${d.className} ${leftHovered ? "text-white" : "text-white/50"}`}
                style={{ fontFamily: d.font }}
              >
                {d.name}
              </span>
            ))}
          </div>
          <div className="w-1/2 flex flex-col items-center gap-4 lg:gap-5">
            {rightDesigners.map((d) => (
              <span
                key={d.name}
                className={`text-2xl lg:text-3xl transition-colors duration-300 ${d.className} ${rightHovered ? "text-white" : "text-white/50"}`}
                style={{ fontFamily: d.font }}
              >
                {d.name}
              </span>
            ))}
          </div>
        </div>
        {/* Mobile */}
        <div className="md:hidden">
          <div className="h-[50vh] flex flex-col items-center pt-16 gap-3">
            {leftDesigners.map((d) => (
              <span
                key={d.name}
                className={`text-base text-white/50 ${d.className}`}
                style={{ fontFamily: d.font }}
              >
                {d.name}
              </span>
            ))}
          </div>
          <div className="h-[50vh] flex flex-col items-center pt-16 gap-3">
            {rightDesigners.map((d) => (
              <span
                key={d.name}
                className={`text-base text-white/50 ${d.className}`}
                style={{ fontFamily: d.font }}
              >
                {d.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
