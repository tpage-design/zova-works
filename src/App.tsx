import { useRef } from "react";
import { About } from "./components/About";
import { Capabilities } from "./components/Capabilities";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { LeadTool } from "./components/LeadTool";
import { ManufacturingGallery } from "./components/ManufacturingGallery";
import { MoqBand } from "./components/MoqBand";
import { Process } from "./components/Process";
import { Products } from "./components/Products";
import { RetailSetProof } from "./components/RetailSetProof";
import { useLanguage } from "./hooks/useLanguage";
import { usePageAnimations } from "./hooks/usePageAnimations";

function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage } = useLanguage();

  usePageAnimations(pageRef, language);

  return (
    <div className="app" ref={pageRef}>
      <Header language={language} setLanguage={setLanguage} />
      <main>
        <Hero language={language} />
        <Capabilities language={language} />
        <Products language={language} />
        <RetailSetProof language={language} />
        <Process language={language} />
        <MoqBand language={language} />
        <About language={language} />
        <ManufacturingGallery language={language} />
        <Contact language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
}

export default function App() {
  const pathname = window.location.pathname.replace(/\/$/, "");

  if (pathname === "/lead-tool") {
    return <LeadTool />;
  }

  return <HomePage />;
}