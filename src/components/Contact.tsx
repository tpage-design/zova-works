import { FormEvent } from "react";
import {
  contactConfig,
  hasEmail,
  hasFacebook,
  hasMessenger,
  hasWhatsApp
} from "../config/contact";
import { siteContent } from "../content/siteContent";
import type { Language } from "../types";
import { SectionHeading } from "./SectionHeading";

type ContactProps = {
  language: Language;
};

function createEmailHref(subject?: string, body?: string) {
  const params = new URLSearchParams();

  if (subject) {
    params.set("subject", subject);
  }

  if (body) {
    params.set("body", body);
  }

  const query = params.toString();
  return `mailto:${contactConfig.emailAddress}${query ? `?${query}` : ""}`;
}

export function Contact({ language }: ContactProps) {
  const content = siteContent.contact;
  const hasContactLinks = hasEmail || hasWhatsApp || hasFacebook || hasMessenger;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasEmail) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const subject = "ZOVA Works Project Inquiry";
    const lines = [
      `Name: ${formData.get("name") ?? ""}`,
      `Brand / Company: ${formData.get("brand") ?? ""}`,
      `Email: ${formData.get("email") ?? ""}`,
      `Product Type: ${formData.get("productType") ?? ""}`,
      `Estimated Quantity: ${formData.get("quantity") ?? ""}`,
      `Message: ${formData.get("message") ?? ""}`
    ];

    window.location.href = createEmailHref(subject, lines.join("\n"));
  };

  return (
    <section id="contact" className="section-shell contact">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} intro={content.body} language={language} />
      <div className={`contact-layout ${hasContactLinks ? "" : "contact-layout--form-only"}`}>
        <form className="contact-form reveal" onSubmit={handleSubmit}>
          <label>
            <span>{content.fields.name[language]}</span>
            <input name="name" autoComplete="name" required />
          </label>
          <label>
            <span>{content.fields.brand[language]}</span>
            <input name="brand" autoComplete="organization" />
          </label>
          <label>
            <span>{content.fields.email[language]}</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            <span>{content.fields.productType[language]}</span>
            <input name="productType" />
          </label>
          <label>
            <span>{content.fields.quantity[language]}</span>
            <input name="quantity" inputMode="numeric" />
          </label>
          <label className="field-wide">
            <span>{content.fields.message[language]}</span>
            <textarea name="message" rows={5} required />
          </label>
          <button className="button button--dark field-wide" type="submit" disabled={!hasEmail}>
            {content.submit[language]}
          </button>
          {!hasEmail ? <p className="contact-status field-wide">{content.updating[language]}</p> : null}
        </form>

        {hasContactLinks ? (
          <aside className="contact-aside reveal">
            {hasWhatsApp ? (
              <a className="contact-button accent-green" href={contactConfig.whatsAppHref} target="_blank" rel="noreferrer">
                <span>{content.whatsapp[language]}</span>
                <small>{contactConfig.whatsAppHref.replace("https://", "")}</small>
              </a>
            ) : null}
            {hasEmail ? (
              <a className="contact-button accent-blue" href={createEmailHref()}>
                <span>{content.email[language]}</span>
                <small>{contactConfig.emailAddress}</small>
              </a>
            ) : null}
            {hasFacebook ? (
              <a className="contact-button accent-blue" href={contactConfig.facebookHref} target="_blank" rel="noreferrer">
                <span>{content.facebook[language]}</span>
                <small>{contactConfig.facebookHref.replace("https://", "")}</small>
              </a>
            ) : null}
            {hasMessenger ? (
              <a className="contact-button accent-green" href={contactConfig.facebookMessengerHref} target="_blank" rel="noreferrer">
                <span>{content.messenger[language]}</span>
                <small>{contactConfig.facebookMessengerHref.replace("https://", "")}</small>
              </a>
            ) : null}
          </aside>
        ) : null}
      </div>
    </section>
  );
}

