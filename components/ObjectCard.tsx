import Image from "next/image";

interface ObjectCardProps {
  title: string;
  subtitle: string;
  image: string;
}

export default function ObjectCard({ title, subtitle, image }: ObjectCardProps) {
  return (
    <div className="group">
      <div className="aspect-[4/5] overflow-hidden bg-neutral-100">
        <Image
          src={image}
          alt={title}
          width={800}
          height={1000}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="mt-5">
        <h3 className="text-lg tracking-tight">{title}</h3>
        <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
      </div>
    </div>
  );
}
