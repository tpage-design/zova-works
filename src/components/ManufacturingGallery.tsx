import { siteContent } from "../content/siteContent";
import { manufacturingGallery } from "../data/manufacturingGallery";
import type { Language } from "../types";

type ManufacturingGalleryProps = {
  language: Language;
};

export function ManufacturingGallery({ language }: ManufacturingGalleryProps) {
  const content = siteContent.manufacturing;

  return (
    <section className="section-shell manufacturing" aria-labelledby="manufacturing-title">
      <header className="manufacturing__header reveal">
        <h2 id="manufacturing-title">{content.title[language]}</h2>
        <p className="manufacturing__lead">{content.body[language]}</p>
        <p className="manufacturing__support">{content.support[language]}</p>
        <p className="manufacturing__scene-note">{content.sceneNote[language]}</p>
      </header>

      <div className="manufacturing__gallery">
        {manufacturingGallery.map((item, index) => (
          <article
            className={`manufacturing-card manufacturing-card--${item.layoutType} reveal`}
            key={item.id}
          >
            <figure>
              <div className="manufacturing-card__media">
                <img
                  src={item.image}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: item.objectPosition }}
                />
              </div>
              <figcaption>
                <span className="manufacturing-card__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{language === "en" ? item.titleEn : item.titleZh}</h3>
                  <p>{language === "en" ? item.descriptionEn : item.descriptionZh}</p>
                </div>
              </figcaption>
            </figure>
          </article>
        ))}
      </div>
    </section>
  );
}
