# 🤝 Contributing to C-CUTZ

First off — thank you for considering contributing! This project was built as a premium portfolio template, and improvements from the community are very welcome.

---

## 🐛 Reporting bugs

If you find something broken:

1. Check the [existing issues](../../issues) to see if it's already been reported.
2. If not, open a new issue with:
   - A clear title.
   - Steps to reproduce the bug.
   - Expected behavior.
   - Screenshots / screen recording if possible.
   - Your environment: browser, OS, Node version.

---

## ✨ Suggesting features

We're open to feature ideas! Please open an issue tagged **enhancement** describing:

- The problem you're trying to solve.
- Your proposed solution (with sketches/screenshots if you have them).
- Any alternative approaches you considered.

---

## 🔧 Setting up the dev environment

1. Fork the repository.
2. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/c-cutz.git
   cd c-cutz
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. Run the dev server:
   ```bash
   npm run dev
   ```

---

## 🧪 Before submitting a PR

Please make sure:

- [ ] `npm run build` completes with no errors.
- [ ] The site still looks good on mobile (320px), tablet (768px), and desktop (1280px+).
- [ ] No TypeScript / lint errors are introduced.
- [ ] Animations don't break prefers-reduced-motion (the project doesn't currently have a global toggle — if you're adding heavy motion, please wrap it appropriately).
- [ ] You've added comments for non-obvious logic.

---

## 📝 Pull request process

1. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
2. Open a pull request against `main`.
3. In your PR description, include:
   - What you changed and why.
   - Screenshots/screen recordings for UI changes.
   - Any related issue numbers (e.g. "Closes #42").
4. A maintainer will review as soon as possible.

---

## 🎨 Code style guidelines

- Use **TypeScript** for all new components/utilities.
- Prefer function components and hooks.
- Keep styling in Tailwind utility classes wherever possible.
- Keep animations consistent with the existing brand (smooth, subtle, premium — no cartoonish bounces).
- Use the existing color tokens (`ACCENT`, `BG`, `CARD`, `CREAM`) instead of hardcoding colors in JSX.
- Use semantic HTML: `<section>`, `<header>`, `<footer>`, `<nav>`, `<button>`, `<a>`, etc.

---

## 📁 What belongs where

- `src/App.tsx` — main website (sections + inline sub-components).
- `src/index.css` — global styles (fonts, scrollbars, resets, utility classes).
- `src/main.tsx` — React entry point.
- `docs/` — documentation (README expansion pages).
- `public/` — static assets (favicons, OG images, fonts, downloadable files).

---

## 🚫 Things we probably won't merge

- Large dependencies for trivial features (please keep the bundle lean).
- Over-the-top animations that hurt performance.
- Hardcoded colors that ignore the brand tokens.
- Non-accessible UI (no alt text, unlabeled inputs, etc.).
- Backend/server code — this is a static site template.

When in doubt, open an issue first to discuss.

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thanks again — happy cutting ✂️🤎
