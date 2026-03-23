"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Globe, Users, Briefcase, MapPin, Mail } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const reasons = [
  { icon: <Heart size={28} className="text-primary" />, title: "Make a Real Impact", desc: "Your skills and time directly help families in crisis zones across Sudan and Yemen." },
  { icon: <Globe size={28} className="text-primary" />, title: "Global Community", desc: "Join a diverse team of volunteers from Germany and around the world united by one mission." },
  { icon: <Users size={28} className="text-primary" />, title: "Grow & Learn", desc: "Gain valuable experience in humanitarian work while developing new skills and connections." },
];

const specialties = [
  "Medical / Healthcare",
  "Education / Teaching",
  "Engineering / Technical",
  "Legal / Compliance",
  "Finance / Accounting",
  "Marketing / Communications",
  "Logistics / Operations",
  "Social Work / Counseling",
  "Translation / Languages",
  "IT / Software Development",
  "Other",
];

const availabilities = [
  "Full-time (on-site)",
  "Part-time (on-site)",
  "Remote only",
  "Weekends only",
  "Flexible",
];

const jobs = [
  {
    title: "Field Coordinator",
    location: "Sudan / Yemen",
    type: "Full-time",
    desc: "Coordinate humanitarian aid distribution and manage relationships with local partners on the ground.",
  },
  {
    title: "Medical Volunteer",
    location: "Sudan",
    type: "Volunteer",
    desc: "Provide medical care in mobile clinics and refugee camps. Doctors, nurses, and pharmacists welcome.",
  },
  {
    title: "Communications Officer",
    location: "Remote / Bremen",
    type: "Part-time",
    desc: "Manage social media, write reports, and communicate our impact to donors and the public.",
  },
  {
    title: "Finance & Compliance Officer",
    location: "Bremen, Germany",
    type: "Full-time",
    desc: "Oversee financial reporting, ensure compliance with German NGO regulations, and manage donor records.",
  },
];

export default function VolunteerPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    specialty: "",
    availability: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.country || !form.specialty || !form.availability) return;
    setStatus("loading");
    
    const { error } = await supabase.from("volunteers").insert([form]);
    if (error) { setStatus("error"); return; }

    // Send confirmation email
    await fetch("/api/send-volunteer-confirmation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email }),
    });

    setStatus("success");
    setForm({ name: "", phone: "", email: "", country: "", specialty: "", availability: "", message: "" });
  };

  return (
    <div className="bg-background">

      {/* Hero */}
      <section className="relative h-[40vh]">
        <Image src="/images/HeroImage2.png" alt="Volunteer" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Volunteer With Us</h1>
          <p className="text-white/80 mt-4 text-lg max-w-2xl">
            Join our mission and make a real difference in the lives of those who need it most
          </p>
        </div>
      </section>

      {/* Why Volunteer */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-dark mb-10 text-center">Why Volunteer with GHAR?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-100 bg-white shadow-sm">
              <div className="mb-4">{reason.icon}</div>
              <h3 className="text-dark font-bold text-lg mb-2">{reason.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{reason.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Volunteer Form */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark mb-2 text-center">Apply to Volunteer</h2>
          <p className="text-gray-500 text-center mb-10">Fill in the form below and we will get back to you within 3-5 business days.</p>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark focus:outline-none focus:border-primary transition-colors"
                />
                <input
                    type="tel"
                    placeholder="Your Phone Number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark focus:outline-none focus:border-primary transition-colors"
                    />
                </div>
                <input
                  type="email"
                  placeholder="Your Email *"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value.toLowerCase() })}
                  className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark focus:outline-none focus:border-primary transition-colors"
                />
                
              

              <input
                type="text"
                placeholder="Your Country *"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark focus:outline-none focus:border-primary transition-colors"
              />

              <select
                value={form.specialty}
                onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark focus:outline-none focus:border-primary transition-colors"
              >
                <option value="">Select your specialty *</option>
                {specialties.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <select
                value={form.availability}
                onChange={(e) => setForm({ ...form, availability: e.target.value })}
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark focus:outline-none focus:border-primary transition-colors"
              >
                <option value="">Select your availability *</option>
                {availabilities.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>

              <textarea
                placeholder="Tell us about yourself and why you want to volunteer (optional)"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark focus:outline-none focus:border-primary transition-colors resize-none"
              />

              {status === "success" && (
                <p className="text-secondary text-sm text-center">
                  ✅ Application submitted successfully! We will be in touch soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-500 text-sm text-center">
                  ❌ Something went wrong. Please try again.
                </p>
              )}

              <button
                onClick={handleSubmit}
                disabled={status === "loading" || !form.name || !form.email || !form.country || !form.specialty || !form.availability}
                className="bg-primary hover:bg-blue-800 text-white py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-dark mb-10 text-center">Open Positions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-dark font-bold text-lg">{job.title}</h3>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  job.type === "Volunteer"
                    ? "bg-secondary/10 text-secondary"
                    : job.type === "Full-time"
                    ? "bg-primary/10 text-primary"
                    : "bg-accent/10 text-accent"
                }`}>
                  {job.type}
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                <MapPin size={12} />
                <span>{job.location}</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{job.desc}</p>
              <button
                onClick={() => document.getElementById("volunteer-form")?.scrollIntoView({ behavior: "smooth" })}
                className="text-primary text-sm font-medium hover:underline"
              >
                Apply Now →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Whether you volunteer your time or donate, every contribution counts.
          </p>
          <Link href="/donate" className="bg-secondary hover:bg-green-700 text-white px-12 py-3 rounded font-semibold text-lg transition-colors">
            Donate Now
          </Link>
        </div>
      </section>

    </div>
  );
}