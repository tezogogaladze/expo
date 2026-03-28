import Image from "next/image";
import FadeIn from "./FadeIn";
import type { GalleryImage } from "@/lib/data";

interface GalleryGridProps {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-32">
      <FadeIn>
        <h2 className="text-3xl font-medium tracking-tight mb-12">
          Showroom
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {images.map((img, i) => {
          const isWide = img.span === "wide";
          const isTall = img.span === "tall";

          return (
            <FadeIn
              key={img.src}
              className={`group overflow-hidden bg-neutral-100 ${
                isWide ? "md:col-span-2 md:row-span-1" : ""
              } ${isTall ? "md:row-span-2" : ""}`}
              delay={i * 0.05}
            >
              <div
                className={`relative w-full overflow-hidden ${
                  isWide
                    ? "aspect-[16/9]"
                    : isTall
                    ? "aspect-[3/5] md:h-full"
                    : "aspect-square"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  sizes={
                    isWide
                      ? "(max-width: 768px) 100vw, 66vw"
                      : "(max-width: 768px) 100vw, 33vw"
                  }
                />
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
