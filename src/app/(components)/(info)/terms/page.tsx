import InfoPage from "@/app/_sharedComponents/InfoPage/InfoPage";
import type { Metadata } from "next";
import { FaFileContract } from "react-icons/fa6";

export const metadata: Metadata = { title: "Terms of Service" };

export default function Terms() {
  return (
    <InfoPage
      title="Terms of Service"
      subtitle="Last updated: February 2026"
      icon={<FaFileContract />}
      intro="By creating an account or placing an order on FreshCart you agree to the following terms. Please read them carefully."
      sections={[
        { title: "Your Account", list: ["You must provide accurate information when registering", "You are responsible for keeping your password confidential", "You must be at least 18 years old or have a guardian's permission to order"] },
        { title: "Orders & Pricing", list: ["All prices are shown in Egyptian Pounds (EGP)", "We may cancel orders in case of pricing errors or stock issues and refund you in full", "An order is confirmed once you receive the order confirmation"] },
        { title: "Payment", text: "You can pay cash on delivery or online with a credit/debit card through Stripe. Online payments are processed securely and FreshCart never stores your card details." },
        { title: "Delivery", text: "Delivery times are estimates. We are not responsible for delays caused by circumstances outside our control. See Shipping Info for more details." },
        { title: "Returns", text: "Most items can be returned within 14 days of delivery. See our Returns & Refunds page for the full policy." },
        { title: "Acceptable Use", list: ["Do not misuse the website or try to access other users' accounts", "Do not post false or offensive reviews", "Do not use automated tools to scrape the website"] },
        { title: "Changes to These Terms", text: "We may update these terms from time to time. The latest version will always be available on this page." },
      ]}
    />
  );
}
