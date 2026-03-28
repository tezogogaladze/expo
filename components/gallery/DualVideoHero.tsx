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

      <div
        className="absolute left-0 right-0 -translate-y-1/2 z-10 pointer-events-none flex items-center justify-center"
        style={{ top: "calc(50% + 1rem + 6vw)" }}
      >
        <div className="w-full bg-white/10 backdrop-blur-md px-4 md:px-6 py-1.5">
          <h2 className="text-center text-sm md:text-base lg:text-lg font-medium text-white tracking-tight">
            {overlay.title}
          </h2>
        </div>
      </div>

      <div className="absolute bottom-10 md:bottom-16 lg:bottom-20 left-0 right-0 flex justify-center z-10 pointer-events-none">
        <span
          className={`inline-flex items-center justify-center gap-2 md:gap-3 px-5 md:px-8 py-2.5 md:py-3 backdrop-blur-md text-base md:text-xl lg:text-2xl tracking-tight transition-all duration-300 ${
            hovered
              ? "bg-white/90 text-neutral-900"
              : "bg-white/10 text-white"
          }`}
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
  const [ready, setReady] = useState(false);

  const onVideoReady = useCallback(() => {
    setReady(true);
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

      {/* Loading cover — white, fades out once video is ready */}
      <AnimatePresence>
        {!ready && (
          <motion.div
            className="absolute inset-0 z-30 bg-white flex items-start justify-center pt-20 md:pt-24"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-[15vw] md:text-[12vw] font-medium tracking-tight text-neutral-900/10 select-none flex">
              <span className="text-right" style={{ width: "50vw", paddingRight: "0.15em" }}>Expo</span>
              <span className="text-left" style={{ width: "50vw", paddingLeft: "0.15em" }}>Home</span>
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Watermark — massive, stays after reveal */}
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none flex items-start justify-center pt-20 md:pt-24">
        <motion.h1
          className="text-[15vw] md:text-[12vw] font-medium tracking-tight text-white/[0.07] select-none flex"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        >
          <span className="text-right" style={{ width: "50vw", paddingRight: "0.15em" }}>Expo</span>
          <span className="text-left" style={{ width: "50vw", paddingLeft: "0.15em" }}>Home</span>
        </motion.h1>
      </div>
    </section>
  );
}
