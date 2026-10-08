import PageHero from "@/app/_sharedComponents/PageHero/PageHero";
import { ReactNode } from "react";
import { FaUser } from "react-icons/fa6";
import ProfileSidebar from "./_components/ProfileSidebar";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageHero
        title="My Account"
        subtitle="Manage your addresses and account settings"
        icon={<FaUser />}
        crumbs={[{ label: "Home", href: "/" }, { label: "My Account" }]}
      />
      <div className="container-fc grid grid-cols-1 items-start gap-6 py-8 lg:grid-cols-[260px_1fr]">
        <ProfileSidebar />
        <div className="min-w-0">{children}</div>
      </div>
    </>
  );
}
