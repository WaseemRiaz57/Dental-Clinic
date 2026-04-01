"use client";

import { type FormEvent } from "react";

interface AppointmentFormProps {
  clinicName: string;
  targetPhone: string;
  formNameLabel: string;
  formNamePlaceholder: string;
  formPhoneLabel: string;
  formPhonePlaceholder: string;
  formServiceLabel: string;
  formServiceOptions: string[];
  formDateLabel: string;
  formTimeLabel: string;
  formMessageLabel: string;
  formMessagePlaceholder: string;
  formSubmitText: string;
  whatsappButtonText: string;
}

export default function AppointmentForm({
  clinicName,
  targetPhone,
  formNameLabel,
  formNamePlaceholder,
  formPhoneLabel,
  formPhonePlaceholder,
  formServiceLabel,
  formServiceOptions,
  formDateLabel,
  formTimeLabel,
  formMessageLabel,
  formMessagePlaceholder,
  formSubmitText,
  whatsappButtonText,
}: AppointmentFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const message = `Hello ${clinicName}!\n\nI would like to request an appointment.\n\n*Name:* ${data.name}\n*Phone:* ${data.phone}\n*Service:* ${data.service}\n*Date:* ${data.date}\n*Time:* ${data.time}${
      data.message ? `\n*Message:* ${data.message}` : ""
    }`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${targetPhone}?text=${encodedMessage}`, "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#44474f] mb-2">
            {formNameLabel}
          </label>
          <input
            name="name"
            className="w-full bg-[#f0f4fb] border-none rounded-[10px] px-4 py-3 text-sm focus:ring-2 focus:ring-[#0061a2]/30 focus:bg-white transition-all outline-none"
            placeholder={formNamePlaceholder}
            type="text"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#44474f] mb-2">
            {formPhoneLabel}
          </label>
          <input
            name="phone"
            className="w-full bg-[#f0f4fb] border-none rounded-[10px] px-4 py-3 text-sm focus:ring-2 focus:ring-[#0061a2]/30 focus:bg-white transition-all outline-none"
            placeholder={formPhonePlaceholder}
            type="tel"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-[#44474f] mb-2">
          {formServiceLabel}
        </label>
        <select
          name="service"
          className="w-full bg-[#f0f4fb] border-none rounded-[10px] px-4 py-3 text-sm focus:ring-2 focus:ring-[#0061a2]/30 focus:bg-white transition-all outline-none"
          required
        >
          <option value="">Select a service</option>
          {formServiceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#44474f] mb-2">
            {formDateLabel}
          </label>
          <input
            name="date"
            className="w-full bg-[#f0f4fb] border-none rounded-[10px] px-4 py-3 text-sm focus:ring-2 focus:ring-[#0061a2]/30 focus:bg-white transition-all outline-none"
            type="date"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#44474f] mb-2">
            {formTimeLabel}
          </label>
          <input
            name="time"
            className="w-full bg-[#f0f4fb] border-none rounded-[10px] px-4 py-3 text-sm focus:ring-2 focus:ring-[#0061a2]/30 focus:bg-white transition-all outline-none"
            type="time"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-[#44474f] mb-2">
          {formMessageLabel}
        </label>
        <textarea
          name="message"
          className="w-full bg-[#f0f4fb] border-none rounded-[10px] px-4 py-3 text-sm focus:ring-2 focus:ring-[#0061a2]/30 focus:bg-white transition-all outline-none"
          placeholder={formMessagePlaceholder}
          rows={3}
        />
      </div>
      <div className="flex flex-col gap-4 pt-4">
        <button
          type="submit"
          className="bg-[#002452] text-white font-bold py-4 rounded-[10px] hover:bg-[#1b3a6b] transition-all"
        >
          {formSubmitText}
        </button>
        <a
          className="bg-[#25D366] text-white font-bold py-4 rounded-[10px] flex items-center justify-center gap-2 hover:opacity-90 transition-all"
          href={`https://wa.me/${targetPhone}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.893-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.403 0 6.556-5.332 11.89-11.891 11.89-2.015 0-3.991-.512-5.747-1.481l-6.248 1.699zm6.303-3.958l.345.204c1.559.926 3.35 1.414 5.186 1.414 5.733 0 10.395-4.66 10.395-10.393 0-2.779-1.082-5.391-3.048-7.357-1.965-1.966-4.577-3.048-7.352-3.048-5.734 0-10.395 4.661-10.395 10.393 0 1.834.489 3.626 1.413 5.187l.223.377-.978 3.57 3.659-.993zm11.332-6.521c-.312-.156-1.848-.911-2.126-1.011-.278-.1-.482-.156-.684.156-.202.311-.785.986-.961 1.187-.177.201-.354.227-.666.071-.312-.156-1.317-.485-2.508-1.548-.926-.826-1.552-1.846-1.733-2.158-.182-.312-.019-.481.137-.636.141-.14.312-.365.468-.547.156-.182.208-.312.312-.52.104-.208.052-.39-.026-.547-.078-.156-.684-1.651-.938-2.261-.247-.594-.499-.513-.684-.522-.177-.009-.38-.01-.582-.01-.202 0-.531.076-.81.378-.278.303-1.063 1.039-1.063 2.535 0 1.497 1.088 2.943 1.24 3.149.152.207 2.142 3.271 5.19 4.585.725.312 1.291.498 1.731.638.728.231 1.39.198 1.914.12.584-.087 1.848-.755 2.11-.1446.263-.691.263-1.284.184-1.388-.079-.104-.291-.156-.603-.312z" />
          </svg>
          {whatsappButtonText}
        </a>
      </div>
    </form>
  );
}
