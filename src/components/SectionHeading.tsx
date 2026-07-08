import type { LocalizedString, Language } from "../types";

type SectionHeadingProps = {
  eyebrow: LocalizedString;
  title: LocalizedString;
  intro?: LocalizedString;
  language: Language;
  align?: "left" | "split";
};

export function SectionHeading({ eyebrow, title, intro, language, align = "split" }: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align} reveal`}>
      <span className="eyebrow">{eyebrow[language]}</span>
      <h2>{title[language]}</h2>
      {intro ? <p>{intro[language]}</p> : null}
    </div>
  );
}
