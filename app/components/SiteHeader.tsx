"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LogoMark from "./LogoMark";

const navLinks: [string, string][] = [["/#products", "Products"], ["/#trade", "Process"], ["/#about", "About"], ["/#contact", "Contact"]];

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[#E2DDCF] bg-[#F5F3EE] transition-shadow duration-300 ${scrolled ? "shadow-[0_1px_0_rgba(26,26,24,0.06)]" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <LogoMark size={34} />
            <div className="flex flex-col leading-none gap-0.5">
              <span className="font-display font-extrabold text-[15px] tracking-tight text-[#1A1A18]">
                Power<span className="text-[#B84A2C]">Agro</span>
              </span>
              <span className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-[#8C5C3E]">
                Mumbai · Est.&nbsp;1980
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-[13.5px] font-medium text-[#3D3C38]">
            {navLinks.map(([href, label]) => (
              <Link key={href} href={href} className="py-1 hover:text-[#B84A2C] transition-colors duration-150">
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-5">
            <a href="tel:+919820717873" className="text-[12.5px] font-semibold text-[#3D5C45] hover:text-[#1A1A18] transition-colors">
              +91 98207 17873
            </a>
            <Link href="/#contact"
              className="inline-flex items-center bg-[#1A1A18] hover:bg-[#B84A2C] text-[#F5F3EE] px-4 py-2 text-[12.5px] font-semibold tracking-wide transition-colors duration-200">
              Get a Quote
            </Link>
          </div>

          <button className="md:hidden p-2 border border-[#E2DDCF]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu" aria-expanded={mobileMenuOpen}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {mobileMenuOpen
                ? <path strokeLinecap="square" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="square" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2DDCF] bg-[#F5F3EE]">
          <div className="mx-auto max-w-6xl px-6 py-4 flex flex-col">
            {navLinks.map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)}
                className="py-3 border-b border-[#E2DDCF] text-sm font-medium text-[#3D3C38] hover:text-[#B84A2C] transition-colors">
                {label}
              </Link>
            ))}
            <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}
              className="mt-4 py-3 text-sm font-semibold text-center bg-[#1A1A18] text-[#F5F3EE]">
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
