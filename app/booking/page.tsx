"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";

function BookingContent() {
  const searchParams = useSearchParams();
  const client = searchParams.get("client") || "Modern Clinic";
  const phone = searchParams.get("phone") || "";
  const category = searchParams.get("category") || "Healthcare";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
  });

  const serviceOptions: Record<string, { value: string; label: string }[]> = {
    dental: [
      { value: "orthodontics", label: "Orthodontics" },
      { value: "general-dentistry", label: "General Dentistry" },
      { value: "cosmetic-dentistry", label: "Cosmetic Dentistry" },
      { value: "root-canal", label: "Root Canal Therapy" },
      { value: "teeth-cleaning", label: "Teeth Cleaning" },
      { value: "pediatric-dentistry", label: "Pediatric Dentistry" },
    ],
    healthcare: [
      { value: "checkup", label: "General Checkup" },
      { value: "vaccination", label: "Vaccinations" },
      { value: "cardiology", label: "Cardiology" },
      { value: "mental-health", label: "Mental Health" },
      { value: "lab-testing", label: "Lab Testing" },
    ],
    fitness: [
      { value: "personal-training", label: "Personal Training" },
      { value: "yoga", label: "Yoga Classes" },
      { value: "nutrition", label: "Nutrition Plans" },
      { value: "hiit", label: "HIIT Workouts" },
      { value: "group-classes", label: "Group Classes" },
    ],
    spa: [
      { value: "massage", label: "Massage Therapy" },
      { value: "facial", label: "Facial Treatments" },
      { value: "hydrotherapy", label: "Hydrotherapy" },
      { value: "meditation", label: "Meditation" },
      { value: "aromatherapy", label: "Aromatherapy" },
    ],
    salon: [
      { value: "haircut", label: "Haircuts & Styling" },
      { value: "hair-coloring", label: "Hair Coloring" },
      { value: "skincare", label: "Skincare" },
      { value: "nail-art", label: "Nail Art & Manicure" },
      { value: "makeup", label: "Makeup Services" },
    ],
  };

  const options =
    serviceOptions[category.toLowerCase()] || serviceOptions.healthcare;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const selectedService =
      options.find((o) => o.value === form.service)?.label || form.service;

    const message = `Hello ${client}! I'd like to book an appointment.

*Name:* ${form.name}
*Phone:* ${form.phone}
*Email:* ${form.email}
*Service:* ${selectedService}
*Date:* ${form.date}
*Time:* ${form.time}

Please confirm my booking. Thank you!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
  };

  return (
    <section className="min-h-screen px-4 py-12 pb-28 mesh-accent">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-stretch">
        <aside className="bg-[#1B3A6B] text-white rounded-[24px] p-8 md:p-10 editorial-shadow relative overflow-hidden reveal-up reveal-delay-1">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(77,184,232,0.25),transparent_45%)]" />
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.2em] text-white/70 mb-4">Appointment Desk</p>
            <h1 className="stitch-title text-white text-4xl font-bold mb-5">Book Your Visit</h1>
            <p className="text-white/80 leading-relaxed mb-8">
              Confirm your preferred service and schedule. Your WhatsApp request will be sent instantly to {client}.
            </p>
            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#4DB8E8]">verified</span>
                Certified and experienced specialists
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#4DB8E8]">schedule</span>
                Flexible timings based on availability
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#4DB8E8]">chat</span>
                Direct WhatsApp confirmation workflow
              </div>
            </div>
            <div className="stitch-divider my-8 bg-white/20" />
            <div className="space-y-4 text-sm text-white/80">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#4DB8E8]">call</span>
                {phone || "Phone number available via query parameter"}
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#4DB8E8]">schedule</span>
                Mon - Sat: 9:00 AM - 6:00 PM
              </div>
            </div>
          </div>
        </aside>

        <div className="stitch-card p-6 md:p-10 reveal-up reveal-delay-2">
          <h2 className="stitch-title text-3xl font-bold mb-2">Schedule your appointment</h2>
          <p className="text-[#44474f] mb-7">Fill in your details below.</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="block text-xs font-bold uppercase tracking-widest text-[#44474f] mb-2">Full Name</span>
              <input
                className="w-full rounded-[10px] border-0 bg-[#f0f4fb] px-4 py-3 focus:ring-2 focus:ring-[#2E7EC4]/30"
                placeholder="Jane Doe"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <label className="block">
                <span className="block text-xs font-bold uppercase tracking-widest text-[#44474f] mb-2">Phone Number</span>
                <input
                  className="w-full rounded-[10px] border-0 bg-[#f0f4fb] px-4 py-3 focus:ring-2 focus:ring-[#2E7EC4]/30"
                  placeholder="+1 (555) 000-0000"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="block">
                <span className="block text-xs font-bold uppercase tracking-widest text-[#44474f] mb-2">Email Address</span>
                <input
                  className="w-full rounded-[10px] border-0 bg-[#f0f4fb] px-4 py-3 focus:ring-2 focus:ring-[#2E7EC4]/30"
                  placeholder="jane@example.com"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <label className="block">
              <span className="block text-xs font-bold uppercase tracking-widest text-[#44474f] mb-2">Desired Service</span>
              <select
                className="w-full rounded-[10px] border-0 bg-[#f0f4fb] px-4 py-3 focus:ring-2 focus:ring-[#2E7EC4]/30"
                name="service"
                value={form.service}
                onChange={handleChange}
                required
              >
                <option value="">Choose a treatment...</option>
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <label className="block">
                <span className="block text-xs font-bold uppercase tracking-widest text-[#44474f] mb-2">Date</span>
                <input
                  className="w-full rounded-[10px] border-0 bg-[#f0f4fb] px-4 py-3 focus:ring-2 focus:ring-[#2E7EC4]/30"
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="block">
                <span className="block text-xs font-bold uppercase tracking-widest text-[#44474f] mb-2">Preferred Time</span>
                <input
                  className="w-full rounded-[10px] border-0 bg-[#f0f4fb] px-4 py-3 focus:ring-2 focus:ring-[#2E7EC4]/30"
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <button
              className="w-full bg-[#002452] hover:bg-[#1B3A6B] text-white font-bold py-4 px-6 rounded-[10px] transition-all"
              type="submit"
            >
              Confirm Booking via WhatsApp
            </button>

            <a
              href={`https://wa.me/${phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:opacity-90 text-white font-bold py-4 px-6 rounded-[10px] transition-all inline-flex justify-center"
            >
              Chat on WhatsApp
            </a>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002452]" />
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
