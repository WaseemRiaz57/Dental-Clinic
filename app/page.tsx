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
      "/team.jpg"
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
      "/lounge.jpg"
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
  const tints = ["t-mon", "t-tue", "t-wed", "t-thu", "t-fri", "t-sat"];
  const reviewTints = ["t-wed", "t-fri", "t-sat"];

  return (
    <>
      {/* ═══════════ HERO · Stage: the clinic's care label on a plastic slab ═══════════ */}
      <section className="relative overflow-clip pb-16 pt-28 md:pb-20 md:pt-32" id="home" data-hero>
        <div className="light-panes" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="container relative grid items-center gap-14 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-6">
            <h1 className="mb-7 text-display-s">
              {heroWords.map((w, i) => (
                <span key={i} className="mr-[0.2em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <span className="hero-rise" style={{ animationDelay: `${0.1 + i * 0.07}s` }}>{w}</span>
                </span>
              ))}
            </h1>
            <p className="lead hero-fade mb-9" style={{ animationDelay: "0.7s" }}>
              {heroDescription} {clinicName}.
            </p>
            <div className="hero-fade flex flex-wrap gap-4" style={{ animationDelay: "0.85s" }}>
              <a href={ctaPrimaryHref} className="btn btn--primary">{ctaPrimaryText}</a>
              <a href={ctaSecondaryHref} className="btn">{ctaSecondaryText}</a>
            </div>
          </div>

          <div className="hero-fade relative min-w-0 lg:col-span-6" style={{ animationDelay: "0.5s", perspective: "1200px" }}>
            <div data-slab className="plastic t-thu p-3 will-change-transform md:p-4" style={{ transformStyle: "preserve-3d" }}>
              <div data-slot="hero" data-alt={`${clinicName} — modern dental clinic`} className="aspect-[5/4] rounded-input">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={`${clinicName} — modern dental clinic`} src={heroImage} fetchPriority="high" />
              </div>
            </div>
            <div data-label className="label-card absolute bottom-4 left-4 w-[min(20rem,78%)]">
              <div className="p-4">
                <p className="mono mb-1 text-sm text-muted">{heroBadge}</p>
                <p className="font-display text-xl font-bold leading-tight">{clinicName}</p>
                <p className="mono mt-3 text-sm">{hoursTitle}</p>
                <p className="mono text-sm text-muted">{hoursSubtitle}</p>
              </div>
              <div className="label-stub flex items-center justify-between gap-3 p-4">
                <ul className="mono space-y-0.5 text-sm text-ink-2">
                  {trustStats.map((t) => (<li key={t.label}>{t.value} {t.label}</li>))}
                </ul>
                <div data-stamp className="stamp shrink-0">
                  <span className="text-lg">{ratingValue}</span>
                  <span className="text-xs">{ratingLabel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICES · the lidded tray ═══════════ */}
      <section className="py-[var(--section-gap)]" id="services">
        <div className="container">
          <div className="mb-16 grid gap-6 md:grid-cols-12 md:items-end">
            <h2 className="md:col-span-7">{servicesTitle}</h2>
            <p className="lead text-ink-2 md:col-span-5 md:justify-self-end">{servicesSubtitle}</p>
          </div>

          <ul className="tray grid gap-5 p-4 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
            {services.map((svc, idx) => (
              <li key={svc.title} className={`cell relative ${tints[idx % tints.length]}`}>
                <a href="#appointment" className="plastic group flex h-full flex-col gap-4 p-4 no-underline transition-transform duration-300 ease-[var(--ease-out)] hover:-translate-y-1">
                  <div data-slot={`svc-${idx}`} className="aspect-[16/10] rounded-input">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={svc.image} alt={`${svc.title} service`} loading="lazy" />
                  </div>
                  <div className="flex flex-1 flex-col px-1 pb-1">
                    <span className="material-symbols-outlined mb-2 text-ink-2" aria-hidden>{svc.icon}</span>
                    <h3 className="mb-2">{svc.title}</h3>
                    <p className="mb-5 text-ink-2">{svc.desc}</p>
                    <span className="link-line mt-auto self-start font-medium">{serviceExploreText}</span>
                  </div>
                </a>
                <div className="lid" data-lid aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════ STATEMENT · the ink band ═══════════ */}
      <section className="on-ink bg-ink py-[var(--section-gap-s)] text-paper">
        <div className="container">
          <dl className="mb-20 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {whyStats.map((stat, i) => (
              <div key={stat.label} className={`min-w-0 ${i > 0 ? "md:border-l md:border-ink-2 md:pl-8" : ""} ${i % 2 === 1 ? "border-l border-ink-2 pl-6" : ""}`}>
                <AnimatedStat value={stat.value} label={stat.label} />
              </div>
            ))}
          </dl>

          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-7">
              <h2 className="mb-6 !max-w-[22ch] text-paper" data-words>{philosophyTitle}</h2>
              <p className="lead mb-10 text-accent-soft" data-words>{philosophyBody}</p>
              <ul className="flex flex-wrap gap-3">
                {philosophyBullets.map((item) => (
                  <li key={item} data-rise className="flex items-center gap-2 rounded-pill bg-accent-soft py-2 pl-3 pr-4 text-ink">
                    <span className="material-symbols-outlined !text-xl text-accent-deep" aria-hidden>check</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0 lg:col-span-5">
              <div data-open data-slot="team" data-alt={teamImageAlt} className="aspect-[4/5] rounded-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img data-drift alt={teamImageAlt} loading="lazy" src={sectionImage1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ DOCTOR · two labels beside a portrait ═══════════ */}
      <section className="py-[var(--section-gap)]" id="about">
        <div className="container grid items-center gap-16 lg:grid-cols-12">
          <div className="relative min-w-0 lg:col-span-5">
            <div data-open data-slot="doctor" data-alt={doctorImageAlt} className="aspect-[4/5] rounded-card shadow-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img data-drift alt={doctorImageAlt} loading="lazy" src={doctorImage} />
            </div>
            <div data-stamp className="stamp absolute -bottom-5 right-4 z-[2] bg-paper shadow-lift md:-right-6">
              <span className="text-xl">{doctorYearsValue}</span>
              <span className="text-xs">{doctorYearsLabel}</span>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-7 lg:pl-8">
            <h2 className="mb-3">{doctorName}</h2>
            <p className="lead mb-8 text-ink-2">{doctorSectionTitle}, {doctorCredentials}</p>
            <p className="mb-10 text-ink-2">{doctorBio}</p>
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { icon: "school", title: doctorQual1Title, body: doctorQual1Body, tint: "t-wed" },
                { icon: "verified", title: doctorQual2Title, body: doctorQual2Body, tint: "t-fri" },
              ].map((q) => (
                <div key={q.title} data-rise className={`plastic ${q.tint} p-3`}>
                  <div className="label-card p-4">
                    <span className="material-symbols-outlined mb-3 text-accent" aria-hidden>{q.icon}</span>
                    <h3 className="mb-1">{q.title}</h3>
                    <p className="label-stub mono mt-3 pt-3 text-sm text-muted">{q.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ GALLERY · pinned, travels sideways ═══════════ */}
      <section className="hscroll bg-paper-2 py-[var(--section-gap-s)] md:py-0" data-hscroll>
        <div className="container mb-10 md:mb-12">
          <h2 className="mb-3">{galleryTitle}</h2>
          <p className="lead text-ink-2">{gallerySubtitle}</p>
        </div>
        <div className="container md:!max-w-none md:!p-0">
          <div className="htrack" data-htrack>
            {[
              { src: galleryImage1, alt: galleryImageAlt1, label: galleryLabel1, tint: "t-thu", ratio: "aspect-[4/3]" },
              { src: galleryImage2, alt: galleryImageAlt2, label: galleryLabel2, tint: "t-fri", ratio: "aspect-[4/3]" },
              { src: galleryImage3, alt: galleryImageAlt3, label: galleryImageAlt3, tint: "t-wed", ratio: "aspect-[4/3]" },
              { src: galleryImage4, alt: galleryImageAlt4, label: galleryImageAlt4, tint: "t-sat", ratio: "aspect-[4/3]" },
            ].map((g, i) => (
              <figure key={i} className={`hitem plastic ${g.tint} m-0 min-w-0 p-3`}>
                <div data-slot={`gal-${i}`} data-alt={g.alt} className={`${g.ratio} rounded-input`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={g.alt} src={g.src} />
                </div>
                <figcaption className="px-1 pt-3 text-sm text-ink-2">{g.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ REVIEWS · labels from patients ═══════════ */}
      <section className="py-[var(--section-gap)]" id="reviews">
        <div className="container">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <h2>{testimonialsTitle}</h2>
            <p className="mono text-ink-2">{ratingValue} {ratingLabel}</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <figure data-rise className={`plastic ${reviewTints[featuredIdx % 3]} m-0 p-3 lg:col-span-7`}>
              <div className="label-card flex h-full flex-col justify-between p-7 md:p-10">
                <blockquote className="mb-10 m-0 font-display text-2xl font-bold leading-snug tracking-[var(--tracking-display)] md:text-3xl">
                  &ldquo;{featuredReview.quote}&rdquo;
                </blockquote>
                <figcaption className="label-stub flex items-center gap-4 pt-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <span data-slot className="block h-14 w-14 shrink-0 rounded-pill"><img src={testimonialAvatars[featuredIdx]} alt="" /></span>
                  <div>
                    <div className="font-medium">{featuredReview.name}</div>
                    <div className="mono text-sm text-muted">{featuredReview.role}</div>
                  </div>
                </figcaption>
              </div>
            </figure>
            <div className="grid gap-6 lg:col-span-5">
              {otherReviews.map((item) => (
                <figure key={item.name} data-rise className={`plastic ${reviewTints[item.i % 3]} m-0 p-3`}>
                  <div className="label-card p-6">
                    <blockquote className="m-0 mb-5">&ldquo;{item.quote}&rdquo;</blockquote>
                    <figcaption className="label-stub flex items-center gap-3 pt-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <span data-slot className="block h-11 w-11 shrink-0 rounded-pill"><img src={testimonialAvatars[item.i]} alt="" /></span>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="mono text-sm text-muted">{item.role}</div>
                      </div>
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ APPOINTMENT · the first step, in a sunken tray ═══════════ */}
      <section className="bg-paper-3 py-[var(--section-gap)]" id="appointment">
        <div className="container grid items-start gap-14 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-5">
            <h2 className="mb-6">{appointmentTitle}</h2>
            <p className="lead mb-10 text-ink-2">{appointmentSubtitle}</p>
            <div className="label-card p-5">
              <p className="mono">{hoursTitle}</p>
              <p className="mono text-sm text-muted">{hoursSubtitle}</p>
              <p className="label-stub mt-4 pt-4">{address}</p>
              <p className="mono text-sm text-muted">{locationTag}</p>
            </div>
          </div>
          <div className="tray min-w-0 bg-paper p-6 md:p-10 lg:col-span-7" data-rise>
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
      <section className="py-[var(--section-gap)]" id="contact">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-5">
            <h2 className="mb-4">{contactTitle}</h2>
            <p className="lead mb-10 text-ink-2">{contactSubtitle.replace("{city}", cityFallback)}</p>
            <ul className="m-0 list-none border-b border-rule p-0">
              {[
                { icon: "location_on", label: contactAddressLabel, value: address, href: `https://maps.google.com/maps?q=${mapQuery}` },
                { icon: "call", label: contactPhoneLabel, value: phone, href: `tel:+${cleanPhone}`, mono: true },
                { icon: "mail", label: contactEmailLabel, value: email, href: `mailto:${email}`, mono: true },
              ].map((row) => (
                <li key={row.label} data-rise className="border-t border-rule">
                  <a href={row.href} className="flex gap-5 py-5 no-underline">
                    <span className="material-symbols-outlined mt-0.5 text-accent" aria-hidden>{row.icon}</span>
                    <span className="min-w-0">
                      <span className="block text-sm text-muted">{row.label}</span>
                      <span className={`link-line break-words font-medium ${row.mono ? "mono" : ""}`}>{row.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            {liveSocials.length > 0 && (
              <div className="mt-8 flex gap-3">
                {liveSocials.map((item) => (
                  <a key={item.icon} aria-label={item.icon.replace(/_/g, " ")} className="btn btn--sm !px-3" href={item.href}>
                    <span className="material-symbols-outlined" aria-hidden>{item.icon}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="plastic t-fri h-[22rem] min-w-0 p-3 md:h-[30rem] lg:col-span-7">
            <iframe allowFullScreen height="100%" width="100%" src={mapUrl} style={{ border: 0, borderRadius: "10px" }} title={`${clinicName} location`} loading="lazy" />
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="on-ink bg-ink pb-28 pt-16 text-paper md:pb-10">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-4">
            <div className="mb-5 font-display text-2xl font-bold">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt={`${clinicName} logo`} className="h-10 w-auto object-contain" />
              ) : (
                clinicName
              )}
            </div>
            <p className="max-w-sm text-accent-soft">{footerTagline}</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 lg:col-span-4 lg:col-start-5">
            {[
              { heading: companyHeading, items: companyLinks },
              { heading: supportHeading, items: supportLinks },
            ].map((col) => (
              <div key={col.heading}>
                <h3 className="mb-4 text-md text-paper">{col.heading}</h3>
                <ul className="m-0 list-none space-y-3 p-0 text-accent-soft">
                  {col.items.map((item) => (
                    <li key={item.label}><a className="link-line whitespace-nowrap" href={item.href}>{item.label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <div className="min-w-0 lg:col-span-4">
            <h3 className="mb-4 text-md text-paper">{contactHeading}</h3>
            <ul className="m-0 list-none space-y-3 p-0 text-accent-soft">
              <li>{address}</li>
              <li><a className="link-line mono" href={`tel:+${cleanPhone}`}>{phone}</a></li>
              <li className="break-all"><a className="link-line mono" href={`mailto:${email}`}>{email}</a></li>
            </ul>
          </div>
        </div>
        <div className="container mt-14 border-t border-ink-2 pt-6 text-sm text-accent-soft">
          © {new Date().getFullYear()} {clinicName}. {copyrightSuffix}
        </div>
      </footer>

      {/* Mobile quick actions */}
      <div className="fixed inset-x-3 bottom-3 z-[200] flex gap-2 rounded-card bg-paper p-2 shadow-lift md:hidden">
        <a href="#appointment" className="btn btn--primary btn--sm flex-1">Book a visit</a>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label={whatsappButtonText} className="btn btn--sm flex-1">WhatsApp</a>
      </div>
    </>
  );
}
