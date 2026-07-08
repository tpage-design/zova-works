# ZOVA Works Brand Page

A high-end, minimalist single-page React brand site for ZOVA Works. The page is built with Vite, React, TypeScript, GSAP, and ScrollTrigger, and can be deployed to Vercel as a static frontend.

## Local Development

```bash
pnpm install
pnpm dev
```

## Local Build

```bash
pnpm build
```

## Contact Configuration

All contact details are configured in:

```text
src/config/contact.ts
```

Replace the email placeholder with your real email address:

```ts
emailAddress: "your-real-email@example.com"
```

WhatsApp links should use country code + phone number, without `+`, spaces, or hyphens:

```text
https://wa.me/8613812345678
```

Facebook and Messenger links are optional. If `facebookHref` or `facebookMessengerHref` is empty, the related button is hidden automatically.

The inquiry form uses a standard mailto link with the recipient, subject, and message prefilled. It is not an automatic email system, backend, database, or paid form service.

## Edit Bilingual Copy

All English and Chinese page copy lives in:

```text
src/content/siteContent.ts
```

The language switch defaults to English, stores the user's choice in `localStorage`, and preserves the current scroll position when switching.

## Theme

Color tokens are centralized in:

```text
src/config/theme.ts
```

The CSS variables in `src/styles/global.css` mirror those tokens for styling.

## Deploy To Vercel

1. Upload or push this project to GitHub.
2. In Vercel, choose **Import Repository**.
3. Set **Framework Preset** to **Vite**.
4. Set **Build Command** to:

```bash
pnpm build
```

5. Set **Output Directory** to:

```text
dist
```

6. Deploy.

## Notes

- Avoid adding unverified claims about paper composition, operating scale, commercial volume, or formal third-party approvals unless they are formally confirmed.
- Motion respects `prefers-reduced-motion`; users who prefer reduced motion get simplified animation behavior.
- Product and factory images can be replaced later through the files in `public/assets` without changing the page structure.


