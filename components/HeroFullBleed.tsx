"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroFullBleed() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src="/images/hero-showroom.png"
        alt="Expo Home showroom in Tbilisi"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      <div className="absolute inset-0 flex items-end">
        <motion.div
          className="px-6 lg:px-12 pb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-medium text-white tracking-tight">
            Expo Home
          </h1>
          <p className="mt-4 text-white/70 text-lg md:text-xl tracking-tight">
            Multi-brand furniture store
          </p>
          <p className="mt-1 text-white/50 text-sm tracking-tight">
            Tbilisi, Georgia
          </p>
        </motion.div>
      </div>
    </section>
  );
}
