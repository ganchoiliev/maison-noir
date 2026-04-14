import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A visual journey through Maison Noir — dishes, kitchen, and the counter experience.",
};

const images = [
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=70&auto=format",
    alt: "Fine dining plated dish with micro herbs",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=70&auto=format",
    alt: "Artfully plated main course",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&q=70&auto=format",
    alt: "Vibrant seasonal ingredients",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500&q=70&auto=format",
    alt: "Chef working in the kitchen",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&q=70&auto=format",
    alt: "Wine service at the counter",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=700&q=70&auto=format",
    alt: "Fresh seasonal produce",
    span: "col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1528712306091-ed0763094c98?w=500&q=70&auto=format",
    alt: "Hands preparing a delicate dish",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&q=70&auto=format",
    alt: "Dessert plating with precision",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500&q=70&auto=format",
    alt: "Beautifully composed breakfast dish",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=500&q=70&auto=format",
    alt: "Intimate dining atmosphere",
    span: "",
  },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-7xl px-6 py-section lg:px-8">
        <header className="mb-12 text-center">
          <p className="small-caps text-sm text-brass">Visual Journal</p>
          <h1 className="mt-2 font-display text-4xl text-bone md:text-5xl">Gallery</h1>
          <p className="mt-4 text-sm text-muted">
            Dishes, process, and the counter experience
          </p>
        </header>

        <GalleryGrid images={images} />
      </div>
    </div>
  );
}
