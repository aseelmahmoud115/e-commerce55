"use client";
import { IAddress } from "@/interface/address.interface";
import { AddressForm, AddressSchema } from "@/schema/address.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaXmark } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";

export default function AddressModal({
  open,
  address,
  onClose,
  onSubmit,
}: {
  open: boolean;
  address: IAddress | null;
  onClose: () => void;
  onSubmit: (values: AddressForm) => Promise<boolean>;
}) {
  const { control, handleSubmit, reset, formState } = useForm<AddressForm>({
    defaultValues: { name: "", details: "", phone: "", city: "" },
    resolver: zodResolver(AddressSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (open) {
      reset(
        address
          ? { name: address.name, details: address.details, phone: address.phone, city: address.city }
          : { name: "", details: "", phone: "", city: "" },
      );
    }
  }, [open, address, reset]);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  async function submit(values: AddressForm) {
    const ok = await onSubmit(values);
    if (ok) onClose();
  }

  const field = (
    name: keyof AddressForm,
    label: string,
    placeholder: string,
    textarea = false,
  ) => (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <label htmlFor={`addr-${name}`} className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
          {textarea ? (
            <textarea {...field} id={`addr-${name}`} rows={3} placeholder={placeholder} aria-invalid={fieldState.invalid} className="input-fc resize-none" />
          ) : (
            <input {...field} id={`addr-${name}`} placeholder={placeholder} aria-invalid={fieldState.invalid} className="input-fc" />
          )}
          {fieldState.error && <p className="mt-1 text-xs text-red-500">* {fieldState.error.message}</p>}
        </div>
      )}
    />
  );

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm animate-in fade-in-0" />
      <div role="dialog" aria-modal="true" aria-labelledby="address-modal-title" className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl animate-in fade-in-0 zoom-in-95">
        <div className="mb-5 flex items-center justify-between">
          <h2 id="address-modal-title" className="text-xl font-bold text-gray-900">
            {address ? "Edit Address" : "Add New Address"}
          </h2>
          <button onClick={onClose} aria-label="Close" className="flex size-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition hover:bg-gray-200">
            <FaXmark />
          </button>
        </div>
        <form onSubmit={handleSubmit(submit)} noValidate className="space-y-4">
          {field("name", "Address Name", "e.g. Home, Office")}
          {field("details", "Full Address", "Street, building, apartment...", true)}
          <div className="grid grid-cols-2 gap-3">
            {field("phone", "Phone Number", "01xxxxxxxxx")}
            {field("city", "City", "Cairo")}
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button type="button" onClick={onClose} className="h-12 rounded-xl bg-gray-100 font-semibold text-gray-700 transition hover:bg-gray-200">
              Cancel
            </button>
            <button type="submit" disabled={formState.isSubmitting} className="btn-green h-12">
              {formState.isSubmitting && <ImSpinner2 className="animate-spin" />}
              {address ? "Update" : "Add Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
