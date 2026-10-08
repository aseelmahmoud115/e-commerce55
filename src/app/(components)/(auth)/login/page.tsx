import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { FaClock, FaShieldHalved, FaTruck } from "react-icons/fa6";
import loginCart from "@/assets/login-cart.png";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Sign In" };

export default function Login() {
  return (
    <div className="bg-white">
      <div className="container-fc grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-16">
        <div className="hidden text-center lg:block">
          <div className="overflow-hidden rounded-2xl shadow-xl shadow-gray-900/10">
            <Image src={loginCart} alt="Shopping cart full of fresh vegetables" priority className="h-auto w-full" />
          </div>
          <h2 className="mt-8 text-3xl font-bold text-gray-900">FreshCart - Your One-Stop Shop for Fresh Products</h2>
          <p className="mx-auto mt-4 max-w-md text-gray-500">
            Join thousands of happy customers who trust FreshCart for their daily grocery needs
          </p>
          <div className="mt-6 flex justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2"><FaTruck className="text-green-600" /> Free Delivery</span>
            <span className="flex items-center gap-2"><FaShieldHalved className="text-green-600" /> Secure Payment</span>
            <span className="flex items-center gap-2"><FaClock className="text-green-600" /> 24/7 Support</span>
          </div>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
