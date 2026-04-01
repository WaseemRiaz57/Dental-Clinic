import type { Metadata } from "next";
import AnimatedStat from "../components/AnimatedStat";
import AppointmentForm from "../components/AppointmentForm";

/* ═══════════════════════════════════════════════════════════
   PIXEL-PERFECT STITCH REPLICA — 100% DYNAMIC
   Matches: projects/6076570405638608677/screens/142db5f0da084108b7a5e50c0ca5d521
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
  const galleryButtonText = getParam("gallery_button_text", "View All Works");
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

  return (
    <>
      {/* ══════════════════════════════════════════
          HERO SECTION (exact Stitch replica)
          ══════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 overflow-hidden mesh-accent" id="home">
        {/* Abstract Circles */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#4DB8E8]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[0%] left-[-5%] w-[400px] h-[400px] bg-[#1B3A6B]/5 rounded-full blur-[80px]" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="z-10 reveal-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d1e4ff] text-[#001d35] text-xs font-bold mb-6 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0061a2]" /> {heroBadge}
            </div>
            <h1 className="stitch-display text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              {heroTitlePre} <span className="italic font-normal">{heroTitleItalic}</span> {heroTitlePost}
            </h1>
            <p className="text-[#44474f] text-lg mb-10 max-w-lg leading-relaxed">
              {heroDescription}{" "}
              <span className="font-semibold text-[#1B3A6B]">{clinicName}</span>.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <a href={ctaPrimaryHref} className="bg-[#002452] text-white px-8 py-4 rounded-[10px] font-bold text-base hover:shadow-lg transition-all">
                {ctaPrimaryText}
              </a>
              <a href={ctaSecondaryHref} className="border-2 border-[#002452] text-[#002452] px-8 py-4 rounded-[10px] font-bold text-base hover:bg-[#002452]/5 transition-all">
                {ctaSecondaryText}
              </a>
            </div>
            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-[#c4c6d0]/30">
              {trustStats.map((item) => (
                <div key={item.label}>
                  <div className="text-3xl font-bold stitch-display">{item.value}</div>
                  <div className="text-sm text-[#44474f]">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group reveal-up reveal-delay-2">
            <div className="relative w-full aspect-[10/11] rounded-[16px] overflow-hidden border-[12px] border-white shadow-2xl z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={`${clinicName} — modern dental clinic`}
                className="w-full h-full object-cover"
                src={heroImage}
              />
            </div>
            {/* Floating Rating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-[16px] editorial-shadow z-20 flex items-center gap-4 border border-[#4DB8E8]/10">
              <div className="w-12 h-12 rounded-full bg-[#d1e4ff] flex items-center justify-center text-[#002452]">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <div>
                <div className="font-bold text-lg text-[#002452]">{ratingValue}</div>
                <div className="text-xs text-[#44474f] uppercase tracking-widest font-bold">{ratingLabel}</div>
              </div>
            </div>
            {/* Artistic Circle */}
            <div className="absolute -top-10 -right-10 w-48 h-48 border border-[#4DB8E8]/30 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES SECTION
          ══════════════════════════════════════════ */}
      <section className="py-28 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 reveal-up">
            <h2 className="stitch-display text-4xl lg:text-5xl font-bold mb-4">{servicesTitle}</h2>
            <p className="text-[#44474f] max-w-2xl mx-auto">{servicesSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, idx) => (
              <div key={svc.title} className={`group bg-[#f0f4fb] rounded-[16px] overflow-hidden border border-[#4DB8E8]/20 hover:border-[#0061a2]/40 transition-all duration-300 reveal-up reveal-delay-${(idx % 3) + 1}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={svc.image}
                  alt={`${svc.title} service`}
                  className="h-48 w-full object-cover rounded-t-[16px]"
                />
                <div className="p-8">
                  <span className="material-symbols-outlined text-4xl text-[#0061a2] mb-6 block">{svc.icon}</span>
                  <h3 className="text-xl font-bold text-[#002452] mb-4">{svc.title}</h3>
                  <p className="text-[#44474f] text-sm leading-relaxed mb-6">{svc.desc}</p>
                  <a className="text-[#0061a2] font-bold text-xs uppercase tracking-widest flex items-center gap-2" href="#">
                    {serviceExploreText} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY CHOOSE US (Navy Gradient)
          ══════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-[#1B3A6B] to-[#2E7EC4] text-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 text-center reveal-up">
            {whyStats.map((stat) => (
              <div key={stat.label} className="p-4">
                <AnimatedStat value={stat.value} label={stat.label} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-up">
              <h2 className="stitch-display !text-white text-4xl font-bold mb-8 italic">{philosophyTitle}</h2>
              <p className="text-lg text-white/80 mb-10 leading-relaxed">
                {philosophyBody}
              </p>
              <ul className="space-y-4">
                {philosophyBullets.map((item) => (
                  <li key={item} className="flex items-center gap-4 text-white/90">
                    <span className="material-symbols-outlined text-[#4DB8E8]">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-[20px] overflow-hidden group reveal-up reveal-delay-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={teamImageAlt}
                className="w-full h-[400px] object-cover opacity-80 group-hover:opacity-100 transition-all"
                loading="lazy"
                src={sectionImage1}
              />
              <div className="absolute inset-0 bg-[#002452]/20 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer border border-white/40 hover:bg-white/30 transition-all">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MEET THE DOCTOR
          ══════════════════════════════════════════ */}
      <section className="py-28 bg-[#f7f9ff]" id="about">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="relative reveal-up">
              <div className="w-full aspect-[4/5] bg-[#dfe3ea] rounded-[20px] overflow-hidden editorial-shadow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={doctorImageAlt}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 border-[3px] border-[#4DB8E8]"
                  src={doctorImage}
                />
              </div>
              <div className="absolute -bottom-10 -right-10 hidden lg:block bg-[#4DB8E8] text-white p-10 rounded-[20px] shadow-xl">
                <div className="stitch-display !text-white text-3xl font-bold">{doctorYearsValue}</div>
                <div className="text-xs uppercase font-bold tracking-widest">{doctorYearsLabel}</div>
              </div>
            </div>
            <div className="reveal-up reveal-delay-2">
              <h2 className="stitch-display text-5xl font-bold mb-4 leading-tight">{doctorSectionTitle}</h2>
              <h3 className="text-2xl text-[#0061a2] mb-8">{doctorName}, <span className="text-lg opacity-70">{doctorCredentials}</span></h3>
              <p className="text-[#44474f] leading-relaxed mb-8">
                {doctorBio}
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1b3a6b] flex items-center justify-center text-[#89a5dd] shrink-0">
                    <span className="material-symbols-outlined">school</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#002452]">{doctorQual1Title}</h4>
                    <p className="text-sm text-[#44474f]">{doctorQual1Body}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1b3a6b] flex items-center justify-center text-[#89a5dd] shrink-0">
                    <span className="material-symbols-outlined">verified</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#002452]">{doctorQual2Title}</h4>
                    <p className="text-sm text-[#44474f]">{doctorQual2Body}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GALLERY (Masonry Layout)
          ══════════════════════════════════════════ */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 reveal-up">
            <div>
              <h2 className="stitch-display text-4xl font-bold mb-4">{galleryTitle}</h2>
              <p className="text-[#44474f]">{gallerySubtitle}</p>
            </div>
            <div className="h-px bg-[#c4c6d0]/30 flex-grow mx-8 hidden md:block mb-4" />
            <button className="text-[#002452] font-bold uppercase tracking-widest text-xs flex items-center gap-2">
              {galleryButtonText} <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 h-[800px] reveal-up reveal-delay-1">
            {/* Large featured image */}
            <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-[16px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={galleryImageAlt1} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" src={galleryImage1} />
              <div className="absolute inset-0 bg-[#002452]/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <span className="text-white stitch-display !text-white text-2xl italic">{galleryLabel1}</span>
              </div>
            </div>
            {/* Surgery Room */}
            <div className="col-span-2 row-span-1 relative group overflow-hidden rounded-[16px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={galleryImageAlt2} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={galleryImage2} />
              <div className="absolute inset-0 bg-[#0061a2]/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <span className="text-white stitch-display !text-white text-2xl italic">{galleryLabel2}</span>
              </div>
            </div>
            {/* Equipment */}
            <div className="relative group overflow-hidden rounded-[16px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={galleryImageAlt3} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={galleryImage3} />
            </div>
            {/* X-ray Room */}
            <div className="relative group overflow-hidden rounded-[16px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={galleryImageAlt4} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={galleryImage4} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
          ══════════════════════════════════════════ */}
      <section className="py-28 bg-[#f0f4fb]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="stitch-display text-4xl font-bold text-center mb-20 italic reveal-up">{testimonialsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, idx) => (
              <div
                key={item.name}
                className={`bg-white p-10 rounded-[16px] editorial-shadow relative reveal-up reveal-delay-${idx + 1} ${
                  item.featured ? "scale-105 z-10 border-t-4 border-[#0061a2]" : ""
                }`}
              >
                <div className="flex text-[#4DB8E8] mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="text-[#171c21] text-lg leading-relaxed mb-8">&ldquo;{item.quote}&rdquo;</p>
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={testimonialAvatars[idx]}
                    alt={`${item.name} profile`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#4DB8E8]"
                  />
                  <div>
                    <div className="font-bold text-[#002452]">{item.name}</div>
                    <div className="text-xs text-[#44474f] uppercase font-bold">{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          APPOINTMENT SECTION (with booking form)
          ══════════════════════════════════════════ */}
      <section className="py-28 bg-[#002452] relative overflow-hidden" id="appointment">
        <div className="absolute inset-0 mesh-accent opacity-20" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="text-white reveal-up">
              <h2 className="stitch-display !text-white text-5xl font-bold mb-8">{appointmentTitle}</h2>
              <p className="text-xl text-white/70 mb-12">{appointmentSubtitle}</p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[#0061a2]">schedule</span>
                  <div>
                    <h4 className="font-bold">{hoursTitle}</h4>
                    <p className="text-sm text-white/60">{hoursSubtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[#0061a2]">location_on</span>
                  <div>
                    <h4 className="font-bold">{address}</h4>
                    <p className="text-sm text-white/60">{locationTag}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white p-8 md:p-12 rounded-[24px] editorial-shadow reveal-up reveal-delay-2">
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
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT & MAP SECTION
          ══════════════════════════════════════════ */}
      <section className="py-28 bg-white" id="contact">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-12 reveal-up">
              <div>
                <h2 className="stitch-display text-4xl font-bold mb-4">{contactTitle}</h2>
                <p className="text-[#44474f]">{contactSubtitle.replace("{city}", cityFallback)}</p>
              </div>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <span className="material-symbols-outlined text-[#0061a2] text-2xl">location_on</span>
                  <div>
                    <h4 className="font-bold text-[#002452] mb-1">{contactAddressLabel}</h4>
                    <p className="text-[#44474f] text-sm leading-relaxed">{address}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <span className="material-symbols-outlined text-[#0061a2] text-2xl">call</span>
                  <div>
                    <h4 className="font-bold text-[#002452] mb-1">{contactPhoneLabel}</h4>
                    <p className="text-[#44474f] text-sm leading-relaxed">{phone}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <span className="material-symbols-outlined text-[#0061a2] text-2xl">mail</span>
                  <div>
                    <h4 className="font-bold text-[#002452] mb-1">{contactEmailLabel}</h4>
                    <p className="text-[#44474f] text-sm">{email}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                {socialLinks.map((item) => (
                  <a key={item.icon} className="w-10 h-10 rounded-full bg-[#1b3a6b] flex items-center justify-center text-[#89a5dd] hover:bg-[#0061a2] hover:text-white transition-all" href={item.href}>
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="h-[500px] rounded-[24px] overflow-hidden bg-[#dfe3ea] border border-[#4DB8E8]/20 editorial-shadow reveal-up reveal-delay-2">
              <iframe
                allowFullScreen
                height="100%"
                src={mapUrl}
                style={{ border: 0 }}
                width="100%"
                title={`${clinicName} location`}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════ */}
      <footer className="bg-[#1B3A6B] text-white w-full pt-16 pb-8 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8 max-w-7xl mx-auto">
          <div>
            <div className="stitch-display !text-white text-2xl font-bold mb-6 uppercase flex items-center">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoUrl}
                  alt={`${clinicName} Logo`}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                clinicName
              )}
            </div>
            <p className="text-sm leading-relaxed text-white/70 mb-8 max-w-xs">
              {footerTagline}
            </p>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-md border border-white/20 flex items-center justify-center hover:border-[#4DB8E8] transition-all cursor-pointer">
                <span className="material-symbols-outlined text-sm">social_leaderboard</span>
              </div>
              <div className="w-8 h-8 rounded-md border border-white/20 flex items-center justify-center hover:border-[#4DB8E8] transition-all cursor-pointer">
                <span className="material-symbols-outlined text-sm">alternate_email</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">{companyHeading}</h4>
              <ul className="space-y-4 text-sm text-white/70">
                {companyLinks.map((item) => (
                  <li key={item.label}><a className="hover:text-[#4DB8E8] transition-all" href={item.href}>{item.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">{supportHeading}</h4>
              <ul className="space-y-4 text-sm text-white/70">
                {supportLinks.map((item) => (
                  <li key={item.label}><a className="hover:text-[#4DB8E8] transition-all" href={item.href}>{item.label}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">{contactHeading}</h4>
            <div className="space-y-4 text-sm text-white/70">
              <p className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#4DB8E8]">location_on</span>
                {address}
              </p>
              <p className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#4DB8E8]">call</span>
                {phone}
              </p>
              <p className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#4DB8E8]">mail</span>
                {email}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/5 text-center px-8">
          <p className="text-sm text-white/50">© {new Date().getFullYear()} {clinicName}. {copyrightSuffix}</p>
        </div>
      </footer>

      {/* Floating Mobile CTA */}
      <a
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-[#0061a2] text-white rounded-full flex items-center justify-center shadow-xl z-50 animate-bounce"
        href={whatsappLink}
      >
        <span className="material-symbols-outlined">call</span>
      </a>
    </>
  );
}
