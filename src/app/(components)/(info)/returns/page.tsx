import InfoPage from "@/app/_sharedComponents/InfoPage/InfoPage";
import type { Metadata } from "next";
import { FaRotateLeft } from "react-icons/fa6";

export const metadata: Metadata = { title: "Returns & Refunds" };

export default function Returns() {
  return (
    <InfoPage
      title="Returns & Refunds"
      subtitle="14-day hassle-free return policy"
      icon={<FaRotateLeft />}
      intro="Not happy with your order? You can return most items within 14 days of delivery for a full refund or an exchange."
      sections={[
        { title: "Eligible Items", list: ["Items in their original condition and packaging", "Items returned within 14 days of delivery", "Defective or damaged items at any time within the warranty period"] },
        { title: "Non-Returnable Items", list: ["Fresh food and perishable groceries", "Personal care and beauty products that have been opened", "Underwear and swimwear for hygiene reasons", "Gift cards"] },
        { title: "How to Return", list: ["Contact our support team with your order number", "Pack the item securely in its original packaging", "Our courier will pick it up from your address", "We inspect the item within 2 business days"] },
        { title: "Refunds", text: "Card payments are refunded to the same card within 5-10 business days. Cash on delivery orders are refunded by bank transfer or store credit." },
      ]}
    />
  );
}
