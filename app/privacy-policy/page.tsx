import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Power Agro collects, uses and protects personal information shared through this website, email, phone and WhatsApp.",
};

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          This website is operated by <strong>Power Agro</strong>, an import and export trade house for industrial and agricultural bearings, located at 2nd Floor, 12/14 Hira Bhuvan, Dariyasthan Street, Masjid Bunder, Mumbai 400003, India (GSTIN 27AAZHA9435Q1Z5).
        </p>
        <p>
          In this policy, &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; refer to Power Agro. &ldquo;You&rdquo; refers to any visitor, customer or business contact who interacts with us.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: (
      <>
        <h3>Information you give us</h3>
        <p>When you submit a sourcing request, email us, call us or message us on WhatsApp, we may collect:</p>
        <ul>
          <li>Your name, company name and job role</li>
          <li>Email address, phone number and business address</li>
          <li>Bearing designations, quantities, target brands and other details of your requirement</li>
          <li>Billing, shipping and tax details (such as GSTIN or import/export codes) when you place an order</li>
        </ul>
        <h3>Information collected automatically</h3>
        <p>
          Like most websites, our hosting provider may record basic technical data when you visit, such as your IP address, browser type, pages viewed and the date and time of your visit. This is used for security and to keep the site running reliably.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    body: (
      <>
        <p>We use the information we collect only for legitimate business purposes, including to:</p>
        <ul>
          <li>Respond to enquiries and prepare quotations</li>
          <li>Source, process, ship and invoice orders</li>
          <li>Prepare export and customs documentation required by law</li>
          <li>Maintain accounting and tax records as required under Indian law</li>
          <li>Send you updates about an order or enquiry you have made</li>
          <li>Protect our website and business against fraud and misuse</li>
        </ul>
        <p>We do not sell your personal information, and we do not send marketing messages without your consent.</p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Sharing your information",
    body: (
      <>
        <p>We share personal information only where needed to serve you, with:</p>
        <ul>
          <li><strong>Manufacturers and authorised distributors</strong> — to confirm availability, pricing and authenticity of the parts you request</li>
          <li><strong>Logistics, freight and customs partners</strong> — to ship goods and clear them through customs</li>
          <li><strong>Banks and payment providers</strong> — to process payments</li>
          <li><strong>Professional advisers</strong> — such as accountants and auditors</li>
          <li><strong>Government authorities</strong> — where required by law, including tax and customs authorities</li>
        </ul>
        <p>
          Because we trade internationally, some of these parties may be located outside India. We share only what is necessary for the purpose.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <p>
        This website does not use advertising or tracking cookies. Essential technical cookies may be set by our hosting infrastructure to deliver the site securely. If we introduce analytics in the future, we will update this policy.
      </p>
    ),
  },
  {
    id: "retention",
    title: "Data retention",
    body: (
      <p>
        We keep enquiry records for as long as needed to respond and follow up. Order, invoice and shipping records are retained for the period required under applicable tax, customs and accounting laws in India, after which they are securely deleted.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        We take reasonable technical and organisational measures to protect your information against unauthorised access, loss or misuse. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>Subject to applicable law, including the Digital Personal Data Protection Act, 2023, you may:</p>
        <ul>
          <li>Ask what personal information we hold about you</li>
          <li>Ask us to correct or update inaccurate information</li>
          <li>Ask us to delete information we are not legally required to keep</li>
          <li>Withdraw consent you have previously given</li>
        </ul>
        <p>To make a request, contact us using the details below. We may need to verify your identity before acting on it.</p>
      </>
    ),
  },
  {
    id: "third-party-links",
    title: "Third-party links",
    body: (
      <p>
        Our website links to third-party services such as Google Maps and WhatsApp. Their handling of your data is governed by their own privacy policies, which we encourage you to review.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the top of this page shows when it was last revised. Continued use of the website after changes are posted means you accept the updated policy.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact & grievances",
    body: (
      <>
        <p>For any question, request or complaint about this policy or your personal information, contact:</p>
        <p>
          <strong>Power Agro</strong><br />
          2nd Floor, 12/14 Hira Bhuvan, Dariyasthan Street, Masjid Bunder, Mumbai 400003<br />
          Email: <a href="mailto:info.poweragro@gmail.com">info.poweragro@gmail.com</a><br />
          Phone: <a href="tel:+919820717873">+91 98207 17873</a>
        </p>
        <p>We aim to respond to all requests within 30 days. See also our <Link href="/terms">Terms &amp; Conditions</Link>.</p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="25 October 2026"
      intro={<p>This policy explains what information Power Agro collects when you use this website or contact our trade desk, how we use it, and the choices you have.</p>}
      sections={sections}
    />
  );
}
