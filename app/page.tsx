import Image from "next/image";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   PIXEL-PERFECT STITCH REPLICA — 100% DYNAMIC
   Matches: projects/6076570405638608677/screens/142db5f0da084108b7a5e50c0ca5d521
   All clinic data injected via URL searchParams.
   ═══════════════════════════════════════════════════════════ */

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;

  // ── Dynamic Data ──
  const clinicName = params.name ? String(params.name) : "Premium Dental Care";
  const address = params.address ? String(params.address) : "Main Boulevard, Healthcare District";
  const city = params.city ? String(params.city) : "Lahore";
  const phone = params.phone ? String(params.phone) : "+92 300 0000000";
  const mapQuery = encodeURIComponent(`${clinicName}, ${address}, ${city}`);
  const whatsappNumber = phone.replace(/[^0-9]/g, "");

  // ── Preserved query string for internal links ──
  const paramString = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined) as [string, string][]
  ).toString();
  const qs = paramString ? `?${paramString}` : "";

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
              <span className="w-1.5 h-1.5 rounded-full bg-[#0061a2]" /> Modern Dentistry in {city}
            </div>
            <h1 className="stitch-display text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Your <span className="italic font-normal">Brightest</span> Smile Deserves The Best Care
            </h1>
            <p className="text-[#44474f] text-lg mb-10 max-w-lg leading-relaxed">
              Experience world-class dental solutions with a touch of editorial elegance at{" "}
              <span className="font-semibold text-[#1B3A6B]">{clinicName}</span>. We combine clinical precision with patient-centric comfort.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#appointment" className="bg-[#002452] text-white px-8 py-4 rounded-[10px] font-bold text-base hover:shadow-lg transition-all">
                Book Appointment
              </a>
              <a href="#services" className="border-2 border-[#002452] text-[#002452] px-8 py-4 rounded-[10px] font-bold text-base hover:bg-[#002452]/5 transition-all">
                Our Services
              </a>
            </div>
            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-[#c4c6d0]/30">
              <div>
                <div className="text-3xl font-bold stitch-display">500+</div>
                <div className="text-sm text-[#44474f]">Happy Patients</div>
              </div>
              <div>
                <div className="text-3xl font-bold stitch-display">10+</div>
                <div className="text-sm text-[#44474f]">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold stitch-display">Modern</div>
                <div className="text-sm text-[#44474f]">Equipment</div>
              </div>
            </div>
          </div>

          <div className="relative group reveal-up reveal-delay-2">
            <div className="relative w-full aspect-[10/11] rounded-[16px] overflow-hidden border-[12px] border-white shadow-2xl z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={`${clinicName} — modern dental clinic`}
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEOMkHNm52wEe6K7rC2MXmlVdkej2DErBpGLit_BDSKgNd-j1VIYUI6-j9k8aib7GRZumNWwWr_3YpclpzIJ9rp4Wj0FNnZrAUTbtHEukcfRWj5-egqfG2iudAYjtlLrgle0lYbORxmr1blbOcxKsK2M7gvzwlFdEA3CeIQupQ0l_D_zbTmfkoG8gyd80vfJcLMZuZhwK3DkbZaPSphowGy4_Hbt0F4sykSopjGz4PQEPq9WA3o6CUSlh3xIaeOmUOsiGW6Y9Vc2U"
              />
            </div>
            {/* Floating Rating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-[16px] editorial-shadow z-20 flex items-center gap-4 border border-[#4DB8E8]/10">
              <div className="w-12 h-12 rounded-full bg-[#d1e4ff] flex items-center justify-center text-[#002452]">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <div>
                <div className="font-bold text-lg text-[#002452]">4.9/5.0</div>
                <div className="text-xs text-[#44474f] uppercase tracking-widest font-bold">Patient Satisfaction</div>
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
            <h2 className="stitch-display text-4xl lg:text-5xl font-bold mb-4">Elite Dental Solutions</h2>
            <p className="text-[#44474f] max-w-2xl mx-auto">Comprehensive care tailored to your unique anatomy using the latest clinical advancements.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "dentistry", title: "General Dentistry", desc: "Regular checkups and cleanings to maintain your oral health foundation and prevent future issues." },
              { icon: "auto_awesome", title: "Teeth Whitening", desc: "Professional bleaching systems that deliver noticeable results safely and effectively in just one visit." },
              { icon: "orthopedics", title: "Braces & Aligners", desc: "Modern orthodontic solutions including clear aligners and traditional braces for a perfectly aligned smile." },
              { icon: "medical_services", title: "Dental Implants", desc: "Permanent, natural-looking tooth replacements that restore both function and facial aesthetics." },
              { icon: "clinical_notes", title: "Veneers", desc: "Custom-crafted porcelain shells to cover imperfections and create a flawless, Hollywood-style smile." },
              { icon: "health_metrics", title: "Root Canal", desc: "Gentle, pain-free endodontic therapy to save natural teeth and eliminate infection at the root." },
            ].map((svc, idx) => (
              <div key={svc.title} className={`group bg-[#f0f4fb] p-8 rounded-[16px] border-l-4 border-transparent hover:border-[#0061a2] transition-all duration-300 reveal-up reveal-delay-${(idx % 3) + 1}`}>
                <span className="material-symbols-outlined text-4xl text-[#0061a2] mb-6 block">{svc.icon}</span>
                <h3 className="text-xl font-bold text-[#002452] mb-4">{svc.title}</h3>
                <p className="text-[#44474f] text-sm leading-relaxed mb-6">{svc.desc}</p>
                <a className="text-[#0061a2] font-bold text-xs uppercase tracking-widest flex items-center gap-2" href="#">
                  Explore <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
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
            {[
              { value: "15k+", label: "Successful Surgeries" },
              { value: "100%", label: "Pain Management" },
              { value: "24/7", label: "Emergency Support" },
              { value: "12+", label: "Specialist Doctors" },
            ].map((stat) => (
              <div key={stat.label} className="p-4">
                <div className="text-5xl font-bold mb-2 stitch-display !text-white">{stat.value}</div>
                <div className="text-white/70 text-sm uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-up">
              <h2 className="stitch-display !text-white text-4xl font-bold mb-8 italic">Our Clinical Philosophy</h2>
              <p className="text-lg text-white/80 mb-10 leading-relaxed">
                At {clinicName}, we treat dentistry as an art form supported by rigorous science. Our mission is to provide an anxiety-free environment where clinical excellence meets compassionate care.
              </p>
              <ul className="space-y-4">
                {[
                  "Painless Procedures with Sedation Options",
                  "Flexible Payment Plans & Insurance Support",
                  "Affordable Pricing without Quality Compromise",
                  "PMDC Registered Specialists",
                  "Bilingual Consultations (English & Urdu)",
                ].map((item) => (
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
                alt={`${clinicName} team`}
                className="w-full h-[400px] object-cover opacity-80 group-hover:opacity-100 transition-all"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcmAqNia40LJX6p94VSZbsaecfAtPSIlTAd9joTJaIzwqQt43xnHLosHmRz0Bn_uJW3rEmB1DzlSeXvAMNEh34A7gDyZV9v6jyASIx9B-J5UWhtOVj_R5TBDv5C1lTrbUBFJ2qtlmx2HZlJmwPIXD2bboiTFzK6teHgXh3gjJztCPMh65O0mDTS6sPkrNKI4HBlrTv1SJE34w8eZqIuAFMxeWbgmDxLvFeWeYba1nZ5K5K-zfw750XfVgQpZtLdhKtWc_MaCInkCw"
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
                  alt="Lead Clinician"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 border-[3px] border-[#4DB8E8]"
                  src="https://lh3.googleusercontent.com/aida/ADBb0ugCnAmN7jFghuy0jih5zyUpL-h283x5C8DnhLdkU5gL-ejccPxYL3vD2px2AnCrt0gqyYIGP2XtEnKlhXSI-tnXHUHukB8zxHk5xaBr-6ZVaC0Tkgox21VGBnM2GOkONqa4FDMetLTJceTXbpb1BH4_VVMpnmhN2TAtAl3osUR4gwqNw2jpSRkGxD6DeJdlfgW9yBrYn1KfXgpI0xWwIUyPuL02-C1m1SCQSHHDZvkQG4rets_BCeQkts6eiTAAwzcEN76MQ6-laQ"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 hidden lg:block bg-[#4DB8E8] text-white p-10 rounded-[20px] shadow-xl">
                <div className="stitch-display !text-white text-3xl font-bold">15+</div>
                <div className="text-xs uppercase font-bold tracking-widest">Years of Practice</div>
              </div>
            </div>
            <div className="reveal-up reveal-delay-2">
              <h2 className="stitch-display text-5xl font-bold mb-4 leading-tight">Lead Clinician</h2>
              <h3 className="text-2xl text-[#0061a2] mb-8">Dr. Mohsin Saeed, <span className="text-lg opacity-70">BDS, FCPS</span></h3>
              <p className="text-[#44474f] leading-relaxed mb-8">
                Dr. Saeed is a renowned consultant oral surgeon with over 15 years of dedicated practice. Specializing in advanced restorative procedures and cosmetic transformations, he brings a unique blend of surgical precision and artistic vision to every treatment plan.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1b3a6b] flex items-center justify-center text-[#89a5dd] shrink-0">
                    <span className="material-symbols-outlined">school</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#002452]">Fellowship (FCPS)</h4>
                    <p className="text-sm text-[#44474f]">College of Physicians and Surgeons Pakistan</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1b3a6b] flex items-center justify-center text-[#89a5dd] shrink-0">
                    <span className="material-symbols-outlined">verified</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#002452]">Board Certified</h4>
                    <p className="text-sm text-[#44474f]">PMDC Gold Member with Lifetime Registration</p>
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
              <h2 className="stitch-display text-4xl font-bold mb-4">The Atelier Gallery</h2>
              <p className="text-[#44474f]">A glimpse inside our sanctuary of dental care.</p>
            </div>
            <div className="h-px bg-[#c4c6d0]/30 flex-grow mx-8 hidden md:block mb-4" />
            <button className="text-[#002452] font-bold uppercase tracking-widest text-xs flex items-center gap-2">
              View All Works <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 h-[800px] reveal-up reveal-delay-1">
            {/* Large featured image */}
            <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-[16px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Clinic Interior" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLJxXxRcrcbbNsfEbIpP6QzU7IMtUUB-Dh1BTSlydfiY39U9CcqgYoqxdgRuAfNqWHQDLiU659FwU2gQbaE-mnIY6fgf6Qn5jRTNCWLV8gQnq2C4R08S-oASMSk6Dii2_fILXcTXyPMoTzZDVHoJgD4A-swEjRPa70dfAU2pvdauhN0Xn6MIkNoTraSFqNEgOlfWicKCZEpC0MK2KKlbdt5aevtc4OkrjRScTNtL1A-JwhYqMjYTgoOvW182FA4PYSYsG4_BMrdPU" />
              <div className="absolute inset-0 bg-[#002452]/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <span className="text-white stitch-display !text-white text-2xl italic">Waiting Lounge</span>
              </div>
            </div>
            {/* Surgery Room */}
            <div className="col-span-2 row-span-1 relative group overflow-hidden rounded-[16px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Surgery Room" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCY1jLadeeTde5x_MTM2O13jXWocgshdyVGpUIndqdpR-_huCuJx5A8KS4a14q2AqUqBSWNLC3VXaG3JKjYC09fgLpMzFJB2PgTN6fNKa3d3_6X8O2PIaKlznyA8LbM1LIaif_sDDgOPlDYh37xnROuVz6Nqx1VxkYT2u_ohyKSS9RuajUgFk581_yUS98qM786-JcIenQ-yNg6rl90TC1k7aK55mnB4oyFoz1bX3HU4_FTzgfAc0T4YaiU_sQFbVAEsdyMKUGSIV8" />
              <div className="absolute inset-0 bg-[#0061a2]/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <span className="text-white stitch-display !text-white text-2xl italic">Surgery Theater</span>
              </div>
            </div>
            {/* Equipment */}
            <div className="relative group overflow-hidden rounded-[16px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Equipment" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ3E7i0zDxpnb3J-bvfi-XqR1cMWdLIYD1jrC5_jdji5UScpWzSCflcbB-hoFuV6yGfrXMPZmRZhVqRKGcCwvH5Xhq03nJB945iLOul82ChY3xJcxnoSYFF0huDrs6jfM6cchr7TFgw3CPy9x4U3ywGHlZXRtJiZXFI_Fnt8KIc0kRMY5MtX1ihGVJAAkJwucEsyrquTee4vNhWwF1iAYWQFOhOzwkQNTqjOlVvpS_MPs91pmFWxwFFQhc1X3b9hm50OX1zGuuPxc" />
            </div>
            {/* X-ray Room */}
            <div className="relative group overflow-hidden rounded-[16px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="X-ray Room" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRSlkmpX-OGbGcUssnQrSdoQIcf54yEBywzgJCZ9iRtFFUKIO-2Ao1eZrmAvuRr-5-BbD5984ZaTzVw-VYdUsBmuRSyjy1FYXYlQDNlpTaOANarnVqhac_nsRDXdVyVAwMOtkuYTH8d4R3H-zk_gBzBuYqXRfa4jC5YdifvfyW4SsB8CJHE3CiJGDjZ9NONpslhMwmgmxWfphgiuMR0u-zawSdPVI5rhkfUilViVp3xaDTNjm47ZlV5kdAaVX50yy2eBf-BFH6SBM" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
          ══════════════════════════════════════════ */}
      <section className="py-28 bg-[#f0f4fb]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="stitch-display text-4xl font-bold text-center mb-20 italic reveal-up">Voices of Reassurance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Hamza Ali", role: "Business Consultant", quote: `The treatment for my implants was completely painless. ${clinicName} team are true professionals who care about patient comfort above all.` },
              { name: "Ayesha Malik", role: "Design Architect", quote: "I've never felt so at ease in a dental clinic. The interior is calming and the results of my teeth whitening were immediate and spectacular!", featured: true },
              { name: "Zainab Khan", role: "Educator", quote: "Excellent care for root canal therapy. Everything was explained clearly. Highly recommend for anyone looking for expert dental surgery." },
            ].map((item, idx) => (
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
                  <div className="w-12 h-12 rounded-full bg-[#dfe3ea]" />
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
              <h2 className="stitch-display !text-white text-5xl font-bold mb-8">Take the First Step to Your Perfect Smile</h2>
              <p className="text-xl text-white/70 mb-12">Book your consultation today and experience the difference of modern, patient-centered dentistry.</p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[#0061a2]">schedule</span>
                  <div>
                    <h4 className="font-bold">Mon - Sat: 11:00 AM - 09:00 PM</h4>
                    <p className="text-sm text-white/60">Sunday Closed</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[#0061a2]">location_on</span>
                  <div>
                    <h4 className="font-bold">{address}, {city}</h4>
                    <p className="text-sm text-white/60">Premium Medical Wing</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white p-8 md:p-12 rounded-[24px] editorial-shadow reveal-up reveal-delay-2">
              <form
                action={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#44474f] mb-2">Full Name</label>
                    <input className="w-full bg-[#f0f4fb] border-none rounded-[10px] px-4 py-3 text-sm focus:ring-2 focus:ring-[#0061a2]/30 focus:bg-white transition-all outline-none" placeholder="John Doe" type="text" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#44474f] mb-2">Phone Number</label>
                    <input className="w-full bg-[#f0f4fb] border-none rounded-[10px] px-4 py-3 text-sm focus:ring-2 focus:ring-[#0061a2]/30 focus:bg-white transition-all outline-none" placeholder="+92 3XX XXXXXXX" type="tel" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#44474f] mb-2">Desired Service</label>
                  <select className="w-full bg-[#f0f4fb] border-none rounded-[10px] px-4 py-3 text-sm focus:ring-2 focus:ring-[#0061a2]/30 focus:bg-white transition-all outline-none">
                    <option>General Dentistry</option>
                    <option>Teeth Whitening</option>
                    <option>Orthodontics</option>
                    <option>Dental Implants</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#44474f] mb-2">Date</label>
                    <input className="w-full bg-[#f0f4fb] border-none rounded-[10px] px-4 py-3 text-sm focus:ring-2 focus:ring-[#0061a2]/30 focus:bg-white transition-all outline-none" type="date" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#44474f] mb-2">Preferred Time</label>
                    <input className="w-full bg-[#f0f4fb] border-none rounded-[10px] px-4 py-3 text-sm focus:ring-2 focus:ring-[#0061a2]/30 focus:bg-white transition-all outline-none" type="time" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#44474f] mb-2">Message</label>
                  <textarea className="w-full bg-[#f0f4fb] border-none rounded-[10px] px-4 py-3 text-sm focus:ring-2 focus:ring-[#0061a2]/30 focus:bg-white transition-all outline-none" placeholder="Anything we should know?" rows={3} />
                </div>
                <div className="flex flex-col gap-4 pt-4">
                  <button className="bg-[#002452] text-white font-bold py-4 rounded-[10px] hover:bg-[#1b3a6b] transition-all" type="submit">
                    Request Appointment
                  </button>
                  <a
                    className="bg-[#25D366] text-white font-bold py-4 rounded-[10px] flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.893-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.403 0 6.556-5.332 11.89-11.891 11.89-2.015 0-3.991-.512-5.747-1.481l-6.248 1.699zm6.303-3.958l.345.204c1.559.926 3.35 1.414 5.186 1.414 5.733 0 10.395-4.66 10.395-10.393 0-2.779-1.082-5.391-3.048-7.357-1.965-1.966-4.577-3.048-7.352-3.048-5.734 0-10.395 4.661-10.395 10.393 0 1.834.489 3.626 1.413 5.187l.223.377-.978 3.57 3.659-.993zm11.332-6.521c-.312-.156-1.848-.911-2.126-1.011-.278-.1-.482-.156-.684.156-.202.311-.785.986-.961 1.187-.177.201-.354.227-.666.071-.312-.156-1.317-.485-2.508-1.548-.926-.826-1.552-1.846-1.733-2.158-.182-.312-.019-.481.137-.636.141-.14.312-.365.468-.547.156-.182.208-.312.312-.52.104-.208.052-.39-.026-.547-.078-.156-.684-1.651-.938-2.261-.247-.594-.499-.513-.684-.522-.177-.009-.38-.01-.582-.01-.202 0-.531.076-.81.378-.278.303-1.063 1.039-1.063 2.535 0 1.497 1.088 2.943 1.24 3.149.152.207 2.142 3.271 5.19 4.585.725.312 1.291.498 1.731.638.728.231 1.39.198 1.914.12.584-.087 1.848-.755 2.11-.1446.263-.691.263-1.284.184-1.388-.079-.104-.291-.156-.603-.312z" /></svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </form>
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
                <h2 className="stitch-display text-4xl font-bold mb-4">Location &amp; Access</h2>
                <p className="text-[#44474f]">Easy access from all major parts of {city}. Ample parking available.</p>
              </div>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <span className="material-symbols-outlined text-[#0061a2] text-2xl">location_on</span>
                  <div>
                    <h4 className="font-bold text-[#002452] mb-1">Our Address</h4>
                    <p className="text-[#44474f] text-sm leading-relaxed">{address}, {city}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <span className="material-symbols-outlined text-[#0061a2] text-2xl">call</span>
                  <div>
                    <h4 className="font-bold text-[#002452] mb-1">Phone &amp; WhatsApp</h4>
                    <p className="text-[#44474f] text-sm leading-relaxed">{phone}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <span className="material-symbols-outlined text-[#0061a2] text-2xl">mail</span>
                  <div>
                    <h4 className="font-bold text-[#002452] mb-1">Email Inquiry</h4>
                    <p className="text-[#44474f] text-sm">info@{clinicName.toLowerCase().replace(/\s+/g, "")}.pk</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                {["public", "share", "photo_camera"].map((icon) => (
                  <a key={icon} className="w-10 h-10 rounded-full bg-[#1b3a6b] flex items-center justify-center text-[#89a5dd] hover:bg-[#0061a2] hover:text-white transition-all" href="#">
                    <span className="material-symbols-outlined">{icon}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="h-[500px] rounded-[24px] overflow-hidden bg-[#dfe3ea] border border-[#4DB8E8]/20 editorial-shadow reveal-up reveal-delay-2">
              <iframe
                allowFullScreen
                height="100%"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
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
            <div className="stitch-display !text-white text-2xl font-bold mb-6 uppercase">{clinicName}</div>
            <p className="text-sm leading-relaxed text-white/70 mb-8 max-w-xs">
              Transforming lives through clinical excellence and aesthetic artistry. Your smile, our mastery.
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
              <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Company</h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li><a className="hover:text-[#4DB8E8] transition-all" href="#about">About Us</a></li>
                <li><a className="hover:text-[#4DB8E8] transition-all" href="#about">Our Team</a></li>
                <li><a className="hover:text-[#4DB8E8] transition-all" href="#services">Services</a></li>
                <li><a className="hover:text-[#4DB8E8] transition-all" href="#">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Support</h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li><a className="hover:text-[#4DB8E8] transition-all" href="#contact">Contact Us</a></li>
                <li><a className="hover:text-[#4DB8E8] transition-all" href="#">Privacy Policy</a></li>
                <li><a className="hover:text-[#4DB8E8] transition-all" href="#">Terms of Service</a></li>
                <li><a className="hover:text-[#4DB8E8] transition-all" href="#">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Contact Info</h4>
            <div className="space-y-4 text-sm text-white/70">
              <p className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#4DB8E8]">location_on</span>
                {address}, {city}
              </p>
              <p className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#4DB8E8]">call</span>
                {phone}
              </p>
              <p className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#4DB8E8]">mail</span>
                info@{clinicName.toLowerCase().replace(/\s+/g, "")}.pk
              </p>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/5 text-center px-8">
          <p className="text-sm text-white/50">© {new Date().getFullYear()} {clinicName}. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Mobile CTA */}
      <a
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-[#0061a2] text-white rounded-full flex items-center justify-center shadow-xl z-50 animate-bounce"
        href={`tel:${phone}`}
      >
        <span className="material-symbols-outlined">call</span>
      </a>
    </>
  );
}
