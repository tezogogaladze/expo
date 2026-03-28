import Image from "next/image";
import FadeIn from "./FadeIn";

interface SplitSectionProps {
  image: string;
  title: string;
  text: string;
  reverse?: boolean;
}

export default function SplitSection({
  image,
  title,
  text,
  reverse = false,
}: SplitSectionProps) {
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-32">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <FadeIn className={reverse ? "md:order-2" : ""}>
          <div className="aspect-[3/4] overflow-hidden bg-neutral-100">
            <Image
              src={image}
              alt={title}
              width={700}
              height={933}
              className="h-full w-full object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </FadeIn>

        <FadeIn className={reverse ? "md:order-1" : ""} delay={0.1}>
          <div className="max-w-md">
            <h2 className="text-3xl font-medium tracking-tight">{title}</h2>
            <p className="mt-6 text-neutral-500 leading-relaxed">{text}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
