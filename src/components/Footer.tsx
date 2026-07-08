import { siteContent } from "../content/siteContent";
import type { Language } from "../types";

type FooterProps = {
  language: Language;
};

export function Footer({ language }: FooterProps) {
  const content = siteContent.footer;

  return (
    <footer className="footer">
      <div>
        <strong>ZOVA Works</strong>
        <p>{content.tagline[language]}</p>
      </div>
      <nav aria-label="Footer">
        <span>{content.custom[language]}</span>
        <span>{content.packaging[language]}</span>
        <span>{content.location[language]}</span>
      </nav>
      <small>{content.copyright[language]}</small>
    </footer>
  );
}
