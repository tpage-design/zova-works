import { useEffect, useState } from "react";
import type { Language } from "../types";

const STORAGE_KEY = "zova-language";

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return "en";
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "zh" ? "zh" : "en";
  });

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const setLanguage = (nextLanguage: Language) => {
    const scrollY = window.scrollY;
    setLanguageState(nextLanguage);
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
    });
  };

  return { language, setLanguage };
}
