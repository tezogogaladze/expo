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
}: {
  videoSrc: string;
  overlay: VideoOverlay;
  preload: "auto" | "metadata";
  onReady?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

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
      className="relative w-full md:w-1/2 h-screen md:h-full overflow-hidden block cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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

      <div className="absolute left-0 right-0 -translate-y-1/2 z-10 pointer-events-none flex items-center justify-center top-[55%] md:top-[calc(50%_+_1rem_+_6vw)]">
        <div className="w-full bg-white/10 backdrop-blur-md px-4 md:px-6 py-1.5">
          <h2
            className="text-center text-sm md:text-base lg:text-lg font-light text-white tracking-tight"
            style={{ fontFamily: "var(--font-mkafio), sans-serif" }}
          >
            {overlay.title}
          </h2>
        </div>
      </div>

      <div className="absolute bottom-6 md:bottom-10 lg:bottom-14 left-0 right-0 flex justify-center z-10 pointer-events-none">
        <span
          className={`inline-flex items-center justify-center gap-2 md:gap-3 px-7 md:px-12 py-1.5 md:py-2 backdrop-blur-md text-lg md:text-2xl lg:text-3xl tracking-tight transition-all duration-300 ${
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

export default function DualVideoHero({
  videoLeft,
  videoRight,
  overlayLeft,
  overlayRight,
}: DualVideoHeroProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [lineComplete, setLineComplete] = useState(false);
  const ready = videoLoaded && lineComplete;

  const onVideoReady = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  return (
    <section data-nav-theme="light" className="relative flex flex-col md:flex-row w-full h-[200vh] md:h-screen bg-white">
      <VideoPanel
        videoSrc={videoLeft}
        overlay={overlayLeft}
        preload="auto"
        onReady={onVideoReady}
      />
      <VideoPanel
        videoSrc={videoRight}
        overlay={overlayRight}
        preload="auto"
        onReady={onVideoReady}
      />

      {/* Loading cover — white with expanding vertical line */}
      <AnimatePresence>
        {!ready && (
          <motion.div
            className="absolute inset-0 z-30 bg-white flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="w-[2.5px] rounded-full"
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

      {/* Watermark */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-20 pointer-events-none select-none"
        style={{ height: "200vh" }}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      >
        {/* Desktop — split layout */}
        <div className="hidden md:flex items-start justify-between px-[3%] pt-24 h-screen">
          <h1 className="text-[12vw] font-medium tracking-tight text-white/[0.07] w-full flex justify-between">
            <span className="text-right" style={{ width: "47%" }}>Expo</span>
            <span className="text-right" style={{ width: "50%" }}>Home</span>
          </h1>
        </div>
        {/* Mobile — "Expo" top-right of first video, "Home" top-right of second video */}
        <div className="md:hidden">
          <div className="h-screen flex items-start justify-end pr-[5%] pt-20">
            <span className="text-[15vw] font-medium tracking-tight text-white/[0.07]">Expo</span>
          </div>
          <div className="h-screen flex items-start justify-end pr-[5%] pt-20">
            <span className="text-[15vw] font-medium tracking-tight text-white/[0.07]">Home</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
