# 🛠 Installation Guide

This document walks through setting up the **C-CUTZ** barber portfolio project locally from scratch.

---

## 1. Prerequisites

Make sure you have the following installed on your machine:

| Tool | Minimum version | Recommended |
|---|---|---|
| Node.js | 18.x | **20.x LTS** or newer |
| npm | 9.x | latest |
| Git | any recent | latest |

> Check your versions with:
>
> ```bash
> node -v
> npm -v
> git --version
> ```

---

## 2. Clone the repository

```bash
git clone https://github.com/<your-username>/c-cutz.git
cd c-cutz
```

If you downloaded a `.zip` from GitHub instead, extract it and open the folder in your terminal.

---

## 3. Install dependencies

```bash
npm install
```

This will install all dependencies listed in `package.json`, including:

- `react`, `react-dom`
- `vite`, `@vitejs/plugin-react`
- `typescript`
- `tailwindcss`, `@tailwindcss/vite`
- `framer-motion`, `gsap`, `lenis`

---

## 4. Run the development server

```bash
npm run dev
```

Vite will print a local URL, usually:

```
  ➜  Local:   http://localhost:5173/
```

Open that in your browser. Edits to files in `src/` will hot-reload instantly.

---

## 5. Create a production build

```bash
npm run build
```

The compiled output goes into the `dist/` folder. Because the project uses `vite-plugin-singlefile`, everything is bundled into a single `dist/index.html` with inlined CSS/JS — great for quick static hosting.

To preview the production build locally:

```bash
npm run preview
```

---

## 6. Project configuration

### Environment variables

This project does **not** require any environment variables to run. All configuration lives inline in `src/App.tsx` and `vite.config.ts`.

If you later add API integrations (e.g. a booking backend), create a `.env` file in the project root:

```bash
VITE_API_URL=https://your-booking-api.example.com
```

Then access it via `import.meta.env.VITE_API_URL`.

### Changing the port

The dev server uses Vite's default (5173). To use a different port, add:

```ts
// vite.config.ts
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 3000 },
});
```

---

## 7. Troubleshooting

<details>
<summary><strong>Port 5173 is already in use</strong></summary>

Either close the other process or run Vite on a different port:

```bash
npm run dev -- --port 3000
```

</details>

<details>
<summary><strong>Images look broken / slow</strong></summary>

All images are loaded from Unsplash. If Unsplash is blocked on your network, replace the photo IDs in `src/App.tsx` with your own hosted images (see `docs/CUSTOMIZATION.md`). All `<img>` elements already have an SVG fallback for failed loads.

</details>

<details>
<summary><strong>Smooth scroll feels jittery on Windows?</strong></summary>

Lenis performs best at 60 FPS. If you see stuttering, try:

- Closing heavy browser tabs.
- Disabling browser extensions that inject scroll handlers.
- Testing in Chrome for the most consistent experience.

</details>

<details>
<summary><strong>Custom cursor disappears on mobile</strong></summary>

This is intentional — custom cursors are hidden on touch devices. Native touch cursors are used for better UX.

</details>

---

## 8. Next steps

- Read [`docs/CUSTOMIZATION.md`](CUSTOMIZATION.md) to brand it for your own barber studio.
- Read [`docs/DEPLOYMENT.md`](DEPLOYMENT.md) to publish the site.
- Read [`docs/CONTRIBUTING.md`](CONTRIBUTING.md) if you'd like to contribute improvements.
