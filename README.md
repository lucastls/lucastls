# Lucas Teodoro — Photography

A photography portfolio built with Next.js 16 App Router, React 19, TypeScript, and plain CSS. The design uses warm paper tones, olive accents, large serif headings, and the photographs from the existing public portfolio.

## Run locally

Requires Node.js 20.9 or later.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). No environment variables are required to preview the public pages. Photography is delivered from Cloudinary, so images still require an internet connection.

```sh
npm run build
npm start
```

Use a Next.js-compatible Node.js host or Vercel. The private album uses server actions and cookies, so this is not a static export. Configure the host to run `npm run build` and `npm start` instead of the former Gatsby commands.

## Pages

| Route                      | Content                                                                 |
| -------------------------- | ----------------------------------------------------------------------- |
| `/`                        | Featured photograph, selected work, and introduction                    |
| `/photography`             | Full collection, category filters, two grid densities, and image viewer |
| `/about`                   | Photographer introduction and optional contact links                    |
| `/natal-2022`              | Password-gated family album                                             |
| `/old_photography`, `/art` | Permanent redirects to `/photography`                                   |

The image viewer supports previous/next buttons, arrow keys, Escape, touch swipes, focus restoration, and native dialog focus trapping. The layout adapts to mobile screens and respects reduced-motion preferences.

## Photography and content

`src/data/photos.json` contains a snapshot of the **16 public photographs** on lucastls.com, captured on October 3, 2026. It includes original image URLs, dimensions, and blur placeholders. Descriptive alt text, categories, and suggested display titles were added for the redesign; the original Mercado Central caption is preserved. Review these titles and the draft About copy before publishing.

- Change titles, descriptions, and categories in `src/data/photos.json`.
- Choose the homepage feature in `src/app/page.tsx` and the four selected photographs in `selectPhotographs` in `src/lib/photos.ts`.
- Edit the About copy in `src/app/about/page.tsx`.
- Adjust colors, spacing, and typography in `src/app/globals.css`.
- The existing Work Sans font, favicons, and logo files have moved from `static/` into `public/`.
- Original starter MDX files remain in `content/` for reference; Next.js does not render them.

To enable live updates, copy `.env.example` to `.env.local` and set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`. Keep all three on the server. The [Cloudinary Admin API](https://cloudinary.com/documentation/admin_api#get_resources) reads images from the existing `photo/` public-ID prefix, including pagination, and the public pages revalidate hourly. The snapshot is used when credentials are absent or the public API request fails. A successfully loaded empty collection stays empty.

Cloudinary contextual metadata `caption`, `alt`, and `category` override snapshot values. Supported categories are `Street`, `Landscapes`, `Architecture`, and `Everyday`. Unclassified photos remain available under All photographs. The custom `next/image` loader uses Cloudinary to deliver responsive image sizes and formats.

## Private album

Set `NATAL_PASSWORD` and the Cloudinary credentials to use `/natal-2022`. The server verifies the password and creates a signed, expiring, HttpOnly session cookie. Private image metadata is fetched from `natal2022/` only after the session is verified. It is never included in the public snapshot or the sitemap, and the album page is marked `noindex`.

Sessions last 24 hours; changing the password invalidates existing sessions. Production cookies require HTTPS. This gates the album page; existing Cloudinary `upload` asset URLs retain their Cloudinary access policy.

## Optional contact links

Set `NEXT_PUBLIC_CONTACT_EMAIL` and/or `NEXT_PUBLIC_INSTAGRAM_URL` to show real contact links. Empty values omit those links. Set `SITE_URL` to the production origin (defaults to `https://lucastls.com`). Rebuild after changing public environment values.

## Validation

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm test
```

If Google Chrome is already installed, use `PLAYWRIGHT_CHANNEL=chrome npm test` instead of installing Chromium. Browser tests run against a production server on port 3100, use an isolated test password, and disable authenticated Cloudinary requests. They cover desktop and mobile navigation, filters, image viewer controls, focus restoration, layout overflow, password rejection, valid sessions, logout, tampered cookies, legacy redirects, and page metadata.

The app follows the [Next.js App Router](https://nextjs.org/docs/app) conventions. Next.js generates `AGENTS.md` and `CLAUDE.md` with guidance for future changes.
