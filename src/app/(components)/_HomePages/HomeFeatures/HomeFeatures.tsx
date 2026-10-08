import { FaHeadset, FaRotateLeft, FaShieldHalved, FaTruck } from "react-icons/fa6";

const features = [
  { icon: FaTruck, title: "Free Shipping", text: "On orders over 500 EGP", color: "bg-blue-50 text-blue-500" },
  { icon: FaShieldHalved, title: "Secure Payment", text: "100% secure transactions", color: "bg-green-50 text-green-600" },
  { icon: FaRotateLeft, title: "Easy Returns", text: "14-day return policy", color: "bg-orange-50 text-orange-500" },
  { icon: FaHeadset, title: "24/7 Support", text: "Dedicated support team", color: "bg-purple-50 text-purple-500" },
];

export default function HomeFeatures() {
  return (
    <section className="bg-gray-50 py-8">
      <div className="container-fc grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, text, color }, i) => (
          <div
            key={title}
            style={{ animationDelay: `${450 + i * 120}ms` }}
            className="flex animate-fade-up items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className={`flex size-12 shrink-0 items-center justify-center rounded-full text-lg ${color}`}>
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
