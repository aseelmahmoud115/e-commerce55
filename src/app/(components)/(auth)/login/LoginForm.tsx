"use client";
import PasswordInput from "@/app/_sharedComponents/PasswordInput/PasswordInput";
import { toast } from "@/components/ui/toast";
import { loginPayload, loginSchema } from "@/schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaCircleExclamation, FaEnvelope, FaLock, FaStar, FaUsers } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";
import { BrandWord, FieldError, IconInput, OrDivider, SocialButtons } from "../_components/AuthUi";

export default function LoginForm() {
  const route = useRouter();
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState("");

  const { control, handleSubmit, formState } = useForm<loginPayload>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  async function handelLogin(values: loginPayload) {
    setServerError("");
    const response = await signIn("credentials", { ...values, redirect: false });

    if (response?.ok) {
      toast.add({ title: "Welcome back!", description: "You are logged in successfully", type: "success" });
      const callbackUrl = searchParams.get("callbackUrl");
      route.push(callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/");
      route.refresh();
    } else {
      const message =
        response?.error && response.error !== "CredentialsSignin"
          ? response.error
          : "Incorrect email or password";
      setServerError(message);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-900/8 sm:p-8">
      <div className="text-center">
        <BrandWord />
        <h1 className="mt-3 text-2xl font-bold text-gray-900">Welcome Back!</h1>
        <p className="mt-1 text-gray-500">Sign in to continue your fresh shopping experience</p>
      </div>

      <div className="mt-7">
        <SocialButtons />
      </div>
      <OrDivider text="or continue with email" />

      {serverError && (
        <div role="alert" className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          <FaCircleExclamation /> {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(handelLogin)} noValidate className="space-y-5">
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-gray-700">Email Address</label>
              <IconInput icon={<FaEnvelope />}>
                <input {...field} id="email" type="email" autoComplete="email" placeholder="Enter your email" aria-invalid={fieldState.invalid} className="input-fc ps-11" />
              </IconInput>
              <FieldError message={fieldState.error?.message} />
            </div>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</label>
                <Link href="/forgot-password" className="text-sm font-medium text-green-600 transition hover:text-green-700 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <PasswordInput {...field} id="password" autoComplete="current-password" placeholder="Enter your password" aria-invalid={fieldState.invalid} leftIcon={<FaLock />} />
              <FieldError message={fieldState.error?.message} />
            </div>
          )}
        />
        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" className="size-4 accent-green-600" /> Keep me signed in
        </label>
        <button type="submit" disabled={formState.isSubmitting} className="btn-green h-12 w-full text-base">
          {formState.isSubmitting && <ImSpinner2 className="animate-spin" />} Sign In
        </button>
      </form>

      <div className="mt-7 border-t border-gray-100 pt-6 text-center">
        <p className="text-gray-600">
          New to FreshCart?{" "}
          <Link href="/signup" className="font-semibold text-green-600 transition hover:text-green-700 hover:underline">
            Create an account
          </Link>
        </p>
        <div className="mt-4 flex justify-center gap-5 text-xs text-gray-400">
          <span className="flex items-center gap-1.5"><FaLock /> SSL Secured</span>
          <span className="flex items-center gap-1.5"><FaUsers /> 50K+ Users</span>
          <span className="flex items-center gap-1.5"><FaStar /> 4.9 Rating</span>
        </div>
      </div>
    </div>
  );
}
