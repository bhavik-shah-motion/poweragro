import Link from "next/link";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

export default function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: React.ReactNode;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[#F5F3EE] text-[#1A1A18]">
        <section className="border-b border-[#E2DDCF] bg-white">
          <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16 md:py-20">
            <nav className="mb-6 text-[12px] text-[#8C5C3E]" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#B84A2C] transition-colors">Home</Link>
              <span className="mx-2 text-[#C8BFA8]">/</span>
              <span className="text-[#3D3C38]">{title}</span>
            </nav>
            <span className="inline-flex items-center gap-2 mb-4 text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#B84A2C]">
              <span className="w-5 h-px bg-[#B84A2C]" />{eyebrow}
            </span>
            <h1 className="font-display font-extrabold text-[2.2rem] sm:text-[2.8rem] leading-tight tracking-tight">{title}</h1>
            <div className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-[#3D3C38]">{intro}</div>
            <p className="mt-6 text-[12px] font-semibold uppercase tracking-wider text-[#8C5C3E]">Last updated: {updated}</p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-14 md:py-16 grid lg:grid-cols-12 gap-12">
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 border-l border-[#E2DDCF]">
              <div className="pl-5 mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C5C3E]">On this page</div>
              <ol className="space-y-2">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="block -ml-px pl-5 border-l border-transparent hover:border-[#B84A2C] text-[12.5px] text-[#3D3C38] hover:text-[#1A1A18] transition-colors">
                      {String(i + 1).padStart(2, "0")}. {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <article className="legal lg:col-span-8">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-24 pb-10 mb-10 border-b border-[#E2DDCF] last:border-0 last:mb-0">
                <h2>
                  <span className="text-[#B84A2C] mr-3 font-mono text-[13px]">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                {s.body}
              </section>
            ))}
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
