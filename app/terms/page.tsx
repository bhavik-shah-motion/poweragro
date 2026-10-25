import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms governing the use of the Power Agro website and the supply of bearings by Power Agro, Mumbai.",
};

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    body: (
      <p>
        By using this website or placing an enquiry or order with Power Agro, you agree to these Terms &amp; Conditions. If you do not agree, please do not use the website. Specific terms agreed in writing in a quotation, proforma invoice or contract take precedence over these general terms.
      </p>
    ),
  },
  {
    id: "website-use",
    title: "Use of the website",
    body: (
      <>
        <p>The content on this website is provided for general business information. You agree not to:</p>
        <ul>
          <li>Use the website for any unlawful purpose</li>
          <li>Attempt to gain unauthorised access to the website or its systems</li>
          <li>Copy, reproduce or republish content without our written permission</li>
          <li>Submit false or misleading information through our enquiry forms</li>
        </ul>
      </>
    ),
  },
  {
    id: "product-information",
    title: "Product information",
    body: (
      <>
        <p>
          Dimensions, specifications, speed ratings and brand availability shown on this website — including results from the cross-reference tool — are indicative only. They are based on standard manufacturer catalogues and may change without notice.
        </p>
        <p>
          Before installation, buyers should confirm that a bearing is suitable for their application against the manufacturer&apos;s official technical documentation. Final specifications are those confirmed in our written quotation.
        </p>
      </>
    ),
  },
  {
    id: "quotations-orders",
    title: "Quotations & orders",
    body: (
      <>
        <ul>
          <li>Quotations are valid for the period stated on them, or 7 days if no period is stated.</li>
          <li>Prices are subject to change due to exchange rates, duties, freight costs and manufacturer price revisions until an order is confirmed in writing.</li>
          <li>An order is binding only once we have issued a written order confirmation or proforma invoice.</li>
          <li>Prices are exclusive of GST, customs duties and freight unless stated otherwise.</li>
        </ul>
      </>
    ),
  },
  {
    id: "payment",
    title: "Payment",
    body: (
      <p>
        Payment terms are as stated on the quotation or proforma invoice. Unless otherwise agreed, export orders require advance payment or an irrevocable letter of credit. We reserve the right to hold dispatch until payment is received in full.
      </p>
    ),
  },
  {
    id: "delivery",
    title: "Delivery & risk",
    body: (
      <>
        <p>
          Delivery times are estimates and depend on manufacturer stock, freight availability and customs clearance. We are not liable for delays outside our reasonable control.
        </p>
        <p>
          Risk and title pass to the buyer according to the Incoterm stated in the order confirmation (for example EXW, FOB or CIF). Where no Incoterm is stated, delivery is Ex Works, Mumbai.
        </p>
      </>
    ),
  },
  {
    id: "inspection-returns",
    title: "Inspection & returns",
    body: (
      <>
        <p>
          Buyers must inspect goods on receipt and report any shortage, damage or discrepancy in writing within 7 days of delivery, with photographs and packing details.
        </p>
        <ul>
          <li>Goods may only be returned with our prior written approval.</li>
          <li>Returned goods must be unused, in original packaging and in resaleable condition.</li>
          <li>Specially sourced or custom-ordered items are not returnable unless defective.</li>
        </ul>
      </>
    ),
  },
  {
    id: "warranty",
    title: "Warranty & authenticity",
    body: (
      <>
        <p>
          We supply genuine products sourced from manufacturers and their authorised channels. Product warranties are those offered by the respective manufacturer and are subject to correct storage, handling, installation and use.
        </p>
        <p>
          We are not responsible for failures caused by improper installation, inadequate lubrication, contamination, overloading, misalignment or use outside the manufacturer&apos;s specifications.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <p>
        To the extent permitted by law, our total liability for any claim arising from an order is limited to the invoice value of the goods concerned. We are not liable for any indirect or consequential loss, including loss of production, profit or business, arising from the use of or inability to use any product.
      </p>
    ),
  },
  {
    id: "export-compliance",
    title: "Export compliance",
    body: (
      <p>
        Buyers are responsible for complying with the import laws, licensing requirements and duties of the destination country. We may decline any order that would breach applicable export control or sanctions regulations.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of India. Any dispute shall be subject to the exclusive jurisdiction of the courts at Mumbai, Maharashtra.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about these terms can be sent to <a href="mailto:info.poweragro@gmail.com">info.poweragro@gmail.com</a> or <a href="tel:+919820717873">+91 98207 17873</a>. See also our <Link href="/privacy-policy">Privacy Policy</Link> and <Link href="/disclaimer">Trademark Disclaimer</Link>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      updated="25 October 2026"
      intro={<p>These terms govern your use of this website and the supply of bearings and related products by Power Agro, Mumbai.</p>}
      sections={sections}
    />
  );
}
