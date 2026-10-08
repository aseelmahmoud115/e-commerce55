"use client";
import PasswordInput from "@/app/_sharedComponents/PasswordInput/PasswordInput";
import {
  ChangePasswordForm,
  ChangePasswordSchema,
  ProfileForm,
  ProfileSchema,
} from "@/schema/profile.schema";
import { ChangeMyPassword, UpdateMe } from "@/services/user.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaCircleCheck, FaCircleExclamation, FaFloppyDisk, FaLock, FaUser } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";

type Notice = { type: "success" | "error"; text: string } | null;

function NoticeBox({ notice }: { notice: Notice }) {
  if (!notice) return null;
  const ok = notice.type === "success";
  return (
    <div role="status" className={`mb-5 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${ok ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-600"}`}>
      {ok ? <FaCircleCheck /> : <FaCircleExclamation />} {notice.text}
    </div>
  );
}

export default function Settings() {
  const { data: session, update } = useSession();
  const [profileNotice, setProfileNotice] = useState<Notice>(null);
  const [passwordNotice, setPasswordNotice] = useState<Notice>(null);

  const profileForm = useForm<ProfileForm>({
    defaultValues: { name: "", email: "", phone: "" },
    resolver: zodResolver(ProfileSchema),
    mode: "onTouched",
  });
  const passwordForm = useForm<ChangePasswordForm>({
    defaultValues: { currentPassword: "", password: "", rePassword: "" },
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onTouched",
  });

  const { reset } = profileForm;
  useEffect(() => {
    if (session?.user) {
      reset((prev) => ({ ...prev, name: session.user.name ?? "", email: session.user.email ?? "" }));
    }
  }, [session?.user, reset]);

  async function saveProfile(values: ProfileForm) {
    setProfileNotice(null);
    const payload: Record<string, string> = { name: values.name };
    if (values.email !== session?.user.email) payload.email = values.email;
    if (values.phone) payload.phone = values.phone;

    const response = await UpdateMe(payload as never);
    if (!response.ok) {
      setProfileNotice({ type: "error", text: response.message });
      return;
    }
    await update({
      name: response.data?.user?.name ?? values.name,
      email: response.data?.user?.email ?? values.email,
    });
    setProfileNotice({ type: "success", text: "Profile updated successfully" });
  }

  async function changePassword(values: ChangePasswordForm) {
    setPasswordNotice(null);
    const response = await ChangeMyPassword(values);
    if (!response.ok) {
      setPasswordNotice({ type: "error", text: response.message });
      return;
    }
    if (response.data?.token) await update({ token: response.data.token });
    passwordForm.reset();
    setPasswordNotice({ type: "success", text: "Password changed successfully" });
  }

  const errorText = (msg?: string) => msg && <p className="mt-1.5 text-xs text-red-500">* {msg}</p>;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
        <p className="text-sm text-gray-500">Update your profile information and change your password</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="p-5 sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-xl bg-green-100 text-lg text-green-600"><FaUser /></span>
            <div>
              <h3 className="font-bold text-gray-900">Profile Information</h3>
              <p className="text-sm text-gray-500">Update your personal details</p>
            </div>
          </div>
          <NoticeBox notice={profileNotice} />
          <form onSubmit={profileForm.handleSubmit(saveProfile)} noValidate className="space-y-5">
            <Controller name="name" control={profileForm.control} render={({ field, fieldState }) => (
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">Full Name</label>
                <input {...field} id="name" placeholder="Enter your name" aria-invalid={fieldState.invalid} className="input-fc" />
                {errorText(fieldState.error?.message)}
              </div>
            )} />
            <Controller name="email" control={profileForm.control} render={({ field, fieldState }) => (
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">Email Address</label>
                <input {...field} id="email" type="email" placeholder="Enter your email" aria-invalid={fieldState.invalid} className="input-fc" />
                {errorText(fieldState.error?.message)}
              </div>
            )} />
            <Controller name="phone" control={profileForm.control} render={({ field, fieldState }) => (
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-700">Phone Number</label>
                <input {...field} id="phone" type="tel" inputMode="numeric" placeholder="01xxxxxxxxx" aria-invalid={fieldState.invalid} className="input-fc" />
                {errorText(fieldState.error?.message)}
              </div>
            )} />
            <button type="submit" disabled={profileForm.formState.isSubmitting} className="btn-green">
              {profileForm.formState.isSubmitting ? <ImSpinner2 className="animate-spin" /> : <FaFloppyDisk />} Save Changes
            </button>
          </form>
        </div>
        <div className="border-t border-gray-100 bg-gray-50/70 p-5 sm:px-7">
          <h4 className="mb-3 font-bold text-gray-900">Account Information</h4>
          <dl className="space-y-2.5 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-gray-500">User ID</dt>
              <dd className="truncate font-mono text-xs text-gray-700">{session?.user.id ?? "–"}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-gray-500">Role</dt>
              <dd className="rounded-full bg-green-100 px-3 py-0.5 text-xs font-medium text-green-700">User</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-xl bg-amber-100 text-lg text-amber-600"><FaLock /></span>
          <div>
            <h3 className="font-bold text-gray-900">Change Password</h3>
            <p className="text-sm text-gray-500">Update your account password</p>
          </div>
        </div>
        <NoticeBox notice={passwordNotice} />
        <form onSubmit={passwordForm.handleSubmit(changePassword)} noValidate className="space-y-5">
          <Controller name="currentPassword" control={passwordForm.control} render={({ field, fieldState }) => (
            <div>
              <label htmlFor="currentPassword" className="mb-1.5 block text-sm font-medium text-gray-700">Current Password</label>
              <PasswordInput {...field} id="currentPassword" placeholder="Enter your current password" aria-invalid={fieldState.invalid} autoComplete="current-password" />
              {errorText(fieldState.error?.message)}
            </div>
          )} />
          <Controller name="password" control={passwordForm.control} render={({ field, fieldState }) => (
            <div>
              <label htmlFor="newPassword" className="mb-1.5 block text-sm font-medium text-gray-700">New Password</label>
              <PasswordInput {...field} id="newPassword" placeholder="Enter your new password" aria-invalid={fieldState.invalid} autoComplete="new-password" />
              {fieldState.error ? errorText(fieldState.error.message) : <p className="mt-1.5 text-xs text-gray-400">Must be at least 6 characters</p>}
            </div>
          )} />
          <Controller name="rePassword" control={passwordForm.control} render={({ field, fieldState }) => (
            <div>
              <label htmlFor="rePassword" className="mb-1.5 block text-sm font-medium text-gray-700">Confirm New Password</label>
              <PasswordInput {...field} id="rePassword" placeholder="Confirm your new password" aria-invalid={fieldState.invalid} autoComplete="new-password" />
              {errorText(fieldState.error?.message)}
            </div>
          )} />
          <button
            type="submit"
            disabled={passwordForm.formState.isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-600/25 transition hover:bg-amber-700 disabled:opacity-60"
          >
            {passwordForm.formState.isSubmitting ? <ImSpinner2 className="animate-spin" /> : <FaLock />} Change Password
          </button>
        </form>
      </div>
    </section>
  );
}
