"use client";
import { useEffect, useSyncExternalStore } from "react";
import { FaCircleCheck, FaCircleExclamation, FaXmark } from "react-icons/fa6";

type Notice = { id: number; message: string; type: "success" | "error" };

const DURATION = 4000;
let notices: Notice[] = [];
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function dismiss(id: number) {
  notices = notices.filter((n) => n.id !== id);
  emit();
}

export function notify(message: string, type: Notice["type"] = "success") {
  notices = [...notices, { id: Date.now() + Math.random(), message, type }];
  emit();
}

function NoticeItem({ notice }: { notice: Notice }) {
  useEffect(() => {
    const t = setTimeout(() => dismiss(notice.id), DURATION);
    return () => clearTimeout(t);
  }, [notice.id]);

  const success = notice.type === "success";

  return (
    <div role="status" className="pointer-events-auto relative overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 animate-in fade-in-0 slide-in-from-right-8">
      <div className="flex items-center gap-3 py-4 pe-10 ps-4">
        {success ? (
          <FaCircleCheck className="shrink-0 text-xl text-green-500" />
        ) : (
          <FaCircleExclamation className="shrink-0 text-xl text-red-500" />
        )}
        <p className="text-[15px] text-gray-600">{notice.message}</p>
      </div>
      <button
        onClick={() => dismiss(notice.id)}
        aria-label="Close notification"
        className="absolute inset-e-2 top-2 text-sm text-gray-400 transition hover:text-gray-600"
      >
        <FaXmark />
      </button>
      <div className={`absolute inset-x-0 bottom-0 h-1 ${success ? "bg-green-100" : "bg-red-100"}`}>
        <div
          className={`h-full origin-left ${success ? "bg-green-500" : "bg-red-400"}`}
          style={{ animation: `top-notice-progress ${DURATION}ms linear forwards` }}
        />
      </div>
    </div>
  );
}

export function TopNotice() {
  const list = useSyncExternalStore(subscribe, () => notices, () => notices);
  return (
    <div className="pointer-events-none fixed inset-x-4 top-4 z-100 flex flex-col gap-3 sm:inset-x-auto sm:inset-e-4 sm:w-80">
      <style>{`@keyframes top-notice-progress { from { transform: scaleX(1); } to { transform: scaleX(0); } }`}</style>
      {list.map((n) => (
        <NoticeItem key={n.id} notice={n} />
      ))}
    </div>
  );
}
