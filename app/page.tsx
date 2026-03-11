"use client";

import { Suspense, type SyntheticEvent } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Award,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  BadgeCheck,
  HeartHandshake,
  Star,
  Users,
} from "lucide-react";

const ctaText = "Hello, I want to book an appointment.";

const services = [
  {
    title: "General Checkup",
    description: "Comprehensive oral exams to keep your smile healthy.",
    icon: Stethoscope,
  },
  {
    title: "Teeth Whitening",
    description: "Brighten your smile safely with modern whitening care.",
    icon: Sparkles,
  },
  {
    title: "Dental Implants",
    description: "Restore function and confidence with lasting implants.",
    icon: ShieldCheck,
  },
  {
    title: "Braces & Alignment",
    description: "Achieve straighter teeth with tailored orthodontic plans.",
    icon: Smile,
  },
];

const trustItems = [
  {
    title: "Experienced Team",
    description: "Skilled professionals focused on precision and comfort.",
    icon: BadgeCheck,
  },
  {
    title: "Painless Procedures",
    description: "Gentle techniques and technology designed for ease.",
    icon: HeartHandshake,
  },
  {
    title: "Affordable Care",
    description: "Transparent pricing with quality-first treatment options.",
    icon: CalendarCheck,
  },
];

const stats = [
  { label: "Happy Patients", value: "10,000+", icon: Users },
  { label: "Years of Experience", value: "12+", icon: Award },
  { label: "Success Rate", value: "98%", icon: CheckCircle2 },
  { label: "Emergency Support", value: "24/7", icon: Clock3 },
];

const processSteps = [
  {
    title: "Consultation",
    description: "We assess your dental goals and create a personalized treatment plan.",
  },
  {
    title: "Digital Diagnosis",
    description: "Advanced imaging helps us deliver precise and comfortable treatment.",
  },
  {
    title: "Gentle Treatment",
    description: "Our experienced team provides safe, modern, and minimally invasive care.",
  },
  {
    title: "Smile Follow-Up",
    description: "We ensure your recovery and long-term dental health stay on track.",
  },
];

const testimonials = [
  {
    name: "Ayesha R.",
    feedback: "The team made me feel comfortable from day one. My smile has never looked better.",
  },
  {
    name: "Hamza K.",
    feedback: "Professional staff, clean environment, and a completely painless experience.",
  },
  {
    name: "Sara M.",
    feedback: "They explained everything clearly and gave me outstanding results.",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
];

const faqItems = [
  {
    question: "Do you offer same-day appointments?",
    answer: "Yes, subject to availability. Contact us anytime to check open slots.",
  },
  {
    question: "Are treatments suitable for sensitive teeth?",
    answer: "Absolutely. We tailor procedures with comfort-first methods for sensitive patients.",
  },
  {
    question: "Can I discuss pricing before treatment?",
    answer: "Yes, we share a transparent estimate and walk you through all options in advance.",
  },
];

const fallbackImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'%3E%3Crect width='100%25' height='100%25' fill='%23e0f2fe'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%230f766e' font-family='Arial' font-size='34'%3EDental Care%3C/text%3E%3C/svg%3E";

function handleImageError(event: SyntheticEvent<HTMLImageElement, Event>) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = fallbackImage;
}

function DentalLandingPage() {
  const searchParams = useSearchParams();
  const clientName = searchParams.get("client") || "Your Dental Clinic";
  const phoneValue = searchParams.get("phone") || "0000-0000000";
  const cleanedPhone = phoneValue.replace(/[^\d]/g, "");
  const whatsappLink = `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(ctaText)}`;
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-sky-50 text-slate-900">
      <nav className="sticky top-0 z-20 border-b border-cyan-100/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold tracking-tight text-cyan-900 sm:text-base">{clientName}</p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-700"
          >
            Call Now
          </a>
        </div>
      </nav>

      <main>
        <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pt-24">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <p className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700">
                Premium Dental Care
              </p>
              <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Welcome to {clientName}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                Experience premium dental care with state-of-the-art technology and a gentle touch.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-teal-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-700"
                >
                  Book Your Appointment
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-cyan-200 bg-white px-7 py-3 text-sm font-semibold text-cyan-800 transition hover:-translate-y-0.5"
                >
                  Talk to Our Team
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?auto=format&fit=crop&w=1400&q=80"
                alt="Dental professional with patient"
                onError={handleImageError}
                className="h-[300px] w-full rounded-3xl object-cover shadow-lg sm:h-[380px]"
              />
              <div className="absolute -bottom-5 left-5 rounded-2xl border border-cyan-100 bg-white/95 px-4 py-3 shadow-md backdrop-blur">
                <p className="text-xs font-medium text-slate-500">Trusted by families every day</p>
                <p className="text-lg font-semibold text-cyan-900">Comfort-First Dentistry</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-2xl border border-cyan-100 bg-white p-4 text-center shadow-sm">
                  <Icon size={20} className="mx-auto text-teal-700" />
                  <p className="mt-2 text-xl font-bold text-slate-900">{item.value}</p>
                  <p className="text-xs text-slate-500 sm:text-sm">{item.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-cyan-900 sm:text-3xl">Our Services</h2>
          <motion.div
            className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 lg:gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                  }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl border border-cyan-100 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.description}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-cyan-900 sm:text-3xl">Why Choose Us</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-cyan-100 bg-white p-6 shadow-sm">
                  <Icon size={22} className="text-teal-700" />
                  <h3 className="mt-3 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1400&q=80"
              alt="Modern dental clinic interior"
              onError={handleImageError}
              className="h-[300px] w-full rounded-3xl object-cover shadow-md sm:h-[360px]"
            />
            <div>
              <h2 className="text-2xl font-semibold text-cyan-900 sm:text-3xl">A Modern Clinic Built Around Comfort</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                From routine care to advanced procedures, we focus on safety, hygiene, and personalized treatment plans designed around your needs.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-slate-700 sm:text-base">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-teal-700" /> Digital diagnostics and precision tools
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-teal-700" /> Friendly professionals with patient-first care
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-teal-700" /> Transparent plans and clear communication
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-cyan-900 sm:text-3xl">How It Works</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {processSteps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold text-cyan-700">Step {index + 1}</p>
                <h3 className="mt-2 text-base font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-cyan-900 sm:text-3xl">Smile Gallery</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {galleryImages.map((image, index) => (
              <motion.img
                key={image}
                src={image}
                alt={`Dental care gallery image ${index + 1}`}
                onError={handleImageError}
                whileHover={{ y: -6 }}
                className="h-64 w-full rounded-2xl object-cover shadow-sm"
              />
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-cyan-900 sm:text-3xl">What Patients Say</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-2xl border border-cyan-100 bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-1 text-amber-500">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="text-sm leading-relaxed text-slate-600">“{item.feedback}”</p>
                <p className="mt-4 text-sm font-semibold text-slate-900">{item.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-cyan-900 sm:text-3xl">Frequently Asked Questions</h2>
          <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4">
            {faqItems.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900">{faq.question}</h3>
                <p className="mt-2 text-sm text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pb-20 lg:px-8">
          <div className="rounded-3xl border border-teal-200 bg-teal-600 px-5 py-10 text-center text-white sm:px-8 sm:py-12">
            <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
              Ready to transform your smile? Reach out to {clientName} today.
            </h2>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-teal-700 transition hover:-translate-y-0.5 hover:bg-cyan-50"
            >
              Book Appointment
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-cyan-100 bg-white/80 px-4 py-6 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
        © {currentYear} {clientName}. All rights reserved.
      </footer>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <DentalLandingPage />
    </Suspense>
  );
}
