"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Users, Heart, Globe } from "lucide-react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: "/images/HeroImage1.png" },
    { image: "/images/HeroImage2.png" },
  ];

  const projects = [
    { image: "/images/ProjectCards1.png", title: "Clean Water Project", desc: "Providing clean water to villages in Sudan", country: "Sudan" },
    { image: "/images/ProjectCards2.png", title: "Food Aid Distribution", desc: "Delivering food packages to families in Yemen", country: "Yemen" },
    { image: "/images/ProjectCards3.png", title: "Medical Camps", desc: "Free medical care in refugee camps", country: "Sudan" },
    { image: "/images/ProjectCards4.png", title: "Education Initiative", desc: "Supporting children's education in conflict zones", country: "Yemen" },
  ];

  const stats = [
    { number: "5,100+", label: "Families Supported", icon: <Users size={32} className="text-primary" /> },
    { number: "2,100+", label: "Donations Received", icon: <Heart size={32} className="text-secondary" /> },
    { number: "12+", label: "Countries Reached", icon: <Globe size={32} className="text-accent" /> },
  ];

  const news = [
    { image: "/images/NewsSection1.png", title: "GHAR Foundation launches new water project in Sudan", date: "March 2026" },
    { image: "/images/NewsSection2.png", title: "Food distribution campaign reaches 1000 families in Yemen", date: "February 2026" },
  ];

  return (
    <div className="bg-background">

      {/* Hero Section */}
      <section className="relative h-[85vh] overflow-hidden">
        <Image
          src={slides[currentSlide].image}
          alt="Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-2xl">
            Sheltering Lives,<br />Restoring Hope
          </h1>
          <p className="text-white/80 mt-4 text-lg max-w-xl">
            German Humanitarian Relief Organization providing aid to crisis-affected regions
          </p>
        </div>
        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === currentSlide ? "bg-white" : "bg-white/40"}`}
            />
          ))}
        </div>
        {/* Donate Button */}
        <div className="absolute bottom-6 right-8 md:right-20">
          <Link href="/donate" className="bg-secondary hover:bg-green-700 text-white px-8 py-3 rounded font-semibold text-lg transition-colors">
            Donate Now
          </Link>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-dark mb-10 text-center">Our Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {projects.map((project, i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-md bg-white flex flex-col">
              <div className="relative h-48">
                <Image src={project.image} alt={project.title} fill className="object-cover" />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <span className="text-xs text-primary font-semibold uppercase mb-1">{project.country}</span>
                <h3 className="text-dark font-bold text-base mb-2">{project.title}</h3>
                <p className="text-gray-500 text-sm flex-grow">{project.desc}</p>
                <Link
                  href="/donate"
                  className="mt-4 bg-secondary hover:bg-green-700 text-white text-center py-2 rounded font-medium text-sm transition-colors"
                >
                  Donate
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center px-4">
          <span className="text-6xl text-primary font-serif leading-none">&ldquo;</span>
          <p className="text-xl md:text-2xl text-dark font-medium italic mt-2">
            Every act of generosity counts, and everyone can contribute to making the world a better place.
          </p>
          <span className="text-6xl text-primary font-serif leading-none">&rdquo;</span>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-3 p-8 border border-gray-100 rounded-xl">
              {stat.icon}
              <span className="text-4xl font-bold text-dark">{stat.number}</span>
              <span className="text-gray-500 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-dark mb-10">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((item, i) => (
            <div key={i} className="flex gap-4 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="relative w-32 shrink-0">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-4 flex flex-col justify-center">
                <span className="text-xs text-primary font-semibold mb-2">{item.date}</span>
                <h3 className="text-dark font-semibold text-sm leading-snug">{item.title}</h3>
                <Link href="/news" className="text-primary text-xs mt-3 hover:underline">Read more →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}