"use client";
import PasswordInput from "@/app/_sharedComponents/PasswordInput/PasswordInput";
import { notify } from "@/components/ui/top-notice";
import { ForgotEmailSchema, ResetPasswordSchema, VerifyCodeSchema } from "@/schema/forgot.schema";
import { ForgotPassword, ResetPassword, VerifyResetCode } from "@/services/forgotPassword.service";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaArrowLeft, FaCheck, FaCircleExclamation, FaEnvelope, FaKey, FaLock, FaShieldHalved } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";
import { BrandWord, FieldError, IconInput } from "../_components/AuthUi";

type Step = 1 | 2 | 3 | 4;

function Stepper({ step }: { step: Step }) {
  const icons = [FaEnvelope, FaKey, FaLock];
  return (
    <div className="my-6 flex items-center justify-center" aria-label={`Step ${step} of 3`}>
      {icons.map((Icon, i) => {
        const n = (i + 1) as Step;
        const done = n < step;
        const active = n === step;
        return (
          <div key={n} className="flex items-center">
            <span
              className={`flex size-9 items-center justify-center rounded-full text-sm transition ${done || active ? "bg-green-600 text-white" : "bg-gray-100 text-gray-400"} ${active ? "ring-4 ring-green-100" : ""}`}
            >
              {done ? <FaCheck /> : <Icon />}
            </span>
            {n < 3 && <span className={`h-0.5 w-14 transition ${n < step ? "bg-green-600" : "bg-gray-200"}`} />}
          </div>
        );
      })}
    </div>
  );
}

