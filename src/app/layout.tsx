import type { Metadata } from "next";
import "@fontsource/exo/300.css";
import "@fontsource/exo/400.css";
import "@fontsource/exo/500.css";
import "@fontsource/exo/600.css";
import "@fontsource/exo/700.css";
import "@fontsource/exo/800.css";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOption } from "@/next-auth/authOption";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toast";
import { TopNotice } from "@/components/ui/top-notice";
import Providers from "./_layoutComponents/Providers/Providers";
import TopBar from "./_layoutComponents/TopBar/TopBar";
import Navbar from "./_layoutComponents/Navbar/Navbar";
import Footer from "./_layoutComponents/Footer/Footer";
import { getFeaturedCategories } from "@/services/category.service";

export const metadata: Metadata = {
  title: {
    default: "FreshCart",
    template: "%s | FreshCart",
  },
  description:
    "FreshCart is your one-stop destination for quality products. Shop fashion, electronics, beauty and more at the best prices.",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [session, navCategories] = await Promise.all([
    getServerSession(authOption),
    getFeaturedCategories(),
  ]);
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body suppressHydrationWarning className="flex min-h-dvh flex-col">
        <Providers mySession={session}>
          <TopBar />
          <Navbar categories={navCategories} />
          <main className="flex-1 bg-gray-50/60">{children}</main>
          <Footer categories={navCategories} />
          <Toaster />
          <TopNotice />
        </Providers>
      </body>
    </html>
  );
}
