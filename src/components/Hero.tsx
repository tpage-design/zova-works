import { siteContent } from "../content/siteContent";
import type { Language } from "../types";
import { HeroVisual } from "./VisualMockups";

type HeroProps = {
  language: Language;
};

export function Hero({ language }: HeroProps) {
  const content = siteContent.hero;

  return (
    <section id="top" className={`hero section-shell hero--${language}`}>
      <div className="hero-copy">
        <span className="eyebrow hero-animate">{content.kicker[language]}</span>
        <h1 className="hero-title hero-animate">
          {content.title[language].split("\n").map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <p className="hero-subtitle hero-animate">{content.subtitle[language]}</p>
        <p className="hero-capability-tag hero-animate">{content.capabilityTag[language]}</p>
        <div className="hero-actions hero-animate">
          <a className="button button--dark" href="#contact">
            {content.primaryCta[language]}
          </a>
          <a className="button button--quiet" href="#products">
            {content.secondaryCta[language]}
          </a>
        </div>
        <p className="coordination-line hero-animate">{content.coordinationLine[language]}</p>
      </div>

      <div className="hero-visual-wrap">
        <HeroVisual note={content.visualNote[language]} />
      </div>
    </section>
  );
}


