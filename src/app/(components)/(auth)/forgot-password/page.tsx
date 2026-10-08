import type { Metadata } from "next";
import { FaEnvelope, FaLock, FaShieldHalved } from "react-icons/fa6";
import ForgotFlow from "./ForgotFlow";

export const metadata: Metadata = { title: "Forgot Password" };

export default function ForgotPassword() {
  return (
    <div className="bg-white">
      <div className="container-fc grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-16">
        <div className="hidden text-center lg:block">
          <div className="relative flex aspect-16/10 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-green-50 via-white to-green-50 shadow-xl shadow-gray-900/10">
            <span className="absolute inset-s-6 top-6 size-24 rounded-full bg-green-100/70" />
            <span className="absolute inset-e-16 top-12 size-16 rounded-full bg-green-100/70" />
            <span className="absolute -bottom-6 inset-e-10 size-32 rounded-full bg-green-100/60" />
            <div className="relative flex flex-col items-center">
              <div className="flex items-center gap-4">
                <span className="flex size-14 -rotate-6 items-center justify-center rounded-2xl bg-white text-xl text-green-600 shadow-lg animate-float">
                  <FaEnvelope />
                </span>
                <span className="flex size-28 items-center justify-center rounded-3xl bg-white shadow-xl">
                  <span className="flex size-20 items-center justify-center rounded-2xl bg-green-100 text-4xl text-green-600">
                    <FaLock />
                  </span>
                </span>
                <span className="flex size-14 rotate-6 items-center justify-center rounded-2xl bg-white text-xl text-green-600 shadow-lg animate-float [animation-delay:1.5s]">
                  <FaShieldHalved />
                </span>
              </div>
              <div className="mt-6 flex gap-2">
                <span className="size-2.5 rounded-full bg-green-300" />
                <span className="size-2.5 rounded-full bg-green-400" />
                <span className="size-2.5 rounded-full bg-green-600" />
              </div>
            </div>
          </div>
          <h2 className="mt-8 text-3xl font-bold text-gray-900">Reset Your Password</h2>
          <p className="mx-auto mt-3 max-w-md text-gray-500">
            Don&apos;t worry, it happens to the best of us. We&apos;ll help you get back into your account in no time.
          </p>
          <div className="mt-5 flex justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2"><FaEnvelope className="text-green-600" /> Email Verification</span>
            <span className="flex items-center gap-2"><FaShieldHalved className="text-green-600" /> Secure Reset</span>
            <span className="flex items-center gap-2"><FaLock className="text-green-600" /> Encrypted</span>
          </div>
        </div>
        <ForgotFlow />
      </div>
    </div>
  );
}
