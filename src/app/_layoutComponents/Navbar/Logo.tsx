import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="FreshCart home" className={`shrink-0 ${className}`}>
      <Image src={logo} alt="FreshCart" priority className="h-7 w-auto sm:h-8" />
    </Link>
  );
}
