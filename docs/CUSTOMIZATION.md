# 🎨 Customization Guide

This guide explains how to rebrand and tailor the **C-CUTZ** website for another barber, salon, or creative portfolio.

All core content lives near the top of [`src/App.tsx`](../src/App.tsx) in structured JavaScript/TypeScript constants — you rarely need to edit JSX structure.

---

## 1. Colors (theme)

At the top of `src/App.tsx` you'll find:

```ts
const ACCENT = "#D4A373";      // Copper / bronze
const ACCENT_RGB = "212, 163, 115";
const BG = "#0A090C";          // Deep warm black
const CARD = "#141118";        // Card / panel background
const CREAM = "#F5EEE6";       // Primary text
```

To change to another scheme, just update these four constants. The entire site (buttons, cursors, timeline, progress bar, glow blobs, etc.) pulls from them.

Suggested alternatives:

| Vibe | Accent | Background |
|---|---|---|
| Gold luxury | `#F5B321` | `#0F0B12` |
| Electric silver | `#C9D1D9` | `#0B0F14` |
| Burgundy | `#B83856` | `#10070C` |
| Emerald | `#2EE59D` | `#0A1410` |

If you change `ACCENT`, update `ACCENT_RGB` accordingly (convert hex → decimal `r, g, b`).

---

## 2. Typography

Fonts are loaded in two places:

1. **`index.html`** — Google Fonts links:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@700;800;900&family=Playfair+Display:ital,wght@1,700;1,800&display=swap" rel="stylesheet" />
```

2. **`src/index.css`** — the `body`, headings, and `.font-serif-italic` families.

Swap `Inter` / `Poppins` / `Playfair Display` for any fonts you prefer (e.g. *Clash Display*, *Satoshi*, *Bebas Neue*) and update the `font-family` declarations accordingly.

---

## 3. Brand / Logo / Header

The header brand text is currently **C-CUTZ**:

- In the preloader:
  ```tsx
  <p ...>C-CUTZ</p>
  ```
- In the header:
  ```tsx
  <p className="...">C-CUTZ</p>
  ```
- In the footer.

Replace those strings with your own name/studio name, or drop in an `<img src="/logo.svg" />` component instead.

The **"Book"** button icon is `ScissorsIcon` — you can change it to `CalendarIcon`, a phone icon, or a custom SVG by importing it and swapping the component.

---

## 4. Hero section

```tsx
const HERO_IMG = "https://...";
```

- Replace `HERO_IMG` with your own hero portrait (ideally 1600px wide, vertical/portrait orientation).
- Headline text: find the `<h1>` inside the hero and change `HI,` / `I'M LAURIN` to your name.
- Tagline paragraph: update the copy right below the headline.
- Call-to-action button: change the label in the `<AccentButton>` (“Book now”).

---

## 5. The "58 Cuts" marquee

```ts
const CUT_PHOTOS = [
  "photo-1503951458645-643d53bfd90f",
  // ...
];
```

- Add/remove Unsplash photo IDs here.
- The marquee always shows **58 tiles** total (29 unique photos are duplicated for seamless looping). If you want a different count, change:

```ts
Array.from({ length: 58 }, ...)
```

- To use your own images, replace the `CUT_PHOTOS` IDs with full URLs, and change `src: u(id, 500)` to `src: id` (or keep using the `u()` helper if they're Unsplash).
- Each card has an on-error fallback (`FALLBACK_IMG`), so broken URLs won't break the layout.

---

## 6. Collage ("Get an Idea of My Work")

```ts
const collage = [
  { src: "...", position: "..."} ,
  ...
];
```

Each entry has:

- `src` — image URL (use the `u()` helper for Unsplash).
- `position` — Tailwind absolute-position + width/height classes.

You can move images around by changing the positional classes (e.g. `left-[10%] top-[6%]`).

The **process steps** (Consultation → The Cut → Final Style) are defined in a `map()` array under the `Step progress with arrows` comment — change labels/descriptions there.

---

## 7. Story timeline

```ts
const timelineData = [
  {
    year: "2015",
    title: <>THE <span ...>BEGINNING</span></>,
    description: "...",
    image: u("...", 900),
    side: "right",
  },
  ...
];
```

For each milestone you can change:

- `year` — displayed above the image.
- `title` — JSX, so you can include line breaks and colored highlights.
- `description` — body copy.
- `image` — photo.
- `side` — `"left"` or `"right"` for zig-zag alternation.

If you add more than 5 milestones, you should extend the SVG `d` path in the timeline section to add more zig-zag turns.

---

## 8. Services

```ts
const servicesData = [
  { num: "01", name: "Signature Cut", price: "$40", duration: "45 min", image: "..." },
  ...
];
```

Add, remove, or edit entries. Cards are responsive (1 → 2 → 3 columns at different breakpoints).

---

## 9. Testimonials

```ts
const testimonials = [
  { name: "Robin B.", quote: "...", image: "..." },
  ...
];
```

The carousel auto-rotates every 5 seconds. You can change the interval in:

```ts
setInterval(..., 5000);
```

---

## 10. Booking section

The booking panel is primarily static UI. Key spots to edit:

- **Title** “what's up?” is a Playfair italic heading.
- **Description** under “Termine”.
- The **service <select>** options are generated from `servicesData`.
- The **time slots** array is `timeSlots`.
- The submit button label.

If you want to wire this up to a real booking backend (Google Calendar, Calendly, Acuity, a custom API), replace the form `onSubmit` handler with a `fetch()` call.

---

## 11. FAQ

```ts
const faqs = [
  { q: "How long does a haircut take?", a: "..." },
  ...
];
```

Edit questions/answers directly. The accordion automatically updates.

---

## 12. Footer / Contact info

Look for the `<footer>` at the bottom of `App.tsx`. You can edit:

- Brand tagline.
- Address (map pin + line).
- Phone & email.
- Working hours.
- Social links (Instagram, TikTok, Facebook icons already exist; add YouTube/X/Tinder/etc by copying one of the existing icon anchors).

---

## 13. Adding your own static assets

Place logos, favicons, custom fonts, OG images, or additional photos in the `public/` folder. Reference them with an absolute path:

```tsx
<img src="/logo.svg" alt="My logo" />
```

For favicons, update `index.html` with `<link rel="icon" href="/favicon.svg" />`.

---

## 14. Removing / adding sections

Sections are clearly marked with `{/* SECTION NAME */}` comments in `App.tsx`.

- To remove a section, delete the entire `<section>` block for it.
- To add a new section, copy the pattern:

```tsx
<section className="relative px-5 py-24 lg:px-10">
  <div className="mx-auto max-w-6xl">
    {/* content */}
  </div>
</section>
```

Wrap animations in `<motion.div>` / `gsap.effects` following the examples in the existing sections.

---

## 15. Turning off features

- **Custom cursor**: remove the `motion.div` labeled "Custom cursor" and the `move` event listener that feeds it.
- **Smooth scroll**: remove the `useEffect` that instantiates Lenis.
- **Scroll progress bar**: remove the first `motion.div` right under the preloader.
- **Preloader**: remove the `{loading && ...}` block at the top of the JSX and set `loading` to `false` immediately in state.

---

## 16. Accessibility reminders

When you customize:

- Keep text contrast high (cream text on the warm black passes AAA).
- Ensure form inputs have associated labels.
- Keep buttons as real `<button>` elements and links as `<a>` elements.
- Provide meaningful `alt` text for any new photos.
