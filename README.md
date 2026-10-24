# Zayd Elabbous — Portfolio

Personal portfolio built with Next.js 16 (App Router), TypeScript and Tailwind CSS 4.
Motion, GSAP + ScrollTrigger, Lenis and React Three Fiber for the animations, next-intl
for 5 languages (EN, FR, AR with RTL, ES, DE), and Resend for the contact form.

## Run it

```bash
npm install
# create .env.local with the variables listed below
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`.

### Environment variables

| Name | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | Public URL, used for metadata, hreflang, sitemap and OG images |
| `RESEND_API_KEY` | for the contact form | Resend API key (server only) |
| `CONTACT_FROM_EMAIL` | no | Sender, e.g. `Zayd <hello@your-domain.com>` once a domain is verified in Resend. Defaults to `onboarding@resend.dev`, which only delivers to your Resend account email |

## Add a project

1. Put a 16:10 cover image in `src/assets/projects/` (e.g. `my-project.jpg`, ~1600×1000).
2. Add an entry to `src/data/projects.ts` (`slug`, `title`, `cover`, `stack`, `links`, optional `featured` / `draft`).
3. Add its texts under `projects.items.<slug>` in **every** file in `messages/`
   (`category`, `role`, `summary`, `description`, `highlights` array).

The card, the detail page (`/projects/<slug>`), the sitemap entry and the next-project link are generated automatically.

## Add a language

1. Add the code to `locales` in `src/i18n/routing.ts`, and its name to `localeNames`
   (and to `rtlLocales` if it's right-to-left).
2. Copy `messages/en.json` to `messages/<code>.json` and translate it.
3. Add its Open Graph locale to `ogLocales` in `src/app/[locale]/layout.tsx`.

## Resume

Put the PDF in `public/` and set `resume: "/your-file.pdf"` in `src/data/profile.ts`: a download button appears in the About section.

## Project structure

```
messages/                 translations (one JSON per language)
src/app/[locale]/         pages, layout, OG image, 404
src/app/api/contact/      contact form endpoint (Resend + rate limit)
src/components/           sections (hero, about, skills, projects, services, contact) + layout & motion primitives
src/data/                 profile, skills, projects, services
src/i18n/                 next-intl routing and request config
src/proxy.ts              locale detection / redirects
```
