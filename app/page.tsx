"use client";

import { Suspense, type SyntheticEvent } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Award,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  MapPin,
  Phone,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  Stethoscope,
  Syringe,
  Users,
  Zap,
} from "lucide-react";

/* ───────────────── static data ───────────────── */

const ctaText = "I am interested in your services";

const services = [
  {
    title: "General Dentistry",
    description:
      "Routine checkups, cleanings, and preventive care to maintain a healthy smile.",
    icon: Stethoscope,
  },
  {
    title: "Oral Surgery",
    description:
      "Expert extractions, corrective jaw procedures, and surgical treatments.",
    icon: Syringe,
  },
  {
    title: "Teeth Whitening",
    description:
      "Brighten your smile with safe, fast, and professionally supervised whitening.",
    icon: Sparkles,
  },
  {
    title: "Emergency Care",
    description:
      "Immediate treatment for dental trauma, pain, and urgent conditions.",
    icon: Zap,
  },
];

const stats = [
  { label: "Happy Patients", value: "10,000+", icon: Users },
  { label: "Years of Experience", value: "12+", icon: Award },
  { label: "Success Rate", value: "98%", icon: CheckCircle2 },
  { label: "Emergency Support", value: "24/7", icon: Clock3 },
];

const trustItems = [
  {
    title: "Experienced Team",
    description:
      "Board-certified professionals dedicated to precision and comfort.",
    icon: ShieldCheck,
  },
  {
    title: "Painless Procedures",
    description:
      "Gentle techniques and modern sedation designed for patient ease.",
    icon: HeartHandshake,
  },
  {
    title: "Affordable Care",
    description:
      "Transparent pricing with flexible plans and no hidden costs.",
    icon: CalendarCheck,
  },
];

const processSteps = [
  {
    step: "01",
    title: "Book Online",
    description:
      "Reach out via WhatsApp or phone to schedule your first visit.",
  },
  {
    step: "02",
    title: "Consultation",
    description:
      "We assess your dental goals and craft a personalised plan.",
  },
  {
    step: "03",
    title: "Treatment",
    description:
      "Safe, modern, and minimally invasive procedures in a calm setting.",
  },
  {
    step: "04",
    title: "Follow-Up",
    description:
      "We ensure your recovery and long-term oral health stay on track.",
  },
];

