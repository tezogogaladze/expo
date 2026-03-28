"use client";

import { useRef, useEffect } from "react";
import MinimalOverlayText from "./MinimalOverlayText";

interface VideoHeroProps {
  video: string;
}

export default function VideoHero({ video }: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={video}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/20" />

      <MinimalOverlayText
        lines={[
          "Expo Home",
          "Multi-brand furniture store",
          "Tbilisi, Georgia",
        ]}
        position="bottom-left"
        size="large"
      />
    </section>
  );
}
