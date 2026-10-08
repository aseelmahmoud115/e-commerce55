import InfoPage from "@/app/_sharedComponents/InfoPage/InfoPage";
import type { Metadata } from "next";
import { FaUserShield } from "react-icons/fa6";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Privacy() {
  return (
    <InfoPage
      title="Privacy Policy"
      subtitle="Last updated: February 2026"
      icon={<FaUserShield />}
      intro="This Privacy Policy describes how FreshCart collects, uses, and protects your personal information when you use our services."
      sections={[
        { title: "Information We Collect", list: ["Personal data such as your name, email address, phone number and delivery addresses", "Payment information processed securely by our payment partners", "Technical data like your browser type, device and IP address", "Usage analytics about how you browse and shop on FreshCart"] },
        { title: "How We Use Your Information", list: ["To process and deliver your orders", "To provide customer support", "To personalise your shopping experience", "To send order updates and, if you agree, offers and newsletters", "To keep our platform safe and prevent fraud"] },
        { title: "Data Protection", list: ["All data is encrypted in transit with 256-bit SSL", "Payments are PCI-DSS compliant and never stored on our servers", "Regular security audits", "Strict access restrictions for our staff"] },
        { title: "Information Sharing", text: "We do not sell, trade, or rent your personal information to third parties. We only share the data needed to deliver your order with trusted delivery and payment partners." },
        { title: "Your Rights", list: ["Access the personal data we hold about you", "Correct inaccurate information from your account settings", "Request deletion of your account and data", "Export your data", "Opt out of marketing emails at any time"] },
        { title: "Cookies", text: "We use cookies to keep you signed in, remember your cart and understand how our site is used. You can control cookies from your browser settings. See our Cookie Policy for details." },
        { title: "Data Retention", text: "Account data is deleted within 30 days of account closure upon request. Order records are kept as long as required by law." },
        { title: "Contact Us", text: "For any privacy related questions, email us at privacy@freshcart.com." },
      ]}
    />
  );
}
