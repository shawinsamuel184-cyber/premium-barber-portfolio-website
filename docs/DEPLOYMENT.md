# 🚢 Deployment Guide

This document explains how to deploy the built **C-CUTZ** website to common static hosting platforms.

The project is a standard Vite static site; the production build is a single-file `dist/index.html` thanks to `vite-plugin-singlefile`, so it works on virtually any static host.

---

## 1. Build for production

```bash
npm install
npm run build
```

The result is a single file at `dist/index.html` that contains all HTML, CSS and JavaScript inlined.

You can test it locally:

```bash
npm run preview
```

---

## 2. GitHub Pages

### Option A — Deploy via GitHub Actions (recommended)

1. Push the repository to GitHub.
2. Go to **Settings → Pages** in the repo.
3. Under **Build and deployment**, set the source to **GitHub Actions**.
4. Create a workflow file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

5. Push to `main` — GitHub will build and deploy automatically.

### Project pages (subpath) caveat

If your site is hosted at `your-username.github.io/c-cutz/`, set Vite's `base` option in `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/c-cutz/",
});
```

---

## 3. Vercel

1. Push the repo to GitHub (or GitLab / Bitbucket).
2. Visit [vercel.com/new](https://vercel.com/new) and import the project.
3. Vercel will auto-detect Vite.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Click **Deploy**.

No extra environment variables are required.

---

## 4. Netlify

### Option A — connect your repo

1. Log into Netlify, click **Add new site → Import an existing project**.
2. Pick your Git provider and select the repo.
3. Build command: `npm run build`.
4. Publish directory: `dist`.
5. Click **Deploy site**.

### Option B — drag & drop

After running `npm run build`, open Netlify's **Sites** page and drop the `dist/` folder directly into the drop zone. Done.

---

## 5. Cloudflare Pages

1. Log in to Cloudflare Pages → **Create a project → Connect to Git**.
2. Select the repo, then set:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
3. Save and deploy.

---

## 6. cPanel / Traditional hosting

Because `dist/index.html` is a single self-contained file:

1. Run `npm run build`.
2. Open your hosting file manager / FTP.
3. Upload `dist/index.html` to your `public_html` folder (or whatever web root your host uses).
4. If using a subdirectory, place it there.

No Node server is required on the host — it's plain static HTML.

---

## 7. Custom domain

Once deployed:

1. Buy a domain (or use an existing one).
2. Add a `CNAME` or `A` record provided by your host (Vercel/Netlify/GitHub Pages all give you DNS targets).
3. Enforce HTTPS (all of the hosts above do this automatically once DNS resolves).

---

## 8. Performance & SEO notes

- The single-file build is already optimized for first paint.
- Consider adding a `robots.txt` and `sitemap.xml` in the `public/` folder for SEO.
- Add Open Graph image in `index.html` for better link previews:

```html
<meta property="og:image" content="/og-image.jpg" />
```

Place `og-image.jpg` in `public/`.

---

## 9. Useful links

- [Vite deploy docs](https://vitejs.dev/guide/static-deploy)
- [GitHub Pages documentation](https://pages.github.com/)
- [Vercel documentation](https://vercel.com/docs)
- [Netlify documentation](https://docs.netlify.com/)
- [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/)
