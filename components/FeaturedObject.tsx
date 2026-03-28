import Image from "next/image";
import FadeIn from "./FadeIn";

interface FeaturedObjectProps {
  image: string;
  title: string;
  subtitle: string;
}

export default function FeaturedObject({
  image,
  title,
  subtitle,
}: FeaturedObjectProps) {
  return (
    <section className="py-32">
      <FadeIn className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
          <Image
            src={image}
            alt={title}
            width={1200}
            height={900}
            className="h-full w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
        <div className="mt-8 text-center">
          <h3 className="text-xl tracking-tight">{title}</h3>
          <p className="mt-2 text-neutral-500">{subtitle}</p>
        </div>
      </FadeIn>
    </section>
  );
}
