"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

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

export default function Home() {
  useReveal();

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

  const bearingDb: Record<string, { type: string; d: number; D: number; B: number; brands: string[] }> = {
    "6204": { type: "Deep Groove Ball Bearing", d: 20, D: 47, B: 14, brands: ["SKF", "FAG", "NSK", "NTN"] },
    "6008": { type: "Deep Groove Ball Bearing", d: 40, D: 68, B: 15, brands: ["SKF", "FAG", "KOYO"] },
    "22220": { type: "Spherical Roller Bearing", d: 100, D: 180, B: 46, brands: ["SKF", "FAG", "Timken"] },
    "30204": { type: "Tapered Roller Bearing", d: 20, D: 47, B: 15.25, brands: ["Timken", "FAG", "NTN", "NACHI"] },
    "51105": { type: "Thrust Ball Bearing", d: 25, D: 37, B: 9, brands: ["SKF", "FAG", "NSK"] },
    "UC205": { type: "Pillow Block Insert Bearing", d: 25, D: 52, B: 34.1, brands: ["NTN", "KOYO"] },
  };

  const handleSearch = (val: string) => {
    setSearchQuery(val);
    const norm = val.toUpperCase().replace(/\s+/g, "");
    if (!norm) { setSearchResult(null); return; }
    const key = Object.keys(bearingDb).find(k => k.includes(norm) || norm.includes(k));
    setSearchResult(key
      ? { code: key, ...bearingDb[key] }
      : { notFound: true, type: "Custom", brands: ["FAG", "SKF", "Timken", "NSK", "NTN", "NACHI", "KOYO"] }
    );
  };

  const brands = [
    { name: "FAG · INA", origin: "Germany", desc: "Premium Schaeffler automotive & industrial roller bearings sourced directly from certified European channels." },
    { name: "SKF", origin: "Sweden", desc: "Global leader in high-performance rotating equipment — bearings, seals, and lubrication systems." },
    { name: "Timken", origin: "USA", desc: "Tapered roller bearings for heavy-duty industrial gearing and demanding applications." },
    { name: "NSK", origin: "Japan", desc: "Super-precision ball bearings and linear motion components for high-accuracy machinery." },
    { name: "NTN", origin: "Japan", desc: "Standard and custom bearings for automotive & manufacturing — broad catalog coverage." },
    { name: "KOYO", origin: "Japan", desc: "Heavy agricultural & automotive steering machinery bearings, part of the JTEKT group." },
    { name: "NACHI", origin: "Japan", desc: "Extremely durable bearings for robotics, CNC machine tools, and high-cycle applications." },
    { name: "Schaeffler", origin: "Germany", desc: "Engineered solutions and high-grade bearings for aerospace, rail, and wind energy." },
  ];

  const products = [
    { id: "01", title: "Deep Groove Ball", group: "ball", img: "/images/1.jpg", desc: "Highly versatile, low-friction, high-speed bearings for motors, pumps & gearboxes.", tag: "Radial · High Speed", specs: { bore: "10–1200 mm", speed: "32,000 RPM", prec: "P0/P6/P5" } },
    { id: "02", title: "Tapered & Cylindrical", group: "roller", img: "/images/2.png", desc: "Massive radial + axial load capacity for industrial gearboxes and wheel hubs.", tag: "High Load · Rigid", specs: { bore: "15–1800 mm", speed: "12,000 RPM", prec: "P6/P5/P4" } },
    { id: "03", title: "Spherical Roller", group: "roller", img: "/images/3.jpg", desc: "Self-aligning heavy-duty bearings handling misalignment, vibration & shock loads.", tag: "Self-Aligning · Shock", specs: { bore: "20–2200 mm", speed: "8,000 RPM", prec: "P6/P5" } },
    { id: "04", title: "Agricultural & Farm", group: "housed", img: "/images/4.jpg", desc: "Sealed, dust-proof units for tractors, disk harrows, and combine harvesters.", tag: "Triple Seal · Dust Tight", specs: { bore: "20–120 mm", speed: "4,500 RPM", prec: "Standard" } },
    { id: "05", title: "Pillow Blocks & Housed", group: "housed", img: "/images/5.jpg", desc: "Cast iron housings ready to mount — conveyors, fans, industrial drives.", tag: "Plummer · Flange", specs: { bore: "12–140 mm", speed: "6,000 RPM", prec: "Cast Iron" } },
    { id: "06", title: "Precision & Specialty", group: "special", img: "/images/6.png", desc: "Angular contact, thrust, and custom-sourced bearings for high-accuracy specialty lines.", tag: "Micron · Custom", specs: { bore: "5–600 mm", speed: "48,000 RPM", prec: "P4/P2" } },
  ];

  const steps = [
    { num: "01", title: "Tell us what you need", desc: "Share your bearing SKU, dimension, or application. Our desk narrows down the right designation." },
    { num: "02", title: "We source it directly", desc: "Genuine, traceable parts from certified OEM factories in Europe, USA, and Japan — never grey market." },
    { num: "03", title: "Docs & compliance sorted", desc: "Export invoice, packing list, certificate of origin and customs clearance — handled by our Mumbai team." },
    { num: "04", title: "Delivered to your door", desc: "Securely packed, anti-moisture wrapped, tracked door-to-door. Authentic every time." },
  ];

  const filteredProducts = activeCategoryFilter === "all" ? products : products.filter(p => p.group === activeCategoryFilter);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) { setFormError("Please fill in your name, email, and message."); return; }
    setFormError(""); setFormSubmitted(true);
  };

  return (
    <main className="min-h-screen font-sans overflow-x-hidden bg-[#F5F3EE] text-[#1A1A18]">

      <SiteHeader />

      {/* ══ HERO ══ */}
      <section id="top" className="relative overflow-hidden bg-[#111210] text-[#F5F3EE]" style={{ minHeight: "92vh" }}>
        {/* Full-bleed hero image */}
        <div className="absolute inset-0 z-0">
          <Image src="/images/9.png" alt="Industrial bearings" fill className="object-cover opacity-35" priority />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(17,18,16,0.95) 0%, rgba(17,18,16,0.7) 55%, rgba(17,18,16,0.35) 100%)" }} />
        </div>

        {/* Ambient glow blobs */}
        <div className="absolute inset-0 pointer-events-none z-[1]"
          style={{ background: "radial-gradient(ellipse 55% 55% at 70% 45%, rgba(61,92,69,0.22) 0%, transparent 70%)" }} />


        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.04] grid-bg" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8 pt-28 pb-24 md:pt-36 md:pb-32">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-8 animate-fade-in">
              <span className="w-8 h-px bg-[#B84A2C]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#D4B896]/80">
                Mumbai · Import &amp; Export · Since 1980
              </span>
            </div>

            <h1 className="font-display font-extrabold leading-[1.07] tracking-tight animate-slide-up"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)" }}>
              The bearings that<br />
              keep{" "}
              <span className="text-[#D4B896]">India&apos;s industry</span>
              <br />turning.
            </h1>

            <p className="mt-6 text-[15px] leading-relaxed text-[#F5F3EE]/58 max-w-lg animate-fade-in"
              style={{ animationDelay: "0.2s" }}>
              Power Agro connects buyers across Asia, Africa, and the Middle East with 100% genuine agricultural and industrial bearings — sourced from certified brand channels, dispatched from Mumbai.
            </p>

            <div className="mt-10 flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: "0.35s" }}>
              <a href="#products"
                className="inline-flex items-center gap-2 bg-[#B84A2C] hover:bg-[#A03F26] text-[#F5F3EE] px-7 py-3.5 text-sm font-bold tracking-wide transition-all duration-200">
                Browse Our Range
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="square" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#contact"
                className="inline-flex items-center gap-2 border border-[#F5F3EE]/25 hover:border-[#F5F3EE]/60 text-[#F5F3EE] px-7 py-3.5 text-sm font-semibold transition-all duration-200">
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
          <Image src="/images/10.jpg" alt="Precision bearings" fill className="object-cover" />
          <div className="absolute inset-0 z-10 flex items-end p-8">
            <div>
              <div className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#D4B896] mb-1">Precision Engineering</div>
              <div className="font-display font-extrabold text-xl text-white">Industrial Grade Parts</div>
            </div>
          </div>
        </div>
        <div className="img-overlay relative">
          <Image src="/images/8.jpg" alt="Agricultural bearings" fill className="object-cover" />
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
                  Type a standard designation and we&apos;ll show you exact dimensions and the brands we stock it under.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#8C5C3E] mr-1">Try:</span>
                  {["6204", "22220", "30204", "UC205"].map(ex => (
                    <button key={ex} onClick={() => handleSearch(ex)}
                      className="px-3 py-1.5 border border-[#3D5C45]/30 bg-[#3D5C45]/6 text-[#3D5C45] text-[11.5px] font-bold hover:bg-[#3D5C45]/14 transition-all duration-200 cursor-pointer">
                      {ex}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Blueprint Graphic */}
              <div className="mt-8 p-6 border border-[#E2DDCF] bg-white flex flex-col items-center justify-center relative min-h-[220px] flex-grow">
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
              <div className="overflow-hidden border border-[#2A2A28] bg-[#161714] h-full flex flex-col justify-between">
                <div className="p-7 pb-6">
                  <label className="block text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#D4B896]/65 mb-3">
                    Bearing designation
                  </label>
                  <div className="relative">
                    <input type="text" value={searchQuery} onChange={e => handleSearch(e.target.value)}
                      placeholder="e.g. 6204, 22220, UC205 …"
                      className="w-full px-5 py-4 text-[13.5px] font-mono bg-[#1E1F1C] border border-[#2E2E2C] text-[#F5F3EE] placeholder-[#F5F3EE]/25 focus:outline-none focus:border-[#D4B896]/40 transition-all duration-200" />
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
                    <div className="p-5 border border-[#3D5C45]/35 bg-[#3D5C45]/12 animate-fade-in">
                      {searchResult.notFound ? (
                        <>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 bg-[#D4B896]" />
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
                              <span className="w-2 h-2 bg-[#7AA685]" />
                              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7AA685]">Match — SKU {searchResult.code}</span>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#7AA685]/18 text-[#7AA685]">In Stock</span>
                          </div>
                          <div className="grid grid-cols-2 gap-5 text-[12.5px]">
                            <div className="space-y-3">
                              {[["Type", searchResult.type], ["Brands", searchResult.brands.join(", ")]].map(([k, v]) => (
                                <div key={k as string}>
                                  <div className="text-[9.5px] uppercase tracking-wider text-[#F5F3EE]/30 mb-0.5">{k}</div>
                                  <div className="font-semibold text-[#F5F3EE] leading-snug">{v}</div>
                                </div>
                              ))}
                            </div>
                            <div className="space-y-3 pl-5 border-l border-[#F5F3EE]/8">
                              {[["Bore (d)", `${searchResult.d} mm`], ["Outer (D)", `${searchResult.D} mm`], ["Width (B)", `${searchResult.B} mm`]].map(([k, v]) => (
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
                    <div className="p-8 border border-dashed border-[#F5F3EE]/10 bg-transparent flex flex-col items-center justify-center text-center opacity-40">
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
              { id: "all", label: "All Types" },
              { id: "ball", label: "Ball Bearings" },
              { id: "roller", label: "Roller Bearings" },
              { id: "housed", label: "Agricultural" },
              { id: "special", label: "Specialty" },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveCategoryFilter(tab.id)}
                className="px-4 py-2 text-[12px] font-bold tracking-wide border cursor-pointer transition-all duration-200"
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
                className="reveal stagger group border border-[#E2DDCF] bg-white hover:border-[#B84A2C]/28 transition-all duration-350 flex flex-col overflow-hidden"
                style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}>
                {/* Product image */}
                <div className="relative h-44 overflow-hidden">
                  <Image src={product.img} alt={product.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18]/60 to-transparent" />
                  <span className="absolute top-4 right-4 font-display font-extrabold text-2xl text-white/20 leading-none">{product.id}</span>
                  <span className="absolute bottom-4 left-4 text-[10px] font-bold px-2.5 py-1 bg-[#F5F3EE]/15 text-[#F5F3EE] uppercase tracking-wider border border-[#F5F3EE]/20">
                    {product.group}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display font-extrabold text-[17px] text-[#1A1A18] mb-2 leading-snug group-hover:text-[#B84A2C] transition-colors duration-200">
                    {product.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[#3D3C38] flex-1">{product.desc}</p>

                  {/* Specs */}
                  <div className="mt-5 p-4 bg-[#F5F3EE] border border-[#E2DDCF]">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      {[["Bore", product.specs.bore], ["Speed", product.specs.speed], ["Grade", product.specs.prec]].map(([k, v]) => (
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
                  <div className="w-11 h-11 border border-[#1A1A18] bg-[#F5F3EE] flex items-center justify-center font-display font-extrabold text-[13px] text-[#1A1A18] shrink-0 transition-all duration-300 hover:bg-[#1A1A18] hover:text-[#F5F3EE]">
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
                  {
                    title: "100% Genuine Sourcing",
                    desc: "Brand-audited, traceable certificates on every consignment.",
                    icon: (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="#3D5C45" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    )
                  },
                  {
                    title: "Global Reach",
                    desc: "Expert customs handling and container freight worldwide.",
                    icon: (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="#3D5C45" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="9" />
                        <path strokeLinecap="round" d="M3.6 9h16.8M3.6 15h16.8" />
                        <path strokeLinecap="round" d="M11.5 3a17 17 0 000 18m1-18a17 17 0 010 18" />
                      </svg>
                    )
                  },
                  {
                    title: "Technical Matching",
                    desc: "Decades of cross-reference engineering databases.",
                    icon: (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="#3D5C45" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )
                  },
                  {
                    title: "Trade Compliance",
                    desc: "Transparent invoice structures, proper GST filings.",
                    icon: (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="#3D5C45" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    )
                  }
                ].map((f, i) => (
                  <div key={i}
                    className="reveal stagger flex gap-3 items-start p-4 border border-[#E2DDCF] bg-[#F5F3EE] hover:border-[#3D5C45]/30 transition-colors duration-200"
                    style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}>
                    <div className="mt-0.5 w-5 h-5 flex items-center justify-center shrink-0 bg-[#3D5C45]/12">
                      {f.icon}
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
              <div className="overflow-hidden mb-4 img-overlay relative h-64">
                <Image src="/images/11.jpg" alt="Mumbai trade desk" fill className="object-cover" />
                <div className="absolute inset-0 z-10 flex items-end p-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1A1A18]/60 border border-[#F5F3EE]/10">
                    <span className="w-1.5 h-1.5 bg-[#B84A2C]" />
                    <span className="text-[11px] font-bold text-[#F5F3EE] uppercase tracking-wider">Mumbai · Est. 1980</span>
                  </div>
                </div>
              </div>

              {/* Globe card */}
              <div className="overflow-hidden border border-[#E2DDCF] shadow-sm">
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
                    <span className="w-2 h-2 bg-[#B84A2C]" />
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
            <div className="lg:col-span-7 bg-white border border-[#E2DDCF] shadow-sm overflow-hidden reveal-left">
              <div className="p-8 sm:p-10">
                <h3 className="font-display font-extrabold text-[18px] text-[#1A1A18] mb-1">Send a sourcing request</h3>
                <p className="text-[13px] text-[#8C5C3E] mb-8">Part numbers, quantities, target brands — share what you need.</p>

                {formSubmitted ? (
                  <div className="py-12 text-center animate-fade-in">
                    <div className="w-16 h-16 mx-auto flex items-center justify-center mb-5 bg-[#3D5C45]/10">
                      <svg className="w-7 h-7" fill="none" stroke="#3D5C45" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="font-display font-bold text-[17px] text-[#1A1A18] mb-2">Request sent!</h4>
                    <p className="text-[13px] text-[#3D3C38] max-w-xs mx-auto mb-7 leading-relaxed">
                      We&apos;ll cross-reference your request and reply within 4 business hours to <strong>{email}</strong>.
                    </p>
                    <button onClick={() => { setFormSubmitted(false); setName(""); setCompany(""); setEmail(""); setMessage(""); }}
                      className="px-5 py-2.5 text-[12.5px] font-bold border border-[#E2DDCF] text-[#1A1A18] hover:bg-[#F5F3EE] transition-colors cursor-pointer">
                      Submit another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    {formError && (
                      <div className="px-4 py-3 text-[12.5px] font-semibold bg-[#B84A2C]/8 text-[#B84A2C] border border-[#B84A2C]/20">{formError}</div>
                    )}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D3C38] mb-1.5">Name *</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required
                          className="w-full px-4 py-3 text-[13.5px] bg-[#F5F3EE] border border-[#E2DDCF] text-[#1A1A18] placeholder-[#1A1A18]/28 focus:outline-none focus:border-[#B84A2C]/40 transition-all duration-200" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D3C38] mb-1.5">Company</label>
                        <input type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder="Company name"
                          className="w-full px-4 py-3 text-[13.5px] bg-[#F5F3EE] border border-[#E2DDCF] text-[#1A1A18] placeholder-[#1A1A18]/28 focus:outline-none focus:border-[#B84A2C]/40 transition-all duration-200" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D3C38] mb-1.5">Email *</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@company.com" required
                        className="w-full px-4 py-3 text-[13.5px] bg-[#F5F3EE] border border-[#E2DDCF] text-[#1A1A18] placeholder-[#1A1A18]/28 focus:outline-none focus:border-[#B84A2C]/40 transition-all duration-200" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3D3C38] mb-1.5">Category</label>
                      <select value={enquiryType} onChange={e => setEnquiryType(e.target.value)}
                        className="w-full px-4 py-3 text-[13.5px] bg-[#F5F3EE] border border-[#E2DDCF] text-[#1A1A18] focus:outline-none focus:border-[#B84A2C]/40 transition-all duration-200 cursor-pointer">
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
                        className="w-full px-4 py-3 text-[13.5px] bg-[#F5F3EE] border border-[#E2DDCF] text-[#1A1A18] placeholder-[#1A1A18]/28 focus:outline-none focus:border-[#B84A2C]/40 transition-all duration-200 resize-none" />
                    </div>
                    <button type="submit"
                      className="w-full py-4 bg-[#1A1A18] hover:bg-[#2A2A28] text-[#F5F3EE] text-[13.5px] font-bold tracking-wide transition-all duration-200 cursor-pointer">
                      Send Sourcing Request →
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3 reveal-right">
              {[
                { label: "Office", val: "2nd Floor-1, 12/14 Hira Bhuvan, Dariyasthan Street, Masjid Bunder, Mumbai 400003", href: "https://maps.google.com/?q=Dariyasthan+Street,+Masjid+Bunder,+Mumbai", linkText: "Open in Google Maps →", external: true },
                { label: "Phone / WhatsApp", val: "+91 98207 17873", href: "tel:+919820717873", linkText: "", external: false },
                { label: "Email", val: "info.poweragro@gmail.com", href: "mailto:info.poweragro@gmail.com", linkText: "", external: false },
                { label: "GSTIN", val: "27AAZHA9435Q1Z5", href: "", linkText: "", external: false },
                { label: "Hours", val: "Mon – Sat · 10:00 – 18:30 IST", href: "", linkText: "", external: false },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start p-5 bg-white border border-[#E2DDCF] hover:border-[#C8BFA8] transition-colors duration-200">
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
                className="flex items-center gap-4 p-5 bg-[#25D366] hover:bg-[#22C55E] text-white transition-all duration-200">
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

      <SiteFooter />
    </main>
  );
}