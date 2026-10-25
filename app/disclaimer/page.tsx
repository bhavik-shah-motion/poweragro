import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Trademark Disclaimer",
  description: "Trademark and brand-use disclaimer for the Power Agro website.",
};

const sections: LegalSection[] = [
  {
    id: "trademarks",
    title: "Trademarks",
    body: (
      <>
        <p>
          FAG, INA and Schaeffler are trademarks of Schaeffler Technologies AG &amp; Co. KG. SKF is a trademark of AB SKF. Timken is a trademark of The Timken Company. NSK is a trademark of NSK Ltd. NTN is a trademark of NTN Corporation. KOYO is a trademark of JTEKT Corporation. NACHI is a trademark of Nachi-Fujikoshi Corp.
        </p>
        <p>All other product and company names mentioned on this website are the property of their respective owners.</p>
      </>
    ),
  },
  {
    id: "no-affiliation",
    title: "No affiliation implied",
    body: (
      <p>
        Brand names appear on this website only to identify the genuine products we trade. Their use does not imply that Power Agro is an authorised distributor, agent or partner of any manufacturer, or that any manufacturer endorses or sponsors Power Agro, unless explicitly stated.
      </p>
    ),
  },
  {
    id: "images",
    title: "Images",
    body: (
      <p>
        Product photographs on this website are for illustration only and may not show the exact item, brand, marking or packaging supplied. Refer to your quotation for the exact designation and brand.
      </p>
    ),
  },
  {
    id: "technical-data",
    title: "Technical data",
    body: (
      <p>
        Dimensions and ratings shown on this website are taken from standard catalogue data and are indicative only. Always verify against the manufacturer&apos;s current technical documentation before specifying or installing a bearing. See our <Link href="/terms">Terms &amp; Conditions</Link> for details.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        If you are a rights holder and have a concern about how a mark is used on this website, please contact <a href="mailto:info.poweragro@gmail.com">info.poweragro@gmail.com</a> and we will respond promptly.
      </p>
    ),
  },
];

export default function DisclaimerPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Trademark Disclaimer"
      updated="25 October 2026"
      intro={<p>Power Agro trades in genuine bearings from many manufacturers. This page explains how brand names and product information are used on this website.</p>}
      sections={sections}
    />
  );
}
