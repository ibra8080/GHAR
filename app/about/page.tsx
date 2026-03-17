"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, Target, Heart, Shield, Users, Award } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const team = [
  { name: "Ahmed Al-Rashid", role: "Executive Director", image: "/images/HeroImage1.png" },
  { name: "Sara Müller", role: "Program Manager", image: "/images/HeroImage2.png" },
  { name: "Omar Hassan", role: "Field Coordinator", image: "/images/ProjectCards1.png" },
  { name: "Lena Weber", role: "Finance Director", image: "/images/ProjectCards2.png" },
];

const values = [
  { icon: <Heart size={28} className="text-primary" />, title: "Humanity", desc: "We place human dignity at the center of everything we do." },
  { icon: <Shield size={28} className="text-primary" />, title: "Transparency", desc: "Full accountability to our donors and the communities we serve." },
  { icon: <Target size={28} className="text-primary" />, title: "Impact", desc: "We measure our success by the real change we create on the ground." },
  { icon: <Award size={28} className="text-primary" />, title: "Accountability", desc: "We uphold the highest standards in humanitarian aid delivery." },
];

const partners = [
  { name: "Partner 1", image: "/images/GahrLogo.svg" },
  { name: "Partner 2", image: "/images/GahrLogo.svg" },
  { name: "Partner 3", image: "/images/GahrLogo.svg" },
  { name: "Partner 4", image: "/images/GahrLogo.svg" },
];

export default function AboutPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");
    const { error } = await supabase.from("contact_messages").insert([form]);
    if (error) { setStatus("error"); return; }
    setStatus("success");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-background">

      {/* Hero Section */}
      <section className="relative h-[50vh]">
        <Image src="/images/HeroImage1.png" alt="About GHAR" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">About GHAR Foundation</h1>
          <p className="text-white/80 mt-4 text-lg max-w-2xl">
            A German humanitarian organization dedicated to bringing relief and hope to crisis-affected regions
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-dark mb-6">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              GHAR Foundation was established in Bremen, Germany, by a group of dedicated individuals who witnessed firsthand the devastating humanitarian crises in Sudan and Yemen. Driven by compassion and a sense of responsibility, they came together to create an organization that bridges the gap between those who want to help and those who need it most.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The name &ldquo;GHAR&rdquo; — meaning &ldquo;cave&rdquo; in Arabic — symbolizes shelter and protection, reflecting our core mission to provide refuge and hope to those displaced by conflict and disaster.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Since our founding, we have grown into a trusted humanitarian organization serving thousands of families across multiple crisis zones, while maintaining the highest standards of transparency and accountability.
            </p>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
            <Image src="/images/HeroImage2.png" alt="Our Story" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <Target size={32} className="text-primary" />
                <h3 className="text-2xl font-bold text-dark">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To provide immediate and sustainable humanitarian aid to crisis-affected communities in Sudan, Yemen, and beyond — delivering clean water, food, medical care, and education while upholding human dignity and promoting long-term resilience.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <Eye size={32} className="text-secondary" />
                <h3 className="text-2xl font-bold text-dark">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                A world where every person, regardless of where they live or what crisis they face, has access to the basic necessities of life — and where communities can rebuild, recover, and thrive with dignity and hope.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-dark mb-10 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">{value.icon}</div>
              <h3 className="text-dark font-bold text-lg mb-2">{value.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-dark mb-10 text-center">Our Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 shadow-md">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-dark font-bold text-base">{member.name}</h3>
                <p className="text-primary text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-dark mb-10 text-center">Our Partners</h2>
        <div className="flex flex-wrap justify-center gap-10 items-center">
          {partners.map((partner, i) => (
            <div key={i} className="grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
              <Image src={partner.image} alt={partner.name} width={120} height={60} className="object-contain" />
            </div>
          ))}
        </div>
      </section>

{/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Make a Difference Today</h2>
          <p className="text-white/80 mb-8 text-lg">
            Join us in our mission to bring relief and hope to those who need it most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate" className="bg-secondary hover:bg-green-700 text-white px-10 py-3 rounded font-semibold text-lg transition-colors">
              Donate Now
            </Link>
            <Link href="/volunteer" className="bg-white hover:bg-gray-100 text-primary px-10 py-3 rounded font-semibold text-lg transition-colors">
              Volunteer With Us
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-dark mb-2 text-center">Get In Touch</h2>
        <p className="text-gray-500 text-center mb-10">Send us a message and we will get back to you as soon as possible.</p>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark focus:outline-none focus:border-primary transition-colors"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark focus:outline-none focus:border-primary transition-colors"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark focus:outline-none focus:border-primary transition-colors resize-none"
            />
            {status === "success" && (
              <p className="text-secondary text-sm text-center">Message sent successfully! We will be in touch soon.</p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
            )}
            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              className="bg-primary hover:bg-blue-800 text-white py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}