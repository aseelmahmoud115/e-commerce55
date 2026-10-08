import PageHero from "@/app/_sharedComponents/PageHero/PageHero";
import { contactInfo } from "@/lib/navLinks";
import type { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import {
  FaCircleQuestion,
  FaClock,
  FaEnvelope,
  FaFacebookF,
  FaHeadset,
  FaInstagram,
  FaLinkedinIn,
  FaLocationDot,
  FaPhone,
  FaXTwitter,
} from "react-icons/fa6";
import ContactForm from "./ContactForm";

export const metadata: Metadata = { title: "Contact Us" };

function InfoCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">{icon}</span>
      <div>
        <h2 className="font-semibold text-gray-900">{title}</h2>
        <div className="mt-1 text-sm text-gray-500">{children}</div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you. Get in touch with our team."
        icon={<FaHeadset />}
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />
      <section className="container-fc grid grid-cols-1 items-start gap-6 py-10 lg:grid-cols-[360px_1fr]">
        <div className="space-y-4">
          <InfoCard icon={<FaPhone />} title="Phone">
            <p>Mon-Fri from 8am to 6pm</p>
            <a href={contactInfo.phoneHref} className="mt-1 inline-block text-base font-medium text-green-600 transition hover:text-green-700 hover:underline">
              {contactInfo.phone}
            </a>
          </InfoCard>
          <InfoCard icon={<FaEnvelope />} title="Email">
            <p>We&apos;ll respond within 24 hours</p>
            <a href={contactInfo.emailHref} className="mt-1 inline-block text-base font-medium text-green-600 transition hover:text-green-700 hover:underline">
              {contactInfo.email}
            </a>
          </InfoCard>
          <InfoCard icon={<FaLocationDot />} title="Office">
            <p>123 Commerce Street</p>
            <p>New York, NY 10001</p>
            <p>United States</p>
          </InfoCard>
          <InfoCard icon={<FaClock />} title="Business Hours">
            <p>Monday - Friday: 8am - 6pm</p>
            <p>Saturday: 9am - 4pm</p>
            <p>Sunday: Closed</p>
          </InfoCard>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-gray-900">Follow Us</h2>
            <div className="mt-3 flex gap-2.5">
              {[
                { icon: FaFacebookF, label: "Facebook", href: "https://facebook.com" },
                { icon: FaXTwitter, label: "Twitter", href: "https://x.com" },
                { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
                { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com" },
              ].map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="flex size-10 items-center justify-center rounded-full bg-gray-100 text-sm text-gray-600 transition hover:bg-green-600 hover:text-white">
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <ContactForm />
          <div className="flex items-start gap-4 rounded-2xl border border-green-100 bg-green-50 p-5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-green-600 shadow-sm"><FaCircleQuestion /></span>
            <div>
              <h2 className="font-semibold text-gray-900">Looking for quick answers?</h2>
              <p className="text-sm text-gray-600">Check out our Help Center for frequently asked questions about orders, shipping, returns, and more.</p>
              <Link href="/help-center" prefetch={false} className="mt-2 inline-block text-sm font-medium text-green-600 transition hover:text-green-700 hover:underline">
                Visit Help Center →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
