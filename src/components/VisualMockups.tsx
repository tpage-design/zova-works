import type { ImageMode } from "../types";

type HeroVisualProps = {
  note: string;
};

type ProductVisualProps = {
  type: "notebook" | "packaging" | "bag" | "kit";
  title: string;
  mode: ImageMode;
};

const productVisuals: Record<ProductVisualProps["type"], string> = {
  notebook: "/assets/product-notebooks-art-paper.png",
  packaging: "/assets/product-retail-packaging.png",
  bag: "/assets/product-paper-bags.png",
  kit: "/assets/product-art-kits.png"
};

export function HeroVisual({ note }: HeroVisualProps) {
  return (
    <div className="hero-visual hero-visual--still image-mode-scene" aria-label={note}>
      <img
        className="hero-mockup-image"
        src="/assets/hero-paper-products.png"
        alt="Premium paper products and packaging still-life mockup"
        draggable={false}
      />
      <p className="visual-note">{note}</p>
    </div>
  );
}

export function ProductVisual({ type, title, mode }: ProductVisualProps) {
  return (
    <div className={`product-visual product-visual--${type} image-mode-${mode}`}>
      <img src={productVisuals[type]} alt={`${title} mockup`} loading="lazy" />
    </div>
  );
}
