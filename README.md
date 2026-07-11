<div align="center">

# ✂️ C-CUTZ — Premium Barber Portfolio

![C-CUTZ Banner](https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1600&q=80)

**An ultra-premium, cinematic barber portfolio & booking website.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animations-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth%20Scroll-000000)](https://lenis.darkroom.engineering/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

</div>

## 📖 Table of Contents

- [✨ Overview](#-overview)
- [🎨 Design & Theme](#-design--theme)
- [⚡ Features](#-features)
- [🖼️ Sections](#️-sections)
- [🚀 Quick Start](#-quick-start)
- [📦 Available Scripts](#-available-scripts)
- [🛠 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚢 Deployment](#-deployment)
  - [GitHub Pages](#github-pages)
  - [Vercel](#vercel)
  - [Netlify](#netlify)
- [🎨 Customization](#-customization)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Overview

**C-CUTZ** is a modern, single-page React + Vite + TypeScript portfolio website for a luxury barber / men's grooming studio. It was designed to feel like an Awwwards-style premium brand site — dark, warm, editorial, with smooth scrolling, cinematic reveals, and an integrated booking experience.

The site showcases the barber's work through a fast infinite-scrolling "58 cuts" gallery, a zig-zag animated timeline, a masonry-style work collage, premium service cards, rotating testimonials, a calendar-based booking UI, and a custom animated FAQ.

---

## 🎨 Design & Theme

| Token | Value | Purpose |
|---|---|---|
| Background | `#0A090C` | Deep warm black |
| Surface | `#141118` | Cards / panels |
| Accent | `#D4A373` | Warm copper / bronze |
| Text | `#F5EEE6` | Soft cream |
| Muted | `#9A9088` | Secondary text |

- Typography: **Poppins** (headings), **Inter** (body), **Playfair Display Italic** (accent display type).
- Fully responsive: mobile-first → tablet → desktop.
- Rounded, soft-corner UI language (rounded pills, rounded-3xl cards, no harsh boxes).

---

## ⚡ Features

- 🎞️ **Lenis** smooth scroll (Apple-quality momentum scrolling).
- ✂️ **Infinite horizontal marquee** with 58 numbered cuts (dual-direction, edge-fade mask).
- 🧭 **GSAP ScrollTrigger** zig-zag timeline that draws itself on scroll.
- 🎬 **Framer Motion** section reveals, hover states, carousel transitions.
- 🖱️ **Custom copper cursor** with hover-grow states (desktop only).
- 📈 **Gold top scroll-progress bar**.
- ⏳ **Preloader** with animated progress bar + logo.
- 🖼️ **Image fallback system** — broken images automatically swap to a branded SVG placeholder.
- 🗓️ **Booking UI** with calendar, time slots, service selector, and form.
- ⭐ **Testimonial carousel** (auto-rotate every 5s + prev/next).
- ❓ **FAQ accordion** with smooth expand/collapse.
- 🧲 Magnetic-style buttons with hover glow.
- 📱 Fully responsive grid + touch-friendly layouts.
- ♿ Semantic HTML, keyboard-accessible buttons/controls.

---

## 🖼️ Sections

1. **Preloader** — centered logo + loading percentage.
2. **Header / Nav** — transparent on top, blurred on scroll.
3. **Hero** — portrait + large "HI, I'M LAURIN" headline, tagline, CTA.
4. **58 Cuts Marquee** — infinite scrolling portfolio of finished work.
5. **Get an Idea of My Work** — collage + 3-step process with arrows.
6. **Storytime Timeline** — animated zig-zag journey (2015 → Today).
7. **Services** — premium service cards with pricing/duration.
8. **Testimonials** — featured center quote + side previews.
9. **Book an Appointment** — calendar, time, service form.
10. **FAQ** — expandable questions.
11. **Footer** — contact, hours, social links, copyright.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** (recommended: 20 LTS or newer)
- **npm** (or `pnpm` / `yarn` / `bun`)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/c-cutz.git

# 2. Enter the project folder
cd c-cutz

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Then open your browser at the URL Vite prints (usually `http://localhost:5173`).

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server (with HMR). |
| `npm run build` | Build production-ready files into `dist/`. |
| `npm run preview` | Preview the production build locally. |

Because this project uses **vite-plugin-singlefile**, `npm run build` outputs a single bundled `dist/index.html` that contains the JS and CSS inlined — perfect for quick static hosting.

---

## 🛠 Tech Stack

- **React 19** + **TypeScript**
- **Vite 7**
- **Tailwind CSS 4**
- **Framer Motion** — animations, transitions, gesture
- **GSAP** + **ScrollTrigger** — timeline draw
- **Lenis** — smooth scroll
- **clsx** + **tailwind-merge** — className utilities (preconfigured in the template)
- Google Fonts — Inter, Poppins, Playfair Display

---

## 📁 Project Structure

```
c-cutz/
├── index.html             # Root HTML, fonts, meta tags
├── package.json           # Dependencies + scripts
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript config
├── src/
│   ├── main.tsx           # React entry point
│   ├── App.tsx            # The entire website (sections + components)
│   ├── index.css          # Tailwind import + global styles
│   └── utils/
│       └── cn.ts          # className merge helper
├── public/                # Static assets (favicons, images, etc.)
├── docs/
│   ├── INSTALLATION.md    # Extended setup guide
│   ├── DEPLOYMENT.md      # Deployment walkthrough
│   ├── CUSTOMIZATION.md   # How to rebrand / edit content
│   ├── CONTRIBUTING.md    # Contribution guidelines
│   └── CHANGELOG.md       # Version history
├── README.md              # You are here
└── LICENSE                # MIT License
```

---

## 🚢 Deployment

### GitHub Pages

Because the build produces a single `dist/index.html`:

1. Go to **Repository Settings → Pages**.
2. Set **Source** to *GitHub Actions*.
3. Push your code to `main`. GitHub will build and deploy automatically.

> Tip: If you deploy to a *project page* (e.g. `yourname.github.io/c-cutz/`), set the Vite `base` option in `vite.config.ts` to `"/c-cutz/"`.

### Vercel

1. Import the repo on [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Vite**.
3. Build command: `npm run build`; output directory: `dist`.
4. Click **Deploy**.

### Netlify

1. Drag-and-drop the `dist` folder after `npm run build`, or connect the repo.
2. Build command: `npm run build`; publish directory: `dist`.

Full platform-specific walkthroughs live in [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

---

## 🎨 Customization

All site content is centralized at the top of [`src/App.tsx`](src/App.tsx):

- **Colors** — edit the `ACCENT`, `BG`, `CARD`, `CREAM` constants.
- **Hero** — `HERO_IMG`, hero headline text, CTA labels.
- **58 Cuts** — `CUT_PHOTOS` array of Unsplash photo IDs.
- **Timeline** — `timelineData` (years, titles, copy, images, side).
- **Services** — `servicesData`.
- **Testimonials** — `testimonials`.
- **FAQ** — `faqs`.
- **Contact details / hours** — footer JSX.

See [`docs/CUSTOMIZATION.md`](docs/CUSTOMIZATION.md) for a step-by-step guide (swapping photos, rebranding, changing copy, hosting your own assets).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "feat: add amazing feature"`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request

Before submitting, please run:

```bash
npm run build
```

and make sure the build succeeds. See [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md) for more details.

---

## 📄 License

Released under the [MIT License](LICENSE).

You are free to use this project for personal or commercial work. Attribution is appreciated but not required.

---

<div align="center">
  <p>Crafted with 🤎 and clippers.</p>
  <p><strong>C-CUTZ</strong> · Premium Barber Portfolio</p>
</div>
