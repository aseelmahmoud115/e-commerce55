import Link from "next/link";
import { ReactNode } from "react";

export default function EmptyState({
  icon,
  title,
  text,
  action,
  className = "",
}: {
  icon: ReactNode;
  title: string;
  text: string;
  action?: { href: string; label: string; icon?: ReactNode };
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center px-4 py-16 text-center ${className}`}>
      <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-gray-100 text-2xl text-gray-400">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-gray-500">{text}</p>
      {action && (
        <Link href={action.href} className="btn-green mt-6">
          {action.icon} {action.label}
        </Link>
      )}
    </div>
  );
}
