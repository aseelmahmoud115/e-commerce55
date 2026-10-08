"use client";
import PasswordInput from "@/app/_sharedComponents/PasswordInput/PasswordInput";
import { notify } from "@/components/ui/top-notice";
import { registerForm, registerSchema } from "@/schema/register.schema";
import { RegisterForm as RegisterRequest } from "@/services/register.service";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { FaCircleExclamation, FaUserPlus } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";
import { FieldError, OrDivider, SocialButtons } from "../_components/AuthUi";

function strength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const levels = [
    { label: "Weak", color: "bg-red-500", text: "text-red-500" },
    { label: "Weak", color: "bg-red-500", text: "text-red-500" },
    { label: "Fair", color: "bg-orange-400", text: "text-orange-500" },
    { label: "Good", color: "bg-yellow-400", text: "text-yellow-600" },
    { label: "Strong", color: "bg-green-600", text: "text-green-600" },
  ];
  return { score, ...levels[score] };
}

export default function RegisterForm() {
  const route = useRouter();
  const [serverError, setServerError] = useState("");

  const { control, handleSubmit, formState, setError } = useForm<registerForm>({
    defaultValues: { name: "", email: "", password: "", rePassword: "", phone: "", terms: false },
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });
  const password = useWatch({ control, name: "password" });
  const level = strength(password ?? "");

  async function handelRegister({ terms, ...values }: registerForm) {
    void terms;
    setServerError("");
    const response = await RegisterRequest(values);
    if (!response.ok) {
      if (/already exists/i.test(response.message)) {
        setError("email", { message: "An account with this email already exists" });
        notify("Validation errors", "error");
        return;
      }
      setServerError(response.message);
      return;
    }
    notify("Account created successfully", "success");
    route.push("/login");
  }

  const label = (htmlFor: string, text: string) => (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-gray-700">
      {text}<span className="text-red-500">*</span>
    </label>
  );

  return (
    <div className="w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-900/8 sm:p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Create Your Account</h1>
        <p className="mt-1 text-gray-500">Start your fresh journey with us today</p>
      </div>
      <div className="mt-7">
        <SocialButtons layout="row" />
      </div>
      <OrDivider text="or" />

      {serverError && (
        <div role="alert" className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          <FaCircleExclamation /> {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(handelRegister)} noValidate className="space-y-5">
        <Controller name="name" control={control} render={({ field, fieldState }) => (
          <div>
            {label("name", "Name")}
            <input {...field} id="name" autoComplete="name" placeholder="Ali" aria-invalid={fieldState.invalid} className="input-fc" />
            <FieldError message={fieldState.error?.message} />
          </div>
        )} />
        <Controller name="email" control={control} render={({ field, fieldState }) => (
          <div>
            {label("email", "Email")}
            <input {...field} id="email" type="email" autoComplete="email" placeholder="ali@example.com" aria-invalid={fieldState.invalid} className="input-fc" />
            <FieldError message={fieldState.error?.message} />
          </div>
        )} />
        <Controller name="password" control={control} render={({ field, fieldState }) => (
          <div>
            {label("password", "Password")}
            <PasswordInput {...field} id="password" autoComplete="new-password" placeholder="create a strong password" aria-invalid={fieldState.invalid} />
            <div className="mt-2 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                <div className={`h-full rounded-full transition-all duration-300 ${level.color}`} style={{ width: `${password ? Math.max(level.score, 1) * 25 : 0}%` }} />
              </div>
              <span className={`w-12 text-end text-xs font-medium ${password ? level.text : "text-gray-500"}`}>{password ? level.label : "Weak"}</span>
            </div>
            {fieldState.error ? (
              <FieldError message={fieldState.error.message} />
            ) : (
              <p className="mt-1 text-xs text-gray-400">Must be at least 8 characters with numbers and symbols</p>
            )}
          </div>
        )} />
        <Controller name="rePassword" control={control} render={({ field, fieldState }) => (
          <div>
            {label("rePassword", "Confirm Password")}
            <PasswordInput {...field} id="rePassword" autoComplete="new-password" placeholder="confirm your password" aria-invalid={fieldState.invalid} />
            <FieldError message={fieldState.error?.message} />
          </div>
        )} />
        <Controller name="phone" control={control} render={({ field, fieldState }) => (
          <div>
            {label("phone", "Phone Number")}
            <input {...field} id="phone" type="tel" inputMode="numeric" autoComplete="tel" placeholder="01xxxxxxxxx" aria-invalid={fieldState.invalid} className="input-fc" />
            <FieldError message={fieldState.error?.message} />
          </div>
        )} />
        <Controller name="terms" control={control} render={({ field, fieldState }) => (
          <div>
            <label className="flex cursor-pointer items-start gap-2.5 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
                className="mt-0.5 size-4 accent-green-600"
              />
              <span>
                I agree to the{" "}
                <Link href="/terms" className="text-green-600 hover:underline">Terms of Service</Link> and{" "}
                <Link href="/privacy" className="text-green-600 hover:underline">Privacy Policy</Link>{" "}
                <span className="text-red-500">*</span>
              </span>
            </label>
            <FieldError message={fieldState.error?.message} />
          </div>
        )} />
        <button type="submit" disabled={formState.isSubmitting} className="btn-green h-12 w-full text-base">
          {formState.isSubmitting ? <ImSpinner2 className="animate-spin" /> : <FaUserPlus />} Create My Account
        </button>
      </form>
      <p className="mt-7 text-center text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-green-600 transition hover:text-green-700 hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
