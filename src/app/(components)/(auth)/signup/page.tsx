import type { Metadata } from "next";
import Image from "next/image";
import { FaShieldHalved, FaStar, FaTruckFast } from "react-icons/fa6";
import avatar from "@/assets/avatar.png";
import Stars from "@/app/_sharedComponents/Stars/Stars";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = { title: "Create Account" };

const perks = [
  { icon: FaStar, title: "Premium Quality", text: "Premium quality products sourced from trusted suppliers." },
  { icon: FaTruckFast, title: "Fast Delivery", text: "Same-day delivery available in most areas" },
  { icon: FaShieldHalved, title: "Secure Shopping", text: "Your data and payments are completely secure" },
];

export default function Register() {
  return (
    <div className="bg-white">
      <div className="container-fc grid items-start gap-10 py-12 lg:grid-cols-2 lg:py-16">
        <div className="lg:pt-4">
          <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            Welcome to <span className="text-green-600">FreshCart</span>
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
          </p>
          <ul className="mt-8 space-y-6">
            {perks.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Icon />
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800">{title}</h3>
                  <p className="text-sm text-gray-500">{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <figure className="mt-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <Image src={avatar} alt="Sarah Johnson" width={48} height={48} className="size-12 rounded-full" />
              <div>
                <figcaption className="font-medium text-gray-800">Sarah Johnson</figcaption>
                <Stars rating={5} />
              </div>
            </div>
            <blockquote className="mt-3 text-sm italic leading-relaxed text-gray-600">
              &quot;FreshCart has transformed my shopping experience. The quality of the products is outstanding,
              and the delivery is always on time. Highly recommend!&quot;
            </blockquote>
          </figure>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
