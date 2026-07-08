import { siteContent } from "../content/siteContent";
import type { Language } from "../types";
import { SectionHeading } from "./SectionHeading";

type AboutProps = {
  language: Language;
};

export function About({ language }: AboutProps) {
  const content = siteContent.about;

  return (
    <section id="about" className="section-shell about">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} language={language} />
      <div className="about-layout reveal">
        <div className="about-primary-copy">
          <p>{content.body[language]}</p>
          <p>{content.experience[language]}</p>
        </div>
        <div className="about-side-copy">
          <p>{content.note[language]}</p>
          <div className="project-experience-note">
            <span>{content.selected[language]}</span>
            <small>{content.selectedNote[language]}</small>
          </div>
        </div>
      </div>
    </section>
  );
}
