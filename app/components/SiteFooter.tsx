import Link from "next/link";
import LogoMark from "./LogoMark";

const navigation: [string, string][] = [["/#products", "Product Range"], ["/#trade", "Our Process"], ["/#about", "About Us"], ["/#contact", "Contact & Enquiry"]];
const legal: [string, string][] = [["/privacy-policy", "Privacy Policy"], ["/terms", "Terms & Conditions"], ["/disclaimer", "Trademark Disclaimer"]];

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111210] border-t border-[#2A2A28]">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link href="/" className="flex items-center gap-2.5 mb-5">
            <LogoMark size={32} />
            <span className="font-display font-extrabold text-[14px] text-[#F5F3EE]">
              Power<span className="text-[#D4B896]">Agro</span>
            </span>
          </Link>
          <p className="text-[12.5px] leading-relaxed text-[#F5F3EE]/45">
            Mumbai-based import &amp; export house for genuine industrial and agricultural bearings. Serving buyers across India and internationally since 1980.
          </p>
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4B896]/60 mb-5">Navigation</h4>
          <ul className="space-y-2.5">
            {navigation.map(([href, label]) => (
              <li key={href}><Link href={href} className="text-[12.5px] text-[#F5F3EE]/55 hover:text-[#F5F3EE] transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4B896]/60 mb-5">Legal</h4>
          <ul className="space-y-2.5">
            {legal.map(([href, label]) => (
              <li key={href}><Link href={href} className="text-[12.5px] text-[#F5F3EE]/55 hover:text-[#F5F3EE] transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4B896]/60 mb-5">Contact</h4>
          <p className="text-[12.5px] text-[#F5F3EE]/55 leading-relaxed mb-4">
            2nd Floor, 12/14 Hira Bhuvan, Dariyasthan Street, Masjid Bunder, Mumbai 400003
          </p>
          <a href="mailto:info.poweragro@gmail.com" className="block text-[12.5px] font-semibold text-[#D4B896] hover:text-[#F5F3EE] transition-colors mb-1">info.poweragro@gmail.com</a>
          <a href="tel:+919820717873" className="block text-[12.5px] text-[#F5F3EE]/55 hover:text-[#F5F3EE] transition-colors">+91 98207 17873</a>
        </div>
      </div>
      <div className="border-t border-[#2A2A28]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#F5F3EE]/35">
          <span>© {currentYear} Power Agro. All rights reserved.</span>
          <span>GSTIN: 27AAZHA9435Q1Z5</span>
        </div>
      </div>
    </footer>
  );
}
