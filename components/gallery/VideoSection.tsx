"use client";

import { useRef, useEffect, useState } from "react";

interface VideoSectionProps {
  video: string;
  caption?: string;
}

export default function VideoSection({ video, caption }: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    if (inView) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [inView]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={video}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/10" />

      {caption && (
        <div className="absolute bottom-8 left-8 lg:bottom-16 lg:left-16 z-10">
          <p className="text-xs text-white/50 tracking-tight">{caption}</p>
        </div>
      )}
    </section>
  );
}
