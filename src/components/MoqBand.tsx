import { siteContent } from "../content/siteContent";
import type { Language } from "../types";

type MoqBandProps = {
  language: Language;
};

export function MoqBand({ language }: MoqBandProps) {
  const content = siteContent.moq;

  return (
    <section className="moq-band">
      <div className="moq-band__inner">
        <div className="moq-copy reveal">
          <span className="eyebrow eyebrow--dark">{content.eyebrow[language]}</span>
          <h2>{content.title[language]}</h2>
          <p>{content.body[language]}</p>
          <small>{content.note[language]}</small>
        </div>
        <div className="moq-numbers reveal">
          <div>
            <strong data-count="100">0+</strong>
            <span>{content.firstLabel[language]}</span>
          </div>
          <div>
            <strong data-count="500">0+</strong>
            <span>{content.secondLabel[language]}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

