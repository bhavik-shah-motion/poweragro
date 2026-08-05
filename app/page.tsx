"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/* ─── Scroll-reveal hook ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("visible"); }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Animated counter ─── */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        io.disconnect();
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setVal(target); clearInterval(timer); }
          else setVal(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ─── Logo SVG ─── */
// Ball positions pre-computed as fixed-precision strings to prevent SSR/client hydration mismatch
const LOGO_BALLS = [0, 60, 120, 180, 240, 300].map((deg, i) => {
  const rad = (deg * Math.PI) / 180;
  return {
    cx: (20 + 12 * Math.cos(rad)).toFixed(3),
    cy: (20 + 12 * Math.sin(rad)).toFixed(3),
    accent: i === 0,
  };
});

function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="18" stroke="#3D5C45" strokeWidth="2.5" />
      <circle cx="20" cy="20" r="12" stroke="#3D5C45" strokeWidth="6" strokeOpacity="0.18" />
      <circle cx="20" cy="20" r="5.5" stroke="#3D5C45" strokeWidth="2" />
      {LOGO_BALLS.map((b, i) => (
        <circle key={i} cx={b.cx} cy={b.cy} r="2.4" fill={b.accent ? "#B84A2C" : "#3D5C45"} />
      ))}
    </svg>
  );
}

