"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import DynamicLink from "./components/DynamicLink";

/* ---------- Image Carousel ---------- */
const heroImages = [
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=800&fit=crop",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=800&fit=crop",
  "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&h=800&fit=crop",
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((prev) => (prev + 1) % heroImages.length),
    []
  );

  useEffect(() => {
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="aspect-square rounded-3xl bg-primary/5 border border-primary/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10" />
      {heroImages.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`Professional service image ${i + 1}`}
          fill
          className={`object-cover transition-opacity duration-700 ${
            i === current ? "opacity-90" : "opacity-0"
          }`}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={i === 0}
        />
      ))}
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`carousel-dot ${i === current ? "active" : ""}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Home Content ---------- */
function HomeContent() {
  const searchParams = useSearchParams();
  const client = searchParams.get("client") || "Modern Clinic";
  const category = searchParams.get("category") || "Healthcare";
  const address = searchParams.get("address") || "Your City";

  const categoryIcons: Record<string, string> = {
    dental: "dentistry",
    healthcare: "local_hospital",
    fitness: "fitness_center",
    spa: "spa",
    salon: "content_cut",
  };

  const icon = categoryIcons[category.toLowerCase()] || "local_hospital";

  // Dynamic services based on category
  const servicesByCategory: Record<
    string,
    { icon: string; title: string; desc: string; image: string }[]
  > = {
    dental: [
      {
        icon: "dentistry",
        title: "Braces",
        desc: "Advanced orthodontic solutions.",
        image:
          "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=900&h=600&fit=crop",
      },
      {
        icon: "clean_hands",
        title: "Teeth Cleaning",
        desc: "Professional dental hygiene care.",
        image:
          "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=900&h=600&fit=crop",
      },
      {
        icon: "mood",
        title: "Cosmetic Dentistry",
        desc: "Enhance your smile with modern techniques.",
        image:
          "https://images.unsplash.com/photo-1588776814546-ec7e61392f3f?w=900&h=600&fit=crop",
      },
      {
        icon: "healing",
        title: "Root Canal",
        desc: "Pain-free endodontic treatment.",
        image:
          "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=900&h=600&fit=crop",
      },
    ],
    healthcare: [
      {
        icon: "stethoscope",
        title: "General Checkup",
        desc: "Comprehensive health assessments.",
        image:
          "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&h=600&fit=crop",
      },
      {
        icon: "vaccines",
        title: "Vaccinations",
        desc: "Stay protected with timely vaccines.",
        image:
          "https://images.unsplash.com/photo-1584515933487-779824d29309?w=900&h=600&fit=crop",
      },
      {
        icon: "cardiology",
        title: "Cardiology",
        desc: "Heart health monitoring & care.",
        image:
          "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=900&h=600&fit=crop",
      },
      {
        icon: "psychology",
        title: "Mental Health",
        desc: "Supportive mental wellness programs.",
        image:
          "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=900&h=600&fit=crop",
      },
    ],
    fitness: [
      {
        icon: "fitness_center",
        title: "Personal Training",
        desc: "One-on-one fitness coaching.",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&h=600&fit=crop",
      },
      {
        icon: "self_improvement",
        title: "Yoga Classes",
        desc: "Mind-body wellness sessions.",
        image:
          "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&h=600&fit=crop",
      },
      {
        icon: "nutrition",
        title: "Nutrition Plans",
        desc: "Custom diet & meal planning.",
        image:
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&h=600&fit=crop",
      },
      {
        icon: "sprint",
        title: "HIIT Workouts",
        desc: "High-intensity interval training.",
        image:
          "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&h=600&fit=crop",
      },
    ],
    spa: [
      {
        icon: "spa",
        title: "Massage Therapy",
        desc: "Relaxing therapeutic massages.",
        image:
          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&h=600&fit=crop",
      },
      {
        icon: "face",
        title: "Facial Treatments",
        desc: "Rejuvenating skincare services.",
        image:
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&h=600&fit=crop",
      },
      {
        icon: "water_drop",
        title: "Hydrotherapy",
        desc: "Water-based healing treatments.",
        image:
          "https://images.unsplash.com/photo-1507652955-f3dcef5a3be5?w=900&h=600&fit=crop",
      },
      {
        icon: "self_improvement",
        title: "Meditation",
        desc: "Guided mindfulness sessions.",
        image:
          "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=900&h=600&fit=crop",
      },
    ],
    salon: [
      {
        icon: "content_cut",
        title: "Haircuts & Styling",
        desc: "Trendy cuts and styling services.",
        image:
          "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=900&h=600&fit=crop",
      },
      {
        icon: "palette",
        title: "Hair Coloring",
        desc: "Professional color treatments.",
        image:
          "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&h=600&fit=crop",
      },
      {
        icon: "face",
        title: "Skincare",
        desc: "Advanced facial treatments.",
        image:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&h=600&fit=crop",
      },
      {
        icon: "spa",
        title: "Nail Art",
        desc: "Creative nail design services.",
        image:
          "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=900&h=600&fit=crop",
      },
    ],
  };

  const services =
    servicesByCategory[category.toLowerCase()] || servicesByCategory["healthcare"];

  const whyChooseUs = [
    {
      title: "Expert Team",
      desc: `Certified specialists delivering premium ${category.toLowerCase()} care.`,
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&h=600&fit=crop",
    },
    {
      title: "Modern Technology",
      desc: "Advanced equipment and proven methods for better outcomes.",
      image:
        "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=900&h=600&fit=crop",
    },
    {
      title: "Client First Experience",
      desc: `Personalized support from first consultation to follow-up at ${client}.`,
      image:
        "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=900&h=600&fit=crop",
    },
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      quote: `Amazing experience with ${client}. The staff was professional, kind, and very attentive.`,
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop",
    },
    {
      name: "Daniel K.",
      quote: "The booking process was smooth and the treatment quality was excellent.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
    },
    {
      name: "Priya R.",
      quote: `Highly recommended if you want trusted ${category.toLowerCase()} professionals.`,
      image:
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=300&fit=crop",
    },
  ];

  return (
    <>
      {/* Hero */}
      <header className="relative overflow-hidden pt-16 pb-20 lg:pt-32 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
                <span className="material-symbols-outlined text-sm">verified</span>
                Advanced {category} Care in {address}
              </div>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">
                Your Health, <br />
                <span className="text-primary">Our Priority.</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                Experience world-class {category.toLowerCase()} care with a gentle touch
                and modern technology at {client}.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <DynamicLink
                  href="/booking"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl text-base font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                >
                  Book Your Visit{" "}
                  <span className="material-symbols-outlined">calendar_today</span>
                </DynamicLink>
                <DynamicLink
                  href="/services"
                  className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-8 py-4 rounded-xl text-base font-bold transition-all text-center"
                >
                  View Services
                </DynamicLink>
              </div>
            </div>
            <div className="relative">
              <HeroCarousel />
            </div>
          </div>
        </div>
      </header>

      {/* Services Preview */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm">
              Specializations
            </h2>
            <h3 className="text-4xl font-black text-slate-900 dark:text-slate-50">Our Services</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc) => (
              <div
                key={svc.title}
                className="group bg-white dark:bg-slate-900/80 p-8 rounded-2xl border border-slate-200 dark:border-slate-700/80 hover:border-primary dark:hover:border-primary/80 transition-all shadow-sm dark:shadow-black/30 hover:shadow-xl hover:-translate-y-0.5"
              >
                <div className="relative mb-5 overflow-hidden rounded-xl aspect-[4/3]">
                  <Image
                    src={svc.image}
                    alt={`${svc.title} service`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="w-14 h-14 bg-primary/10 dark:bg-primary/15 rounded-xl flex items-center justify-center text-primary mb-6 ring-1 ring-primary/10 dark:ring-primary/30">
                  <span className="material-symbols-outlined text-3xl">{svc.icon}</span>
                </div>
                <h4 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">{svc.title}</h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm">
              Why Choose Us
            </h2>
            <h3 className="text-4xl font-black text-slate-900 dark:text-slate-100">
              Trusted by Families Across the City
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-100 dark:bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm">
              Testimonials
            </h2>
            <h3 className="text-4xl font-black text-slate-900 dark:text-slate-100">
              What Our Clients Say
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative size-14 rounded-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{item.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Verified Client</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  “{item.quote}”
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white">
                <span className="material-symbols-outlined text-primary text-3xl">
                  {icon}
                </span>
                <span className="text-xl font-bold tracking-tight">{client}</span>
              </div>
              <p className="text-sm leading-relaxed">
                Providing exceptional {category.toLowerCase()} services with care and
                professionalism.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Quick Links</h4>
              <div className="flex flex-col gap-2">
                <DynamicLink href="/services" className="text-sm hover:text-primary transition-colors">Services</DynamicLink>
                <DynamicLink href="/booking" className="text-sm hover:text-primary transition-colors">Book Appointment</DynamicLink>
                <DynamicLink href="/contact" className="text-sm hover:text-primary transition-colors">Contact Us</DynamicLink>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Address</h4>
              <p className="text-sm">{address}</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Hours</h4>
              <p className="text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
              <p className="text-sm">Sat: 10:00 AM - 4:00 PM</p>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm">
            &copy; {new Date().getFullYear()} {client}. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
