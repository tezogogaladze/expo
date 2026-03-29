import type { Metadata } from "next";
import Image from "next/image";
import MinimalNav from "@/components/MinimalNav";
import DualVideoHero from "@/components/gallery/DualVideoHero";
import NarrativeSection from "@/components/gallery/NarrativeSection";
import ObjectCard from "@/components/ObjectCard";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Expo Home — Multi-Brand Furniture Store",
  description:
    "Multi-brand furniture showroom in Tbilisi, Georgia. Curated collections from leading contemporary designers.",
};

const selectedObjects = [
  {
    title: "Platner Lounge Chair",
    subtitle: "Warren Platner — Knoll",
    image: "/images/platner-chairs.png",
  },
  {
    title: "Crushed Metal Vases",
    subtitle: "Polished stainless steel — Set of three",
    image: "/images/chrome-vases.png",
  },
  {
    title: "Utrecht Armchair",
    subtitle: "Gerrit Rietveld — Cassina",
    image: "/images/orange-utrecht-chairs.png",
  },
  {
    title: "Ekstrem Chair",
    subtitle: "Terje Ekstrøm — Stokke",
    image: "/images/ekstrem-chairs.png",
  },
];

export default function Home() {
  return (
    <>
      <MinimalNav />

      <DualVideoHero
        videoLeft="/videos/hero-1.mp4"
        videoRight="/videos/hero-2.mp4"
        overlayLeft={{
          title: "მიხეილ წინამძღვრიშვილის 125ა",
          ctaLabel: "ეწვიე შოურუმს",
          ctaHref: "#visit",
        }}
        overlayRight={{
          title: "შერჩეული კოლექცია",
          ctaLabel: "დაათვალიერე",
          ctaHref: "#collection",
        }}
      />

      <NarrativeSection
        title="A curated selection of contemporary furniture and collectible design"
        text="Each object is chosen for its material integrity and sculptural presence. The showroom operates as a gallery — a space where furniture exists as art, not commodity."
      />

      <FadeIn>
        <section data-nav-theme="light" className="relative w-full">
          <div className="aspect-[4/3] md:aspect-[21/9] overflow-hidden">
            <Image
              src="/images/gallery-chrome-chairs.png"
              alt="Chrome chairs in the Expo Home showroom"
              width={768}
              height={1024}
              unoptimized
              className="h-full w-full object-cover"
              sizes="100vw"
            />
          </div>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-6">
            <p className="text-xs text-neutral-400">
              Chrome lounge chairs — ground floor
            </p>
          </div>
        </section>
      </FadeIn>

      <section id="collection" data-nav-theme="dark" className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 md:py-32 lg:py-40">
        <FadeIn>
          <p className="text-xs text-neutral-400 tracking-widest uppercase mb-12 md:mb-20">
            Selected pieces
          </p>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-24">
          {selectedObjects.map((obj, i) => (
            <FadeIn key={obj.title} delay={i * 0.08}>
              <ObjectCard
                title={obj.title}
                subtitle={obj.subtitle}
                image={obj.image}
              />
            </FadeIn>
          ))}
        </div>
      </section>

      <section data-nav-theme="dark" className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
          <FadeIn>
            <div className="aspect-[3/4] overflow-hidden">
              <Image
                src="/images/mirror-red-bench.png"
                alt="Chrome mirror and red lacquer bench"
                width={700}
                height={933}
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="max-w-sm">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-light italic tracking-tight">
                Objects, not furniture
              </h2>
              <p className="mt-6 text-neutral-500 leading-relaxed text-sm md:text-base">
                We work with designers who treat material as language — chrome
                as liquid, foam as landscape, glass as atmosphere. Each piece
                is selected for its sculptural presence.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="visit" data-nav-theme="dark" className="py-20 md:py-32 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-start">
            <FadeIn>
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-light italic tracking-tight">Visit</h2>
                <div className="mt-8 space-y-4">
                  <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                    Tuesday — Saturday
                    <br />
                    11:00 — 19:00
                  </p>
                  <p className="text-sm md:text-base text-neutral-500 leading-relaxed">
                    მიხეილ წინამძღვრიშვილის 125ა
                    <br />
                    Tbilisi, Georgia
                  </p>
                  <a
                    href="mailto:hello@expohome.ge"
                    className="inline-block mt-4 text-sm text-neutral-900 underline underline-offset-4 hover:opacity-60 transition-opacity"
                  >
                    hello@expohome.ge
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="aspect-square md:aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.089622836314!2d44.791907476606774!3d41.718584875385616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440d003e33198f%3A0xf4041662351d926!2sExpo%20Home!5e0!3m2!1sen!2sge!4v1774712205877!5m2!1sen!2sge"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
