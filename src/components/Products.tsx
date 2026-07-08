import { products, siteContent } from "../content/siteContent";
import type { Language } from "../types";
import { ProductVisual } from "./VisualMockups";
import { SectionHeading } from "./SectionHeading";

type ProductsProps = {
  language: Language;
};

export function Products({ language }: ProductsProps) {
  const content = siteContent.products;

  return (
    <section id="products" className="section-shell products">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.intro} language={language} />
      <div className="products-editorial">
        {products.map((product, index) => (
          <article
            className={`product-direction accent-${product.accent} ${index % 2 === 1 ? "product-direction--reverse" : ""}`}
            key={product.id}
          >
            <div className="product-direction__copy">
              <span className="product-direction__number">{product.number}</span>
              <h3>{product.title[language]}</h3>
              <p>{product.subtitle[language]}</p>
              <ul>
                {product.items.map((item) => (
                  <li key={item.en}>{item[language]}</li>
                ))}
              </ul>
            </div>
            <div className="product-direction__media">
              <ProductVisual type={product.visual} title={product.title[language]} mode={product.imageMode} />
            </div>
            <small className="product-direction__capability">{product.directionNote[language]}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