export default function Home() {
  useReveal();

  const currentYear = 2026;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("all");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [enquiryType, setEnquiryType] = useState("Product enquiry / quote");
  const [message, setMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<{
    code?: string; type: string; d?: number; D?: number; B?: number; brands: string[]; notFound?: boolean;
  } | null>(null);
  const [selectedBrandIdx, setSelectedBrandIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const bearingDb: Record<string, { type: string; d: number; D: number; B: number; brands: string[] }> = {
    "6204":  { type: "Deep Groove Ball Bearing",    d: 20,  D: 47,  B: 14,    brands: ["SKF","FAG","NSK","NTN"] },
    "6008":  { type: "Deep Groove Ball Bearing",    d: 40,  D: 68,  B: 15,    brands: ["SKF","FAG","KOYO"] },
    "22220": { type: "Spherical Roller Bearing",    d: 100, D: 180, B: 46,    brands: ["SKF","FAG","Timken"] },
    "30204": { type: "Tapered Roller Bearing",      d: 20,  D: 47,  B: 15.25, brands: ["Timken","FAG","NTN","NACHI"] },
    "51105": { type: "Thrust Ball Bearing",         d: 25,  D: 37,  B: 9,     brands: ["SKF","FAG","NSK"] },
    "UC205": { type: "Pillow Block Insert Bearing", d: 25,  D: 52,  B: 34.1,  brands: ["NTN","KOYO"] },
  };

  const handleSearch = (val: string) => {
    setSearchQuery(val);
    const norm = val.toUpperCase().replace(/\s+/g, "");
    if (!norm) { setSearchResult(null); return; }
    const key = Object.keys(bearingDb).find(k => k.includes(norm) || norm.includes(k));
    setSearchResult(key
      ? { code: key, ...bearingDb[key] }
      : { notFound: true, type: "Custom", brands: ["FAG","SKF","Timken","NSK","NTN","NACHI","KOYO"] }
    );
  };

  const ballAngles = Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 * Math.PI) / 180;
    return { x: +(100 + 57 * Math.cos(a)).toFixed(1), y: +(100 + 57 * Math.sin(a)).toFixed(1) };
  });

  const brands = [
    { name: "FAG · INA",  origin: "Germany", desc: "Premium Schaeffler automotive & industrial roller bearings sourced directly from certified European channels." },
    { name: "SKF",        origin: "Sweden",  desc: "Global leader in high-performance rotating equipment — bearings, seals, and lubrication systems." },
    { name: "Timken",     origin: "USA",     desc: "Tapered roller bearings for heavy-duty industrial gearing and demanding applications." },
    { name: "NSK",        origin: "Japan",   desc: "Super-precision ball bearings and linear motion components for high-accuracy machinery." },
    { name: "NTN",        origin: "Japan",   desc: "Standard and custom bearings for automotive & manufacturing — broad catalog coverage." },
    { name: "KOYO",       origin: "Japan",   desc: "Heavy agricultural & automotive steering machinery bearings, part of the JTEKT group." },
    { name: "NACHI",      origin: "Japan",   desc: "Extremely durable bearings for robotics, CNC machine tools, and high-cycle applications." },
    { name: "Schaeffler", origin: "Germany", desc: "Engineered solutions and high-grade bearings for aerospace, rail, and wind energy." },
  ];

  const products = [
    { id:"01", title:"Deep Groove Ball",       group:"ball",    img:"/hero_bearings.png", desc:"Highly versatile, low-friction, high-speed bearings for motors, pumps & gearboxes.",        tag:"Radial · High Speed",       specs:{ bore:"10–1200 mm", speed:"32,000 RPM", prec:"P0/P6/P5" } },
    { id:"02", title:"Tapered & Cylindrical",  group:"roller",  img:"/hero_bearings.png", desc:"Massive radial + axial load capacity for industrial gearboxes and wheel hubs.",              tag:"High Load · Rigid",          specs:{ bore:"15–1800 mm", speed:"12,000 RPM", prec:"P6/P5/P4" } },
    { id:"03", title:"Spherical Roller",       group:"roller",  img:"/hero_bearings.png", desc:"Self-aligning heavy-duty bearings handling misalignment, vibration & shock loads.",          tag:"Self-Aligning · Shock",      specs:{ bore:"20–2200 mm", speed:"8,000 RPM",  prec:"P6/P5" } },
    { id:"04", title:"Agricultural & Farm",    group:"housed",  img:"/agri_bearing.png",  desc:"Sealed, dust-proof units for tractors, disk harrows, and combine harvesters.",               tag:"Triple Seal · Dust Tight",   specs:{ bore:"20–120 mm",  speed:"4,500 RPM",  prec:"Standard" } },
    { id:"05", title:"Pillow Blocks & Housed", group:"housed",  img:"/agri_bearing.png",  desc:"Cast iron housings ready to mount — conveyors, fans, industrial drives.",                   tag:"Plummer · Flange",           specs:{ bore:"12–140 mm",  speed:"6,000 RPM",  prec:"Cast Iron" } },
    { id:"06", title:"Precision & Specialty",  group:"special", img:"/hero_bearings.png", desc:"Angular contact, thrust, and custom-sourced bearings for high-accuracy specialty lines.",    tag:"Micron · Custom",            specs:{ bore:"5–600 mm",   speed:"48,000 RPM", prec:"P4/P2" } },
  ];

  const industries = [
    { name:"Agriculture",        desc:"Harvesters, tillers, disk harrows, pump drives" },
    { name:"Steel & Metals",     desc:"Rolling mills, high-temperature casting lines" },
    { name:"Cement & Mining",    desc:"Jaw crushers, vibrating screens, conveyors" },
    { name:"Automotive",         desc:"Wheel hubs, transmissions, drivetrains" },
    { name:"Power & Energy",     desc:"Steam turbines, wind generators, thermal pumps" },
    { name:"Textiles",           desc:"High-speed spinning, carding, loom rollers" },
    { name:"Material Handling",  desc:"Cranes, hoists, stackers, sorting conveyors" },
    { name:"General Engineering",desc:"Motors, compressors, blowers, gearboxes" },
  ];

  const steps = [
    { num:"01", title:"Tell us what you need",    desc:"Share your bearing SKU, dimension, or application. Our desk narrows down the right designation." },
    { num:"02", title:"We source it directly",    desc:"Genuine, traceable parts from certified OEM factories in Europe, USA, and Japan — never grey market." },
    { num:"03", title:"Docs & compliance sorted", desc:"Export invoice, packing list, certificate of origin and customs clearance — handled by our Mumbai team." },
    { num:"04", title:"Delivered to your door",   desc:"Securely packed, anti-moisture wrapped, tracked door-to-door. Authentic every time." },
  ];

  const filteredProducts = activeCategoryFilter === "all" ? products : products.filter(p => p.group === activeCategoryFilter);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) { setFormError("Please fill in your name, email, and message."); return; }
    setFormError(""); setFormSubmitted(true);
  };

  const navLinks: [string, string][] = [["#products","Products"],["#industries","Industries"],["#trade","Process"],["#about","About"],["#contact","Contact"]];

  return (
    <main className="min-h-screen font-sans overflow-x-hidden bg-[#F5F3EE] text-[#1A1A18]">

      {/* ══ NAVBAR ══ */}
      <header
        className={`sticky top-0 z-50 border-b border-[#E2DDCF] transition-all duration-300 ${scrolled ? "shadow-md shadow-[#1A1A18]/5" : ""}`}
        style={{ background: "rgba(245,243,238,0.95)", backdropFilter: "blur(20px)" }}
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#top" className="flex items-center gap-3 group shrink-0">
              <div className="transition-transform duration-700 group-hover:rotate-[30deg]">
                <LogoMark size={36} />
              </div>
              <div className="flex flex-col leading-none gap-0.5">
                <span className="font-display font-extrabold text-[15px] tracking-tight text-[#1A1A18]">
                  Power<span className="text-[#B84A2C]">Agro</span>
                </span>
                <span className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-[#8C5C3E]">
                  Mumbai · Est.&nbsp;1980
                </span>
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-6 text-[13.5px] font-medium text-[#3D3C38]">
              {navLinks.map(([href, label]) => (
                <a key={href} href={href}
                  className="relative py-1 hover:text-[#1A1A18] transition-colors duration-150
                             after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0
                             after:bg-[#B84A2C] after:transition-all after:duration-250 hover:after:w-full">
                  {label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <a href="tel:+919820717873" className="flex items-center gap-1.5 text-[12.5px] font-semibold text-[#3D5C45] hover:text-[#3D5C45]/70 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l.74 2.22a1 1 0 01-.23 1.02L8.44 8.22a10 10 0 004.34 4.34l1.3-1.3a1 1 0 011.02-.23l2.22.74A1 1 0 0118 12.72V16a2 2 0 01-2 2h-1C9.71 18 3 11.29 3 5z" />
                </svg>
                +91 98207 17873
              </a>
              <a href="#contact"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#B84A2C] hover:bg-[#A03F26] text-[#F5F3EE] px-4 py-2 text-[12.5px] font-bold tracking-wide transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:shadow-[#B84A2C]/30 pulse-glow">
                Get a Quote →
              </a>
            </div>

            <button className="md:hidden p-2 rounded-lg bg-[#EAE7E0]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {mobileMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E2DDCF] bg-[#F5F3EE] animate-fade-in">
            <div className="mx-auto max-w-6xl px-6 py-5 flex flex-col gap-1">
              {navLinks.map(([href, label]) => (
                <a key={href} href={href} onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-3 rounded-lg text-sm font-medium text-[#3D3C38] hover:bg-[#EAE7E0] transition-colors">
                  {label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}
                className="mt-2 px-3 py-3 rounded-lg text-sm font-bold text-center bg-[#B84A2C] text-[#F5F3EE]">
                Get a Quote
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ══ HERO ══ */}
      <section id="top" className="relative overflow-hidden bg-[#111210] text-[#F5F3EE]" style={{ minHeight: "92vh" }}>
        {/* Full-bleed hero image */}
        <div className="absolute inset-0 z-0">
          <Image src="/hero_bearings.png" alt="Industrial bearings" fill className="object-cover opacity-35" priority />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(17,18,16,0.95) 0%, rgba(17,18,16,0.7) 55%, rgba(17,18,16,0.35) 100%)" }} />
        </div>

        {/* Ambient glow blobs */}
        <div className="absolute inset-0 pointer-events-none z-[1]"
          style={{ background: "radial-gradient(ellipse 55% 55% at 70% 45%, rgba(61,92,69,0.22) 0%, transparent 70%)" }} />

        {/* Rotating bearing watermark */}
        <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-[480px] h-[480px] opacity-[0.08] animate-spin-slow pointer-events-none select-none z-[1]">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            <circle cx="100" cy="100" r="92" stroke="#C8BFA8" strokeWidth="1" />
            <circle cx="100" cy="100" r="74" stroke="#C8BFA8" strokeWidth="5" strokeDasharray="4 3.5" />
            <circle cx="100" cy="100" r="42" stroke="#C8BFA8" strokeWidth="4.5" />
            <circle cx="100" cy="100" r="18" fill="#C8BFA8" opacity="0.3" />
            <g fill="#D4B896">{ballAngles.map((b, i) => <circle key={i} cx={b.x} cy={b.y} r="6" />)}</g>
          </svg>
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.04] grid-bg" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8 pt-28 pb-24 md:pt-36 md:pb-32">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-[#D4B896]/20 bg-[#D4B896]/8 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B84A2C] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#D4B896]/75">
                Mumbai · Import &amp; Export · Since 1980
              </span>
            </div>

            <h1 className="font-display font-extrabold leading-[1.07] tracking-tight animate-slide-up"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)" }}>
              The bearings that<br />
              keep{" "}
              <span className="shimmer-text">India's industry</span>
              <br />turning.
            </h1>

            <p className="mt-6 text-[15px] leading-relaxed text-[#F5F3EE]/58 max-w-lg animate-fade-in"
              style={{ animationDelay: "0.2s" }}>
              Power Agro connects buyers across Asia, Africa, and the Middle East with 100% genuine agricultural and industrial bearings — sourced from certified brand channels, dispatched from Mumbai.
            </p>

            <div className="mt-10 flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: "0.35s" }}>
              <a href="#products"
                className="inline-flex items-center gap-2 rounded-xl bg-[#B84A2C] hover:bg-[#A03F26] text-[#F5F3EE] px-7 py-3.5 text-sm font-bold tracking-wide transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#B84A2C]/35">
                Browse Our Range
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-[#F5F3EE]/18 hover:border-[#F5F3EE]/35 bg-[#F5F3EE]/5 hover:bg-[#F5F3EE]/10 text-[#F5F3EE] px-7 py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-1">
                Talk to our desk
              </a>
            </div>

            {/* Stats — animated counters */}
            <div className="mt-16 pt-8 border-t border-[#F5F3EE]/8 flex flex-wrap gap-10 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div>
                <div className="font-display font-extrabold text-2xl text-[#D4B896]">
                  <CountUp target={45000} suffix="+" />
                </div>
                <div className="text-[11px] uppercase tracking-wider font-semibold text-[#F5F3EE]/35 mt-0.5">SKUs in catalog</div>
              </div>
              <div>
                <div className="font-display font-extrabold text-2xl text-[#D4B896]">
                  <CountUp target={8} />
                </div>
                <div className="text-[11px] uppercase tracking-wider font-semibold text-[#F5F3EE]/35 mt-0.5">Premium brands</div>
              </div>
              <div>
                <div className="font-display font-extrabold text-2xl text-[#D4B896]">
                  <CountUp target={46} suffix=" yrs" />
                </div>
                <div className="text-[11px] uppercase tracking-wider font-semibold text-[#F5F3EE]/35 mt-0.5">In the trade</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 float animate-fade-in" style={{ animationDelay: "1s" }}>
          <span className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-[#F5F3EE]/30">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#F5F3EE]/25 to-transparent" />
        </div>
      </section>

      {/* ══ BRAND TICKER ══ */}
      <div className="overflow-hidden border-y border-[#E2DDCF] bg-[#EAE7E0] py-4">
        <div className="marquee-track">
          {[...Array(3)].flatMap(() => brands.map(b => b.name)).map((name, i) => (
            <span key={i} className="inline-flex items-center gap-5 px-6 text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#8C5C3E] whitespace-nowrap">
              {name}
              <span className="text-[#C8BFA8]">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══ HERO IMAGE STRIP ══ */}
      <div className="grid md:grid-cols-2 h-[320px] md:h-[420px] overflow-hidden">
        <div className="img-overlay relative">
          <Image src="/hero_bearings.png" alt="Precision bearings" fill className="object-cover" />
          <div className="absolute inset-0 z-10 flex items-end p-8">
            <div>
              <div className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#D4B896] mb-1">Precision Engineering</div>
              <div className="font-display font-extrabold text-xl text-white">Industrial Grade Parts</div>
            </div>
          </div>
        </div>
        <div className="img-overlay relative">
          <Image src="/agri_bearing.png" alt="Agricultural bearings" fill className="object-cover" />
          <div className="absolute inset-0 z-10 flex items-end p-8">
            <div>
              <div className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#D4B896] mb-1">Agricultural Sector</div>
              <div className="font-display font-extrabold text-xl text-white">Farm-Ready Components</div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ CROSS-REFERENCE TOOL ══ */}
      <section className="py-20 border-b border-[#E2DDCF]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            
            {/* Left Column: Title + Interactive Blueprint */}
            <div className="reveal-left flex flex-col justify-between h-full">
              <div>
                <span className="inline-flex items-center gap-2 mb-5 text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#B84A2C]">
                  <span className="w-5 h-px bg-[#B84A2C]" />Quick Lookup
                </span>
                <h2 className="font-display font-extrabold text-[1.9rem] leading-tight tracking-tight text-[#1A1A18]">
                  Cross-reference any bearing code
                </h2>
                <p className="mt-3 text-[14px] leading-relaxed text-[#3D3C38]">
                  Type a standard designation and we'll show you exact dimensions and the brands we stock it under.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#8C5C3E] mr-1">Try:</span>
                  {["6204","22220","30204","UC205"].map(ex => (
                    <button key={ex} onClick={() => handleSearch(ex)}
                      className="px-3 py-1.5 rounded-lg border border-[#3D5C45]/30 bg-[#3D5C45]/6 text-[#3D5C45] text-[11.5px] font-bold hover:bg-[#3D5C45]/14 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
                      {ex}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Blueprint Graphic */}
              <div className="mt-8 p-6 rounded-2xl border border-[#E2DDCF] bg-white flex flex-col items-center justify-center relative min-h-[220px] flex-grow">
                <span className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-wider text-[#8C5C3E]">Blueprint Schematic</span>
                
                {/* Schematic SVG */}
                <svg width="240" height="160" viewBox="0 0 240 160" fill="none" className="text-[#3D5C45]">
                  {/* Outer circle (D) */}
                  <circle cx="100" cy="80" r="50" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.3" />
                  <circle cx="100" cy="80" r="46" stroke="currentColor" strokeWidth="2.5" />
                  
                  {/* Inner circle (d) */}
                  <circle cx="100" cy="80" r="22" stroke="currentColor" strokeWidth="2.5" />
                  <circle cx="100" cy="80" r="18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.3" />
                  
                  {/* Shaft representation */}
                  <line x1="100" y1="20" x2="100" y2="140" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.4" />
                  <line x1="40" y1="80" x2="160" y2="80" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.4" />

                  {/* Dimension D (Outer diameter) */}
                  <line x1="170" y1="34" x2="170" y2="126" stroke="#B84A2C" strokeWidth="1" />
                  <path d="M170 34l-3 6h6l-3-6zM170 126l-3-6h6l-3 6z" fill="#B84A2C" />
                  <text x="180" y="84" fill="#B84A2C" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    D: {searchResult && !searchResult.notFound ? `${searchResult.D}mm` : "O.D."}
                  </text>

                  {/* Dimension d (Inner bore) */}
                  <line x1="100" y1="58" x2="100" y2="102" stroke="#B84A2C" strokeWidth="1" />
                  <path d="M100 58l-3 6h6l-3-6zM100 102l-3-6h6l-3 6z" fill="#B84A2C" />
                  <text x="105" y="84" fill="#B84A2C" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    d: {searchResult && !searchResult.notFound ? `${searchResult.d}mm` : "I.D."}
                  </text>

                  {/* Dimension B (Width/Thickness) */}
                  <line x1="46" y1="145" x2="154" y2="145" stroke="#B84A2C" strokeWidth="1" />
                  <path d="M46 145l6-3v6l-6-3zM154 145l-6-3v6l6 3z" fill="#B84A2C" />
                  <text x="100" y="138" fill="#B84A2C" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                    B (Width): {searchResult && !searchResult.notFound ? `${searchResult.B}mm` : "Width"}
                  </text>
                </svg>
              </div>
            </div>

            {/* Right Column: Search Card Widget */}
            <div className="reveal-right flex flex-col justify-between">
              <div className="rounded-2xl overflow-hidden border border-[#2A2A28] bg-[#161714] h-full flex flex-col justify-between">
                <div className="p-7 pb-6">
                  <label className="block text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#D4B896]/65 mb-3">
                    Bearing designation
                  </label>
                  <div className="relative">
                    <input type="text" value={searchQuery} onChange={e => handleSearch(e.target.value)}
                      placeholder="e.g. 6204, 22220, UC205 …"
                      className="w-full rounded-xl px-5 py-4 text-[13.5px] font-mono bg-[#1E1F1C] border border-[#2E2E2C] text-[#F5F3EE] placeholder-[#F5F3EE]/25 focus:outline-none focus:border-[#D4B896]/40 transition-all duration-200" />
                    {searchQuery && (
                      <button onClick={() => handleSearch("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-[#F5F3EE]/35 hover:text-[#F5F3EE]/60 transition-colors cursor-pointer">
                        clear
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex-grow px-7 pb-7 flex flex-col justify-end">
                  {searchResult ? (
                    <div className="rounded-xl p-5 border border-[#3D5C45]/35 bg-[#3D5C45]/12 animate-fade-in">
                      {searchResult.notFound ? (
                        <>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-[#D4B896]" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4B896]">Custom sourcing required</span>
                          </div>
                          <p className="text-[12px] text-[#F5F3EE]/55 leading-relaxed mb-4">
                            Not in our quick index — our Mumbai desk specialises in sourcing any designation from European and Japanese OEMs.
                          </p>
                          <a href="#contact" className="text-[12px] font-bold text-[#D4B896] hover:underline">Request custom quote →</a>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#7AA685] animate-pulse" />
                              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7AA685]">Match — SKU {searchResult.code}</span>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#7AA685]/18 text-[#7AA685]">In Stock</span>
                          </div>
                          <div className="grid grid-cols-2 gap-5 text-[12.5px]">
                            <div className="space-y-3">
                              {[["Type", searchResult.type],["Brands", searchResult.brands.join(", ")]].map(([k,v]) => (
                                <div key={k as string}>
                                  <div className="text-[9.5px] uppercase tracking-wider text-[#F5F3EE]/30 mb-0.5">{k}</div>
                                  <div className="font-semibold text-[#F5F3EE] leading-snug">{v}</div>
                                </div>
                              ))}
                            </div>
                            <div className="space-y-3 pl-5 border-l border-[#F5F3EE]/8">
                              {[["Bore (d)", `${searchResult.d} mm`],["Outer (D)", `${searchResult.D} mm`],["Width (B)", `${searchResult.B} mm`]].map(([k,v]) => (
                                <div key={k as string}>
                                  <div className="text-[9.5px] uppercase tracking-wider text-[#F5F3EE]/30 mb-0.5">{k}</div>
                                  <div className="font-mono font-semibold text-[#F5F3EE]">{v}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t border-[#F5F3EE]/6 flex justify-end">
                            <a href="#contact"
                              onClick={() => { setMessage(`Inquiry for SKU ${searchResult.code} (${searchResult.type})\nDimensions: ${searchResult.d}×${searchResult.D}×${searchResult.B}mm\nQuantity: `); setEnquiryType("Product enquiry / quote"); }}
                              className="text-[12px] font-bold text-[#D4B896] hover:underline">
                              Request sourcing quote →
                            </a>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-xl p-8 border border-dashed border-[#F5F3EE]/10 bg-transparent flex flex-col items-center justify-center text-center opacity-40">
                      <svg className="w-8 h-8 text-[#F5F3EE] mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
                      </svg>
                      <p className="text-[12px] text-[#F5F3EE] max-w-[200px]">Enter a code above or select a common example to begin</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ BRANDS — horizontal moving cards ══ */}
      <section className="py-16 bg-[#EAE7E0] border-b border-[#E2DDCF] overflow-hidden">
        {/* Header */}
        <div className="mx-auto max-w-6xl px-6 lg:px-8 mb-10 reveal">
          <div className="flex items-center gap-4">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#8C5C3E] shrink-0">
              Brands we source &amp; supply
            </span>
            <div className="flex-1 h-px bg-[#C8BFA8]/60" />
          </div>
        </div>

        {/* Row 1 — scrolls LEFT */}
        <div className="relative mb-3">
          {/* Fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(to right, #EAE7E0, transparent)" }} />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(to left, #EAE7E0, transparent)" }} />

          <div className="flex" style={{ animation: "marquee 32s linear infinite" }}
            onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
            onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}>
            {[...brands, ...brands, ...brands].map((brand, i) => (
              <button
                key={i}
                onClick={() => setSelectedBrandIdx(i % brands.length)}
                className="shrink-0 mx-2 rounded-2xl border px-7 py-5 text-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  background: selectedBrandIdx === i % brands.length ? "#1A1A18" : "#F5F3EE",
                  borderColor: selectedBrandIdx === i % brands.length ? "#1A1A18" : "rgba(200,191,168,0.6)",
                  minWidth: "140px",
                }}>
                <span className="block font-display font-extrabold text-[13px] leading-tight mb-1"
                  style={{ color: selectedBrandIdx === i % brands.length ? "#D4B896" : "#1A1A18" }}>
                  {brand.name}
                </span>
                <span className="block text-[9px] uppercase tracking-[0.18em] font-bold"
                  style={{ color: selectedBrandIdx === i % brands.length ? "rgba(212,184,150,0.5)" : "#8C5C3E" }}>
                  {brand.origin}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls RIGHT (reverse) */}
        <div className="relative mb-10">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(to right, #EAE7E0, transparent)" }} />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(to left, #EAE7E0, transparent)" }} />

          <div className="flex" style={{ animation: "marquee 40s linear infinite reverse" }}
            onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
            onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}>
            {[...brands, ...brands, ...brands].map((brand, i) => (
              <button
                key={i}
                onClick={() => setSelectedBrandIdx(i % brands.length)}
                className="shrink-0 mx-2 rounded-2xl border px-7 py-5 text-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  background: selectedBrandIdx === i % brands.length ? "#1A1A18" : "#fff",
                  borderColor: selectedBrandIdx === i % brands.length ? "#1A1A18" : "rgba(200,191,168,0.6)",
                  minWidth: "140px",
                }}>
                <span className="block font-display font-extrabold text-[13px] leading-tight mb-1"
                  style={{ color: selectedBrandIdx === i % brands.length ? "#D4B896" : "#1A1A18" }}>
                  {brand.name}
                </span>
                <span className="block text-[9px] uppercase tracking-[0.18em] font-bold"
                  style={{ color: selectedBrandIdx === i % brands.length ? "rgba(212,184,150,0.5)" : "#8C5C3E" }}>
                  {brand.origin}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected brand detail panel */}
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div
            key={selectedBrandIdx}
            className="flex items-start gap-5 rounded-2xl p-6 border border-[#E2DDCF] bg-[#F5F3EE] animate-fade-in transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-[#1A1A18] flex items-center justify-center shrink-0">
              <span className="font-display font-extrabold text-[11px] text-[#D4B896] uppercase tracking-wide leading-none text-center">
                {brands[selectedBrandIdx].origin.slice(0, 2)}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="font-display font-extrabold text-[15px] text-[#1A1A18]">
                  {brands[selectedBrandIdx].name}
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#3D5C45]/10 text-[#3D5C45] uppercase tracking-wider">
                  {brands[selectedBrandIdx].origin}
                </span>
              </div>
              <p className="text-[13.5px] leading-relaxed text-[#3D3C38]">
                {brands[selectedBrandIdx].desc}
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 shrink-0 text-[11px] font-semibold text-[#8C5C3E]">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
              </svg>
              Click any card to explore
            </div>
          </div>
        </div>
      </section>

      {/* ══ PRODUCTS ══ */}
      <section id="products" className="py-24 bg-[#F5F3EE]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-12 reveal">
            <div>
              <span className="inline-flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#B84A2C] mb-3">
                <span className="w-5 h-px bg-[#B84A2C]" />Product Range
              </span>
              <h2 className="font-display font-extrabold text-[2rem] sm:text-[2.3rem] leading-tight tracking-tight text-[#1A1A18]">
                Every bearing type your<br className="hidden sm:block" /> line depends on.
              </h2>
            </div>
            <p className="text-[13.5px] leading-relaxed text-[#3D3C38] max-w-xs sm:text-right">
              Genuine, traceable parts sourced for heavy industrial systems and precision machinery.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-10 reveal">
            {[
              { id:"all",     label:"All Types" },
              { id:"ball",    label:"Ball Bearings" },
              { id:"roller",  label:"Roller Bearings" },
              { id:"housed",  label:"Agricultural" },
              { id:"special", label:"Specialty" },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveCategoryFilter(tab.id)}
                className="px-4 py-2 rounded-lg text-[12px] font-bold tracking-wide border cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: activeCategoryFilter === tab.id ? "#1A1A18" : "transparent",
                  color: activeCategoryFilter === tab.id ? "#F5F3EE" : "#3D3C38",
                  borderColor: activeCategoryFilter === tab.id ? "#1A1A18" : "rgba(200,191,168,0.7)",
                }}>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProducts.map((product, i) => (
              <div key={product.id}
                className="reveal stagger group rounded-2xl border border-[#E2DDCF] bg-white hover:border-[#B84A2C]/28 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#1A1A18]/8 transition-all duration-350 flex flex-col overflow-hidden"
                style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}>
                {/* Product image */}
                <div className="relative h-44 overflow-hidden">
                  <Image src={product.img} alt={product.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18]/60 to-transparent" />
                  <span className="absolute top-4 right-4 font-display font-extrabold text-2xl text-white/20 leading-none">{product.id}</span>
                  <span className="absolute bottom-4 left-4 text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#F5F3EE]/15 backdrop-blur-sm text-[#F5F3EE] uppercase tracking-wider border border-[#F5F3EE]/20">
                    {product.group}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display font-extrabold text-[17px] text-[#1A1A18] mb-2 leading-snug group-hover:text-[#B84A2C] transition-colors duration-200">
                    {product.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[#3D3C38] flex-1">{product.desc}</p>

                  {/* Specs */}
                  <div className="mt-5 rounded-xl p-4 bg-[#F5F3EE] border border-[#E2DDCF]">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      {[["Bore",product.specs.bore],["Speed",product.specs.speed],["Grade",product.specs.prec]].map(([k,v]) => (
                        <div key={k as string}>
                          <div className="text-[9px] uppercase tracking-wider text-[#8C5C3E] mb-0.5 font-semibold">{k}</div>
                          <div className="text-[11px] font-bold text-[#1A1A18] leading-tight">{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10.5px] font-semibold text-[#8C5C3E] uppercase tracking-wide">{product.tag}</span>
                    <a href="#contact"
                      onClick={() => { setMessage(`Inquiry: ${product.title}\nQuantity: `); setEnquiryType("Product enquiry / quote"); }}
                      className="text-[12.5px] font-bold text-[#B84A2C] hover:underline">
                      Quote →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INDUSTRIES ══ */}
      <section id="industries" className="py-24 bg-[#1A1A18]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-16 reveal">
            <div className="lg:w-1/2">
              <span className="inline-flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#D4B896] mb-4">
                <span className="w-5 h-px bg-[#B84A2C]" />Industries
              </span>
              <h2 className="font-display font-extrabold text-[2rem] sm:text-[2.3rem] leading-tight text-[#F5F3EE]">
                Keeping critical<br />sectors turning.
              </h2>
            </div>
            <p className="lg:w-1/2 text-[13.5px] leading-relaxed text-[#F5F3EE]/42 lg:text-right lg:pb-1">
              From continuous casting steel mills in central India to high-efficiency turbine gearboxes — our parts minimise downtime across essential industries.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.map((ind, i) => (
              <div key={i}
                className="reveal stagger group rounded-xl p-6 border border-[#F5F3EE]/6 hover:border-[#D4B896]/30 bg-[#F5F3EE]/3 hover:bg-[#F5F3EE]/6 transition-all duration-300 cursor-default hover:-translate-y-1"
                style={{ "--delay": `${i * 75}ms` } as React.CSSProperties}>
                <div className="font-display font-extrabold text-5xl text-[#F5F3EE]/6 mb-4 select-none leading-none">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="font-display font-bold text-[15px] text-[#F5F3EE] mb-2 group-hover:text-[#D4B896] transition-colors duration-200">{ind.name}</h3>
                <p className="text-[12.5px] leading-relaxed text-[#F5F3EE]/40">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW WE WORK ══ */}
      <section id="trade" className="py-24 bg-[#F5F3EE] border-b border-[#E2DDCF]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-14 reveal">
            <span className="inline-flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#B84A2C] mb-4">
              <span className="w-5 h-px bg-[#B84A2C]" />Our Process
            </span>
            <h2 className="font-display font-extrabold text-[2rem] sm:text-[2.3rem] leading-tight tracking-tight text-[#1A1A18]">
              From enquiry to delivery.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-[22px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px bg-[#E2DDCF] z-0" />
            {steps.map((step, i) => (
              <div key={i}
                className="reveal stagger relative z-10"
                style={{ "--delay": `${i * 100}ms` } as React.CSSProperties}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-full border-2 border-[#1A1A18] bg-[#F5F3EE] flex items-center justify-center font-display font-extrabold text-[13px] text-[#1A1A18] shrink-0 transition-all duration-300 hover:bg-[#1A1A18] hover:text-[#F5F3EE]">
                    {step.num}
                  </div>
                  {i < 3 && <div className="h-px flex-1 bg-[#E2DDCF] lg:hidden" />}
                </div>
                <h3 className="font-display font-bold text-[15.5px] text-[#1A1A18] mb-2">{step.title}</h3>
                <p className="text-[13px] leading-relaxed text-[#3D3C38]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" className="py-24 bg-white border-b border-[#E2DDCF]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-7 reveal-left">
              <span className="inline-flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#B84A2C] mb-4">
                <span className="w-5 h-px bg-[#B84A2C]" />Our Story
              </span>
              <h2 className="font-display font-extrabold text-[2rem] sm:text-[2.3rem] leading-tight tracking-tight text-[#1A1A18] mb-6">
                A trade house built on genuine<br className="hidden sm:block" /> parts and real relationships.
              </h2>
              <p className="text-[14.5px] leading-relaxed text-[#3D3C38] mb-4">
                Power Agro is a Mumbai-based import and export house dedicated strictly to industrial and agricultural bearings. We deal directly with manufacturers and verified official channel partners — every single box is traceable to source.
              </p>
              <p className="text-[14.5px] leading-relaxed text-[#3D3C38]">
                Sharing a business heritage dating back to 1980, we pair deep product-code knowledge with rigorous customs clearance, anti-rust inspection, and compliant trade documentation.
              </p>

              <div className="mt-10 grid sm:grid-cols-2 gap-4">
                {[
                  { title:"100% Genuine Sourcing", desc:"Brand-audited, traceable certificates on every consignment." },
                  { title:"Global Reach",           desc:"Expert customs handling and container freight worldwide." },
                  { title:"Technical Matching",     desc:"Decades of cross-reference engineering databases." },
                  { title:"Trade Compliance",       desc:"Transparent invoice structures, proper GST filings." },
                ].map((f, i) => (
                  <div key={i}
                    className="reveal stagger flex gap-3 items-start p-4 rounded-xl border border-[#E2DDCF] bg-[#F5F3EE] hover:border-[#3D5C45]/30 transition-colors duration-200"
                    style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}>
                    <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-[#3D5C45]/12">
                      <svg className="w-3 h-3" fill="none" stroke="#3D5C45" strokeWidth="2.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-[13.5px] text-[#1A1A18] mb-0.5">{f.title}</div>
                      <div className="text-[12px] text-[#8C5C3E] leading-relaxed">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 reveal-right">
              {/* About image */}
              <div className="rounded-2xl overflow-hidden mb-4 img-overlay relative h-64 shadow-xl">
                <Image src="/about_trade.png" alt="Mumbai trade desk" fill className="object-cover" />
                <div className="absolute inset-0 z-10 flex items-end p-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1A18]/60 backdrop-blur-sm border border-[#F5F3EE]/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B84A2C]" />
                    <span className="text-[11px] font-bold text-[#F5F3EE] uppercase tracking-wider">Mumbai · Est. 1980</span>
                  </div>
                </div>
              </div>

              {/* Globe card */}
              <div className="rounded-2xl overflow-hidden border border-[#E2DDCF] shadow-sm">
                <div className="bg-[#111210] relative">
                  <svg className="w-full" viewBox="0 0 400 220" fill="none">
                    <rect width="400" height="220" fill="#111210" />
                    <g stroke="rgba(255,255,255,0.07)" strokeWidth="0.8">
                      <ellipse cx="200" cy="110" rx="110" ry="110" />
                      <ellipse cx="200" cy="110" rx="110" ry="42" />
                      <ellipse cx="200" cy="110" rx="110" ry="76" />
                      <ellipse cx="200" cy="110" rx="42" ry="110" />
                      <ellipse cx="200" cy="110" rx="76" ry="110" />
                      <line x1="90" y1="110" x2="310" y2="110" />
                      <line x1="200" y1="0" x2="200" y2="220" />
                    </g>
                    <circle cx="200" cy="110" r="6" fill="#B84A2C" />
                    <circle cx="200" cy="110" r="14" fill="#B84A2C" opacity="0.18" />
                    <g fill="#D4B896" opacity="0.65">
                      <circle cx="112" cy="68" r="3" /><circle cx="295" cy="82" r="3" />
                      <circle cx="148" cy="165" r="3" /><circle cx="275" cy="152" r="3" />
                      <circle cx="258" cy="48" r="3" />
                    </g>
                    <g stroke="#D4B896" strokeWidth="1.2" strokeDasharray="3 4" opacity="0.5" fill="none">
                      <path d="M200 110 Q148 82 112 68" />
                      <path d="M200 110 Q258 88 295 82" />
                      <path d="M200 110 Q170 145 148 165" />
                      <path d="M200 110 Q248 140 275 152" />
                      <path d="M200 110 Q238 70 258 48" />
                    </g>
                    <text x="205" y="113" fill="#B84A2C" fontSize="7" fontFamily="sans-serif" fontWeight="700">MUM</text>
                  </svg>
                </div>
                <div className="p-5 bg-[#F5F3EE]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#B84A2C] animate-pulse" />
                    <span className="font-bold text-[13.5px] text-[#1A1A18]">Mumbai Trade Desk</span>
                  </div>
                  <p className="text-[12px] text-[#8C5C3E] leading-relaxed">
                    2nd Floor, 12/14 Hira Bhuvan, Dariyasthan Street, Masjid Bunder, Mumbai 400003.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" className="py-24 bg-[#EAE7E0]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-14 reveal">
            <span className="inline-flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#B84A2C] mb-4">
              <span className="w-5 h-px bg-[#B84A2C]" />Contact
            </span>
            <h2 className="font-display font-extrabold text-[2rem] sm:text-[2.3rem] leading-tight text-[#1A1A18]">
              Get in touch with us.
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 rounded-2xl bg-white border border-[#E2DDCF] shadow-sm overflow-hidden reveal-left">
              <div className="h-1 bg-gradient-to-r from-[#B84A2C] via-[#D4B896] to-[#3D5C45]" />
              <div className="p-8 sm:p-10">
                <h3 className="font-display font-extrabold text-[18px] text-[#1A1A18] mb-1">Send a sourcing request</h3>
                <p className="text-[13px] text-[#8C5C3E] mb-8">Part numbers, quantities, target brands — share what you need.</p>

                {formSubmitted ? (
                  <div className="py-12 text-center animate-fade-in">
                    <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-5 bg-[#3D5C45]/10">
                      <svg className="w-7 h-7" fill="none" stroke="#3D5C45" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="font-display font-bold text-[17px] text-[#1A1A18] mb-2">Request sent!</h4>
                    <p className="text-[13px] text-[#3D3C38] max-w-xs mx-auto mb-7 leading-relaxed">
                      We'll cross-reference your request and reply within 4 business hours to <strong>{email}</strong>.
                    </p>
                    <button onClick={() => { setFormSubmitted(false); setName(""); setCompany(""); setEmail(""); setMessage(""); }}
                      className="px-5 py-2.5 rounded-lg text-[12.5px] font-bold border border-[#E2DDCF] text-[#1A1A18] hover:bg-[#F5F3EE] transition-colors cursor-pointer">
                      Submit another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    {formError && (
                      <div className="px-4 py-3 rounded-xl text-[12.5px] font-semibold bg-[#B84A2C]/8 text-[#B84A2C] border border-[#B84A2C]/20">{formError}</div>
                    )}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D3C38] mb-1.5">Name *</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required
                          className="w-full rounded-xl px-4 py-3 text-[13.5px] bg-[#F5F3EE] border border-[#E2DDCF] text-[#1A1A18] placeholder-[#1A1A18]/28 focus:outline-none focus:border-[#B84A2C]/40 transition-all duration-200" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D3C38] mb-1.5">Company</label>
                        <input type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder="Company name"
                          className="w-full rounded-xl px-4 py-3 text-[13.5px] bg-[#F5F3EE] border border-[#E2DDCF] text-[#1A1A18] placeholder-[#1A1A18]/28 focus:outline-none focus:border-[#B84A2C]/40 transition-all duration-200" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D3C38] mb-1.5">Email *</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@company.com" required
                        className="w-full rounded-xl px-4 py-3 text-[13.5px] bg-[#F5F3EE] border border-[#E2DDCF] text-[#1A1A18] placeholder-[#1A1A18]/28 focus:outline-none focus:border-[#B84A2C]/40 transition-all duration-200" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D3C38] mb-1.5">Category</label>
                      <select value={enquiryType} onChange={e => setEnquiryType(e.target.value)}
                        className="w-full rounded-xl px-4 py-3 text-[13.5px] bg-[#F5F3EE] border border-[#E2DDCF] text-[#1A1A18] focus:outline-none focus:border-[#B84A2C]/40 transition-all duration-200 cursor-pointer">
                        <option>Product enquiry / quote</option>
                        <option>Bulk / export order</option>
                        <option>Distributor partnership</option>
                        <option>General question</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D3C38] mb-1.5">Bearing details &amp; message *</label>
                      <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4} required
                        placeholder="e.g. SKF 6204-2RSH (Qty: 250), FAG 22220-E1-K (Qty: 50)"
                        className="w-full rounded-xl px-4 py-3 text-[13.5px] bg-[#F5F3EE] border border-[#E2DDCF] text-[#1A1A18] placeholder-[#1A1A18]/28 focus:outline-none focus:border-[#B84A2C]/40 transition-all duration-200 resize-none" />
                    </div>
                    <button type="submit"
                      className="w-full py-4 rounded-xl bg-[#1A1A18] hover:bg-[#2A2A28] text-[#F5F3EE] text-[13.5px] font-bold tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#1A1A18]/25 cursor-pointer">
                      Send Sourcing Request →
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3 reveal-right">
              {[
                { label:"Office",           val:"2nd Floor-1, 12/14 Hira Bhuvan, Dariyasthan Street, Masjid Bunder, Mumbai 400003", href:"https://maps.google.com/?q=Dariyasthan+Street,+Masjid+Bunder,+Mumbai", linkText:"Open in Google Maps →", external:true },
                { label:"Phone / WhatsApp", val:"+91 98207 17873",     href:"tel:+919820717873",                  linkText:"", external:false },
                { label:"Email",            val:"info.poweragro@gmail.com", href:"mailto:info.poweragro@gmail.com", linkText:"", external:false },
                { label:"GSTIN",            val:"27AAZHA9435Q1Z5",     href:"", linkText:"", external:false },
                { label:"Hours",            val:"Mon – Sat · 10:00 – 18:30 IST", href:"", linkText:"", external:false },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start p-5 rounded-xl bg-white border border-[#E2DDCF] hover:border-[#C8BFA8] transition-colors duration-200">
                  <span className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-[#8C5C3E] mt-0.5 w-20 shrink-0">{item.label}</span>
                  <div>
                    {item.href ? (
                      <a href={item.href} target={item.external ? "_blank" : undefined} rel="noopener noreferrer"
                        className="text-[13px] font-semibold text-[#1A1A18] hover:text-[#B84A2C] transition-colors leading-snug block">{item.val}</a>
                    ) : (
                      <span className="text-[13px] font-semibold text-[#1A1A18] leading-snug block">{item.val}</span>
                    )}
                    {item.linkText && (
                      <a href={item.href} target="_blank" rel="noopener noreferrer"
                        className="text-[11.5px] font-bold text-[#B84A2C] hover:underline mt-1 block">{item.linkText}</a>
                    )}
                  </div>
                </div>
              ))}
              <a href="https://wa.me/919820717873" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-xl bg-[#25D366] hover:bg-[#22C55E] text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#25D366]/35">
                <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <div>
                  <div className="font-bold text-[14px]">Chat on WhatsApp</div>
                  <div className="text-[12px] opacity-80">We typically reply within the hour</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="bg-[#111210] border-t border-[#2A2A28]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-14 grid md:grid-cols-3 gap-10">
          <div>
            <a href="#top" className="flex items-center gap-2.5 mb-5">
              <LogoMark size={32} />
              <span className="font-display font-extrabold text-[14px] text-[#F5F3EE]">
                Power<span className="text-[#D4B896]">Agro</span>
              </span>
            </a>
            <p className="text-[12.5px] leading-relaxed text-[#F5F3EE]/38">
              Mumbai-based import &amp; export house for 100% genuine industrial and agricultural bearings. Serving buyers across India and internationally since 1980.
            </p>
          </div>
          <div>
            <h4 className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#D4B896]/55 mb-5">Navigation</h4>
            <ul className="space-y-2.5">
              {[["#products","Product Range"],["#industries","Industries Served"],["#trade","Our Process"],["#about","About Us"],["#contact","Contact & Enquiry"]].map(([href,label]) => (
                <li key={href}><a href={href} className="text-[12.5px] text-[#F5F3EE]/45 hover:text-[#F5F3EE]/80 transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#D4B896]/55 mb-5">Brands Supplied</h4>
            <p className="text-[12.5px] text-[#F5F3EE]/45 leading-relaxed mb-5">FAG · INA · Schaeffler · SKF · Timken · NSK · NTN · KOYO · NACHI</p>
            <a href="mailto:info.poweragro@gmail.com" className="block text-[12.5px] font-bold text-[#D4B896] hover:underline mb-1">info.poweragro@gmail.com</a>
            <a href="tel:+919820717873" className="block text-[12.5px] text-[#F5F3EE]/45 hover:text-[#F5F3EE]/70 transition-colors">+91 98207 17873</a>
          </div>
        </div>
        <div className="border-t border-[#2A2A28] mx-6">
          <div className="mx-auto max-w-6xl py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10.5px] text-[#F5F3EE]/22">
            <span>© {currentYear} Power Agro. All rights reserved.</span>
            <span>GSTIN: 27AAZHA9435Q1Z5 · Masjid Bunder, Mumbai 400003</span>
          </div>
        </div>
      </footer>
    </main>
  );
}