const testimonials = [
  {
    name: "Ayesha R.",
    feedback:
      "The team made me feel comfortable from day one. My smile has never looked better!",
  },
  {
    name: "Hamza K.",
    feedback:
      "Professional staff, spotless environment, and a completely painless experience.",
  },
  {
    name: "Sara M.",
    feedback:
      "They explained every step clearly and delivered outstanding results.",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
];

const faqItems = [
  {
    q: "Do you offer same-day appointments?",
    a: "Yes — subject to availability. Contact us anytime to check open slots.",
  },
  {
    q: "Are treatments suitable for sensitive teeth?",
    a: "Absolutely. Every procedure is tailored with comfort-first methods for sensitive patients.",
  },
  {
    q: "Can I discuss pricing before treatment?",
    a: "Of course. We share a transparent estimate and walk you through every option in advance.",
  },
  {
    q: "What safety measures do you follow?",
    a: "We adhere to the highest sterilisation and infection-control standards at every step.",
  },
];

/* ───────────────── helpers ───────────────── */

const fallbackImg =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'%3E%3Crect width='100%25' height='100%25' fill='%23eff6ff'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%232563eb' font-family='system-ui' font-size='28'%3EDental Care%3C/text%3E%3C/svg%3E";

function onImgError(e: SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = fallbackImg;
}

/* ───────────────── animation presets ───────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

/* ───────────────── floating shape ───────────────── */

function FloatingShape({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full opacity-20 blur-3xl ${className}`}
      animate={{ y: [0, -18, 0], scale: [1, 1.05, 1] }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

/* ───────────────── main landing page ───────────────── */

function LandingPage() {
  const params = useSearchParams();

  const clientName = params.get("client") || "Your Dental Clinic";
  const phoneRaw = params.get("phone") || "0000-0000000";
  const address = params.get("address") || "";
  const lat = params.get("lat") || "";
  const lng = params.get("long") || "";

  const phone = phoneRaw.replace(/[^\d]/g, "");
  const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(ctaText)}`;
  const hasLocation = lat !== "" && lng !== "";
  const mapSrc = hasLocation
    ? `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`
    : "";
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#fdfdff] text-[#1e293b]">
      {/* ── Navbar ────────────────────────────────────── */}
      <nav className="sticky top-0 z-30 border-b border-blue-100/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <span className="text-base font-semibold tracking-tight text-[#1e293b] sm:text-lg">
            {clientName}
          </span>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#2563eb] px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
          >
            <Phone size={14} /> Call Now
          </a>
        </div>
      </nav>

      <main>
        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#eff6ff] to-white">
          <FloatingShape
            className="left-[-6%] top-10 h-72 w-72 bg-blue-300"
            delay={0}
          />
          <FloatingShape
            className="right-[-4%] top-28 h-56 w-56 bg-indigo-300"
            delay={1.5}
          />
          <FloatingShape
            className="bottom-6 left-[30%] h-48 w-48 bg-sky-300"
            delay={3}
          />

          <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-20 pt-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pt-28">
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2563eb]">
                Premium Dental Care
              </span>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.15] tracking-tight text-[#1e293b] sm:text-5xl lg:text-6xl">
                Welcome to{" "}
                <span className="text-[#2563eb]">{clientName}</span>
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
                Experience world-class dental care with state-of-the-art
                technology, a gentle touch, and a team that truly cares.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#2563eb] px-7 py-3.5 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  Book Your Appointment
                </a>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-7 py-3.5 text-sm font-semibold text-[#2563eb] transition hover:-translate-y-0.5 hover:bg-blue-50"
                >
                  Talk to Our Team
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?auto=format&fit=crop&w=1400&q=80"
                alt="Dental professional with patient"
                onError={onImgError}
                className="h-[320px] w-full rounded-3xl object-cover shadow-xl sm:h-[400px]"
              />
              <div className="absolute -bottom-5 left-4 rounded-2xl border border-blue-100 bg-white/95 px-5 py-3 shadow-lg backdrop-blur sm:left-6">
                <p className="text-xs font-medium text-slate-500">
                  Trusted by families every day
                </p>
                <p className="text-base font-bold text-[#1e293b]">
                  Comfort-First Dentistry
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  className="rounded-2xl border border-blue-100 bg-white p-5 text-center shadow-sm"
                >
                  <Icon size={20} className="mx-auto text-[#2563eb]" />
                  <p className="mt-2 text-2xl font-bold text-[#1e293b]">
                    {s.value}
                  </p>
                  <p className="text-xs text-slate-500 sm:text-sm">
                    {s.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* ── Services ─────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center text-2xl font-bold text-[#1e293b] sm:text-3xl"
          >
            Our Services
          </motion.h2>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <motion.article
                  key={s.title}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eff6ff] text-[#2563eb]">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#1e293b]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {s.description}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
        </section>

        {/* ── About / Clinic ───────────────────────────── */}
        <section className="bg-[#eff6ff]/50">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
            <motion.img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1400&q=80"
              alt="Modern dental clinic interior"
              onError={onImgError}
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="h-[300px] w-full rounded-3xl object-cover shadow-md sm:h-[380px]"
            />

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-[#1e293b] sm:text-3xl">
                A Modern Clinic Built Around Comfort
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                From routine care to advanced procedures, we focus on safety,
                hygiene, and personalised treatment plans designed around your
                needs.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-slate-700 sm:text-base">
                {[
                  "Digital diagnostics & precision tools",
                  "Friendly professionals with patient-first care",
                  "Transparent plans & clear communication",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-[#2563eb]"
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ── Why Choose Us ────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center text-2xl font-bold text-[#1e293b] sm:text-3xl"
          >
            Why Choose Us
          </motion.h2>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {trustItems.map((t) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={t.title}
                  variants={fadeUp}
                  className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
                >
                  <Icon size={22} className="text-[#2563eb]" />
                  <h3 className="mt-3 text-lg font-semibold text-[#1e293b]">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {t.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* ── How It Works ─────────────────────────────── */}
        <section className="bg-[#eff6ff]/50">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-center text-2xl font-bold text-[#1e293b] sm:text-3xl"
            >
              How It Works
            </motion.h2>

            <motion.div
              className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
            >
              {processSteps.map((s) => (
                <motion.div
                  key={s.step}
                  variants={fadeUp}
                  className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm"
                >
                  <span className="text-2xl font-extrabold text-[#2563eb]/20">
                    {s.step}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-[#1e293b]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {s.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Gallery ──────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center text-2xl font-bold text-[#1e293b] sm:text-3xl"
          >
            Smile Gallery
          </motion.h2>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {galleryImages.map((img, i) => (
              <motion.img
                key={img}
                src={img}
                alt={`Dental care gallery ${i + 1}`}
                onError={onImgError}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="h-60 w-full rounded-2xl object-cover shadow-sm sm:h-64"
              />
            ))}
          </motion.div>
        </section>

        {/* ── Testimonials ─────────────────────────────── */}
        <section className="bg-[#eff6ff]/50">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-center text-2xl font-bold text-[#1e293b] sm:text-3xl"
            >
              What Patients Say
            </motion.h2>

            <motion.div
              className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
            >
              {testimonials.map((t) => (
                <motion.div
                  key={t.name}
                  variants={fadeUp}
                  className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
                >
                  <div className="mb-3 flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">
                    &ldquo;{t.feedback}&rdquo;
                  </p>
                  <p className="mt-4 text-sm font-semibold text-[#1e293b]">
                    {t.name}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center text-2xl font-bold text-[#1e293b] sm:text-3xl"
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.div
            className="mt-10 space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {faqItems.map((f) => (
              <motion.div
                key={f.q}
                variants={fadeUp}
                className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm"
              >
                <h3 className="text-base font-semibold text-[#1e293b]">
                  {f.q}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{f.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Location / Map ───────────────────────────── */}
        <section className="bg-[#eff6ff]/50">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-[#1e293b] sm:text-3xl">
                Visit Our Clinic
              </h2>
              <div className="mt-3 inline-flex items-center gap-1.5 text-slate-600">
                <MapPin size={16} className="text-[#2563eb]" />
                <span className="text-sm sm:text-base">
                  {address || "Contact us for location details"}
                </span>
              </div>
            </motion.div>

            {hasLocation && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mt-8 overflow-hidden rounded-2xl border border-blue-100 shadow-md"
              >
                <iframe
                  title="Clinic Location"
                  src={mapSrc}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </motion.div>
            )}
          </div>
        </section>

        {/* ── CTA Banner ───────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-3xl bg-[#2563eb] px-6 py-12 text-center text-white shadow-lg sm:px-10 sm:py-14"
          >
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
              Ready to transform your smile?
              <br className="hidden sm:block" /> Reach out to{" "}
              <span className="underline decoration-white/40 underline-offset-4">
                {clientName}
              </span>{" "}
              today.
            </h2>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#2563eb] shadow transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Book Appointment
            </a>
          </motion.div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="border-t border-blue-100 bg-white px-4 py-6 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
        &copy; {year} {clientName}. All rights reserved.
      </footer>

      {/* ── Floating WhatsApp Button ───────────────────── */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-110"
      >
        <Smile size={26} />
      </a>
    </div>
  );
}

/* ───────────────── page export with Suspense ───────────────── */

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-[#2563eb]" />
        </div>
      }
    >
      <LandingPage />
    </Suspense>
  );
}
