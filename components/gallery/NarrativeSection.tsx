import FadeIn from "@/components/FadeIn";

interface NarrativeSectionProps {
  title: string;
  text: string;
}

export default function NarrativeSection({ title, text }: NarrativeSectionProps) {
  return (
    <section data-nav-theme="dark" className="py-20 md:py-32 lg:py-40">
      <FadeIn className="max-w-[900px] mx-auto px-6">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-light tracking-tight text-neutral-900">
            {title}
          </h2>
          <p className="mt-6 md:mt-8 text-sm md:text-base text-neutral-500 leading-relaxed max-w-[600px] mx-auto">
            {text}
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
