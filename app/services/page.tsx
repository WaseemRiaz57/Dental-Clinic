"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import DynamicLink from "../components/DynamicLink";

const servicesByCategory: Record<
  string,
  { icon: string; title: string; desc: string }[]
> = {
  dental: [
    {
      icon: "grid_view",
      title: "Orthodontics",
      desc: "Transform your smile with advanced alignment solutions including Invisalign clear aligners and modern ceramic braces.",
    },
    {
      icon: "dentistry",
      title: "General Dentistry",
      desc: "Comprehensive dental checkups, fillings, and preventive care to keep your teeth healthy and strong.",
    },
    {
      icon: "mood",
      title: "Cosmetic Dentistry",
      desc: "Teeth whitening, veneers, and smile makeover treatments for a brilliant, confident smile.",
    },
    {
      icon: "healing",
      title: "Root Canal Therapy",
      desc: "Pain-free endodontic treatment using modern techniques to save damaged or infected teeth.",
    },
    {
      icon: "clean_hands",
      title: "Teeth Cleaning",
      desc: "Professional dental hygiene and deep cleaning services to maintain optimal oral health.",
    },
    {
      icon: "child_care",
      title: "Pediatric Dentistry",
      desc: "Gentle, kid-friendly dental care designed to make children feel comfortable and safe.",
    },
  ],
  healthcare: [
    {
      icon: "stethoscope",
      title: "General Checkup",
      desc: "Comprehensive health assessments with thorough examination and personalized health plans.",
    },
    {
      icon: "vaccines",
      title: "Vaccinations",
      desc: "Stay protected with timely vaccines administered by our certified healthcare professionals.",
    },
    {
      icon: "cardiology",
      title: "Cardiology",
      desc: "Advanced heart health monitoring, diagnostics, and preventive cardiovascular care.",
    },
    {
      icon: "psychology",
      title: "Mental Health",
      desc: "Supportive mental wellness programs including therapy, counseling, and stress management.",
    },
    {
      icon: "biotech",
      title: "Lab Testing",
      desc: "State-of-the-art diagnostic laboratory services with quick and accurate results.",
    },
    {
      icon: "medication",
      title: "Pharmacy Services",
      desc: "On-site pharmacy with prescription management and medication consultation services.",
    },
  ],
  fitness: [
    {
      icon: "fitness_center",
      title: "Personal Training",
      desc: "One-on-one fitness coaching tailored to your goals with certified personal trainers.",
    },
    {
      icon: "self_improvement",
      title: "Yoga Classes",
      desc: "Mind-body wellness sessions ranging from beginner to advanced levels in a peaceful environment.",
    },
    {
      icon: "nutrition",
      title: "Nutrition Plans",
      desc: "Custom diet and meal planning crafted by certified nutritionists for optimal results.",
    },
    {
      icon: "sprint",
      title: "HIIT Workouts",
      desc: "High-intensity interval training sessions designed to maximize calorie burn and endurance.",
    },
    {
      icon: "pool",
      title: "Aqua Fitness",
      desc: "Low-impact water-based exercise classes perfect for all fitness levels and recovery.",
    },
    {
      icon: "groups",
      title: "Group Classes",
      desc: "Energetic group fitness sessions including spinning, boxing, and dance workouts.",
    },
  ],
  spa: [
    {
      icon: "spa",
      title: "Massage Therapy",
      desc: "Relaxing therapeutic massages including Swedish, deep tissue, and hot stone treatments.",
    },
    {
      icon: "face",
      title: "Facial Treatments",
      desc: "Rejuvenating skincare services using premium products for a radiant, youthful glow.",
    },
    {
      icon: "water_drop",
      title: "Hydrotherapy",
      desc: "Water-based healing treatments including mineral baths and therapeutic pools.",
    },
    {
      icon: "self_improvement",
      title: "Meditation",
      desc: "Guided mindfulness and meditation sessions for deep relaxation and mental clarity.",
    },
    {
      icon: "local_florist",
      title: "Aromatherapy",
      desc: "Essential oil-based treatments that promote healing, relaxation, and well-being.",
    },
    {
      icon: "cached",
      title: "Body Wraps",
      desc: "Detoxifying and nourishing body wrap treatments for skin tightening and hydration.",
    },
  ],
  salon: [
    {
      icon: "content_cut",
      title: "Haircuts & Styling",
      desc: "Trendy cuts and professional styling services for all hair types and lengths.",
    },
    {
      icon: "palette",
      title: "Hair Coloring",
      desc: "Professional color treatments including highlights, balayage, and full color services.",
    },
    {
      icon: "face",
      title: "Skincare",
      desc: "Advanced facial treatments and skincare routines customized to your skin type.",
    },
    {
      icon: "spa",
      title: "Nail Art & Manicure",
      desc: "Creative nail designs, gel manicures, and pedicures with premium products.",
    },
    {
      icon: "brush",
      title: "Makeup Services",
      desc: "Professional makeup application for weddings, events, and everyday glam looks.",
    },
    {
      icon: "auto_awesome",
      title: "Hair Treatments",
      desc: "Deep conditioning, keratin treatments, and hair repair services for healthier locks.",
    },
  ],
};

