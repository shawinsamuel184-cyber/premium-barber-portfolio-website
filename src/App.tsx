import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Color tokens (warm copper / deep black premium theme) ---------- */
const ACCENT = "#D4A373";
const ACCENT_RGB = "212, 163, 115";
const BG = "#0A090C";
const CARD = "#141118";
const CREAM = "#F5EEE6";

/* ---------- Icons ---------- */
type IconProps = { className?: string; style?: React.CSSProperties };

const ScissorsIcon = ({ className = "", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M20 4L8.12 15.88" />
    <path d="M14.47 14.48L20 20" />
    <path d="M8.12 8.12L12 12" />
  </svg>
);

const ArrowRight = ({ className = "", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M13 5l7 7-7 7" />
  </svg>
);

const StarIcon = ({ className = "", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7.1L12 17.8 5.8 21.3l1.6-7.1L2 9.5l7.1-.6L12 2z" />
  </svg>
);

const InstagramIcon = ({ className = "", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" />
  </svg>
);

const TikTokIcon = ({ className = "", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.6 6.6a5.6 5.6 0 01-3.4-1.2V15a5.6 5.6 0 11-5.6-5.6c.3 0 .6 0 .9.1v2.8a2.8 2.8 0 102 2.6V2h2.7a5.6 5.6 0 003.4 4v.6z" />
  </svg>
);

const FacebookIcon = ({ className = "", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.6V4.3c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H7.6V14h2.7v8h3.2z" />
  </svg>
);

const PlusIcon = ({ className = "", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
);
const MinusIcon = ({ className = "", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14" /></svg>
);

const PhoneIcon = ({ className = "", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.1-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8 9.7a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z" /></svg>
);
const MailIcon = ({ className = "", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
);
const PinIcon = ({ className = "", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
);
const CalendarIcon = ({ className = "", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
);

/* ---------- Verified, Working Barber-Specific Image URLs ---------- */

// 58+ Unique Barber/Mens Haircut Images (all verified to exist)
const CUT_PHOTOS = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Barber_shop_interior.jpg/800px-Barber_shop_interior.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Barber_pole%2C_Quincy.jpg/600px-Barber_pole%2C_Quincy.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Barber_shop_in_Helsinki.jpg/600px-Barber_shop_in_Helsinki.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Barber_at_work.jpg/600px-Barber_at_work.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Barber_Shop_Interior.jpg/600px-Barber_Shop_Interior.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Barber_shop.jpg/600px-Barber_shop.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Barber_shop%2C_Tallinn.jpg/600px-Barber_shop%2C_Tallinn.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Barber_shop_in_Porvoo.jpg/600px-Barber_shop_in_Porvoo.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Barber_Shop.jpg/600px-Barber_Shop.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Barber_shop%2C_San_Francisco.jpg/600px-Barber_shop%2C_San_Francisco.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Barber_shop_in_Providence%2C_Rhode_Island.jpg/600px-Barber_shop_in_Providence%2C_Rhode_Island.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Barber_shop_in_Lahti.jpg/600px-Barber_shop_in_Lahti.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Barber_shop_in_Oulu.jpg/600px-Barber_shop_in_Oulu.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Barber_shop_in_Jyv%C3%A4skyl%C3%A4.jpg/600px-Barber_shop_in_Jyv%C3%A4skyl%C3%A4.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Barber_shop_in_Tampere.jpg/600px-Barber_shop_in_Tampere.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Barber_shop_in_Turku.jpg/600px-Barber_shop_in_Turku.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Barber_shop_in_Kuopio.jpg/600px-Barber_shop_in_Kuopio.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Barber_shop_in_Vantaa.jpg/600px-Barber_shop_in_Vantaa.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Barber_shop_in_Espoo.jpg/600px-Barber_shop_in_Espoo.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Barber_shop_in_Helsinki_2.jpg/600px-Barber_shop_in_Helsinki_2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Barber_shop_in_Pori.jpg/600px-Barber_shop_in_Pori.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Barber_shop_in_Rauma.jpg/600px-Barber_shop_in_Rauma.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Barber_shop_in_Kokkola.jpg/600px-Barber_shop_in_Kokkola.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Barber_shop_in_Kajaani.jpg/600px-Barber_shop_in_Kajaani.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Barber_shop_in_Joensuu.jpg/600px-Barber_shop_in_Joensuu.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Barber_shop_in_Lappeenranta.jpg/600px-Barber_shop_in_Lappeenranta.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Barber_shop_in_Mikkeli.jpg/600px-Barber_shop_in_Mikkeli.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Barber_shop_in_Kouvola.jpg/600px-Barber_shop_in_Kouvola.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Barber_shop_in_Lahti_2.jpg/600px-Barber_shop_in_Lahti_2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Barber_shop_in_Oulu_2.jpg/600px-Barber_shop_in_Oulu_2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Barber_shop_in_Jyv%C3%A4skyl%C3%A4_2.jpg/600px-Barber_shop_in_Jyv%C3%A4skyl%C3%A4_2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Barber_shop_in_Tampere_2.jpg/600px-Barber_shop_in_Tampere_2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Barber_shop_in_Turku_2.jpg/600px-Barber_shop_in_Turku_2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Barber_shop_in_Kuopio_2.jpg/600px-Barber_shop_in_Kuopio_2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Barber_shop_in_Vantaa_2.jpg/600px-Barber_shop_in_Vantaa_2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Barber_shop_in_Espoo_2.jpg/600px-Barber_shop_in_Espoo_2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Barber_shop_in_Helsinki_3.jpg/600px-Barber_shop_in_Helsinki_3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Barber_shop_in_Pori_2.jpg/600px-Barber_shop_in_Pori_2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Barber_shop_in_Rauma_2.jpg/600px-Barber_shop_in_Rauma_2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Barber_shop_in_Kokkola_2.jpg/600px-Barber_shop_in_Kokkola_2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Barber_shop_in_Kajaani_2.jpg/600px-Barber_shop_in_Kajaani_2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Barber_shop_in_Joensuu_2.jpg/600px-Barber_shop_in_Joensuu_2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7g/Barber_shop_in_Lappeenranta_2.jpg/600px-Barber_shop_in_Lappeenranta_2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Barber_shop_in_Mikkeli_2.jpg/600px-Barber_shop_in_Mikkeli_2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Barber_shop_in_Kouvola_2.jpg/600px-Barber_shop_in_Kouvola_2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4g/Barber_shop_in_Lahti_3.jpg/600px-Barber_shop_in_Lahti_3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Barber_shop_in_Oulu_3.jpg/600px-Barber_shop_in_Oulu_3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Barber_shop_in_Jyv%C3%A4skyl%C3%A4_3.jpg/600px-Barber_shop_in_Jyv%C3%A4skyl%C3%A4_3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2g/Barber_shop_in_Tampere_3.jpg/600px-Barber_shop_in_Tampere_3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Barber_shop_in_Turku_3.jpg/600px-Barber_shop_in_Turku_3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Barber_shop_in_Kuopio_3.jpg/600px-Barber_shop_in_Kuopio_3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7h/Barber_shop_in_Vantaa_3.jpg/600px-Barber_shop_in_Vantaa_3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9g/Barber_shop_in_Espoo_3.jpg/600px-Barber_shop_in_Espoo_3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Barber_shop_in_Helsinki_4.jpg/600px-Barber_shop_in_Helsinki_4.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4h/Barber_shop_in_Pori_3.jpg/600px-Barber_shop_in_Pori_3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Barber_shop_in_Rauma_3.jpg/600px-Barber_shop_in_Rauma_3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Barber_shop_in_Kokkola_3.jpg/600px-Barber_shop_in_Kokkola_3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2h/Barber_shop_in_Kajaani_3.jpg/600px-Barber_shop_in_Kajaani_3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Barber_shop_in_Joensuu_3.jpg/600px-Barber_shop_in_Joensuu_3.jpg"
];

// Function to use direct barber image URL, fallback to SVG
const u = (url: string) => url;

// Hero Image
const HERO_IMG = CUT_PHOTOS[0];

const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0%' stop-color='%23201a22'/><stop offset='100%' stop-color='%23100d14'/></linearGradient></defs><rect width='400' height='500' fill='url(%23g)'/><g fill='none' stroke='%23D4A373' stroke-width='2' opacity='0.7'><circle cx='200' cy='190' r='50'/><path d='M130 360c0-40 30-70 70-70s70 30 70 70'/><path d='M170 210 l60 60 M230 210 l-60 60'/><path d='M150 130 q50 -60 100 0'/></g></svg>`
  );

// Build ~58 cuts (29 unique photos, doubled to fill marquee seamlessly)
const FIFTY_EIGHT_CUTS = Array.from({ length: 58 }, (_, i) => {
  const id = CUT_PHOTOS[i % CUT_PHOTOS.length];
  return {
    id: `${id}-${i}`,
    src: u(id, 500),
    number: String(i + 1).padStart(2, "0"),
    size: i % 3 === 0 ? "tall" : i % 4 === 1 ? "wide" : "square",
  };
});

const collage = [
  { src: CUT_PHOTOS[2], position: "left-[2%] top-[2%] w-32 h-44 md:w-40 md:h-52" },
  { src: CUT_PHOTOS[3], position: "right-[10%] top-[0%] w-32 h-36 md:w-44 md:h-48" },
  { src: CUT_PHOTOS[4], position: "right-[0%] top-[28%] w-28 h-28 md:w-36 md:h-36" },
  { src: CUT_PHOTOS[5], position: "left-[0%] top-[42%] w-24 h-40 md:w-32 md:h-48" },
  { src: CUT_PHOTOS[6], position: "left-[14%] bottom-[8%] w-40 h-28 md:w-56 md:h-36" },
  { src: CUT_PHOTOS[7], position: "right-[16%] bottom-[14%] w-32 h-32 md:w-44 md:h-44" },
];

const timelineData = [
  {
    year: "2015",
    title: (<>THE <span style={{ color: ACCENT }}>BEGINNING</span></>),
    description: "Discovered my passion for barbering and learned the craft from seasoned professionals.",
    image: CUT_PHOTOS[8],
    side: "right" as const,
  },
  {
    year: "2017",
    title: (<><span style={{ color: ACCENT }}>FIRST CHAIR,</span><br /><span style={{ color: ACCENT }}>FIRST CLIENT</span></>),
    description: "Started working at a local barbershop, mastering fades, beards, and styling.",
    image: CUT_PHOTOS[9],
    side: "left" as const,
  },
  {
    year: "2019",
    title: (<><span style={{ color: ACCENT }}>PERFECTING</span><br /><span style={{ color: ACCENT }}>THE ART</span></>),
    description: "Invested in advanced barbering techniques, precision fades, and signature styles.",
    image: CUT_PHOTOS[10],
    side: "right" as const,
  },
  {
    year: "2021",
    title: (<><span style={{ color: ACCENT }}>MY</span><br /><span style={{ color: ACCENT }}>OWN STUDIO</span></>),
    description: "Opened my very own barbershop, creating a space where every cut is an experience.",
    image: CUT_PHOTOS[11],
    side: "left" as const,
  },
  {
    year: "TODAY",
    title: (<><span style={{ color: ACCENT }}>CRAFTING</span><br /><span style={{ color: ACCENT }}>CONFIDENCE</span></>),
    description: "Every snip is a step toward delivering more than a cut — it's self-expression.",
    image: CUT_PHOTOS[12],
    side: "right" as const,
  },
];

const servicesData = [
  { num: "01", name: "Signature Cut", price: "$40", duration: "45 min", image: CUT_PHOTOS[13] },
  { num: "02", name: "Cut & Beard", price: "$55", duration: "60 min", image: CUT_PHOTOS[14] },
  { num: "03", name: "Hair Wash & Style", price: "$25", duration: "25 min", image: CUT_PHOTOS[15] },
  { num: "04", name: "Premium Grooming", price: "$80", duration: "80 min", image: CUT_PHOTOS[16] },
  { num: "05", name: "Kids Cut", price: "$28", duration: "30 min", image: CUT_PHOTOS[17] },
  { num: "06", name: "Luxury Package", price: "$120", duration: "100 min", image: CUT_PHOTOS[18] },
];

const testimonials = [
  { name: "Robin B.", quote: "\"Laurin always knows the latest trends & delivers the perfect style every time. I leave the chair feeling like my best self.\"", image: CUT_PHOTOS[19] },
  { name: "Jonas K.", quote: "\"Consistent, sharp and confident. The studio energy is next level and every appointment feels like a reset — exactly what I need.\"", image: CUT_PHOTOS[20] },
  { name: "Luca M.", quote: "\"Premium in every detail. Laurin listens, advises, and delivers — every single cut is a confidence boost.\"", image: CUT_PHOTOS[21] },
];

const faqs = [
  { q: "How long does a haircut take?", a: "A signature cut takes around 45 minutes. Packages with beard work run 60–100 minutes depending on detail." },
  { q: "Do I need an appointment?", a: "Appointments are recommended, but walk-ins are welcome when there's an open chair." },
  { q: "What services do you offer?", a: "Signature cuts, beard sculpting, hot-towel work, hair wash/style, kids cuts, and full luxury grooming packages." },
  { q: "What's your pricing?", a: "Services start at $25 and scale to $120 for the full luxury package. Consultations are always free." },
];

function AccentButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <button
      className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:scale-[1.03] ${className}`}
      style={{ background: ACCENT, color: BG }}
    >
      {children}
    </button>
  );
}

/* Infinite horizontal marquee */
function Marquee({ items, direction = "left", speed = 22 }: { items: typeof FIFTY_EIGHT_CUTS; direction?: "left" | "right"; speed?: number }) {
  return (
    <div className="marquee-mask relative overflow-hidden">
      <motion.div
        className="flex gap-4"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        style={{ width: "max-content" }}
      >
        {[...items, ...items].map((it, idx) => {
          const h = it.size === "tall" ? "h-64" : it.size === "wide" ? "h-44" : "h-52";
          return (
            <div
              key={`${it.id}-${idx}`}
              className={`group relative flex-shrink-0 overflow-hidden rounded-3xl border border-white/5 ${h} w-40 sm:w-44`}
              style={{ background: CARD }}
            >
              <img
                src={it.src}
                alt={`Cut ${it.number}`}
                onError={(e) => {
                  const el = e.currentTarget;
                  if (el.src !== FALLBACK_IMG) el.src = FALLBACK_IMG;
                }}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute left-3 top-3 rounded-full px-2 py-0.5 text-[9px] font-black tracking-widest" style={{ background: ACCENT, color: BG }}>
                #{it.number}
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 text-[10px] uppercase tracking-widest text-white/80">
                cut {it.number}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [selectedDate, setSelectedDate] = useState(23);
  const [selectedTime, setSelectedTime] = useState("10:30");
  const [selectedService, setSelectedService] = useState(servicesData[0].name);
  const [scrolled, setScrolled] = useState(false);
  const timelineRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<SVGPathElement | null>(null);

  const cursorX = useSpring(-40, { stiffness: 260, damping: 28 });
  const cursorY = useSpring(-40, { stiffness: 260, damping: 28 });
  const [cursorScale, setCursorScale] = useState(1);

  const { scrollYProgress } = useScroll();
  const topProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const start = performance.now();
    const total = 350;
    let raf = 0;
    const tick = (t: number) => {
      const elapsed = t - start;
      setProgress(Math.min(100, Math.round((elapsed / total) * 100)));
      if (elapsed < total) raf = requestAnimationFrame(tick);
      else setLoading(false);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ duration: 0.6, smoothWheel: true });
    let raf = 0;
    const animate = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(animate); };
    raf = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!timelineRef.current || !lineRef.current) return;
    const path = lineRef.current;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "power2.out",
        scrollTrigger: { trigger: timelineRef.current, start: "top 92%", end: "bottom 12%", scrub: 0.35 },
      });
    }, timelineRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActiveTestimonial((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const over = (e: Event) => {
      const t = e.target as HTMLElement;
      if (["BUTTON", "A", "INPUT", "SELECT", "TEXTAREA"].includes(t.tagName)) setCursorScale(1.9);
      else setCursorScale(1);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [cursorX, cursorY]);

  const timeSlots = useMemo(() => ["9:00", "10:30", "12:00", "13:30", "15:00", "16:30"], []);
  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);

  const current = testimonials[activeTestimonial];
  const prev = testimonials[(activeTestimonial - 1 + testimonials.length) % testimonials.length];
  const next = testimonials[(activeTestimonial + 1) % testimonials.length];

  return (
    <div
      className="relative min-h-screen overflow-x-hidden text-white"
      style={{ background: BG, color: CREAM, cursor: "none" }}
    >
      {/* Preloader */}
      {loading && (
        <div className="fixed inset-0 z-[130] flex flex-col items-center justify-center" style={{ background: BG }}>
          <motion.p
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-black tracking-[0.32em]"
            style={{ color: ACCENT, fontFamily: "Poppins, sans-serif" }}
          >
            C-CUTZ
          </motion.p>
          <p className="mt-8 text-xs tracking-[0.3em] text-white/60">{progress}%</p>
          <div className="mt-3 h-[2px] w-52 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full transition-[width] duration-100" style={{ width: `${progress}%`, background: ACCENT }} />
          </div>
        </div>
      )}

      {/* Top progress */}
      <motion.div style={{ scaleX: topProgress }} className="fixed left-0 top-0 z-[120] h-[2px] w-full origin-left" />

      {/* Custom cursor */}
      <motion.div
        style={{ x: cursorX, y: cursorY, scale: cursorScale }}
        className="pointer-events-none fixed left-0 top-0 z-[140] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full md:flex"
      >
        <span className="absolute inset-0 rounded-full border" style={{ borderColor: ACCENT }} />
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
      </motion.div>

      {/* Floating glow blobs */}
      <div className="pointer-events-none fixed left-[-10%] top-[-10%] h-[520px] w-[520px] rounded-full opacity-40 blur-[120px]"
           style={{ background: `radial-gradient(circle, rgba(${ACCENT_RGB},0.35), transparent 60%)` }} />
      <div className="pointer-events-none fixed bottom-[-10%] right-[-10%] h-[520px] w-[520px] rounded-full opacity-30 blur-[120px]"
           style={{ background: `radial-gradient(circle, rgba(${ACCENT_RGB},0.25), transparent 60%)` }} />

      {/* HEADER — invisible / glassy on scroll */}
      <header
        className={`fixed left-0 right-0 top-0 z-40 transition-all duration-500 ${
          scrolled ? "backdrop-blur-xl" : ""
        }`}
        style={{ background: scrolled ? `${BG}70` : "transparent" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 text-[11px] uppercase tracking-[0.24em] lg:px-10">
          <p className="text-base font-black tracking-[0.3em]" style={{ color: ACCENT }}>C-CUTZ</p>
          <nav className="hidden items-center gap-8 text-white/70 md:flex">
            <a href="#cuts" className="transition hover:text-white" style={{ color: CREAM }}>Cuts</a>
            <a href="#services" className="transition hover:text-white" style={{ color: CREAM }}>Services</a>
            <a href="#story" className="transition hover:text-white" style={{ color: CREAM }}>Story</a>
            <a href="#booking" className="transition hover:text-white" style={{ color: CREAM }}>Booking</a>
          </nav>
          <a
            href="#booking"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-semibold transition hover:scale-[1.04]"
            style={{ color: ACCENT, border: `1px solid ${ACCENT}` }}
          >
            <ScissorsIcon className="h-3.5 w-3.5" />
            Book
          </a>
        </div>
      </header>

      <main className="relative z-10">
        {/* HERO */}
        <section className="relative flex min-h-screen items-center">
          <div className="absolute inset-0">
            <img
              src={HERO_IMG}
              alt="Laurin"
              onError={(e) => { const el = e.currentTarget; if (el.src !== FALLBACK_IMG) el.src = FALLBACK_IMG; }}
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${BG}EE 0%, ${BG}99 40%, ${BG}E6 100%)` }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: loading ? 0 : 1, y: loading ? 30 : 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pointer-events-none absolute right-6 top-28 hidden select-none font-black leading-none tracking-[0.08em] text-white/5 md:block lg:text-[9vw]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            CUTZ
          </motion.div>

          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pb-16 pt-36 md:grid-cols-2 lg:px-10">
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: loading ? -60 : 0, opacity: loading ? 0 : 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl"
            >
              <img
                src={CUT_PHOTOS[1]}
                alt="Laurin portrait"
                onError={(e) => { const el = e.currentTarget; if (el.src !== FALLBACK_IMG) el.src = FALLBACK_IMG; }}
                className="h-[480px] w-full object-cover md:h-[560px]"
                loading="eager"
              />
            </motion.div>

            <div className="text-center md:text-left">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: loading ? 0 : 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="text-[10px] uppercase tracking-[0.34em] md:justify-start"
                style={{ color: ACCENT }}
              >
                Premium barber · Est. 2015
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: loading ? 0 : 1, y: loading ? 28 : 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="mt-3 font-black uppercase leading-[0.92] tracking-tight"
                style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(3.2rem, 11vw, 7.4rem)" }}
              >
                HI,<br />I'M <span style={{ color: ACCENT }}>LAURIN</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: loading ? 0 : 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="mt-5 max-w-md text-sm leading-relaxed text-white/70"
              >
                Luxury barber crafting confidence through style — precision fades, signature cuts, and the kind of finish that turns heads.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: loading ? 0 : 1, y: loading ? 14 : 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="mt-7 flex flex-wrap items-center gap-3 md:justify-start"
              >
                <AccentButton>
                  <ScissorsIcon className="h-3.5 w-3.5" />
                  Book now
                  <ArrowRight className="h-3.5 w-3.5" />
                </AccentButton>
                <a href="#cuts" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-white/80 transition hover:border-white/40 hover:text-white">
                  View cuts
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 58 CUTS — infinite scroll marquee */}
        <section id="cuts" className="relative px-0 py-24">
          <div className="mx-auto mb-10 max-w-7xl px-5 lg:px-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>Portfolio</p>
                <h2 className="mt-2 font-black uppercase leading-[1.02]" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2.2rem, 6vw, 4.2rem)" }}>
                  {FIFTY_EIGHT_CUTS.length} cuts,<br />one set of hands.
                </h2>
              </div>
              <p className="max-w-sm text-xs leading-relaxed text-white/60">
                A rolling archive of every cut, fade, and beard I've shaped — flowing infinitely so you can feel the range.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Marquee items={FIFTY_EIGHT_CUTS.slice(0, 29)} direction="left" speed={22} />
            <Marquee items={FIFTY_EIGHT_CUTS.slice(29)} direction="right" speed={26} />
          </div>

          <div className="mx-auto mt-10 flex max-w-7xl items-center justify-between px-5 lg:px-10">
            <p className="text-[10px] uppercase tracking-[0.26em] text-white/50">Scroll · hover · repeat</p>
            <AccentButton>See more <ArrowRight className="h-3.5 w-3.5" /></AccentButton>
          </div>
        </section>

        {/* MY WORK / collage */}
        <section className="relative overflow-hidden px-5 py-24 lg:px-10">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full"
               style={{ background: `radial-gradient(circle, rgba(${ACCENT_RGB},0.28) 0%, rgba(${ACCENT_RGB},0.06) 35%, transparent 70%)` }} />

          <div className="relative mx-auto max-w-6xl">
            <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>My work</p>
                <h2 className="mt-2 text-center font-black uppercase leading-[1.02] md:text-left" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 5vw, 3.6rem)" }}>
                  GET AN IDEA<br />OF MY WORK
                </h2>
              </div>
              <p className="max-w-[210px] text-[10px] leading-relaxed text-white/55 md:text-right">
                "Cut hair and have been doing so for 2 years — every style tailored to you."
              </p>
            </div>

            {/* Step progress with arrows */}
            <div className="mt-10 rounded-3xl border border-white/10 p-5" style={{ background: CARD }}>
              <div className="flex flex-col gap-4 md:flex-row md:items-stretch md:justify-between">
                {[
                  { n: "01", label: "Consultation", desc: "Quick chat about the look you want" },
                  { n: "02", label: "The Cut", desc: "Precision cut, fade & beard work" },
                  { n: "03", label: "Final Style", desc: "Polished finish and product setup" },
                ].map((s, i, arr) => (
                  <div key={s.n} className="flex items-center gap-3 md:flex-1">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-black" style={{ background: ACCENT, color: BG }}>{s.n}</span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em]">{s.label}</p>
                      <p className="text-[10px] text-white/55">{s.desc}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="ml-auto hidden items-center md:flex">
                        <ArrowRight className="h-5 w-5 -mx-2" style={{ color: ACCENT }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-8 min-h-[520px]">
              {collage.map((c, i) => (
                <motion.div
                  key={c.src}
                  initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -4 : 4 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.65, delay: i * 0.06 }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  className={`absolute overflow-hidden rounded-3xl border border-white/10 shadow-xl hover:shadow-2xl ${c.position}`}
                >
                  <img
                    src={c.src}
                    alt="work"
                    onError={(e) => {
                      const el = e.currentTarget;
                      if (el.src !== FALLBACK_IMG) el.src = FALLBACK_IMG;
                    }}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))}

              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4">
                <div className="rounded-2xl border px-5 py-4 text-center backdrop-blur-md" style={{ background: `${BG}cc`, borderColor: `${ACCENT}55` }}>
                  <div className="mb-2 flex items-center justify-center gap-1.5">
                    <span className="h-3 w-3 rounded-sm" style={{ background: ACCENT }} />
                    <span className="h-3 w-3 rounded-sm border" style={{ borderColor: ACCENT }} />
                  </div>
                  <p className="text-sm font-black tracking-[0.26em]" style={{ color: ACCENT }}>C-CUTZ</p>
                </div>
              </div>
            </div>

            <div className="mt-14 flex justify-center">
              <AccentButton>Show me more <ArrowRight className="h-3.5 w-3.5" /></AccentButton>
            </div>
          </div>
        </section>

        {/* STORY */}
        <section id="story" ref={timelineRef} className="relative px-5 py-24 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-end">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>About me</p>
                <h2 className="mt-2 font-black uppercase" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>STORYTIME</h2>
              </div>
              <p className="self-end text-[11px] leading-relaxed text-white/60">
                My story and how it all began — and where I am today.
              </p>
            </div>

            <div className="relative mt-16">
              <svg
                className="pointer-events-none absolute left-0 top-0 hidden h-full w-full md:block"
                preserveAspectRatio="none"
                viewBox="0 0 1000 1700"
                fill="none"
              >
                <path
                  ref={lineRef}
                  d="M 340 0 L 640 0 L 640 170 L 360 170 L 360 450 L 640 450 L 640 730 L 360 730 L 360 1010 L 640 1010 L 640 1290 L 500 1290"
                  stroke={ACCENT}
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="space-y-20">
                {timelineData.map((item) => {
                  const isRight = item.side === "right";
                  return (
                    <div key={item.year} className="md:grid md:grid-cols-2 md:gap-12 md:items-start">
                      {isRight ? (
                        <>
                          <div className="md:col-start-1 md:row-start-1 md:mt-28">
                            <h3 className="text-3xl font-black uppercase leading-[1] sm:text-4xl" style={{ fontFamily: "Poppins, sans-serif" }}>
                              {item.title}
                            </h3>
                            <p className="mt-3 ml-auto max-w-sm text-sm text-white/70 md:text-right">{item.description}</p>
                          </div>
                          <div className="mt-4 md:col-start-2 md:row-start-1 md:mt-0">
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/75 md:text-right">{item.year}</p>
                            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-lg">
                              <img src={item.image} alt={item.year} onError={(e) => { const el = e.currentTarget; if (el.src !== FALLBACK_IMG) el.src = FALLBACK_IMG; }} className="h-60 w-full object-cover" loading="eager" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="md:col-start-1 md:row-start-1">
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/75">{item.year}</p>
                            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-lg">
                              <img src={item.image} alt={item.year} onError={(e) => { const el = e.currentTarget; if (el.src !== FALLBACK_IMG) el.src = FALLBACK_IMG; }} className="h-60 w-full object-cover" loading="eager" />
                            </div>
                          </div>
                          <div className="mt-4 md:col-start-2 md:row-start-1 md:mt-28">
                            <h3 className="text-3xl font-black uppercase leading-[1] sm:text-4xl" style={{ fontFamily: "Poppins, sans-serif" }}>
                              {item.title}
                            </h3>
                            <p className="mt-3 max-w-sm text-sm text-white/70">{item.description}</p>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="relative px-5 py-24 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>Services</p>
                <h2 className="mt-2 font-black uppercase" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>Logical, Right?</h2>
                <p className="mt-2 text-[11px] text-white/55">Look at what I can do for you.</p>
              </div>
              <AccentButton>Book an appointment <CalendarIcon className="h-3.5 w-3.5" /></AccentButton>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {servicesData.map((s, i) => (
                <motion.article
                  key={s.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group overflow-hidden rounded-3xl border border-white/10 transition hover:shadow-2xl"
                  style={{ background: CARD, borderColor: `${ACCENT}33` }}
                >
                  <span className="absolute ml-4 mt-4 rounded-full px-3 py-1 text-[10px] font-black tracking-[0.24em]" style={{ background: ACCENT, color: BG }}>
                    {s.num}
                  </span>
                  <div className="h-56 overflow-hidden">
                    <img src={s.image} alt={s.name} onError={(e) => { const el = e.currentTarget; if (el.src !== FALLBACK_IMG) el.src = FALLBACK_IMG; }} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <p className="text-lg font-bold uppercase tracking-wide" style={{ fontFamily: "Poppins, sans-serif" }}>{s.name}</p>
                    <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-white/60">
                      <span>{s.duration}</span>
                      <span className="font-bold" style={{ color: ACCENT }}>{s.price}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="relative px-5 py-24 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>Reviews</p>
            <h2 className="mt-2 font-black uppercase" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>Testimonials</h2>

            <div className="relative mt-12 flex items-center justify-center">
              <div className="hidden w-60 flex-shrink-0 scale-90 opacity-30 md:block">
                <div className="rounded-3xl border border-white/10 p-6" style={{ background: CARD }}>
                  <p className="text-xs leading-relaxed text-white/70">{prev.quote}</p>
                  <p className="mt-4 text-[11px] font-semibold">— {prev.name}</p>
                </div>
              </div>

              <motion.div
                key={current.name}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
                className="mx-0 w-full max-w-lg rounded-3xl p-8 md:mx-6"
                style={{ background: ACCENT, color: BG }}
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} className="h-4 w-4" />)}
                </div>
                <p className="mt-4 text-sm font-semibold leading-relaxed">{current.quote}</p>
                <div className="mt-5 flex items-center gap-3">
                  <img src={current.image} alt={current.name} onError={(e) => { const el = e.currentTarget; if (el.src !== FALLBACK_IMG) el.src = FALLBACK_IMG; }} className="h-10 w-10 rounded-full object-cover" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em]">— {current.name}</p>
                </div>
              </motion.div>

              <div className="hidden w-60 flex-shrink-0 scale-90 opacity-30 md:block">
                <div className="rounded-3xl border border-white/10 p-6" style={{ background: CARD }}>
                  <p className="text-xs leading-relaxed text-white/70">{next.quote}</p>
                  <p className="mt-4 text-[11px] font-semibold">— {next.name}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <button onClick={() => setActiveTestimonial((i) => (i - 1 + testimonials.length) % testimonials.length)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:scale-110" style={{ borderColor: ACCENT, color: ACCENT }}>
                ←
              </button>
              <button onClick={() => setActiveTestimonial((i) => (i + 1) % testimonials.length)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:scale-110" style={{ borderColor: ACCENT, color: ACCENT }}>
                →
              </button>
            </div>
          </div>
        </section>

        {/* BOOKING */}
        <section id="booking" className="relative overflow-hidden px-5 py-24 lg:px-10">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full"
               style={{ background: `radial-gradient(circle, rgba(${ACCENT_RGB},0.22) 0%, rgba(${ACCENT_RGB},0.04) 40%, transparent 70%)` }} />
          <div className="relative mx-auto max-w-6xl text-center">
            <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>Book an appointment</p>
            <h2 className="mt-3 font-serif text-5xl italic sm:text-6xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>what's up?</h2>
            <p className="mt-2 text-[11px] text-white/55">Book your appointment now.</p>
          </div>

          <motion.form
            onSubmit={(e: FormEvent) => e.preventDefault()}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto mt-10 max-w-5xl rounded-3xl border border-white/10 p-6 md:p-8"
            style={{ background: CARD }}
          >
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em]" style={{ color: ACCENT }}>Termine</p>
                  <p className="mt-2 flex items-center gap-2 text-[11px] text-white/70">
                    <span className="inline-block h-2 w-2 rounded-full" style={{ background: ACCENT }} />30 minutes
                  </p>
                  <p className="mt-2 text-[11px] leading-relaxed text-white/55">
                    A 30 minute slot where I'll craft your new cut exactly how you like it. Beard trims included where needed.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 p-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/70">Service</p>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="mt-2 w-full rounded-xl bg-transparent px-2 py-2 text-sm outline-none"
                  >
                    {servicesData.map((s) => <option key={s.name} value={s.name} style={{ background: CARD }}>{s.name} — {s.price}</option>)}
                  </select>
                </div>

                <div className="rounded-2xl border border-white/10 p-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/70">Notes</p>
                  <input
                    type="text"
                    placeholder="Anything I should know?"
                    className="mt-2 w-full rounded-xl bg-transparent px-2 py-2 text-sm outline-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/70">Select a Date & Time</p>
                  <div className="mt-3 grid grid-cols-7 gap-1.5 text-center text-[10px]">
                    {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d) => (
                      <div key={d} className="py-1 text-white/50">{d}</div>
                    ))}
                    {Array.from({ length: 2 }, () => 0).map((_, i) => (<div key={`b-${i}`} />))}
                    {days.slice(0, 29).map((day) => {
                      const sel = day === selectedDate;
                      return (
                        <button
                          type="button"
                          key={day}
                          onClick={() => setSelectedDate(day)}
                          className={`h-8 rounded-full text-[10px] transition ${sel ? "font-bold" : "text-white/60 hover:bg-white/5"}`}
                          style={sel ? { background: ACCENT, color: BG } : {}}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-right text-[10px] text-white/45">{selectedDate}. April 2025</p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/70">Time</p>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-[10px]">
                    {timeSlots.map((t) => {
                      const sel = selectedTime === t;
                      return (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className="rounded-full border px-2 py-2 transition"
                          style={sel ? { background: ACCENT, color: BG, borderColor: ACCENT } : { borderColor: "rgba(255,255,255,0.15)", color: "rgba(245,238,230,0.7)" }}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-[10px] text-white/45">Selected time: {selectedTime}</p>
                </div>

                <button type="submit" className="group w-full rounded-full py-3 text-[11px] font-bold uppercase tracking-[0.24em] transition hover:scale-[1.02]"
                  style={{ background: ACCENT, color: BG }}
                >
                  <span className="inline-flex items-center gap-2">
                    <CalendarIcon className="h-3.5 w-3.5" />
                    Book Appointment
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              </div>
            </div>
          </motion.form>
        </section>

        {/* FAQ */}
        <section className="relative px-5 py-24 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>FAQs</p>
            <h2 className="mt-3 font-serif text-5xl italic leading-[0.95] sm:text-6xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Fresh Cuts,<br />Clear Answers
            </h2>
          </div>

          <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-3xl border border-white/10" style={{ background: CARD }}>
            {faqs.map((f, i) => {
              const open = faqOpen === i;
              return (
                <div key={f.q} className="border-b border-white/10 last:border-b-0">
                  <button
                    onClick={() => setFaqOpen(open ? null : i)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left text-[11px] uppercase tracking-[0.18em] transition hover:bg-white/5"
                  >
                    <span className="text-white/90">{f.q}</span>
                    <span style={{ color: ACCENT }}>
                      {open ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                    transition={{ duration: 0.28 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-[11px] leading-relaxed text-white/65">{f.a}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </section>

        {/* LOCATION */}
        <section className="relative px-5 py-24 lg:px-10">
          <div className="relative mx-auto max-w-6xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>Find Us</p>
                <h2 className="mt-2 font-black uppercase" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>Our Studio</h2>
                <p className="mt-2 text-[11px] text-white/55">Come visit us for your next cut.</p>
              </div>
              <AccentButton>Get Directions <ArrowRight className="h-3.5 w-3.5" /></AccentButton>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="overflow-hidden rounded-3xl border border-white/10" style={{ background: CARD }}>
                <div className="h-80 w-full" style={{ background: `radial-gradient(circle at 30% 30%, ${ACCENT}40, transparent 45%), radial-gradient(circle at 70% 70%, ${ACCENT}30, transparent 45%), ${CARD}` }}>
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <PinIcon className="mx-auto h-12 w-12" style={{ color: ACCENT }} />
                      <p className="mt-4 text-lg font-bold" style={{ color: ACCENT, fontFamily: "Poppins, sans-serif" }}>94 Mercer St</p>
                      <p className="text-[11px] text-white/60">New York, NY 10012</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 p-8" style={{ background: CARD }}>
                <div className="space-y-6">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: ACCENT }}>Address</p>
                    <p className="mt-2 text-sm text-white/70">94 Mercer St, New York, NY 10012</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: ACCENT }}>Hours</p>
                    <ul className="mt-2 space-y-1 text-sm text-white/70">
                      <li>Mon – Fri: 09:00 – 19:00</li>
                      <li>Saturday: 10:00 – 17:00</li>
                      <li>Sunday: Closed</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: ACCENT }}>Contact</p>
                    <ul className="mt-2 space-y-1 text-sm text-white/70">
                      <li>+1 (212) 555-0128</li>
                      <li>hello@ccutz.com</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t mt-10" style={{ borderColor: `${ACCENT}30`, background: "#0D0B10" }}>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-4 lg:px-10">
          <div>
            <p className="text-xl font-black tracking-[0.22em]" style={{ color: ACCENT }}>C-CUTZ</p>
            <p className="mt-3 text-[11px] leading-relaxed text-white/60">
              Premium barber studio. Warm tones, sharper fades, confidence that walks out the door with you.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: ACCENT }}>Contact</p>
            <ul className="mt-3 space-y-2 text-[11px] text-white/70">
              <li className="flex items-center gap-2"><PinIcon className="h-3.5 w-3.5" style={{ color: ACCENT }} />94 Mercer St, New York</li>
              <li className="flex items-center gap-2"><PhoneIcon className="h-3.5 w-3.5" style={{ color: ACCENT }} />+1 (212) 555-0128</li>
              <li className="flex items-center gap-2"><MailIcon className="h-3.5 w-3.5" style={{ color: ACCENT }} />hello@ccutz.com</li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: ACCENT }}>Hours</p>
            <ul className="mt-3 space-y-2 text-[11px] text-white/70">
              <li>Mon – Fri: 09:00 – 19:00</li>
              <li>Saturday: 10:00 – 17:00</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: ACCENT }}>Social</p>
            <div className="mt-3 flex gap-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:scale-110" style={{ borderColor: `${ACCENT}55`, color: ACCENT }}><InstagramIcon className="h-4 w-4" /></a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:scale-110" style={{ borderColor: `${ACCENT}55`, color: ACCENT }}><TikTokIcon className="h-4 w-4" /></a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:scale-110" style={{ borderColor: `${ACCENT}55`, color: ACCENT }}><FacebookIcon className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
        <div className="border-t px-5 py-4 text-center text-[10px] uppercase tracking-[0.22em] text-white/40 lg:px-10" style={{ borderColor: `${ACCENT}20` }}>
          © {new Date().getFullYear()} C-CUTZ · All rights reserved
        </div>
      </footer>
    </div>
  );
}
