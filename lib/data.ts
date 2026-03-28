export interface ObjectItem {
  title: string;
  subtitle: string;
  image: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  span?: "wide" | "tall" | "normal";
}

export const objects: ObjectItem[] = [
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
];

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery-chrome-chairs.png",
    alt: "Chrome lounge chairs in the Expo Home showroom",
    span: "wide",
  },
  {
    src: "/images/gallery-green-lounge.png",
    alt: "Green leather swivel chair with blue modular sofa",
    span: "normal",
  },
  {
    src: "/images/gallery-chrome-topdown.png",
    alt: "Chrome chair from above on concrete floor",
    span: "normal",
  },
  {
    src: "/images/gallery-platner-light.png",
    alt: "Platner chair in natural afternoon light",
    span: "tall",
  },
  {
    src: "/images/gallery-mirror-sofa.png",
    alt: "Chrome mirror with blue sofa and glass table",
    span: "normal",
  },
];

export const splitSection = {
  image: "/images/mirror-red-bench.png",
  title: "Objects, not furniture",
  text: "Each piece in the showroom is selected for its sculptural presence. We work with designers who treat material as language — chrome as liquid, foam as landscape, glass as atmosphere.",
};

export const featuredObject = {
  image: "/images/featured-dark-vases.png",
  title: "Crushed Chrome Vessels",
  subtitle:
    "Handformed stainless steel — exhibited alongside ceramic works in the mezzanine gallery.",
};
