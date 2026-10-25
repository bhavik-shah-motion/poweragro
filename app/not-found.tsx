import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[#F5F3EE] text-[#1A1A18] border-b border-[#E2DDCF]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-24 md:py-32 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <span className="inline-flex items-center gap-2 mb-5 text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#B84A2C]">
              <span className="w-5 h-px bg-[#B84A2C]" />Error 404
            </span>
            <h1 className="font-display font-extrabold text-[2.4rem] sm:text-[3.2rem] leading-[1.08] tracking-tight">
              This page isn&apos;t in our catalogue.
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[#3D3C38]">
              The link may be outdated or the address mistyped. If you were looking for a specific bearing, our trade desk can source it for you.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/"
                className="inline-flex items-center bg-[#1A1A18] hover:bg-[#B84A2C] text-[#F5F3EE] px-6 py-3.5 text-[13px] font-semibold tracking-wide transition-colors duration-200">
                Back to homepage
              </Link>
              <Link href="/#contact"
                className="inline-flex items-center border border-[#C8BFA8] hover:border-[#1A1A18] text-[#1A1A18] px-6 py-3.5 text-[13px] font-semibold transition-colors duration-200">
                Contact our desk
              </Link>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="border border-[#E2DDCF] bg-white">
              <div className="px-6 py-4 border-b border-[#E2DDCF] text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C5C3E]">
                Lookup result
              </div>
              <dl className="divide-y divide-[#E2DDCF] font-mono text-[13px]">
                {[["Designation", "404"], ["Status", "Not found"], ["Suggested", "Return to index"]].map(([k, v]) => (
                  <div key={k} className="px-6 py-4 flex justify-between gap-6">
                    <dt className="text-[#8C5C3E]">{k}</dt>
                    <dd className={`font-semibold ${k === "Status" ? "text-[#B84A2C]" : "text-[#1A1A18]"}`}>{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="px-6 py-4 border-t border-[#E2DDCF] bg-[#F5F3EE]">
                <p className="text-[12.5px] text-[#3D3C38] mb-3">Popular sections</p>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-semibold">
                  <Link href="/#products" className="text-[#B84A2C] hover:text-[#1A1A18] transition-colors">Products</Link>
                  <Link href="/#trade" className="text-[#B84A2C] hover:text-[#1A1A18] transition-colors">Process</Link>
                  <Link href="/#about" className="text-[#B84A2C] hover:text-[#1A1A18] transition-colors">About</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
