"use client";
import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  icon: ReactNode;
  title: string;
  description: ReactNode;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({ open, icon, title, description, confirmLabel, cancelLabel, onConfirm, onCancel }: Props) {
  useEffect(() => {
    if (!open) return;
    function esc(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open, onCancel]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <div onClick={onCancel} className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] animate-in fade-in-0" />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        className="relative w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl animate-in fade-in-0 zoom-in-95 sm:p-8"
      >
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-50 text-2xl text-red-500">
          {icon}
        </span>
        <h2 id="confirm-title" className="mt-4 text-xl font-bold text-gray-900">{title}</h2>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
        <div className="mt-7 flex justify-center gap-3">
          <button
            onClick={onCancel}
            autoFocus
            className="rounded-xl bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-red-500/25 transition hover:bg-red-600"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
