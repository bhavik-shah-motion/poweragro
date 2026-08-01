"use client";

import { useState } from "react";

export default function Home() {
  const currentYear = 2026;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("all");
  
  // Form States
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [enquiryType, setEnquiryType] = useState("Product enquiry / quote");
  const [message, setMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  // Cross reference tool state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<{
    code?: string;
    type: string;
    d?: number;
    D?: number;
    B?: number;
    brands: string[];
    notFound?: boolean;
  } | null>(null);

  const bearingDb: Record<string, { type: string; d: number; D: number; B: number; brands: string[] }> = {
    "6204": { type: "Deep Groove Ball Bearing", d: 20, D: 47, B: 14, brands: ["SKF", "FAG", "NSK", "NTN"] },
    "6008": { type: "Deep Groove Ball Bearing", d: 40, D: 68, B: 15, brands: ["SKF", "FAG", "KOYO"] },
    "22220": { type: "Spherical Roller Bearing", d: 100, D: 180, B: 46, brands: ["SKF", "FAG", "Timken"] },
    "30204": { type: "Tapered Roller Bearing", d: 20, D: 47, B: 15.25, brands: ["Timken", "FAG", "NTN", "NACHI"] },
    "51105": { type: "Thrust Ball Bearing", d: 25, D: 37, B: 9, brands: ["SKF", "FAG", "NSK"] },
    "UC205": { type: "Pillow Block Insert Bearing", d: 25, D: 52, B: 34.1, brands: ["NTN", "KOYO"] }
  };

  const handleCrossReferenceSearch = (val: string) => {
    setSearchQuery(val);
    const normalized = val.toUpperCase().replace(/\s+/g, "");
    if (!normalized) {
      setSearchResult(null);
      return;
    }
    
    // Check match
    const foundKey = Object.keys(bearingDb).find(k => k.includes(normalized) || normalized.includes(k));
    if (foundKey) {
      setSearchResult({ code: foundKey, ...bearingDb[foundKey] });
    } else {
      setSearchResult({
        notFound: true,
        type: "Custom Sourced Specification",
        brands: ["FAG", "SKF", "Timken", "NSK", "NTN", "NACHI", "KOYO"]
      });
    }
  };

  // Safe client-side math for the Hero Rotating Bearing balls (12 balls on a circle of radius 57)
  const bearingBalls = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const x = 100 + 57 * Math.cos(angle);
    const y = 100 + 57 * Math.sin(angle);
    return { x: x.toFixed(1), y: y.toFixed(1) };
  });

  const brands = [
    { name: "FAG · INA", origin: "Germany", desc: "Premium Schaeffler automotive & industrial roller bearings." },
    { name: "SKF", origin: "Sweden", desc: "Global leader in high-performance rotating equipment solutions." },
    { name: "Timken", origin: "USA", desc: "Tapered roller bearings for heavy-duty industrial gearing." },
    { name: "NSK", origin: "Japan", desc: "Super-precision ball bearings and linear motion components." },
    { name: "NTN", origin: "Japan", desc: "Standard and custom bearings for automotive & manufacturing." },
    { name: "KOYO", origin: "Japan", desc: "Heavy agricultural & automotive steering machinery bearings." },
    { name: "NACHI", origin: "Japan", desc: "Extremely durable bearings for robotics and machine tools." },
    { name: "Schaeffler", origin: "Germany", desc: "Engineered solutions, high-grade bearings for aerospace & rail." },
  ];

  const services = [
    {
      id: "01",
      title: "Deep Groove Ball Bearings",
      group: "ball",
      description: "Highly versatile, low-friction, high-speed bearings. Perfect for electric motors, pumps, and gearboxes.",
      details: "Radial loads • High Speed • Low Noise",
      specs: { bore: "10mm to 1200mm", speed: "Up to 32,000 RPM", precision: "P0, P6, P5 (ISO Class)" },
      icon: (
        <svg className="w-12 h-12 text-primary" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="24" cy="24" r="18" />
          <circle cx="24" cy="24" r="7" />
          <circle cx="24" cy="8" r="2.5" fill="currentColor" />
          <circle cx="24" cy="40" r="2.5" fill="currentColor" />
          <circle cx="8" cy="24" r="2.5" fill="currentColor" />
          <circle cx="40" cy="24" r="2.5" fill="currentColor" />
        </svg>
      )
    },
    {
      id: "02",
      title: "Tapered & Cylindrical Roller",
      group: "roller",
      description: "Designed for massive radial and axial combined loads in heavy industrial applications, gearboxes, and wheel hubs.",
      details: "High Load capacity • Rigid Guidance • Pure Steel",
      specs: { bore: "15mm to 1800mm", speed: "Up to 12,000 RPM", precision: "P6, P5, P4 (ISO Class)" },
      icon: (
        <svg className="w-12 h-12 text-primary" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
          <ellipse cx="24" cy="24" rx="18" ry="12" />
          <path d="M14 16v16M24 13v22M34 16v16" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: "03",
      title: "Spherical Roller Bearings",
      group: "roller",
      description: "Self-aligning heavy-duty bearings that easily handle shaft misalignments, high vibration, and heavy shocks.",
      details: "Self-Aligning • Shock Resistant • Toughest environments",
      specs: { bore: "20mm to 2200mm", speed: "Up to 8,000 RPM", precision: "P6, P5 (ISO Class)" },
      icon: (
        <svg className="w-12 h-12 text-primary" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="24" cy="24" r="18" />
          <path d="M24 6a18 18 0 0 1 0 36" />
          <path d="M12 24h24" />
        </svg>
      )
    },
    {
      id: "04",
      title: "Agricultural & Farm Bearings",
      group: "housed",
      description: "Sealed, dust-proof, contamination-resistant housed components tailored for tractors, disk harrows, and harvesters.",
      details: "Triple Lip Seals • Heavy Duty Housing • Dust Tight",
      specs: { bore: "20mm to 120mm", speed: "Up to 4,500 RPM", precision: "Standard Grade" },
      icon: (
        <svg className="w-12 h-12 text-primary" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="9" y="16" width="30" height="16" rx="2" />
          <path d="M16 16v16M24 16v16M32 16v16" />
        </svg>
      )
    },
    {
      id: "05",
      title: "Pillow Blocks & Housed Units",
      group: "housed",
      description: "Cast iron and thermoplastic housings ready to mount on shafts. Ideal for conveyors and industrial machinery lines.",
      details: "Plummer Blocks • Flange Units • Greasable Valves",
      specs: { bore: "12mm to 140mm", speed: "Up to 6,000 RPM", precision: "Cast Iron Grade" },
      icon: (
        <svg className="w-12 h-12 text-primary" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="8" y="20" width="32" height="8" rx="4" />
          <circle cx="16" cy="24" r="2" fill="currentColor" />
          <circle cx="24" cy="24" r="2" fill="currentColor" />
          <circle cx="32" cy="24" r="2" fill="currentColor" />
        </svg>
      )
    },
    {
      id: "06",
      title: "Special & Precision Bearings",
      group: "special",
      description: "Angular contact, high-precision, thrust bearings, and custom sizes sourced directly for specialty mechanical lines.",
      details: "Micron Accuracy • Thrust Forces • Custom Sourced",
      specs: { bore: "5mm to 600mm", speed: "Up to 48,000 RPM", precision: "P4, P2 (High Precision)" },
      icon: (
        <svg className="w-12 h-12 text-primary" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="24" cy="24" r="18" />
          <path d="M24 24l10-10M24 24l-8 8" />
          <circle cx="24" cy="24" r="3" fill="currentColor" />
        </svg>
      )
    }
  ];

  const industries = [
    { 
      name: "Agriculture", 
      desc: "Harvesters, tillers, disk harrows, and pump drives.", 
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 22c1.25-6.75 6-12 13-14" />
          <path d="M22 2c-6.75 1.25-12 6-14 13" />
          <path d="M9 9c-3 1.5-6 1.5-7 5 3-1.5 6-1.5 7-5z" />
          <path d="M15 15c1.5-3 1.5-6 5-7-1.5 3-1.5 6-5 7z" />
          <path d="M12 22V12" />
        </svg>
      ) 
    },
    { 
      name: "Steel & Metals", 
      desc: "High-temperature rolling mills and heavy casting lines.", 
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 18.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h3.5L10 12.5V8a1 1 0 0 1 1-1h3.5L17 10.5V5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-2.5" />
          <path d="M6 13h2M6 17h2M12 13h2M12 17h2" />
        </svg>
      ) 
    },
    { 
      name: "Cement & Mining", 
      desc: "Jaw crushers, vibrating screens, and raw conveyor networks.", 
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2 22 9.5M2 22l12.5-12.5" />
          <path d="M11 5 5 11" />
          <path d="m14 8-6 6" />
          <path d="m18 10-6-6" />
        </svg>
      ) 
    },
    { 
      name: "Automotive", 
      desc: "Wheel hubs, transmissions, drivetrains, and alternators.", 
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v7M12 15v7M2 12h7M15 12h7" />
          <path d="m5.8 5.8 4.4 4.4M13.8 13.8l4.4 4.4M5.8 18.2l4.4-4.4M13.8 10.2l4.4-4.4" />
        </svg>
      ) 
    },
    { 
      name: "Power & Energy", 
      desc: "Steam turbines, wind generators, and thermal pump systems.", 
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ) 
    },
    { 
      name: "Textiles", 
      desc: "High-speed spinning, carding, weaving, and loom rollers.", 
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4M12 18v4M4 9h4M16 15h4M5.5 5.5l2.8 2.8M15.7 15.7l2.8 2.8M5.5 18.5l2.8-2.8M15.7 8.3l2.8-2.8" />
          <path d="M12 6a6 6 0 0 0-6 6v4M12 6a6 6 0 0 1 6 6v4" />
        </svg>
      ) 
    },
    { 
      name: "Material Handling", 
      desc: "Heavy-duty cranes, hoists, stackers, and sorting conveyors.", 
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
        </svg>
      ) 
    },
    { 
      name: "General Engineering", 
      desc: "Electric motors, compressors, blower fans, and gearboxes.", 
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ) 
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Enquiry & Selection",
      desc: "Provide your exact bearing SKU/designation, dimension metrics, or target machinery application. Our engineering desk helps verify dimensions."
    },
    {
      num: "02",
      title: "Authorized Sourcing",
      desc: "We source genuine, traceable bearings from established OEM factories and direct channels in Europe, USA, and Japan at wholesale pricing."
    },
    {
      num: "03",
      title: "Trade & Compliance",
      desc: "Full export invoice, packing list, certificate of origin, and custom clearance documents are compiled and verified by our Mumbai logistics team."
    },
    {
      num: "04",
      title: "Consignment Delivery",
      desc: "Securely packed, anti-moisture wrapped, and shipped globally. Consignments are tracked door-to-door, guaranteeing authentic components."
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setFormError("Please fill out the required fields (Name, Email, and Message).");
      return;
    }
    
    // Simulate simple successful submission with API feedback delay
    setFormError("");
    setFormSubmitted(true);
  };

  const filteredServices = activeCategoryFilter === "all" 
    ? services 
    : services.filter(s => s.group === activeCategoryFilter);

  return (
    <main className="min-h-screen font-sans bg-slate-50 text-slate-900 overflow-x-hidden selection:bg-accent selection:text-primary-dark">
      {/* Background Decor */}
      <div className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-emerald-700/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[800px] right-0 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      {/* Sticky Header / Navbar */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/80 transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 group">
            <svg className="w-8 h-8 transition-transform group-hover:rotate-180 duration-1000" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="44" stroke="#0B6E4F" strokeWidth="8" />
              <circle cx="50" cy="50" r="20" stroke="#E0A317" strokeWidth="8" />
              <g fill="#0B6E4F">
                <circle cx="50" cy="14" r="5" />
                <circle cx="50" cy="86" r="5" />
                <circle cx="14" cy="50" r="5" />
                <circle cx="86" cy="50" r="5" />
              </g>
            </svg>
            <span className="font-display font-extrabold text-xl tracking-tight text-primary-dark dark:text-emerald-500">
              POWER<span className="text-accent font-semibold ml-0.5">AGRO</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <a href="#products" className="hover:text-primary transition-colors duration-200">Products</a>
            <a href="#industries" className="hover:text-primary transition-colors duration-200">Industries</a>
            <a href="#trade" className="hover:text-primary transition-colors duration-200">Sourcing Flow</a>
            <a href="#about" className="hover:text-primary transition-colors duration-200">About</a>
            <a href="#contact" className="hover:text-primary transition-colors duration-200">Contact</a>
          </nav>

          <div className="hidden md:block">
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary-deep text-white px-5 py-2.5 font-display font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 duration-200"
            >
              Request a Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md animate-fade-in">
            <div className="flex flex-col gap-4 px-6 py-6 font-medium text-slate-700">
              <a href="#products" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary py-1">Products</a>
              <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary py-1">Industries</a>
              <a href="#trade" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary py-1">Sourcing Flow</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary py-1">About Us</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary py-1">Contact Details</a>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center rounded-lg bg-primary hover:bg-primary-deep text-white py-3 mt-2 font-display font-bold shadow"
              >
                Request a Quote
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-primary-dark text-white overflow-hidden py-12 md:py-24 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]">
        {/* Animated Bearing Watermark Background */}
        <div className="absolute right-[-10%] top-[10%] w-[650px] h-[650px] opacity-15 md:opacity-25 animate-spin-slow pointer-events-none select-none">
          <svg className="w-full h-full text-accent" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="100" cy="100" r="74" stroke="currentColor" strokeWidth="8" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="6" />
            <circle cx="100" cy="100" r="20" fill="currentColor" opacity="0.3" />
            <g fill="currentColor">
              {bearingBalls.map((b, i) => (
                <circle key={i} cx={b.x} cy={b.y} r="6.5" />
              ))}
            </g>
          </svg>
        </div>

        <div className="mx-auto max-w-7xl px-6 w-full relative z-10 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 flex flex-col items-start text-left animate-slide-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 border border-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-soft">
              <svg className="w-3.5 h-3.5 text-accent-soft" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              Genuine Sourcing &middot; Export Excellence
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight">
              Bearings that move the{" "}
              <span className="block bg-gradient-to-r from-accent via-emerald-400 to-accent bg-clip-text text-transparent">
                World&apos;s Machinery
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-emerald-100/80 leading-relaxed max-w-xl">
              Power Agro connects global machinery manufacturers and industries with 100% genuine agricultural & industrial bearings. Sourced straight from certified brand channels, dispatched securely out of Mumbai, India.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a 
                href="#products" 
                className="rounded-full bg-accent hover:bg-accent-soft text-primary-dark font-display font-extrabold px-8 py-4 tracking-wide shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 transition-all duration-200"
              >
                Explore Sourced Range &rarr;
              </a>
              <a 
                href="#contact" 
                className="rounded-full border border-emerald-500/50 hover:border-white/80 bg-white/5 hover:bg-white/10 font-display font-bold text-white px-8 py-4 transition-all duration-200"
              >
                Talk to Trade Desk
              </a>
            </div>

            {/* Metrics */}
            <div className="mt-16 w-full pt-8 border-t border-emerald-800/60 grid grid-cols-3 gap-6">
              <div>
                <span className="block text-3xl font-extrabold font-display text-accent">45,000+</span>
                <span className="text-xs uppercase tracking-wider text-emerald-200/60">SKUs Stocked</span>
              </div>
              <div>
                <span className="block text-3xl font-extrabold font-display text-accent">8+</span>
                <span className="text-xs uppercase tracking-wider text-emerald-200/60">Premium Brands</span>
              </div>
              <div>
                <span className="block text-3xl font-extrabold font-display text-accent">1980</span>
                <span className="text-xs uppercase tracking-wider text-emerald-200/60">Group Heritage</span>
              </div>
            </div>
          </div>

          {/* Interactive Bearing Ring Visualization */}
          <div className="md:col-span-5 hidden md:flex justify-center items-center relative animate-fade-in">
            {/* Glowing Blur Ring Background */}
            <div className="absolute w-[360px] h-[360px] rounded-full bg-emerald-500/10 blur-[80px] -z-10" />
            <div className="absolute w-[200px] h-[200px] rounded-full bg-accent/5 blur-[50px] -z-10" />

            <div className="w-[380px] h-[380px] relative hover:scale-105 transition-transform duration-500 cursor-pointer">
              {/* Outer shell (static logo backdrop) */}
              <div className="absolute inset-0 border-[3px] border-emerald-700/30 rounded-full" />
              
              {/* Actual Rotating Bearing SVG component */}
              <svg className="w-full h-full text-accent drop-shadow-[0_0_25px_rgba(224,163,23,0.15)] animate-spin-slow hover:animate-[spin_20s_linear_infinite]" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="92" stroke="#E0A317" strokeWidth="4" />
                <circle cx="100" cy="100" r="74" stroke="#ffffff" strokeWidth="11" opacity="0.8" />
                <circle cx="100" cy="100" r="40" stroke="#ffffff" strokeWidth="11" opacity="0.8" />
                <circle cx="100" cy="100" r="22" fill="#E0A317" opacity="0.9" />
                
                {/* Balls */}
                <g fill="#E0A317">
                  {bearingBalls.map((b, i) => (
                    <circle key={i} cx={b.x} cy={b.y} r="7" className="transition-transform" />
                  ))}
                </g>
              </svg>

              {/* Inside Static text */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center select-none pointer-events-none">
                <span className="text-white text-[9px] font-bold tracking-[0.25em] uppercase opacity-70">ORIGINAL</span>
                <span className="text-accent text-[12px] font-extrabold tracking-wide uppercase">PARTS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Sourcing Cross-Reference Widget */}
      <section className="bg-white py-16 border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-display text-xs font-extrabold text-primary uppercase tracking-[0.2em]">
              Cross-Reference Tool
            </span>
            <h2 className="mt-3 text-3xl font-display font-extrabold text-slate-900 tracking-tight">
              Sourcing Sizing &amp; Brand Matching
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Input a standard bearing model number to cross-reference dimensions and matching manufacturer brands.
            </p>
          </div>

          <div className="bg-primary-dark rounded-[32px] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl border border-emerald-800/80 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]">
            {/* Background glowing circle */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-accent/5 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <label className="block text-xs font-bold text-accent-soft uppercase tracking-wider mb-3 text-center md:text-left">
                Enter Bearing Designation or Prefix
              </label>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleCrossReferenceSearch(e.target.value)}
                    placeholder="Search: e.g. 6204, 22220, UC205..."
                    className="w-full bg-emerald-950/60 border border-emerald-800/80 hover:border-emerald-600 rounded-xl px-5 py-4 text-white text-base focus:outline-none focus:border-accent placeholder-emerald-100/30 transition-all font-mono"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => handleCrossReferenceSearch("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-200/50 hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Suggestions */}
              <div className="mt-4 flex flex-wrap items-center gap-2 justify-center md:justify-start">
                <span className="text-xs text-emerald-100/50">Common Examples:</span>
                {["6204", "22220", "30204", "UC205"].map((ex) => (
                  <button
                    key={ex}
                    onClick={() => handleCrossReferenceSearch(ex)}
                    className="px-2.5 py-1 bg-emerald-900/40 hover:bg-accent hover:text-primary-dark border border-emerald-800/60 rounded-md text-[11px] font-mono text-emerald-100 font-medium transition-all cursor-pointer"
                  >
                    {ex}
                  </button>
                ))}
              </div>

              {/* Match Display Result */}
              {searchResult && (
                <div className="mt-8 p-6 bg-emerald-950/80 border border-accent/20 rounded-2xl animate-fade-in font-mono text-xs sm:text-sm space-y-4">
                  {searchResult.notFound ? (
                    <div>
                      <div className="flex items-center gap-2 text-accent">
                        <span>⚠️</span>
                        <span className="font-extrabold uppercase">Custom Sizing Match</span>
                      </div>
                      <p className="mt-2 text-emerald-100/70 text-xs font-sans leading-relaxed">
                        We did not find an exact match in our quick-search index. However, our Mumbai trade desk specializes in matching and importing any standard or special custom designations directly from Germany or Japan.
                      </p>
                      <div className="mt-4 pt-3 border-t border-emerald-900 flex items-center justify-between font-sans">
                        <span className="text-slate-400 text-xs">Query: &quot;{searchQuery}&quot;</span>
                        <a href="#contact" className="text-accent font-extrabold hover:underline">Request Sourcing Quote &rarr;</a>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between border-b border-emerald-900 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-accent font-extrabold">MATCH FOUND: SKU {searchResult.code}</span>
                        </div>
                        <span className="text-[10px] bg-accent/20 text-accent-soft px-2 py-0.5 rounded font-sans font-bold">READY TO SUPPLY</span>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div>
                            <span className="block text-[10px] text-emerald-100/40 uppercase font-sans">Category type</span>
                            <span className="text-emerald-100 font-semibold">{searchResult.type}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-emerald-100/40 uppercase font-sans">Suggested Brands</span>
                            <span className="text-emerald-100 font-semibold">{searchResult.brands.join(", ")}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2 border-l border-emerald-900 pl-4">
                          <div>
                            <span className="block text-[10px] text-emerald-100/40 uppercase font-sans">Inside Bore (d)</span>
                            <span className="text-emerald-100 font-semibold">{searchResult.d} mm</span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-emerald-100/40 uppercase font-sans">Outer Dia (D)</span>
                            <span className="text-emerald-100 font-semibold">{searchResult.D} mm</span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-emerald-100/40 uppercase font-sans">Width thickness (B)</span>
                            <span className="text-emerald-100 font-semibold">{searchResult.B} mm</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-emerald-900 flex items-center justify-between font-sans">
                        <span className="text-slate-400 text-xs">Available for Import/Export dispatch</span>
                        <a 
                          href="#contact" 
                          onClick={() => {
                            setMessage(`Inquiry regarding Sourced Match: ${searchResult.code} (${searchResult.type})\nDimensions: ${searchResult.d}x${searchResult.D}x${searchResult.B}mm\nQuantity: `);
                            setEnquiryType("Product enquiry / quote");
                          }}
                          className="text-accent font-extrabold hover:underline"
                        >
                          Request Sourcing Quote &rarr;
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Brands Logo Ticker */}
      <section className="bg-slate-100 py-10 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-xs font-display font-semibold uppercase tracking-[0.2em] text-slate-500 mb-8">
            Trusted Premium Brands We Source & Supply
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {brands.map((brand, i) => (
              <div 
                key={i} 
                className="group relative bg-white border border-slate-200/80 rounded-xl px-5 py-4 text-center cursor-help shadow-sm hover:shadow-md hover:border-emerald-600/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="h-10 flex items-center justify-center">
                  {brand.name === "SKF" && (
                    <span className="font-sans font-black text-xl tracking-wider text-[#005A9C] dark:text-[#3a9ee6]">SKF</span>
                  )}
                  {brand.name === "Timken" && (
                    <span className="font-serif font-black text-[11px] tracking-[0.2em] text-white bg-[#FF6600] px-2 py-0.5 rounded-sm shadow-sm uppercase">TIMKEN</span>
                  )}
                  {brand.name === "FAG · INA" && (
                    <div className="flex items-center gap-1">
                      <span className="font-sans font-black text-base text-[#E30613] tracking-tighter">FAG</span>
                      <span className="text-slate-300 text-[10px]">|</span>
                      <span className="font-sans font-bold text-xs text-[#00875A]">INA</span>
                    </div>
                  )}
                  {brand.name === "NSK" && (
                    <span className="font-sans font-black text-lg text-[#E60012] italic tracking-tighter">NSK</span>
                  )}
                  {brand.name === "NTN" && (
                    <span className="font-sans font-extrabold text-[13px] text-white bg-[#002F6C] px-2 py-0.5 rounded tracking-wide">NTN</span>
                  )}
                  {brand.name === "KOYO" && (
                    <span className="font-sans font-bold text-base text-[#0A2540] uppercase tracking-wide">Koyo</span>
                  )}
                  {brand.name === "NACHI" && (
                    <span className="font-sans font-black text-[12px] text-white bg-[#E60000] px-1 rounded-sm">NACHI</span>
                  )}
                  {brand.name === "Schaeffler" && (
                    <span className="font-sans font-extrabold text-[10px] text-[#008F6B] uppercase tracking-wider">SCHAEFFLER</span>
                  )}
                </div>
                <span className="block text-[9px] text-slate-400 mt-2 uppercase tracking-widest font-bold">
                  {brand.origin}
                </span>

                {/* Popover detailed text */}
                <div className="absolute z-20 left-1/2 -translate-x-1/2 bottom-full mb-3 w-56 p-3 rounded-lg bg-primary-dark text-white text-xs text-left shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all duration-200 origin-bottom">
                  <div className="absolute left-1/2 -translate-x-1/2 top-full border-[6px] border-transparent border-t-primary-dark" />
                  <p className="font-semibold text-accent mb-0.5">{brand.name}</p>
                  <p className="text-emerald-100/80 leading-relaxed font-normal">{brand.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Products Range */}
      <section id="products" className="py-24 mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-display text-xs font-extrabold text-primary uppercase tracking-[0.2em]">
            Catalog Range
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Every Bearing Type Your Line Depends On
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            We source genuine, traceable bearings for heavy industrial systems and precise machinery. Filter and select a category below to explore its primary applications.
          </p>

          {/* Interactive filter tabs */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {[
              { id: "all", name: "Show All Products" },
              { id: "ball", name: "Ball Bearings" },
              { id: "roller", name: "Roller Bearings" },
              { id: "housed", name: "Agricultural & Housed" },
              { id: "special", name: "Specialized" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategoryFilter(tab.id)}
                className={`px-5 py-2.5 rounded-full font-display font-bold text-xs tracking-wide transition-all cursor-pointer ${
                  activeCategoryFilter === tab.id
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Products Grid */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div 
              key={service.id}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 hover:shadow-xl hover:border-emerald-600/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div className="absolute top-6 right-8 font-display font-extrabold text-slate-200 text-2xl tracking-tighter">
                {service.id}
              </div>

              <div>
                <div className="p-3 bg-emerald-50 rounded-2xl w-fit group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-300">
                  {service.icon}
                </div>

                <h3 className="mt-6 text-xl font-display font-extrabold text-slate-800 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  {service.description}
                </p>
                {/* Technical Specifications Table */}
                <div className="mt-6 bg-slate-50/80 rounded-xl p-4 border border-slate-100/50 text-[11px] space-y-1.5 font-sans">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Bore Range:</span>
                    <span className="font-semibold text-slate-700">{service.specs.bore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Limiting Speed:</span>
                    <span className="font-semibold text-slate-700">{service.specs.speed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Precision Standard:</span>
                    <span className="font-semibold text-slate-700">{service.specs.precision}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-400 font-mono">
                  {service.details}
                </span>
                <a 
                  href="#contact" 
                  onClick={() => {
                    setMessage(`Inquiry regarding: ${service.title}\nQuantity: `);
                    setEnquiryType("Product enquiry / quote");
                  }} 
                  className="font-display font-bold text-primary group-hover:text-accent hover:underline flex items-center gap-1"
                >
                  Request quote &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Industries Served */}
      <section id="industries" className="bg-primary-dark text-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <span className="font-display text-xs font-extrabold text-accent uppercase tracking-[0.2em]">
              Sectors Supported
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Keeping Critical Sectors Turning
            </h2>
            <p className="mt-4 text-emerald-100/70 text-base leading-relaxed">
              From continuous casting steel lines in central India to high-efficiency turbine gearboxes, our supplied parts minimize downtime across these essential industries.
            </p>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind, i) => (
              <div 
                key={i} 
                className="bg-emerald-950/40 border border-emerald-900/60 hover:border-accent/40 rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300 w-fit">{ind.icon}</div>
                <h3 className="text-lg font-display font-extrabold text-white group-hover:text-accent transition-colors">
                  {ind.name}
                </h3>
                <p className="mt-2 text-xs text-emerald-100/65 leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Split Section */}
      <section id="about" className="py-24 mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <span className="font-display text-xs font-extrabold text-primary uppercase tracking-[0.2em]">
              Heritage &amp; Sourcing
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
              A Trade House Built on Genuine Parts and Dependable Delivery
            </h2>
            <p className="mt-6 text-slate-600 text-sm sm:text-base leading-relaxed">
              Power Agro is a Mumbai-based import and export house dedicated strictly to industrial and agricultural bearings. We deal directly with manufacturers and verified official channel partners, ensuring every single box is traceable.
            </p>
            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              Sharing a business heritage dating back to 1980, we pair deep product-code knowledge with rigorous custom clearance, anti-rust inspection, and compliant trade documentation to serve both domestic buyers and international firms.
            </p>

            {/* Fact Checkmarks */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                { title: "Genuine Sourcing", desc: "100% trace credentials with brand audits." },
                { title: "Global Reach", desc: "Expert customs handling & container freight." },
                { title: "Technical Matching", desc: "Decades of engineering cross-reference databases." },
                { title: "Trade Compliance", desc: "Transparent invoice structures & GST filings." }
              ].map((fact, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-50 text-primary flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-slate-800">{fact.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{fact.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Trade Globe Graphics */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="w-full max-w-[380px] bg-primary-dark rounded-[32px] overflow-hidden border border-emerald-800/80 shadow-2xl relative group">
              {/* Globe Grid lines SVG */}
              <svg className="w-full h-auto bg-emerald-950" viewBox="0 0 400 320" fill="none">
                <rect width="400" height="320" fill="#06392A" />
                <g stroke="rgba(255,255,255,0.18)" strokeWidth="1">
                  <ellipse cx="200" cy="160" rx="150" ry="150" />
                  <ellipse cx="200" cy="160" rx="150" ry="55" />
                  <ellipse cx="200" cy="160" rx="150" ry="105" />
                  <ellipse cx="200" cy="160" rx="55" ry="150" />
                  <ellipse cx="200" cy="160" rx="105" ry="150" />
                  <line x1="50" y1="160" x2="350" y2="160" />
                  <line x1="200" y1="10" x2="200" y2="310" />
                </g>
                
                {/* Ports / Cities (Mumbai focal point) */}
                <g fill="#E0A317" className="animate-pulse-slow">
                  <circle cx="200" cy="160" r="6" />
                  <circle cx="120" cy="110" r="4" />
                  <circle cx="290" cy="130" r="4" />
                  <circle cx="150" cy="230" r="4" />
                  <circle cx="270" cy="215" r="4" />
                  <circle cx="255" cy="80" r="4" />
                </g>

                {/* Sourcing/Delivery paths */}
                <g stroke="#E0A317" strokeWidth="1.6" strokeDasharray="3 4" opacity="0.8" fill="none">
                  <path d="M200 160 Q150 100 120 110" />
                  <path d="M200 160 Q260 110 290 130" />
                  <path d="M200 160 Q180 210 150 230" />
                  <path d="M200 160 Q250 200 270 215" />
                  <path d="M200 160 Q240 100 255 80" />
                </g>
              </svg>

              <div className="p-6 bg-gradient-to-t from-primary-dark to-emerald-950 border-t border-emerald-800/80">
                <span className="font-display font-extrabold text-xs text-accent uppercase tracking-wider">Mumbai Trade Desk</span>
                <p className="text-emerald-100/70 text-xs mt-1.5 leading-relaxed">
                  Conveniently located near Masjid Bunder Station and Mumbai Seaport (JNPT) channels for efficient freight operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Flow (How We Work) */}
      <section id="trade" className="bg-slate-100 py-24 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="font-display text-xs font-extrabold text-primary uppercase tracking-[0.2em]">
              The Sourcing Flow
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              From Inquiry to Delivered Consignment
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              We run a completely transparent and disciplined supply chain procedure ensuring you receive verified genuine parts.
            </p>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting lines for desktop */}
            <div className="hidden lg:block absolute top-1/3 left-6 right-6 h-[1.5px] bg-slate-300 -z-10" />

            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 relative"
              >
                <div className="w-12 h-12 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center font-display font-extrabold text-primary-dark text-lg mb-6">
                  {step.num}
                </div>
                <h3 className="text-lg font-display font-extrabold text-slate-800 mb-3">{step.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Contact & Inquiry Section */}
      <section id="contact" className="py-24 mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Enquiry Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-[32px] p-8 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-accent" />
            
            <h3 className="text-2xl font-display font-extrabold text-slate-900">
              Submit Sourcing Request
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              Input part number designations, target brands, and quantities below.
            </p>

            {formSubmitted ? (
              <div className="mt-8 p-8 bg-emerald-50 border border-emerald-100 rounded-2xl text-center flex flex-col items-center justify-center animate-fade-in">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-display font-bold text-slate-900">Inquiry Transmitted Successfully</h4>
                <p className="text-sm text-slate-600 mt-2 max-w-sm">
                  Thank you! Our bearing trade desk will cross-reference your request and send pricing/lead times within 4 business hours to <strong>{email}</strong>.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setName("");
                    setCompany("");
                    setEmail("");
                    setMessage("");
                  }}
                  className="mt-6 px-6 py-2 bg-primary hover:bg-primary-deep text-white font-display font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Submit Another Sourcing Ticket
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="mt-8 space-y-5">
                {formError && (
                  <div className="p-4 bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold rounded-xl">
                    ⚠️ {formError}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Name *</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Company Name</label>
                    <input 
                      type="text" 
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Enterprise Name"
                      className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Corporate Email Address *</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" 
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Enquiry Category</label>
                  <select 
                    value={enquiryType}
                    onChange={(e) => setEnquiryType(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary bg-white transition-colors"
                  >
                    <option>Product enquiry / quote</option>
                    <option>Bulk / export order</option>
                    <option>Distributor partnership</option>
                    <option>General question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Bearing Designations &amp; Message *</label>
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Example: SKF 6204-2RSH (Qty: 250), FAG 22220-E1-K (Qty: 50)"
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 rounded-xl bg-primary hover:bg-primary-deep text-white font-display font-extrabold text-sm tracking-wide shadow-lg hover:shadow-primary/20 transition-all duration-200 cursor-pointer"
                >
                  Transmit Sourcing Enquiry &rarr;
                </button>
              </form>
            )}
          </div>

          {/* Contact Details Panel */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="font-display text-xs font-extrabold text-primary uppercase tracking-[0.2em]">
                Direct Desk
              </span>
              <h3 className="mt-3 text-2xl font-display font-extrabold text-slate-900">
                Mumbai Head Office
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                Reach us via phone, mail, or visit our trade office.
              </p>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-50 text-primary flex items-center justify-center border border-emerald-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-sm text-slate-800">Office Address</h4>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                    2nd Floor-1, 12/14 Hira Bhuvan, Dariyasthan Street,<br />
                    Masjid Bunder Station, Mumbai 400003, India
                  </p>
                  <a 
                    href="https://maps.google.com/?q=Dariyasthan+Street,+Masjid+Bunder,+Mumbai" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-0.5 mt-1.5"
                  >
                    Open in Google Maps &rarr;
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-50 text-primary flex items-center justify-center border border-emerald-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-sm text-slate-800">Phone / WhatsApp</h4>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    <a href="tel:+919820717873" className="hover:text-primary transition-colors font-semibold">
                      +91 98207 17873
                    </a>
                  </p>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold inline-block mt-1">
                    🟢 Chat Support Available
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-50 text-primary flex items-center justify-center border border-emerald-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8m-9.3 12.3c-.66.66-1.74.66-2.4 0L3 13.5c-.66-.66-.66-1.74 0-2.4L11.5 3c.66-.66 1.74-.66 2.4 0L21 11.1c.66.66.66 1.74 0 2.4L12.7 20.3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-sm text-slate-800">Corporate Email</h4>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    <a href="mailto:info.poweragro@gmail.com" className="hover:text-primary transition-colors font-semibold">
                      info.poweragro@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Business Details */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-50 text-primary flex items-center justify-center border border-emerald-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-sm text-slate-800">GSTIN / Hours</h4>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1 font-semibold">
                    GSTIN: 27AAZHA9435Q1Z5
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Monday &ndash; Saturday: 10:00 &ndash; 18:30 IST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-dark text-slate-300 pt-16 pb-8 border-t border-emerald-900">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-accent" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="10" />
                <circle cx="50" cy="50" r="20" stroke="#fff" strokeWidth="10" />
              </svg>
              <span className="font-display font-extrabold text-lg text-white">POWER AGRO</span>
            </div>
            <p className="text-emerald-100/60 text-xs sm:text-sm leading-relaxed max-w-sm">
              Mumbai-based global import &amp; export house specializing in 100% genuine industrial and agricultural bearings from top-tier world manufacturers.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-accent">Nav Links</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#products" className="hover:text-white transition-colors">Product Categories</a></li>
              <li><a href="#industries" className="hover:text-white transition-colors">Industries Served</a></li>
              <li><a href="#trade" className="hover:text-white transition-colors">Sourcing Procedure</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Sourcing Desk</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-accent">Supported Brands</h4>
            <p className="text-xs text-emerald-100/60 leading-relaxed">
              FAG &middot; INA &middot; Schaeffler &middot; SKF &middot; Timken &middot; NSK &middot; NTN &middot; KOYO &middot; NACHI
            </p>
            <div className="pt-2">
              <span className="block text-[10px] text-emerald-200/50 uppercase font-semibold">Support Desk</span>
              <a href="mailto:info.poweragro@gmail.com" className="text-xs font-bold text-white hover:underline">
                info.poweragro@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 mt-12 pt-8 border-t border-emerald-900/60 text-center md:flex md:justify-between text-[11px] text-emerald-200/40 space-y-2 md:space-y-0">
          <span>
            &copy; {currentYear} Power Agro. All Rights Reserved. Sourced &amp; Sourced Reliably.
          </span>
          <span>
            GSTIN: 27AAZHA9435Q1Z5 &middot; Masjid Bunder, Mumbai 400003, India
          </span>
        </div>
      </footer>
    </main>
  );
}