"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import DynamicLink from "./components/DynamicLink";

const heroImages = [
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=900&h=1000&fit=crop",
  "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=900&h=1000&fit=crop",
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
    <div className="relative w-full aspect-[10/11] rounded-[16px] overflow-hidden border-[10px] border-white editorial-shadow z-10">
      {heroImages.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`Professional service image ${i + 1}`}
          fill
          className={`object-cover transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={i === 0}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-[#002452]/20 via-transparent to-transparent" />
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
          "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=900&h=700&fit=crop",
      },
      {
        icon: "clean_hands",
        title: "Teeth Cleaning",
        desc: "Professional dental hygiene care.",
        image:
          "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=900&h=700&fit=crop",
      },
      {
        icon: "mood",
        title: "Cosmetic Dentistry",
        desc: "Enhance your smile with modern techniques.",
        image:
          "https://images.unsplash.com/photo-1588776814546-ec7e61392f3f?w=900&h=700&fit=crop",
      },
      {
        icon: "healing",
        title: "Root Canal",
        desc: "Pain-free endodontic treatment.",
        image:
          "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=900&h=700&fit=crop",
      },
    ],
    healthcare: [
      {
        icon: "stethoscope",
        title: "General Checkup",
        desc: "Comprehensive health assessments.",
        image:
          "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&h=700&fit=crop",
      },
      {
        icon: "vaccines",
        title: "Vaccinations",
        desc: "Stay protected with timely vaccines.",
        image:
          "https://images.unsplash.com/photo-1584515933487-779824d29309?w=900&h=700&fit=crop",
      },
      {
        icon: "cardiology",
        title: "Cardiology",
        desc: "Heart health monitoring and care.",
        image:
          "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=900&h=700&fit=crop",
      },
      {
        icon: "psychology",
        title: "Mental Health",
        desc: "Supportive mental wellness programs.",
        image:
          "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=900&h=700&fit=crop",
      },
    ],
    fitness: [
      {
        icon: "fitness_center",
        title: "Personal Training",
        desc: "One-on-one fitness coaching.",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&h=700&fit=crop",
      },
      {
        icon: "self_improvement",
        title: "Yoga Classes",
        desc: "Mind-body wellness sessions.",
        image:
          "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&h=700&fit=crop",
      },
      {
        icon: "nutrition",
        title: "Nutrition Plans",
        desc: "Custom diet and meal planning.",
        image:
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&h=700&fit=crop",
      },
      {
        icon: "sprint",
        title: "HIIT Workouts",
        desc: "High-intensity interval training.",
        image:
          "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&h=700&fit=crop",
      },
    ],
    spa: [
      {
        icon: "spa",
        title: "Massage Therapy",
        desc: "Relaxing therapeutic massages.",
        image:
          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&h=700&fit=crop",
      },
      {
        icon: "face",
        title: "Facial Treatments",
        desc: "Rejuvenating skincare services.",
        image:
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&h=700&fit=crop",
      },
      {
        icon: "water_drop",
        title: "Hydrotherapy",
        desc: "Water-based healing treatments.",
        image:
          "https://images.unsplash.com/photo-1507652955-f3dcef5a3be5?w=900&h=700&fit=crop",
      },
      {
        icon: "self_improvement",
        title: "Meditation",
        desc: "Guided mindfulness sessions.",
        image:
          "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=900&h=700&fit=crop",
      },
    ],
    salon: [
      {
        icon: "content_cut",
        title: "Haircuts and Styling",
        desc: "Trendy cuts and styling services.",
        image:
          "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=900&h=700&fit=crop",
      },
      {
        icon: "palette",
        title: "Hair Coloring",
        desc: "Professional color treatments.",
        image:
          "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&h=700&fit=crop",
      },
      {
        icon: "face",
        title: "Skincare",
        desc: "Advanced facial treatments.",
        image:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&h=700&fit=crop",
      },
      {
        icon: "spa",
        title: "Nail Art",
        desc: "Creative nail design services.",
        image:
          "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=900&h=700&fit=crop",
      },
    ],
  };

  const services =
    servicesByCategory[category.toLowerCase()] || servicesByCategory.healthcare;

  const whyChooseUs = [
    {
      title: "Expert Team",
      desc: `Certified specialists delivering premium ${category.toLowerCase()} care.`,
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&h=650&fit=crop",
    },
    {
      title: "Modern Technology",
      desc: "Advanced equipment and proven methods for better outcomes.",
      image:
        "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=900&h=650&fit=crop",
    },
    {
      title: "Client First Experience",
      desc: `Personalized support from first consultation to follow-up at ${client}.`,
      image:
        "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=900&h=650&fit=crop",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Ayesha T.",
      role: "Verified Client",
      image:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80",
      quote:
        "Bohat acha experience raha. The staff was extremely professional, kind, and very attentive. Appointment book karna bhi bohat asan tha.",
    },
    {
      id: 2,
      name: "Usman Ali",
      role: "Verified Client",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
      quote:
        "The WhatsApp booking process was smooth and hassle-free. Clinic ka mahol bohat saaf tha aur treatment quality excellent thi.",
    },
    {
      id: 3,
      name: "Fatima R.",
      role: "Verified Client",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      quote:
        "Highly recommended if you want trusted healthcare professionals in the city. Waqt par checkup hua aur service bohat zabardast thi.",
    },
  ];

  return (
    <>
      <header className="relative overflow-hidden pt-28 pb-24 lg:pt-32 lg:pb-28 mesh-accent" id="home">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#4DB8E8]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[0%] left-[-5%] w-[400px] h-[400px] bg-[#1B3A6B]/6 rounded-full blur-[85px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal-up reveal-delay-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d1e4ff] text-[#001d35] text-xs font-bold mb-6 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0061a2]" />
              Advanced {category} Care in {address}
            </div>
            <h1 className="stitch-title text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Your <span className="italic font-normal">Brightest</span> Health,
              <br />
              Our Finest Care.
            </h1>
            <p className="text-[#44474f] text-lg max-w-xl leading-relaxed mb-10">
              Experience world-class {category.toLowerCase()} services with editorial-level
              calm and modern precision at {client}.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <DynamicLink
                href="/booking"
                className="bg-[#002452] text-white px-8 py-4 rounded-[10px] font-bold hover:bg-[#1B3A6B] transition-all"
              >
                Book Appointment
              </DynamicLink>
              <DynamicLink
                href="/services"
                className="border-2 border-[#002452] text-[#002452] px-8 py-4 rounded-[10px] font-bold hover:bg-[#002452]/5 transition-all"
              >
                View Services
              </DynamicLink>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#c4c6d0]/40">
              <div>
                <div className="stitch-title text-3xl font-bold">500+</div>
                <div className="text-sm text-[#44474f]">Happy Patients</div>
              </div>
              <div>
                <div className="stitch-title text-3xl font-bold">10+</div>
                <div className="text-sm text-[#44474f]">Years Experience</div>
              </div>
              <div>
                <div className="stitch-title text-3xl font-bold">Modern</div>
                <div className="text-sm text-[#44474f]">Equipment</div>
              </div>
            </div>
          </div>

          <div className="relative reveal-up reveal-delay-2">
            <HeroCarousel />
            <div className="absolute -bottom-6 -left-4 bg-white p-5 rounded-[16px] editorial-shadow z-20 flex items-center gap-4 border border-[#4DB8E8]/15">
              <div className="w-11 h-11 rounded-full bg-[#d1e4ff] flex items-center justify-center text-[#002452]">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              </div>
              <div>
                <div className="font-bold text-lg text-[#002452]">4.9/5.0</div>
                <div className="text-xs text-[#44474f] uppercase tracking-widest font-bold">
                  Client Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-28 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 reveal-up">
            <h2 className="stitch-title text-4xl lg:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-[#44474f] max-w-2xl mx-auto">
              Comprehensive care tailored to your needs with a premium patient experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc) => (
              <div
                key={svc.title}
                className="group bg-[#f0f4fb] p-6 rounded-[16px] border-l-4 border-transparent hover:border-[#0061a2] transition-all reveal-up"
              >
                <div className="relative mb-5 overflow-hidden rounded-[12px] aspect-[4/3]">
                  <Image
                    src={svc.image}
                    alt={`${svc.title} service`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <span className="material-symbols-outlined text-4xl text-[#0061a2] mb-4 block">
                  {svc.icon}
                </span>
                <h3 className="text-xl font-bold text-[#002452] mb-2">{svc.title}</h3>
                <p className="text-[#44474f] text-sm leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-[#1B3A6B] to-[#2E7EC4] text-white reveal-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-center">
            <div>
              <div className="stitch-title text-white text-5xl font-bold mb-2">15k+</div>
              <div className="text-white/70 text-sm uppercase tracking-widest">Happy Clients</div>
            </div>
            <div>
              <div className="stitch-title text-white text-5xl font-bold mb-2">100%</div>
              <div className="text-white/70 text-sm uppercase tracking-widest">Care Focus</div>
            </div>
            <div>
              <div className="stitch-title text-white text-5xl font-bold mb-2">24/7</div>
              <div className="text-white/70 text-sm uppercase tracking-widest">Support</div>
            </div>
            <div>
              <div className="stitch-title text-white text-5xl font-bold mb-2">12+</div>
              <div className="text-white/70 text-sm uppercase tracking-widest">Specialists</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyChooseUs.map((item) => (
              <article key={item.title} className="bg-white/10 backdrop-blur-sm rounded-[16px] overflow-hidden border border-white/10">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-80"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#f0f4fb] reveal-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="stitch-title text-4xl text-center font-bold mb-14 italic">
            Voices of Reassurance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, idx) => (
              <article
                key={item.id}
                className={`bg-white p-7 rounded-[16px] editorial-shadow ${
                  idx === 1 ? "border-t-4 border-[#0061a2]" : ""
                }`}
              >
                <div className="flex gap-0.5 text-[#4DB8E8] mb-4">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <span
                      key={starIdx}
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="text-[#171c21] leading-relaxed mb-6">&ldquo;{item.quote}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="relative size-12 rounded-full overflow-hidden bg-[#dfe3ea]">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#002452]">{item.name}</p>
                    <p className="text-xs uppercase tracking-widest text-[#44474f]">{item.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#1B3A6B] text-white pt-14 pb-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="material-symbols-outlined text-[#4DB8E8] text-3xl">{icon}</span>
              <span className="stitch-title text-white text-2xl font-bold uppercase">{client}</span>
            </div>
            <p className="text-sm text-white/70 max-w-sm">
              Transforming lives with exceptional {category.toLowerCase()} care and an
              atmosphere designed for trust.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest">Quick Links</h4>
            <div className="space-y-3 text-sm text-white/75">
              <DynamicLink href="/services" className="block hover:text-[#4DB8E8]">
                Services
              </DynamicLink>
              <DynamicLink href="/booking" className="block hover:text-[#4DB8E8]">
                Book Appointment
              </DynamicLink>
              <DynamicLink href="/contact" className="block hover:text-[#4DB8E8]">
                Contact Us
              </DynamicLink>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest">Clinic Info</h4>
            <div className="space-y-3 text-sm text-white/75">
              <p className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#4DB8E8]">location_on</span>
                {address}
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4DB8E8]">schedule</span>
                Mon - Fri: 9:00 AM - 6:00 PM
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4DB8E8]">calendar_today</span>
                Sat: 10:00 AM - 4:00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-white/10 text-center text-sm text-white/50">
          &copy; {new Date().getFullYear()} {client}. All rights reserved.
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002452]" />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
