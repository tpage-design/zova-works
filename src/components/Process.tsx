import { processSteps, siteContent } from "../content/siteContent";
import type { Language } from "../types";
import { SectionHeading } from "./SectionHeading";

type ProcessProps = {
  language: Language;
};

export function Process({ language }: ProcessProps) {
  const content = siteContent.process;

  return (
    <section id="process" className="section-shell process">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} language={language} />
      <div className="process-timeline">
        <div className="process-line">
          <span className="process-line-fill" />
        </div>
        {processSteps.map((step) => (
          <article className={`process-node accent-${step.accent}`} key={step.number}>
            <span className="process-dot" />
            <span className="process-number">{step.number}</span>
            <h3>{step.title[language]}</h3>
            <p>{step.body[language]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
