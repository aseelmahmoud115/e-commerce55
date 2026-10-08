"use client";
import { toast } from "@/components/ui/toast";
import { ReactNode } from "react";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export function BrandWord({ className = "" }: { className?: string }) {
  return (
    <p className={`text-3xl font-bold ${className}`}>
      <span className="text-green-600">Fresh</span>
      <span className="text-gray-900">Cart</span>
    </p>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs text-red-500">
      * {message}
    </p>
  );
}

export function IconInput({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="relative flex items-center">
      <span className="pointer-events-none absolute inset-s-4 z-10 text-sm text-gray-400">{icon}</span>
      {children}
    </div>
  );
}

export function SocialButtons({ layout = "stack" }: { layout?: "stack" | "row" }) {
  const notAvailable = (name: string) =>
    toast.add({
      title: `${name} sign in`,
      description: "Social login is not available yet, please use your email.",
      type: "info",
    });
  const btn =
    "flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 transition hover:border-green-600 hover:bg-green-50";
  return (
    <div className={layout === "row" ? "grid grid-cols-2 gap-3" : "space-y-3"}>
      <button type="button" onClick={() => notAvailable("Google")} className={btn}>
        <FcGoogle className="text-lg" /> {layout === "row" ? "Google" : "Continue with Google"}
      </button>
      <button type="button" onClick={() => notAvailable("Facebook")} className={btn}>
        <FaFacebook className="text-lg text-blue-600" /> {layout === "row" ? "Facebook" : "Continue with Facebook"}
      </button>
    </div>
  );
}

export function OrDivider({ text }: { text: string }) {
  return (
    <div className="my-6 flex items-center gap-4 text-xs uppercase text-gray-400">
      <span className="h-px flex-1 bg-gray-200" />
      {text}
      <span className="h-px flex-1 bg-gray-200" />
    </div>
  );
}
