"use client";

import { useEffect } from "react";
import Link from "next/link";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[#F5F3EE] text-[#1A1A18] border-b border-[#E2DDCF]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-24 md:py-32">
          <span className="inline-flex items-center gap-2 mb-5 text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#B84A2C]">
            <span className="w-5 h-px bg-[#B84A2C]" />Something went wrong
          </span>
          <h1 className="font-display font-extrabold text-[2.4rem] sm:text-[3rem] leading-[1.08] tracking-tight">
            We couldn&apos;t load this page.
          </h1>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[#3D3C38]">
            An unexpected error occurred. Please try again — if the problem continues, reach us directly at{" "}
            <a href="mailto:info.poweragro@gmail.com" className="font-semibold text-[#B84A2C] underline underline-offset-3">info.poweragro@gmail.com</a>.
          </p>
          {error.digest && (
            <p className="mt-4 font-mono text-[12px] text-[#8C5C3E]">Reference: {error.digest}</p>
          )}
          <div className="mt-10 flex flex-wrap gap-3">
            <button onClick={reset}
              className="inline-flex items-center bg-[#1A1A18] hover:bg-[#B84A2C] text-[#F5F3EE] px-6 py-3.5 text-[13px] font-semibold tracking-wide transition-colors duration-200 cursor-pointer">
              Try again
            </button>
            <Link href="/"
              className="inline-flex items-center border border-[#C8BFA8] hover:border-[#1A1A18] text-[#1A1A18] px-6 py-3.5 text-[13px] font-semibold transition-colors duration-200">
              Back to homepage
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
