import InfoPage from "@/app/_sharedComponents/InfoPage/InfoPage";
import type { Metadata } from "next";
import { FaCookieBite } from "react-icons/fa6";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function Cookies() {
  return (
    <InfoPage
      title="Cookie Policy"
      subtitle="How and why we use cookies"
      icon={<FaCookieBite />}
      intro="Cookies are small text files stored on your device. They help FreshCart work properly and give you a better shopping experience."
      sections={[
        { title: "Essential Cookies", text: "These keep you signed in, protect your account and remember the items in your cart. The website cannot work properly without them." },
        { title: "Preference Cookies", text: "These remember choices you make, such as your preferred product view or sorting option." },
        { title: "Analytics Cookies", text: "These help us understand which pages are visited most so we can improve the website. The data is anonymous." },
        { title: "Managing Cookies", list: ["You can block or delete cookies from your browser settings", "Blocking essential cookies may stop you from signing in or checking out", "Clearing cookies will also clear a guest cart saved on your device"] },
      ]}
    />
  );
}
