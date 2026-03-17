"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Users, Heart, Globe } from "lucide-react";

// Counter Hook
function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/HeroImage1.png",
      title: "Sheltering Lives,\nRestoring Hope",
      subtitle: "German Humanitarian Relief Organization providing aid to crisis-affected regions",
    },
    {
      image: "/images/HeroImage2.png",
      title: "Clean Water\nFor All",
      subtitle: "Bringing safe drinking water to thousands of families in Sudan",
    },
    {
      image: "/images/ProjectCards1.png",
      title: "Fighting Hunger\nTogether",
      subtitle: "Delivering food aid to vulnerable families across Yemen",
    },
    {
      image: "/images/ProjectCards2.png",
      title: "Education\nChanges Lives",
      subtitle: "Supporting children's right to learn in conflict zones",
    },
  ];

  const projects = [
    { image: "/images/ProjectCards1.png", title: "Clean Water Project", desc: "Providing clean water access to villages in Sudan, improving health outcomes for thousands of families.", country: "Sudan" },
    { image: "/images/ProjectCards2.png", title: "Food Aid Distribution", desc: "Delivering essential food packages to vulnerable families in Yemen facing severe food insecurity.", country: "Yemen" },
    { image: "/images/ProjectCards3.png", title: "Medical Camps", desc: "Providing free medical care and essential medicines in refugee camps across conflict-affected regions.", country: "Sudan" },
    { image: "/images/ProjectCards4.png", title: "Education Initiative", desc: "Supporting children's right to education by building and equipping schools in conflict zones.", country: "Yemen" },
  ];

  const news = [
    { image: "/images/NewsSection1.png", title: "GHAR Foundation launches new water project in Sudan", excerpt: "The new water project aims to provide clean drinking water to over 5,000 families in rural Sudan through solar-powered pumping stations.", date: "March 2026" },
    { image: "/images/NewsSection2.png", title: "Food distribution campaign reaches 1,000 families in Yemen", excerpt: "Our latest food aid campaign successfully distributed emergency food packages to families in the most affected areas of Yemen.", date: "February 2026" },
    { image: "/images/ProjectCards3.png", title: "Medical camp serves 800 patients in refugee camp", excerpt: "GHAR Foundation's mobile medical team provided free consultations, medicines and emergency care to hundreds of patients.", date: "January 2026" },
    { image: "/images/ProjectCards4.png", title: "New school opens its doors for 200 children", excerpt: "Thanks to the generous support of our donors, a new school has been built providing quality education to 200 children in conflict zones.", date: "December 2025" },
  ];

  // Auto-play slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Counters
  const counter1 = useCounter(5100);
  const counter2 = useCounter(2100);
  const counter3 = useCounter(12);

  return (
    <div className="bg-background">

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative h-[85vh]">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
            >
              <Image src={slide.image} alt={`Slide ${i + 1}`} fill className="object-cover" priority={i === 0} />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/40" />

          {/* Text */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-2xl transition-all duration-700">
              {slides[currentSlide].title.split("\n").map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </h1>
            <p className="text-white/80 mt-4 text-lg max-w-xl transition-all duration-700">
              {slides[currentSlide].subtitle}
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

          {/* Donate Button - Desktop */}
          <div className="hidden md:block absolute bottom-6 right-8 md:right-20">
            <Link href="/donate" className="bg-secondary hover:bg-green-700 text-white px-8 py-3 rounded font-semibold text-lg transition-colors">
              Donate Now
            </Link>
          </div>
        </div>

        {/* Donate Button - Mobile (below image) */}
        <div className="md:hidden flex justify-center py-4 bg-background">
          <Link href="/donate" className="bg-secondary hover:bg-green-700 text-white px-10 py-3 rounded font-semibold text-lg transition-colors">
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
                <p className="text-gray-500 text-sm flex-grow leading-relaxed">{project.desc}</p>
                <Link href="/donate" className="mt-4 bg-secondary hover:bg-green-700 text-white text-center py-2 rounded font-medium text-sm transition-colors">
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
          <div ref={counter1.ref} className="flex flex-col items-center gap-3 p-8 border border-gray-100 rounded-xl">
            <Users size={32} className="text-primary" />
            <span className="text-4xl font-bold text-dark">{counter1.count.toLocaleString()}+</span>
            <span className="text-gray-500 text-sm">Families Supported</span>
          </div>
          <div ref={counter2.ref} className="flex flex-col items-center gap-3 p-8 border border-gray-100 rounded-xl">
            <Heart size={32} className="text-primary" />
            <span className="text-4xl font-bold text-dark">{counter2.count.toLocaleString()}+</span>
            <span className="text-gray-500 text-sm">Donations Received</span>
          </div>
          <div ref={counter3.ref} className="flex flex-col items-center gap-3 p-8 border border-gray-100 rounded-xl">
            <Globe size={32} className="text-primary" />
            <span className="text-4xl font-bold text-dark">{counter3.count}+</span>
            <span className="text-gray-500 text-sm">Countries Reached</span>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-dark">Latest News</h2>
          <Link href="/news" className="text-primary hover:underline text-sm font-medium">
            View all news →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((item, i) => (
            <div key={i} className="flex gap-4 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="relative w-36 shrink-0">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-4 flex flex-col justify-center">
                <span className="text-xs text-primary font-semibold mb-2">{item.date}</span>
                <h3 className="text-dark font-semibold text-sm leading-snug mb-2">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.excerpt}</p>
                <Link href="/news" className="text-primary text-xs mt-3 hover:underline">Read more →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}