function ServicesContent() {
  const searchParams = useSearchParams();
  const client = searchParams.get("client") || "Modern Clinic";
  const category = searchParams.get("category") || "Healthcare";

  const imageByService: Record<string, string> = {
    Orthodontics:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=900&h=650&fit=crop",
    "General Dentistry":
      "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=900&h=650&fit=crop",
    "Cosmetic Dentistry":
      "https://images.unsplash.com/photo-1588776814546-ec7e61392f3f?w=900&h=650&fit=crop",
    "Root Canal Therapy":
      "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=900&h=650&fit=crop",
    "Teeth Cleaning":
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&h=650&fit=crop",
    "Pediatric Dentistry":
      "https://images.unsplash.com/photo-1588776813677-77aaf5595b83?w=900&h=650&fit=crop",
    "General Checkup":
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&h=650&fit=crop",
    Vaccinations:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=900&h=650&fit=crop",
    Cardiology:
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=900&h=650&fit=crop",
    "Mental Health":
      "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=900&h=650&fit=crop",
    "Lab Testing":
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&h=650&fit=crop",
    "Pharmacy Services":
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=900&h=650&fit=crop",
    "Personal Training":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&h=650&fit=crop",
    "Yoga Classes":
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&h=650&fit=crop",
    "Nutrition Plans":
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&h=650&fit=crop",
    "HIIT Workouts":
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&h=650&fit=crop",
    "Aqua Fitness":
      "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?w=900&h=650&fit=crop",
    "Group Classes":
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=900&h=650&fit=crop",
    "Massage Therapy":
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&h=650&fit=crop",
    "Facial Treatments":
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&h=650&fit=crop",
    Hydrotherapy:
      "https://images.unsplash.com/photo-1507652955-f3dcef5a3be5?w=900&h=650&fit=crop",
    Meditation:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=900&h=650&fit=crop",
    Aromatherapy:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&h=650&fit=crop",
    "Body Wraps":
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=900&h=650&fit=crop",
    "Haircuts & Styling":
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=900&h=650&fit=crop",
    "Hair Coloring":
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&h=650&fit=crop",
    Skincare:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&h=650&fit=crop",
    "Nail Art & Manicure":
      "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=900&h=650&fit=crop",
    "Makeup Services":
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=900&h=650&fit=crop",
    "Hair Treatments":
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=900&h=650&fit=crop",
  };

  const services =
    servicesByCategory[category.toLowerCase()] ||
    servicesByCategory.healthcare;

  return (
    <section className="min-h-screen pb-28 py-10 px-4 mesh-accent">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center reveal-up">
          <p className="text-xs uppercase tracking-[0.2em] text-[#0061a2] mb-3">Elite Solutions</p>
          <h1 className="stitch-title text-4xl md:text-5xl font-bold mb-4">Our Treatments</h1>
          <p className="text-[#44474f] max-w-2xl mx-auto">
            Advanced {category.toLowerCase()} solutions tailored to your needs at {client}.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <article key={service.title} className="stitch-card p-5 reveal-up reveal-delay-1">
              <div className="relative mb-5 overflow-hidden rounded-[12px] aspect-[16/10]">
                <Image
                  src={imageByService[service.title]}
                  alt={`${service.title} treatment`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex items-start gap-4 mb-3">
                <div className="flex items-center justify-center size-11 rounded-full bg-[#d1e4ff] text-[#002452] shrink-0">
                  <span className="material-symbols-outlined">{service.icon}</span>
                </div>
                <h2 className="text-lg font-bold text-[#002452] pt-2">{service.title}</h2>
              </div>
              <p className="text-[#44474f] text-sm leading-relaxed mb-5">{service.desc}</p>
              <DynamicLink
                href="/booking"
                className="inline-flex items-center gap-2 text-[#0061a2] font-bold text-xs uppercase tracking-widest"
              >
                Book now
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </DynamicLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002452]" />
        </div>
      }
    >
      <ServicesContent />
    </Suspense>
  );
}
