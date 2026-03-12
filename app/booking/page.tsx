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
    serviceOptions[category.toLowerCase()] || serviceOptions["healthcare"];

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
    <div className="min-h-screen flex items-start justify-center px-4 py-10 pb-24">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center p-4 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
          <h2 className="text-lg font-semibold flex-1 text-center text-slate-900 dark:text-white">
            Book Appointment
          </h2>
        </div>

        {/* Form */}
        <div className="p-6 md:p-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">
              Schedule your visit
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Fill in your details to confirm your appointment with {client}.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              {/* Full Name */}
              <label className="block">
                <span className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Full Name
                </span>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                    person
                  </span>
                  <input
                    className="block w-full pl-10 pr-3 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-slate-900 dark:text-white"
                    placeholder="Jane Doe"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </label>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="block">
                  <span className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                    Phone Number
                  </span>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                      call
                    </span>
                    <input
                      className="block w-full pl-10 pr-3 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-slate-900 dark:text-white"
                      placeholder="+1 (555) 000-0000"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </label>
                <label className="block">
                  <span className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                    Email Address
                  </span>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                      mail
                    </span>
                    <input
                      className="block w-full pl-10 pr-3 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-slate-900 dark:text-white"
                      placeholder="jane@example.com"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* Service Select */}
            <label className="block">
              <span className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                Select Service
              </span>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                  medical_services
                </span>
                <select
                  className="block w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg appearance-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-slate-600 dark:text-slate-300"
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
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none">
                  expand_more
                </span>
              </div>
            </label>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block">
                <span className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Preferred Date
                </span>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                    calendar_today
                  </span>
                  <input
                    className="block w-full pl-10 pr-3 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-slate-900 dark:text-white"
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </label>
              <label className="block">
                <span className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Preferred Time
                </span>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                    schedule
                  </span>
                  <input
                    className="block w-full pl-10 pr-3 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-slate-900 dark:text-white"
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </label>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                type="submit"
              >
                <span className="material-symbols-outlined">send</span>
                Confirm Booking via WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
