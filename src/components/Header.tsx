import { useEffect, useState } from "react";
import { languages, siteContent } from "../content/siteContent";
import type { Language } from "../types";

type HeaderProps = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const navItems = [
  ["capabilities", "#capabilities"],
  ["products", "#products"],
  ["process", "#process"],
  ["about", "#about"],
  ["contact", "#contact"]
] as const;

export function Header({ language, setLanguage }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const nav = siteContent.nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <a className="brand-mark" href="#top" onClick={closeMenu} aria-label="ZOVA Works home">
        <span>ZOVA</span>
        <span>Works</span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-expanded={isOpen}
        aria-controls="site-navigation"
      >
        {isOpen ? nav.close[language] : nav.menu[language]}
      </button>

      <nav id="site-navigation" className={`site-nav ${isOpen ? "is-open" : ""}`} aria-label="Main navigation">
        {navItems.map(([key, href]) => (
          <a key={key} href={href} onClick={closeMenu}>
            {nav[key][language]}
          </a>
        ))}

        <div className="language-switch" aria-label="Language switcher">
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              className={language === item.code ? "is-active" : ""}
              onClick={() => {
                setLanguage(item.code);
                closeMenu();
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <a className="nav-cta" href="#contact" onClick={closeMenu}>
          {nav.cta[language]}
        </a>
      </nav>
    </header>
  );
}
