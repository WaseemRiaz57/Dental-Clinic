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
    <section className="min-h-screen pb-28 py-10 px-4 mesh-accent">
      <div className="max-w-7xl mx-auto">
        <DynamicLink
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#0061a2] hover:underline mb-6"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to Home
        </DynamicLink>

        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#0061a2] mb-3">Contact & Access</p>
          <h1 className="stitch-title text-4xl md:text-5xl font-bold mb-3">Visit {client}</h1>
          <p className="text-[#44474f] max-w-2xl">
            We are here to support your {category.toLowerCase()} journey with personalized care.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="stitch-card p-6 space-y-5 reveal-up reveal-delay-1">
              <h2 className="stitch-title text-2xl font-bold">Location & Access</h2>
              <p className="text-[#44474f] text-sm">Easy access and quick support for your appointment needs.</p>
              <div className="stitch-divider" />

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#0061a2] mt-0.5">location_on</span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#44474f] font-bold">Address</p>
                  <p className="text-[#002452] font-medium">{address}</p>
                </div>
              </div>

              <a href={`tel:${phone}`} className="flex items-start gap-3 hover:opacity-85 transition-opacity">
                <span className="material-symbols-outlined text-[#0061a2] mt-0.5">call</span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#44474f] font-bold">Phone</p>
                  <p className="text-[#002452] font-medium">{phone || "Contact us for details"}</p>
                </div>
              </a>

              <a
                href={`https://wa.me/${phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:opacity-85 transition-opacity"
              >
                <span className="material-symbols-outlined text-[#25D366] mt-0.5">chat</span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#44474f] font-bold">WhatsApp</p>
                  <p className="text-[#002452] font-medium">Chat with us instantly</p>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#0061a2] mt-0.5">schedule</span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#44474f] font-bold">Working Hours</p>
                  <p className="text-[#002452] font-medium">Mon-Fri: 9AM-6PM | Sat: 10AM-4PM</p>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#d1e4ff] text-[#002452] flex items-center justify-center hover:bg-[#0061a2] hover:text-white transition-all"
                  aria-label="Website"
                >
                  <span className="material-symbols-outlined text-[20px]">public</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#d1e4ff] text-[#002452] flex items-center justify-center hover:bg-[#0061a2] hover:text-white transition-all"
                  aria-label="Share"
                >
                  <span className="material-symbols-outlined text-[20px]">share</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#d1e4ff] text-[#002452] flex items-center justify-center hover:bg-[#0061a2] hover:text-white transition-all"
                  aria-label="Gallery"
                >
                  <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="stitch-card p-6 reveal-up reveal-delay-2">
              {hasMap ? (
                <div className="relative w-full min-h-[340px] rounded-[16px] overflow-hidden border border-[#4DB8E8]/20">
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
                <div className="relative w-full min-h-[340px] rounded-[16px] overflow-hidden border border-[#c4c6d0]/40 bg-[#f0f4fb] flex items-center justify-center">
                  <div className="text-center text-[#44474f]">
                    <span className="material-symbols-outlined text-4xl">map</span>
                    <p className="mt-2 text-sm">Map preview unavailable. Add lat and long params.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="stitch-card p-6 reveal-up reveal-delay-3">
              <h2 className="stitch-title text-2xl font-bold mb-4">Common Questions</h2>
              <div className="space-y-3">
                {faqItems.map((item, index) => (
                  <div key={index} className="rounded-[12px] bg-[#f0f4fb] border border-[#c4c6d0]/30">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <span className="font-semibold text-[#002452]">{item.q}</span>
                      <span
                        className={`material-symbols-outlined text-[#44474f] transition-transform ${
                          openFaq === index ? "rotate-180" : ""
                        }`}
                      >
                        expand_more
                      </span>
                    </button>
                    {openFaq === index && (
                      <div className="px-4 pb-4 text-sm text-[#44474f] leading-relaxed">{item.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1B3A6B] text-white rounded-[24px] p-7 editorial-shadow reveal-up reveal-delay-3">
              <h3 className="stitch-title text-white text-2xl font-bold mb-2">Ready to visit {client}?</h3>
              <p className="text-white/80 text-sm mb-5">
                Book your appointment today and connect directly with our team.
              </p>
              <DynamicLink
                href="/booking"
                className="inline-flex items-center gap-2 bg-[#002452] hover:bg-[#2E7EC4] text-white font-bold py-3 px-6 rounded-[10px] transition-all"
              >
                <span className="material-symbols-outlined text-lg">calendar_today</span>
                Book Appointment
              </DynamicLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002452]" />
        </div>
      }
    >
      <ContactContent />
    </Suspense>
  );
}
