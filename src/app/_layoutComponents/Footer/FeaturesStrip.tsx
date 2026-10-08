import { FaHeadset, FaRotateLeft, FaShieldHalved, FaTruck } from "react-icons/fa6";

const features = [
  { icon: FaTruck, title: "Free Shipping", text: "On orders over 500 EGP" },
  { icon: FaRotateLeft, title: "Easy Returns", text: "14-day return policy" },
  { icon: FaShieldHalved, title: "Secure Payment", text: "100% secure checkout" },
  { icon: FaHeadset, title: "24/7 Support", text: "Contact us anytime" },
];

export default function FeaturesStrip() {
  return (
    <section className="border-t border-green-100 bg-green-50/70">
      <div className="container-fc grid grid-cols-1 gap-5 py-7 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <Icon />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
              <p className="text-xs text-gray-500">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
