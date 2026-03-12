"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import DynamicLink from "../components/DynamicLink";

const faqItems = [
  {
    q: "What should I bring to my first visit?",
    a: "Please bring a valid ID, your insurance card, and any previous records or documents if available.",
  },
  {
    q: "Do you accept walk-in appointments?",
    a: "Yes, we accept walk-ins based on availability. However, we recommend booking in advance to secure your preferred time slot.",
  },
  {
    q: "What are your operating hours?",
    a: "We are open Monday to Friday from 9:00 AM to 6:00 PM, and Saturday from 10:00 AM to 4:00 PM. We are closed on Sundays.",
  },
  {
    q: "Is parking available?",
    a: "Yes, we have convenient on-site parking available for all visitors free of charge.",
  },
];

function ContactContent() {
  const searchParams = useSearchParams();
  const client = searchParams.get("client") || "Modern Clinic";
  const phone = searchParams.get("phone") || "";
  const address =
    searchParams.get("address") || "123 Business Plaza, Suite 400, City Center";
  const lat = searchParams.get("lat") || "";
  const long = searchParams.get("long") || "";
  const category = searchParams.get("category") || "Healthcare";

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const hasMap = lat && long;
  const mapSrc = hasMap
    ? `https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed`
    : "";

  return (
    <div className="min-h-screen pb-24">
      {/* Page Header */}
      <div className="px-4 pt-6 max-w-2xl mx-auto">
        <DynamicLink
          href="/"
          className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors mb-4"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to Home
        </DynamicLink>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Contact Us
        </h1>
      </div>

      <main className="max-w-2xl mx-auto">
        {/* Map Section */}
        <section className="px-4 pt-6">
          <div className="flex flex-col gap-2 mb-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Visit {client}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              We&apos;re here to help with your {category.toLowerCase()} needs.
            </p>
          </div>

          {hasMap ? (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
              <iframe
                title={`${client} Location`}
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          ) : (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <span className="material-symbols-outlined text-4xl">map</span>
                <p className="mt-2 text-sm">
                  Map preview unavailable — provide lat & long parameters
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Contact Info Cards */}
        <section className="px-4 pt-8 grid grid-cols-1 gap-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-12">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Address
              </p>
              <p className="text-base font-medium leading-tight text-slate-900 dark:text-white">
                {address}
              </p>
            </div>
          </div>

          <a
            href={`tel:${phone}`}
            className="flex items-center gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 hover:border-primary transition-colors"
          >
            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-12">
              <span className="material-symbols-outlined">call</span>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Phone
              </p>
              <p className="text-base font-medium leading-tight text-slate-900 dark:text-white">
                {phone || "Contact us for details"}
              </p>
            </div>
          </a>

          <a
            href={`https://wa.me/${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 hover:border-green-500 transition-colors"
          >
            <div className="flex items-center justify-center rounded-lg bg-green-500/10 text-green-500 shrink-0 size-12">
              <span className="material-symbols-outlined">chat</span>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold uppercase tracking-wider text-green-500">
                WhatsApp
              </p>
              <p className="text-base font-medium leading-tight text-slate-900 dark:text-white">
                Chat with us instantly
              </p>
            </div>
          </a>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 size-12">
              <span className="material-symbols-outlined">schedule</span>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Working Hours
              </p>
              <p className="text-base font-medium leading-tight text-slate-900 dark:text-white">
                Mon–Fri: 9AM–6PM | Sat: 10AM–4PM
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 pt-10">
          <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
            Common Questions
          </h3>
          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="group flex flex-col border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-100 dark:bg-slate-800/30"
              >
                <button
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                  className="flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium text-slate-900 dark:text-white">
                    {item.q}
                  </span>
                  <span
                    className={`material-symbols-outlined text-slate-400 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4 text-sm text-slate-500 dark:text-slate-400">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pt-10">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
            <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
              Ready to visit {client}?
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
              Book your appointment today and let our experts take care of you.
            </p>
            <DynamicLink
              href="/booking"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-all"
            >
              <span className="material-symbols-outlined text-lg">
                calendar_today
              </span>
              Book Appointment
            </DynamicLink>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <ContactContent />
    </Suspense>
  );
}