export default function ForgotFlow() {
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const emailForm = useForm({ defaultValues: { email: "" }, resolver: zodResolver(ForgotEmailSchema), mode: "onTouched" });
  const codeForm = useForm({ defaultValues: { resetCode: "" }, resolver: zodResolver(VerifyCodeSchema), mode: "onTouched" });
  const passForm = useForm({ defaultValues: { newPassword: "", rePassword: "" }, resolver: zodResolver(ResetPasswordSchema), mode: "onTouched" });

  async function sendCode({ email }: { email: string }) {
    setError("");
    const response = await ForgotPassword(email);
    if (!response.ok) return setError(response.message);
    setEmail(email);
    setCooldown(60);
    notify("Reset code sent to your email!", "success");
    setStep(2);
  }

  async function resend() {
    if (cooldown > 0) return;
    const response = await ForgotPassword(email);
    if (!response.ok) return setError(response.message);
    setCooldown(60);
    notify("New code sent!", "success");
  }

  async function verify({ resetCode }: { resetCode: string }) {
    setError("");
    const response = await VerifyResetCode(resetCode);
    if (!response.ok) return setError(response.message);
    setStep(3);
  }

  async function reset({ newPassword }: { newPassword: string; rePassword: string }) {
    setError("");
    const response = await ResetPassword(email, newPassword);
    if (!response.ok) return setError(response.message);
    notify("Password reset successfully!", "success");
    setStep(4);
  }

  const titles = {
    1: { title: "Forgot Password?", text: "No worries, we'll send you a reset code" },
    2: { title: "Check Your Email", text: `Enter the 6-digit code sent to ${email}` },
    3: { title: "Create New Password", text: "Your new password must be different from previous passwords" },
    4: { title: "", text: "" },
  }[step];

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-900/8 sm:p-8">
      <div className="text-center">
        <BrandWord />
        {step < 4 && (
          <>
            <h1 className="mt-3 text-2xl font-bold text-gray-900">{titles.title}</h1>
            <p className="mt-1 wrap-break-word text-gray-500">{titles.text}</p>
          </>
        )}
      </div>
      {step < 4 && <Stepper step={step} />}

      {error && (
        <div role="alert" className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          <FaCircleExclamation /> {error}
        </div>
      )}

      {step === 1 && (
        <form onSubmit={emailForm.handleSubmit(sendCode)} noValidate className="space-y-5">
          <Controller name="email" control={emailForm.control} render={({ field, fieldState }) => (
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-gray-700">Email Address</label>
              <IconInput icon={<FaEnvelope />}>
                <input {...field} id="email" type="email" autoComplete="email" placeholder="Enter your email address" aria-invalid={fieldState.invalid} className="input-fc ps-11" />
              </IconInput>
              <FieldError message={fieldState.error?.message} />
            </div>
          )} />
          <button type="submit" disabled={emailForm.formState.isSubmitting} className="btn-green h-12 w-full text-base">
            {emailForm.formState.isSubmitting && <ImSpinner2 className="animate-spin" />} Send Reset Code
          </button>
          <Link href="/login" className="flex items-center justify-center gap-2 text-sm text-green-600 transition hover:text-green-700">
            <FaArrowLeft /> Back to Sign In
          </Link>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={codeForm.handleSubmit(verify)} noValidate className="space-y-5">
          <Controller name="resetCode" control={codeForm.control} render={({ field, fieldState }) => (
            <div>
              <label htmlFor="resetCode" className="mb-1.5 block text-sm font-semibold text-gray-700">Verification Code</label>
              <input
                {...field}
                onChange={(e) => field.onChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
                id="resetCode"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="• • • • • •"
                aria-invalid={fieldState.invalid}
                className="input-fc h-14 text-center text-2xl font-bold tracking-[0.6em] placeholder:tracking-[0.4em]"
              />
              <FieldError message={fieldState.error?.message} />
              <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-400"><FaShieldHalved /> The code expires in 10 minutes</p>
            </div>
          )} />
          <p className="text-center text-sm text-gray-500">
            Didn&apos;t receive the code?{" "}
            <button type="button" onClick={resend} disabled={cooldown > 0} className="font-semibold text-green-600 transition hover:text-green-700 disabled:text-gray-400">
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Code"}
            </button>
          </p>
          <button type="submit" disabled={codeForm.formState.isSubmitting} className="btn-green h-12 w-full text-base">
            {codeForm.formState.isSubmitting && <ImSpinner2 className="animate-spin" />} Verify Code
          </button>
          <button type="button" onClick={() => { setError(""); setStep(1); }} className="mx-auto flex items-center gap-2 text-sm text-gray-500 transition hover:text-green-600">
            <FaArrowLeft /> Change email address
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={passForm.handleSubmit(reset)} noValidate className="space-y-5">
          <Controller name="newPassword" control={passForm.control} render={({ field, fieldState }) => (
            <div>
              <label htmlFor="newPassword" className="mb-1.5 block text-sm font-semibold text-gray-700">New Password</label>
              <PasswordInput {...field} id="newPassword" autoComplete="new-password" placeholder="Enter new password" aria-invalid={fieldState.invalid} leftIcon={<FaLock />} />
              <FieldError message={fieldState.error?.message} />
            </div>
          )} />
          <Controller name="rePassword" control={passForm.control} render={({ field, fieldState }) => (
            <div>
              <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-semibold text-gray-700">Confirm Password</label>
              <PasswordInput {...field} id="confirmPassword" autoComplete="new-password" placeholder="Confirm new password" aria-invalid={fieldState.invalid} leftIcon={<FaLock />} />
              <FieldError message={fieldState.error?.message} />
            </div>
          )} />
          <button type="submit" disabled={passForm.formState.isSubmitting} className="btn-green h-12 w-full text-base">
            {passForm.formState.isSubmitting && <ImSpinner2 className="animate-spin" />} Reset Password
          </button>
        </form>
      )}

      {step === 4 && (
        <div className="mt-6 text-center">
          <span className="mx-auto flex size-18 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
            <FaCheck />
          </span>
          <h2 className="mt-5 text-2xl font-bold text-gray-900">Password Reset!</h2>
          <p className="mt-2 text-gray-500">Your password has been successfully reset. You can now sign in with your new password.</p>
          <Link href="/login" className="btn-green mt-6 h-12 w-full text-base">
            Back to Sign In
          </Link>
        </div>
      )}

      {step === 1 && (
        <p className="mt-6 border-t border-gray-100 pt-6 text-center text-gray-600">
          Remember your password?{" "}
          <Link href="/login" className="font-semibold text-green-600 hover:underline">Sign In</Link>
        </p>
      )}
    </div>
  );
}
