"use client";
import { ContactForm as ContactValues, ContactSchema } from "@/schema/contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FaHeadset, FaPaperPlane } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";

const subjects = [
  "General Inquiry",
  "Order Support",
  "Shipping Question",
  "Returns & Refunds",
  "Product Information",
  "Feedback & Suggestions",
  "Other",
];

export default function ContactForm() {
  const { control, handleSubmit, reset, formState } = useForm<ContactValues>({
    defaultValues: { name: "", email: "", subject: "", message: "" },
    resolver: zodResolver(ContactSchema),
    mode: "onTouched",
  });

  async function send() {
    await new Promise((r) => setTimeout(r, 900));
    reset();
  }

  const err = (m?: string) => m && <p className="mt-1.5 text-xs text-red-500">* {m}</p>;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-green-50 text-green-600"><FaHeadset /></span>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Send us a Message</h2>
          <p className="text-sm text-gray-500">Fill out the form and we&apos;ll get back to you</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(send)} noValidate className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Controller name="name" control={control} render={({ field, fieldState }) => (
            <div>
              <label htmlFor="c-name" className="mb-1.5 block text-sm text-gray-700">Full Name</label>
              <input {...field} id="c-name" placeholder="John Doe" aria-invalid={fieldState.invalid} className="input-fc" />
              {err(fieldState.error?.message)}
            </div>
          )} />
          <Controller name="email" control={control} render={({ field, fieldState }) => (
            <div>
              <label htmlFor="c-email" className="mb-1.5 block text-sm text-gray-700">Email Address</label>
              <input {...field} id="c-email" type="email" placeholder="john@example.com" aria-invalid={fieldState.invalid} className="input-fc" />
              {err(fieldState.error?.message)}
            </div>
          )} />
        </div>
        <Controller name="subject" control={control} render={({ field, fieldState }) => (
          <div>
            <label htmlFor="c-subject" className="mb-1.5 block text-sm text-gray-700">Subject</label>
            <select {...field} id="c-subject" aria-invalid={fieldState.invalid} className={`input-fc ${field.value ? "" : "text-gray-500"}`}>
              <option value="">Select a subject</option>
              {subjects.map((s) => (
                <option key={s} value={s} className="text-gray-900">{s}</option>
              ))}
            </select>
            {err(fieldState.error?.message)}
          </div>
        )} />
        <Controller name="message" control={control} render={({ field, fieldState }) => (
          <div>
            <label htmlFor="c-message" className="mb-1.5 block text-sm text-gray-700">Message</label>
            <textarea {...field} id="c-message" rows={5} placeholder="How can we help you?" aria-invalid={fieldState.invalid} className="input-fc resize-none" />
            {err(fieldState.error?.message)}
          </div>
        )} />
        <button type="submit" disabled={formState.isSubmitting} className="btn-green h-12 w-full text-base">
          {formState.isSubmitting ? <ImSpinner2 className="animate-spin" /> : <FaPaperPlane />} {formState.isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
