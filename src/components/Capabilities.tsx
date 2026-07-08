import { capabilities, siteContent } from "../content/siteContent";
import type { Language } from "../types";
import { SectionHeading } from "./SectionHeading";

type CapabilitiesProps = {
  language: Language;
};

export function Capabilities({ language }: CapabilitiesProps) {
  const content = siteContent.capabilities;

  return (
    <section id="capabilities" className="section-shell capabilities">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.intro} language={language} />
      <div className="capability-list">
        {capabilities.map((item) => (
          <article className={`capability-row accent-${item.accent}`} key={item.number}>
            <span className="capability-number">{item.number}</span>
            <div>
              <h3>{item.title[language]}</h3>
              <p>{item.body[language]}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
