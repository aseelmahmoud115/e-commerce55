import PageHero from "@/app/_sharedComponents/PageHero/PageHero";
import type { Metadata } from "next";
import Link from "next/link";
import { FaChevronDown, FaCircleQuestion, FaHeadset } from "react-icons/fa6";

export const metadata: Metadata = { title: "Help Center" };

const faqs = [
  {
    group: "Orders",
    items: [
      { q: "How do I place an order?", a: "Add products to your cart, open the cart and press Secure Checkout. Enter your shipping address, choose Cash on Delivery or Pay Online, then confirm your order." },
      { q: "Where can I see my orders?", a: "Sign in and open My Orders from the account menu. Every order shows its status, payment method, items and delivery address." },
      { q: "Can I order without an account?", a: "You can add products to your cart and wishlist as a guest. You need to sign in to check out, and your guest items are moved to your account automatically." },
    ],
  },
  {
    group: "Payment",
    items: [
      { q: "Which payment methods do you accept?", a: "Cash on Delivery, or online payment with a credit / debit card (Visa, Mastercard) through Stripe's secure checkout." },
      { q: "Is online payment secure?", a: "Yes. Card details are entered on Stripe's encrypted page and are never stored on FreshCart." },
    ],
  },
  {
    group: "Shipping & Returns",
    items: [
      { q: "How long does delivery take?", a: "Standard delivery takes 3-5 business days. Express delivery takes 1-2 business days." },
      { q: "How do I return a product?", a: "You can return most items within 14 days of delivery. Contact our support team with your order number and we'll arrange the pickup." },
    ],
  },
  {
    group: "Account",
    items: [
      { q: "I forgot my password, what should I do?", a: "Press Forgot Password? on the sign in page. We'll email you a 6-digit code, then you can choose a new password." },
      { q: "How do I change my address or phone number?", a: "Open My Account. Manage delivery addresses under My Addresses, and update your name, email or phone under Settings." },
    ],
  },
];

export default function Help() {
  return (
    <>
      <PageHero
        title="Help Center"
        subtitle="Answers to the most common questions"
        icon={<FaCircleQuestion />}
        crumbs={[{ label: "Home", href: "/" }, { label: "Help Center" }]}
      />
      <section className="container-fc py-10">
        <div className="mx-auto max-w-4xl space-y-8">
          {faqs.map((group) => (
            <div key={group.group}>
              <h2 className="mb-3 text-lg font-bold text-gray-900">{group.group}</h2>
              <div className="space-y-3">
                {group.items.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-2xl border border-gray-100 bg-white shadow-sm transition open:border-green-200 open:shadow-md"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-medium text-gray-900 transition hover:text-green-600 [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <FaChevronDown className="shrink-0 text-xs text-gray-400 transition-transform group-open:rotate-180 group-open:text-green-600" />
                    </summary>
                    <p className="px-5 pb-5 leading-relaxed text-gray-600">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}

          <div className="flex flex-col items-center gap-4 rounded-2xl border border-green-100 bg-green-50 p-6 text-center sm:flex-row sm:text-start">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-xl text-green-600 shadow-sm">
              <FaHeadset />
            </span>
            <div className="flex-1">
              <h2 className="font-bold text-gray-900">Still need help?</h2>
              <p className="text-sm text-gray-600">Our support team is available 24/7.</p>
            </div>
            <Link href="/contact" className="btn-green">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
