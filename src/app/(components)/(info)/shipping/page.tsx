import InfoPage from "@/app/_sharedComponents/InfoPage/InfoPage";
import type { Metadata } from "next";
import { FaClock, FaGift, FaTruck, FaTruckFast } from "react-icons/fa6";

export const metadata: Metadata = { title: "Shipping Info" };

const options = [
  { icon: FaTruck, title: "Standard", time: "3-5 business days", price: "Free over 500 EGP" },
  { icon: FaTruckFast, title: "Express", time: "1-2 business days", price: "50 EGP" },
  { icon: FaClock, title: "Same Day", time: "Order before 12 PM", price: "Cairo & Giza only" },
];

export default function Shipping() {
  return (
    <InfoPage
      title="Shipping Info"
      subtitle="Everything you need to know about delivery"
      icon={<FaTruck />}
      sections={[
        { title: "Where We Deliver", text: "We deliver to all governorates in Egypt. Remote areas may need one or two extra days." },
        { title: "Order Processing", list: ["Orders are processed within 24 hours", "You will get an update once your order is on the way", "Track every order from the My Orders page"] },
        { title: "Delivery Fees", text: "Shipping is free for orders over 500 EGP. Express and same-day delivery fees are shown at checkout." },
        { title: "Receiving Your Order", list: ["Please make sure your phone number is correct so the courier can reach you", "For cash on delivery, have the exact amount ready if possible", "Check your items when they arrive and contact us about any problem within 48 hours"] },
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {options.map(({ icon: Icon, title, time, price }) => (
          <div key={title} className="rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-50 text-lg text-green-600"><Icon /></span>
            <h3 className="mt-3 font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{time}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700"><FaGift /> {price}</p>
          </div>
        ))}
      </div>
    </InfoPage>
  );
}
