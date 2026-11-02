import type { Metadata } from "next";
import AnimatedStat from "../components/AnimatedStat";
import AppointmentForm from "./components/AppointmentForm";

/* ═══════════════════════════════════════════════════════════
   HOME PAGE — 100% DYNAMIC (URL searchParams drive all content)
   All clinic data injected via URL searchParams.
   ═══════════════════════════════════════════════════════════ */

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const clinicName = params.client
    ? String(params.client).replace(/-/g, " ")
    : "Premium Dental Care";

  return {
    title: `${clinicName} | Elite Dental Solutions`,
    description: `Book your appointment at ${clinicName} today.`,
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;

  const getParam = (key: string, fallback: string) => {
    const value = params[key];
    if (value === undefined || value === null || String(value).trim() === "") {
      return fallback;
    }
    return String(value);
  };

  const getBoolean = (key: string, fallback: boolean) => {
    const value = params[key];
    if (!value) {
      return fallback;
    }
    return ["1", "true", "yes", "y"].includes(String(value).toLowerCase());
  };

  const getSafeImageUrl = (url: string) => {
    if (!url || url.startsWith("/") || url.startsWith("data:") || url.startsWith("blob:")) {
      return url;
    }

    try {
      const parsed = new URL(url);
      const sourcePath = `${parsed.host}${parsed.pathname}${parsed.search}`;
      return `https://images.weserv.nl/?url=${encodeURIComponent(sourcePath)}&output=webp&q=82`;
    } catch {
      return url;
    }
  };

  // Text Data with Fallbacks
  const clinicName = getParam("client", "Premium Dental Care");
  const logoUrl = params.logo_url ? getSafeImageUrl(String(params.logo_url)) : null;
  const phone = getParam("phone", "+92 300 0000000");
  const address = getParam("address", "Main Boulevard, Healthcare District, Lahore");
  const email =
    getParam(
      "email",
      "info@" + clinicName.toLowerCase().replace(/[^a-z0-9]/g, "") + ".com"
    );

  // Image Data with Fallbacks
  const heroImage = getSafeImageUrl(
    getParam(
      "hero_image",
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1920&q=80"
    )
  );
  const sectionImage1 = getSafeImageUrl(
    getParam(
      "section_image_1",
      "https://images.unsplash.com/photo-1588776814546-daab30f310ce?q=80&w=1000&auto=format&fit=crop"
    )
  );
  const sectionImage2 = getSafeImageUrl(
    getParam(
      "section_image_2",
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80"
    )
  );
  const doctorImage = getSafeImageUrl(
    getParam(
      "doctor_image",
      "/dr-ahmed-saed.jpg"
    )
  );

  // Optional image extensions for full-page dynamism
  const galleryImage1 = getSafeImageUrl(
    getParam(
      "gallery_image_1",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop"
    )
  );
  const galleryImage2 = getSafeImageUrl(
    getParam(
      "gallery_image_2",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
    )
  );
  const galleryImage3 = getSafeImageUrl(getParam("gallery_image_3", sectionImage2));
  const galleryImage4 = getSafeImageUrl(getParam("gallery_image_4", heroImage));

  const heroBadge = getParam("hero_badge", "Modern Dentistry in {city}").replace(
    "{city}",
    address.split(",").map((item) => item.trim()).filter(Boolean).at(-2) ||
      address.split(",").map((item) => item.trim()).filter(Boolean).at(-1) ||
      "Lahore"
  );
  const heroTitlePre = getParam("hero_title_pre", "Your");
  const heroTitleItalic = getParam("hero_title_italic", "Brightest");
  const heroTitlePost = getParam("hero_title_post", "Smile Deserves The Best Care");
  const heroDescription = getParam(
    "hero_description",
    "Experience world-class dental solutions with a touch of editorial elegance. We combine clinical precision with patient-centric comfort."
  );
  const ctaPrimaryText = getParam("cta_primary_text", "Book Appointment");
  const ctaPrimaryHref = getParam("cta_primary_href", "#appointment");
  const ctaSecondaryText = getParam("cta_secondary_text", "Our Services");
  const ctaSecondaryHref = getParam("cta_secondary_href", "#services");

  const trustStats = [
    {
      value: getParam("trust_1_value", "500+"),
      label: getParam("trust_1_label", "Happy Patients"),
    },
    {
      value: getParam("trust_2_value", "10+"),
      label: getParam("trust_2_label", "Years Experience"),
    },
    {
      value: getParam("trust_3_value", "Modern"),
      label: getParam("trust_3_label", "Equipment"),
    },
  ];

  const ratingValue = getParam("rating_value", "4.9/5.0");
  const ratingLabel = getParam("rating_label", "Patient Satisfaction");

  const servicesTitle = getParam("services_title", "Elite Dental Solutions");
  const servicesSubtitle = getParam(
    "services_subtitle",
    "Comprehensive care tailored to your unique anatomy using the latest clinical advancements."
  );
  const serviceExploreText = getParam("service_explore_text", "Explore");

  const defaultServices = [
    {
      icon: "dentistry",
      title: "General Dentistry",
      image:
        "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
      desc: "Regular checkups and cleanings to maintain your oral health foundation and prevent future issues.",
    },
    {
      icon: "auto_awesome",
      title: "Teeth Whitening",
      image:
        "/teeth-whitening.jpg",
      desc: "Professional bleaching systems that deliver noticeable results safely and effectively in just one visit.",
    },
    {
      icon: "orthopedics",
      title: "Braces & Aligners",
      image:
        "/braces.jpg",
      desc: "Modern orthodontic solutions including clear aligners and traditional braces for a perfectly aligned smile.",
    },
    {
      icon: "medical_services",
      title: "Dental Implants",
      image:
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
      desc: "Permanent, natural-looking tooth replacements that restore both function and facial aesthetics.",
    },
    {
      icon: "clinical_notes",
      title: "Veneers",
      image:
        "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80",
      desc: "Custom-crafted porcelain shells to cover imperfections and create a flawless, Hollywood-style smile.",
    },
    {
      icon: "health_metrics",
      title: "Root Canal",
      image:
        "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop",
      desc: "Gentle, pain-free endodontic therapy to save natural teeth and eliminate infection at the root.",
    },
  ];

  const services = defaultServices.map((item, index) => ({
    icon: getParam(`service_${index + 1}_icon`, item.icon),
    title: getParam(`service_${index + 1}_title`, item.title),
    image: getSafeImageUrl(getParam(`service_${index + 1}_image`, item.image)),
    desc: getParam(`service_${index + 1}_desc`, item.desc),
  }));

  const whyStats = [
    {
      value: getParam("why_stat_1_value", "15k+"),
      label: getParam("why_stat_1_label", "Successful Surgeries"),
    },
    {
      value: getParam("why_stat_2_value", "100%"),
      label: getParam("why_stat_2_label", "Pain Management"),
    },
    {
      value: getParam("why_stat_3_value", "24/7"),
      label: getParam("why_stat_3_label", "Emergency Support"),
    },
    {
      value: getParam("why_stat_4_value", "12+"),
      label: getParam("why_stat_4_label", "Specialist Doctors"),
    },
  ];

  const philosophyTitle = getParam("philosophy_title", "Our Clinical Philosophy");
  const philosophyBody = getParam(
    "philosophy_body",
    `At ${clinicName}, we treat dentistry as an art form supported by rigorous science. Our mission is to provide an anxiety-free environment where clinical excellence meets compassionate care.`
  );
  const philosophyBullets = [1, 2, 3, 4, 5].map((n) =>
    getParam(
      `philosophy_bullet_${n}`,
      [
        "Painless Procedures with Sedation Options",
        "Flexible Payment Plans & Insurance Support",
        "Affordable Pricing without Quality Compromise",
        "PMDC Registered Specialists",
        "Bilingual Consultations (English & Urdu)",
      ][n - 1]
    )
  );

  const doctorImageAlt = getParam("doctor_image_alt", "Lead Clinician");
  const doctorYearsValue = getParam("doctor_years_value", "15+");
  const doctorYearsLabel = getParam("doctor_years_label", "Years of Practice");
  const doctorSectionTitle = getParam("doctor_section_title", "Lead Clinician");
  const doctorName = getParam("doctor_name", "Dr. Mohsin Saeed");
  const doctorCredentials = getParam("doctor_credentials", "BDS, FCPS");
  const doctorBio = getParam(
    "doctor_bio",
    "Dr. Saeed is a renowned consultant oral surgeon with over 15 years of dedicated practice. Specializing in advanced restorative procedures and cosmetic transformations, he brings a unique blend of surgical precision and artistic vision to every treatment plan."
  );
  const doctorQual1Title = getParam("doctor_qual_1_title", "Fellowship (FCPS)");
  const doctorQual1Body = getParam(
    "doctor_qual_1_body",
    "College of Physicians and Surgeons Pakistan"
  );
  const doctorQual2Title = getParam("doctor_qual_2_title", "Board Certified");
  const doctorQual2Body = getParam(
    "doctor_qual_2_body",
    "PMDC Gold Member with Lifetime Registration"
  );

  const galleryTitle = getParam("gallery_title", "The Atelier Gallery");
  const gallerySubtitle = getParam(
    "gallery_subtitle",
    "A glimpse inside our sanctuary of dental care."
  );
  const galleryLabel1 = getParam("gallery_label_1", "Waiting Lounge");
  const galleryLabel2 = getParam("gallery_label_2", "Surgery Theater");
  const teamImageAlt = getParam("team_image_alt", `${clinicName} team`);
  const galleryImageAlt1 = getParam("gallery_image_alt_1", "Clinic Interior");
  const galleryImageAlt2 = getParam("gallery_image_alt_2", "Surgery Room");
  const galleryImageAlt3 = getParam("gallery_image_alt_3", "Equipment");
  const galleryImageAlt4 = getParam("gallery_image_alt_4", "X-ray Room");

  const testimonialsTitle = getParam("testimonials_title", "Voices of Reassurance");
  const testimonialAvatars = [
    getSafeImageUrl(
      getParam(
        "testimonial_1_avatar",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
      )
    ),
    getSafeImageUrl(
      getParam(
        "testimonial_2_avatar",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
      )
    ),
    getSafeImageUrl(
      getParam(
        "testimonial_3_avatar",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
      )
    ),
  ];
  const testimonials = [
    {
      name: getParam("testimonial_1_name", "Hamza Ali"),
      role: getParam("testimonial_1_role", "Business Consultant"),
      quote: getParam(
        "testimonial_1_quote",
        `The treatment for my implants was completely painless. ${clinicName} team are true professionals who care about patient comfort above all.`
      ),
      featured: getBoolean("testimonial_1_featured", false),
    },
    {
      name: getParam("testimonial_2_name", "Ayesha Malik"),
      role: getParam("testimonial_2_role", "Design Architect"),
      quote: getParam(
        "testimonial_2_quote",
        "I've never felt so at ease in a dental clinic. The interior is calming and the results of my teeth whitening were immediate and spectacular!"
      ),
      featured: getBoolean("testimonial_2_featured", true),
    },
    {
      name: getParam("testimonial_3_name", "Zainab Khan"),
      role: getParam("testimonial_3_role", "Educator"),
      quote: getParam(
        "testimonial_3_quote",
        "Excellent care for root canal therapy. Everything was explained clearly. Highly recommend for anyone looking for expert dental surgery."
      ),
      featured: getBoolean("testimonial_3_featured", false),
    },
  ];

  const appointmentTitle = getParam(
    "appointment_title",
    "Take the First Step to Your Perfect Smile"
  );
  const appointmentSubtitle = getParam(
    "appointment_subtitle",
    "Book your consultation today and experience the difference of modern, patient-centered dentistry."
  );
  const hoursTitle = getParam("hours_title", "Mon - Sat: 11:00 AM - 09:00 PM");
  const hoursSubtitle = getParam("hours_subtitle", "Sunday Closed");
  const locationTag = getParam("location_tag", "Premium Medical Wing");

  const formNameLabel = getParam("form_name_label", "Full Name");
  const formNamePlaceholder = getParam("form_name_placeholder", "Enter your full name");
  const formPhoneLabel = getParam("form_phone_label", "Phone Number");
  const formPhonePlaceholder = getParam("form_phone_placeholder", "+92 3XX XXXXXXX");
  const formServiceLabel = getParam("form_service_label", "Desired Service");
  const formServiceOptions = [1, 2, 3, 4].map((n) =>
    getParam(
      `form_service_option_${n}`,
      ["General Dentistry", "Teeth Whitening", "Orthodontics", "Dental Implants"][n - 1]
    )
  );
  const formDateLabel = getParam("form_date_label", "Date");
  const formTimeLabel = getParam("form_time_label", "Preferred Time");
  const formMessageLabel = getParam("form_message_label", "Message");
  const formMessagePlaceholder = getParam(
    "form_message_placeholder",
    "Anything we should know?"
  );
  const formSubmitText = getParam("form_submit_text", "Request Appointment");
  const whatsappButtonText = getParam("whatsapp_button_text", "Chat on WhatsApp");

  const contactTitle = getParam("contact_title", "Location & Access");
  const contactSubtitle = getParam(
    "contact_subtitle",
    "Easy access from all major parts of {city}. Ample parking available."
  );
  const contactAddressLabel = getParam("contact_address_label", "Our Address");
  const contactPhoneLabel = getParam("contact_phone_label", "Phone & WhatsApp");
  const contactEmailLabel = getParam("contact_email_label", "Email Inquiry");

  const footerTagline = getParam(
    "footer_tagline",
    "Transforming lives through clinical excellence and aesthetic artistry. Your smile, our mastery."
  );
  const companyHeading = getParam("company_heading", "Company");
  const supportHeading = getParam("support_heading", "Support");
  const contactHeading = getParam("contact_heading", "Contact Info");
  const copyrightSuffix = getParam("copyright_suffix", "All rights reserved.");
  const socialLinks = [
    {
      icon: getParam("social_1_icon", "public"),
      href: getParam("social_1_href", "#"),
    },
    {
      icon: getParam("social_2_icon", "share"),
      href: getParam("social_2_href", "#"),
    },
    {
      icon: getParam("social_3_icon", "photo_camera"),
      href: getParam("social_3_href", "#"),
    },
  ];
  const companyLinks = [
    {
      label: getParam("company_link_1_label", "About Us"),
      href: getParam("company_link_1_href", "#about"),
    },
    {
      label: getParam("company_link_2_label", "Our Team"),
      href: getParam("company_link_2_href", "#about"),
    },
    {
      label: getParam("company_link_3_label", "Services"),
      href: getParam("company_link_3_href", "#services"),
    },
    {
      label: getParam("company_link_4_label", "Careers"),
      href: getParam("company_link_4_href", "#"),
    },
  ];
  const supportLinks = [
    {
      label: getParam("support_link_1_label", "Contact Us"),
      href: getParam("support_link_1_href", "#contact"),
    },
    {
      label: getParam("support_link_2_label", "Privacy Policy"),
      href: getParam("support_link_2_href", "#"),
    },
    {
      label: getParam("support_link_3_label", "Terms of Service"),
      href: getParam("support_link_3_href", "#"),
    },
    {
      label: getParam("support_link_4_label", "Cookie Policy"),
      href: getParam("support_link_4_href", "#"),
    },
  ];

  // Dynamic Links
  const whatsappMessage = `Hello ${clinicName}, I would like to book an appointment.`;
  let cleanPhone = phone.replace(/\D/g, "");
  if (cleanPhone.startsWith("0")) {
    cleanPhone = `92${cleanPhone.substring(1)}`;
  } else if (!cleanPhone.startsWith("92")) {
    cleanPhone = `92${cleanPhone}`;
  }
  const whatsappLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;
  const lat = getParam("lat", "");
  const long = getParam("long", "");
  const hasCoordinates =
    lat.trim() !== "" &&
    long.trim() !== "" &&
    lat.toUpperCase() !== "N/A" &&
    long.toUpperCase() !== "N/A";
  const mapSearch = hasCoordinates ? `${lat},${long}` : address;
  const mapQuery = encodeURIComponent(mapSearch);
  const mapUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const cityFallback =
    address.split(",").map((item) => item.trim()).filter(Boolean).at(-2) ||
    address.split(",").map((item) => item.trim()).filter(Boolean).at(-1) ||
    "Lahore";

  const heroWords = `${heroTitlePre} ${heroTitleItalic} ${heroTitlePost}`.split(/\s+/).filter(Boolean);
  const featuredIdx = Math.max(0, testimonials.findIndex((t) => t.featured));
  const featuredReview = testimonials[featuredIdx];
  const otherReviews = testimonials.map((t, i) => ({ ...t, i })).filter((t) => t.i !== featuredIdx);
  const liveSocials = socialLinks.filter((s) => s.href && s.href !== "#");

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28" id="home">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="hero-fade mb-7 flex items-center gap-3 text-[0.95rem] font-medium text-ink-soft" style={{ animationDelay: "0.05s" }}>
              <span aria-hidden className="h-2 w-2 rounded-full bg-gold" />
              {heroBadge}
            </p>

            <h1 className="mb-8 font-display text-[clamp(2.6rem,6.2vw,5.4rem)] font-semibold leading-[1.02] text-teal-deep">
              {heroWords.map((w, i) => (
                <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <span className="hero-rise" style={{ animationDelay: `${0.1 + i * 0.07}s` }}>
                    {w}
                  </span>
                </span>
              ))}
            </h1>

            <p className="hero-fade mb-10 max-w-[34rem] text-lg leading-relaxed text-ink-soft" style={{ animationDelay: "0.7s" }}>
              {heroDescription} <span className="font-semibold text-ink">{clinicName}</span>.
            </p>

            <div className="hero-fade mb-14 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.85s" }}>
              <a href={ctaPrimaryHref} className="btn btn-primary">
                {ctaPrimaryText}
                <span className="arrow material-symbols-outlined !text-xl" aria-hidden>arrow_forward</span>
              </a>
              <a href={ctaSecondaryHref} className="btn btn-ghost">
                {ctaSecondaryText}
              </a>
            </div>

            <dl className="hero-fade grid max-w-xl grid-cols-3" style={{ animationDelay: "1s" }}>
              {trustStats.map((item, i) => (
                <div key={item.label} className={`pr-3 sm:pr-8 ${i > 0 ? "border-l border-line pl-4 sm:pl-8" : ""}`}>
                  <dt className="sr-only">{item.label}</dt>
                  <dd className="font-display text-2xl font-semibold text-teal-deep sm:text-3xl">{item.value}</dd>
                  <dd className="text-sm text-ink-soft">{item.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div className="hero-arch aspect-[4/5] w-full bg-mist shadow-[var(--shadow-lift)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={`${clinicName} — modern dental clinic`} className="h-full w-full object-cover" src={heroImage} fetchPriority="high" />
            </div>
            <div className="hero-fade absolute -left-2 bottom-8 flex items-center gap-3 rounded-2xl bg-enamel px-5 py-4 shadow-[var(--shadow-lift)] md:-left-8" style={{ animationDelay: "1.2s" }}>
              <span className="material-symbols-outlined text-gold" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden>star</span>
              <div>
                <div className="font-display text-xl font-semibold leading-none text-teal-deep">{ratingValue}</div>
                <div className="mt-1 text-sm text-ink-soft">{ratingLabel}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section className="bg-enamel py-24 md:py-32" id="services">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 className="mb-5 font-display text-4xl font-semibold leading-[1.08] text-teal-deep md:text-5xl">{servicesTitle}</h2>
              <p className="mb-8 max-w-sm text-ink-soft">{servicesSubtitle}</p>
              <a href="#appointment" className="btn btn-primary">
                {ctaPrimaryText}
                <span className="arrow material-symbols-outlined !text-xl" aria-hidden>arrow_forward</span>
              </a>
            </div>
          </div>

          <ul className="border-b border-line lg:col-span-8">
            {services.map((svc) => (
              <li key={svc.title} className="border-t border-line">
                <a href="#appointment" className="group flex items-center gap-5 px-1 py-6 transition-colors hover:bg-porcelain md:gap-8 md:px-4">
                  <span className="arch block h-24 w-[4.5rem] shrink-0 bg-mist md:h-28 md:w-20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={svc.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="mb-1.5 flex items-center gap-2 font-display text-xl font-semibold text-teal-deep md:text-2xl">
                      <span className="material-symbols-outlined text-teal !text-[1.35rem]" aria-hidden>{svc.icon}</span>
                      {svc.title}
                    </span>
                    <span className="block max-w-xl text-[0.97rem] leading-relaxed text-ink-soft">{svc.desc}</span>
                  </span>
                  <span className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-teal sm:flex">
                    {serviceExploreText}
                    <span className="material-symbols-outlined !text-xl transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden>arrow_forward</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════ NUMBERS + PHILOSOPHY ═══════════ */}
      <section className="bg-teal-deep py-24 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-20 grid grid-cols-2 gap-y-10 md:grid-cols-4">
            {whyStats.map((stat, i) => (
              <div key={stat.label} className={`px-0 md:px-8 ${i > 0 ? "md:border-l md:border-white/15" : "md:pl-0"} ${i % 2 === 1 ? "pl-6 border-l border-white/15 md:pl-8" : ""}`}>
                <AnimatedStat value={stat.value} label={stat.label} />
              </div>
            ))}
          </div>

          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 className="mb-6 font-display text-4xl font-semibold leading-[1.08] md:text-5xl">{philosophyTitle}</h2>
              <p className="mb-10 max-w-xl text-lg leading-relaxed text-white/75">{philosophyBody}</p>
              <ul className="space-y-4">
                {philosophyBullets.map((item) => (
                  <li key={item} className="flex items-start gap-4 text-white/90">
                    <span className="material-symbols-outlined mt-0.5 !text-xl text-gold" aria-hidden>check</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="arch mx-auto aspect-[4/5] max-w-sm bg-teal lg:max-w-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={teamImageAlt} className="h-full w-full object-cover" loading="lazy" src={sectionImage1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ DOCTOR ═══════════ */}
      <section className="py-24 md:py-32" id="about">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-12">
          <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div className="arch aspect-[4/5] bg-mist shadow-[var(--shadow-soft)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={doctorImageAlt} className="h-full w-full object-cover" loading="lazy" src={doctorImage} />
            </div>
            <div className="absolute -bottom-5 right-2 grid h-32 w-32 place-content-center rounded-full bg-gold text-center text-teal-deep shadow-[var(--shadow-lift)] md:-right-6">
              <div className="font-display text-3xl font-semibold leading-none">{doctorYearsValue}</div>
              <div className="mt-1 px-3 text-xs font-medium leading-tight">{doctorYearsLabel}</div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p className="mb-3 text-[0.95rem] font-medium text-teal">{doctorSectionTitle}</p>
            <h2 className="mb-2 font-display text-4xl font-semibold leading-[1.08] text-teal-deep md:text-5xl">{doctorName}</h2>
            <p className="mb-8 text-lg text-ink-soft">{doctorCredentials}</p>
            <p className="mb-10 max-w-xl leading-[1.75] text-ink-soft">{doctorBio}</p>
            <ul className="border-b border-line">
              {[
                { icon: "school", title: doctorQual1Title, body: doctorQual1Body },
                { icon: "verified", title: doctorQual2Title, body: doctorQual2Body },
              ].map((q) => (
                <li key={q.title} className="flex gap-4 border-t border-line py-5">
                  <span className="material-symbols-outlined mt-0.5 text-teal" aria-hidden>{q.icon}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-teal-deep">{q.title}</h3>
                    <p className="text-[0.95rem] text-ink-soft">{q.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ GALLERY ═══════════ */}
      <section className="bg-enamel py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 max-w-2xl">
            <h2 className="mb-4 font-display text-4xl font-semibold leading-[1.08] text-teal-deep md:text-5xl">{galleryTitle}</h2>
            <p className="text-ink-soft">{gallerySubtitle}</p>
          </div>
          <div className="grid auto-rows-[clamp(8.5rem,24vw,15rem)] grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {[
              { src: galleryImage1, alt: galleryImageAlt1, label: galleryLabel1, cls: "col-span-2 row-span-2" },
              { src: galleryImage2, alt: galleryImageAlt2, label: galleryLabel2, cls: "col-span-2" },
              { src: galleryImage3, alt: galleryImageAlt3, label: galleryImageAlt3, cls: "" },
              { src: galleryImage4, alt: galleryImageAlt4, label: galleryImageAlt4, cls: "" },
            ].map((g, i) => (
              <figure key={i} className={`group relative overflow-hidden rounded-3xl bg-mist ${g.cls}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={g.alt} loading="lazy" src={g.src} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                <figcaption className="absolute bottom-3 left-3 rounded-full bg-enamel/95 px-4 py-1.5 text-sm font-medium text-teal-deep backdrop-blur">
                  {g.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ REVIEWS ═══════════ */}
      <section className="bg-mist py-24 md:py-32" id="reviews">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-xl font-display text-4xl font-semibold leading-[1.08] text-teal-deep md:text-5xl">{testimonialsTitle}</h2>
            <p className="flex items-center gap-3 text-ink-soft">
              <span className="material-symbols-outlined text-gold" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden>star</span>
              <span><span className="font-display text-xl font-semibold text-teal-deep">{ratingValue}</span> {ratingLabel}</span>
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <figure className="flex flex-col justify-between rounded-[2rem] bg-teal-deep p-8 text-white md:p-12 lg:col-span-7">
              <blockquote className="mb-10 font-display text-2xl font-medium leading-snug md:text-[2rem]">
                &ldquo;{featuredReview.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={testimonialAvatars[featuredIdx]} alt="" className="h-14 w-14 rounded-full object-cover ring-2 ring-gold" />
                <div>
                  <div className="font-semibold">{featuredReview.name}</div>
                  <div className="text-sm text-teal-light">{featuredReview.role}</div>
                </div>
              </figcaption>
            </figure>

            <div className="grid gap-6 lg:col-span-5">
              {otherReviews.map((item) => (
                <figure key={item.name} className="rounded-[2rem] bg-enamel p-7 md:p-8">
                  <blockquote className="mb-6 leading-relaxed text-ink">&ldquo;{item.quote}&rdquo;</blockquote>
                  <figcaption className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={testimonialAvatars[item.i]} alt="" className="h-11 w-11 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-teal-deep">{item.name}</div>
                      <div className="text-sm text-ink-soft">{item.role}</div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ APPOINTMENT ═══════════ */}
      <section className="bg-teal-deep py-24 text-white md:py-32" id="appointment">
        <div className="mx-auto grid max-w-7xl items-start gap-14 px-5 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="mb-6 font-display text-4xl font-semibold leading-[1.08] md:text-5xl">{appointmentTitle}</h2>
            <p className="mb-12 max-w-md text-lg leading-relaxed text-white/75">{appointmentSubtitle}</p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="material-symbols-outlined text-gold" aria-hidden>schedule</span>
                <div>
                  <p className="font-semibold">{hoursTitle}</p>
                  <p className="text-sm text-white/65">{hoursSubtitle}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="material-symbols-outlined text-gold" aria-hidden>location_on</span>
                <div>
                  <p className="font-semibold">{address}</p>
                  <p className="text-sm text-white/65">{locationTag}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-[2rem] bg-enamel p-6 text-ink shadow-[var(--shadow-lift)] md:p-10 lg:col-span-7">
            <AppointmentForm
              clinicName={clinicName}
              targetPhone={cleanPhone}
              formNameLabel={formNameLabel}
              formNamePlaceholder={formNamePlaceholder}
              formPhoneLabel={formPhoneLabel}
              formPhonePlaceholder={formPhonePlaceholder}
              formServiceLabel={formServiceLabel}
              formServiceOptions={formServiceOptions}
              formDateLabel={formDateLabel}
              formTimeLabel={formTimeLabel}
              formMessageLabel={formMessageLabel}
              formMessagePlaceholder={formMessagePlaceholder}
              formSubmitText={formSubmitText}
              whatsappButtonText={whatsappButtonText}
            />
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACT ═══════════ */}
      <section className="py-24 md:py-32" id="contact">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="mb-4 font-display text-4xl font-semibold leading-[1.08] text-teal-deep md:text-5xl">{contactTitle}</h2>
            <p className="mb-10 max-w-md text-ink-soft">{contactSubtitle.replace("{city}", cityFallback)}</p>
            <ul className="border-b border-line">
              {[
                { icon: "location_on", label: contactAddressLabel, value: address, href: `https://maps.google.com/maps?q=${mapQuery}` },
                { icon: "call", label: contactPhoneLabel, value: phone, href: `tel:+${cleanPhone}` },
                { icon: "mail", label: contactEmailLabel, value: email, href: `mailto:${email}` },
              ].map((row) => (
                <li key={row.label} className="border-t border-line">
                  <a href={row.href} className="group flex gap-5 py-5">
                    <span className="material-symbols-outlined mt-0.5 text-teal" aria-hidden>{row.icon}</span>
                    <span>
                      <span className="block text-sm text-ink-soft">{row.label}</span>
                      <span className="link-draw font-medium text-teal-deep group-hover:bg-[length:100%_1.5px]">{row.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            {liveSocials.length > 0 && (
              <div className="mt-8 flex gap-3">
                {liveSocials.map((item) => (
                  <a key={item.icon} aria-label={item.icon.replace(/_/g, " ")} className="grid h-11 w-11 place-items-center rounded-full bg-mist text-teal-deep transition-colors hover:bg-teal-deep hover:text-white" href={item.href}>
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="h-[22rem] overflow-hidden rounded-[2rem] bg-mist shadow-[var(--shadow-soft)] md:h-[30rem] lg:col-span-7">
            <iframe allowFullScreen height="100%" width="100%" src={mapUrl} style={{ border: 0 }} title={`${clinicName} location`} loading="lazy" />
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-teal-deep pb-28 pt-16 text-white md:pb-10">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-12 md:px-8">
          <div className="md:col-span-5">
            <div className="mb-5 font-display text-2xl font-semibold">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt={`${clinicName} logo`} className="h-10 w-auto object-contain" />
              ) : (
                clinicName
              )}
            </div>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-white/70">{footerTagline}</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:col-span-4">
            {[
              { heading: companyHeading, items: companyLinks },
              { heading: supportHeading, items: supportLinks },
            ].map((col) => (
              <div key={col.heading}>
                <h3 className="mb-4 font-display text-base font-semibold text-gold">{col.heading}</h3>
                <ul className="space-y-3 text-[0.95rem] text-white/75">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <a className="link-draw hover:text-white" href={item.href}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <div className="md:col-span-3">
            <h3 className="mb-4 font-display text-base font-semibold text-gold">{contactHeading}</h3>
            <ul className="space-y-3 text-[0.95rem] text-white/75">
              <li>{address}</li>
              <li><a className="link-draw hover:text-white" href={`tel:+${cleanPhone}`}>{phone}</a></li>
              <li><a className="link-draw hover:text-white" href={`mailto:${email}`}>{email}</a></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-7xl border-t border-white/15 px-5 pt-6 text-sm text-white/55 md:px-8">
          © {new Date().getFullYear()} {clinicName}. {copyrightSuffix}
        </div>
      </footer>

      {/* Mobile quick actions */}
      <div className="fixed inset-x-3 bottom-3 z-40 flex gap-2 rounded-full bg-enamel p-2 shadow-[var(--shadow-lift)] md:hidden">
        <a href="#appointment" className="btn btn-primary flex-1 !min-h-11">Book a visit</a>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label={whatsappButtonText} className="btn flex-1 !min-h-11 bg-[#1faa59] text-white">
          WhatsApp
        </a>
      </div>
    </>
  );
}
