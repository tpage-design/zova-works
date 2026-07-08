import { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Language } from "../types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function usePageAnimations(scope: RefObject<HTMLElement | null>, language: Language) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) {
        return;
      }

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.defaults({ ease: "power2.out", duration: reduceMotion ? 0 : 0.72 });

      if (reduceMotion) {
        gsap.set(
          root.querySelectorAll(".reveal, .hero-animate, .hero-mockup-image, .capability-row, .product-direction, .retail-proof__inner"),
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
            scale: 1
          }
        );
        return;
      }

      const hero = gsap.timeline();
      hero
        .from(".hero-animate", {
          autoAlpha: 0,
          y: 24,
          stagger: 0.09,
          duration: 0.78
        })
        .from(
          ".hero-mockup-image",
          {
            autoAlpha: 0,
            y: 16,
            duration: 0.8
          },
          "-=0.32"
        );

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 20,
          scrollTrigger: {
            trigger: element,
            start: "top 84%",
            toggleActions: "play none none reverse"
          }
        });
      });

      ScrollTrigger.batch(".capability-row", {
        start: "top 86%",
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.62, overwrite: true }
          );
        }
      });

      gsap.from(".product-direction", {
        autoAlpha: 0,
        y: 24,
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".products-editorial",
          start: "top 78%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.from(".retail-proof__inner", {
        autoAlpha: 0,
        y: 18,
        scrollTrigger: {
          trigger: ".retail-proof",
          start: "top 82%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.fromTo(
        ".process-line-fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          ease: "none",
          scrollTrigger: {
            trigger: ".process-timeline",
            start: "top 76%",
            end: "bottom 52%",
            scrub: 0.8
          }
        }
      );

      gsap.utils.toArray<HTMLElement>(".process-node").forEach((node) => {
        ScrollTrigger.create({
          trigger: node,
          start: "top 72%",
          end: "bottom 44%",
          toggleClass: { targets: node, className: "is-active" }
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((counter) => {
        const target = Number(counter.dataset.count ?? "0");
        const state = { value: 0 };

        gsap.to(state, {
          value: target,
          duration: 1.1,
          scrollTrigger: {
            trigger: counter,
            start: "top 84%",
            once: true
          },
          onUpdate: () => {
            counter.textContent = `${Math.round(state.value)}+`;
          }
        });
      });
    },
    { scope, dependencies: [language], revertOnUpdate: true }
  );
}
