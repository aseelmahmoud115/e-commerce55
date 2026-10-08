import InfoPage from "@/app/_sharedComponents/InfoPage/InfoPage";
import type { Metadata } from "next";
import { FaLocationCrosshairs } from "react-icons/fa6";
import TrackForm from "./TrackForm";

export const metadata: Metadata = { title: "Track Order" };

export default function TrackOrder() {
  return (
    <InfoPage
      title="Track Order"
      subtitle="Follow your order every step of the way"
      icon={<FaLocationCrosshairs />}
      sections={[
        { title: "Order Statuses", list: ["Processing - we received your order and are preparing it", "On the way - your order has been paid and handed to the courier", "Delivered - your order arrived. Enjoy!"] },
        { title: "Need Help?", text: "If your order is late or something looks wrong, contact our 24/7 support team and we'll sort it out." },
      ]}
    >
      <TrackForm />
    </InfoPage>
  );
}
