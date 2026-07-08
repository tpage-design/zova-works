import { siteContent } from "../content/siteContent";
import type { Language } from "../types";

type RetailSetProofProps = {
  language: Language;
};

export function RetailSetProof({ language }: RetailSetProofProps) {
  const content = siteContent.retailSetProof;

  return (
    <section className="retail-proof" aria-labelledby="retail-proof-title">
      <div className="retail-proof__inner">
        <div className="retail-proof__heading">
          <span className="eyebrow eyebrow--dark">ZOVA Works</span>
          <h2 id="retail-proof-title">{content.title[language]}</h2>
        </div>
        <div className="retail-proof__body">
          <ul>
            {content.items.map((item, index) => (
              <li key={item.en} className={`accent-${["red", "blue", "green", "yellow"][index]}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item[language]}
              </li>
            ))}
          </ul>
          <p>{content.body[language]}</p>
        </div>
      </div>
    </section>
  );
}
