"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const projects = [
  {
    id: "clean-water-project",
    image: "/images/ProjectCards1.png",
    title: "Clean Water Project",
    country: "Sudan",
    category: "Water",
    raised: 12500,
    goal: 20000,
    desc: "Providing clean water access to villages in Sudan, improving health outcomes for thousands of families through solar-powered pumping stations.",
    details: "Access to clean water is one of the most fundamental human rights. In rural Sudan, thousands of families are forced to walk miles every day to fetch contaminated water, leading to widespread disease and suffering. GHAR Foundation's Clean Water Project aims to change this reality by installing solar-powered pumping stations and water purification systems in the most affected villages. Each station serves up to 500 families, providing them with safe, clean drinking water around the clock.",
    impact: ["5,000+ families served", "12 villages covered", "80% reduction in waterborne diseases", "200+ children returning to school"],
    gallery: ["/images/ProjectCards1.png", "/images/HeroImage1.png", "/images/HeroImage2.png"],
  },
  {
    id: "food-aid-distribution",
    image: "/images/ProjectCards2.png",
    title: "Food Aid Distribution",
    country: "Yemen",
    category: "Food",
    raised: 8700,
    goal: 15000,
    desc: "Delivering essential food packages to vulnerable families in Yemen facing severe food insecurity and malnutrition.",
    details: "Yemen is facing one of the world's worst humanitarian crises, with millions of people on the brink of famine. GHAR Foundation's Food Aid Distribution program delivers monthly food packages to the most vulnerable families, including those headed by women, families with young children, and elderly individuals with no income. Each package contains enough staple foods to sustain a family of five for one month.",
    impact: ["1,000+ families per month", "6 distribution points across Yemen", "40% female-headed households", "Zero diversion of aid reported"],
    gallery: ["/images/ProjectCards2.png", "/images/NewsSection2.png", "/images/HeroImage2.png"],
  },
  {
    id: "medical-camps",
    image: "/images/ProjectCards3.png",
    title: "Medical Camps",
    country: "Sudan",
    category: "Medical",
    raised: 6200,
    goal: 10000,
    desc: "Providing free medical care and essential medicines in refugee camps across conflict-affected regions in Sudan.",
    details: "In conflict zones, access to basic healthcare can mean the difference between life and death. GHAR Foundation deploys mobile medical teams to refugee camps and remote communities in Sudan, providing free consultations, essential medicines, vaccinations, and emergency care. Special attention is given to maternal and child health.",
    impact: ["800+ patients per campaign", "4 medical camps per year", "300+ children vaccinated", "50+ pregnant women receiving prenatal care"],
    gallery: ["/images/ProjectCards3.png", "/images/NewsSection1.png", "/images/HeroImage1.png"],
  },
  {
    id: "education-initiative",
    image: "/images/ProjectCards4.png",
    title: "Education Initiative",
    country: "Yemen",
    category: "Education",
    raised: 9800,
    goal: 18000,
    desc: "Supporting children's right to education by building and equipping schools in conflict zones across Yemen.",
    details: "Conflict has deprived millions of Yemeni children of their right to education. GHAR Foundation's Education Initiative rebuilds and equips damaged schools, trains and pays teachers' salaries, and provides students with the supplies they need to learn. We also run catch-up classes for children who have missed years of schooling due to conflict.",
    impact: ["200+ children enrolled", "3 schools rebuilt and equipped", "15 teachers supported", "90% attendance rate achieved"],
    gallery: ["/images/ProjectCards4.png", "/images/HeroImage1.png", "/images/NewsSection2.png"],
  },
  {
    id: "emergency-shelter",
    image: "/images/HeroImage1.png",
    title: "Emergency Shelter",
    country: "Sudan",
    category: "Shelter",
    raised: 14000,
    goal: 25000,
    desc: "Building temporary and permanent shelters for families displaced by conflict and natural disasters in Sudan.",
    details: "Displacement is one of the most devastating consequences of conflict. Families who flee their homes often have nowhere to go. GHAR Foundation's Emergency Shelter program provides displaced families with safe, dignified shelter — from emergency tarpaulins in the immediate aftermath, to transitional shelters and eventually permanent homes.",
    impact: ["300+ families sheltered", "50 permanent homes built", "1,200+ people protected", "100% meet humanitarian standards"],
    gallery: ["/images/HeroImage1.png", "/images/HeroImage2.png", "/images/ProjectCards1.png"],
  },
  {
    id: "winter-aid-campaign",
    image: "/images/HeroImage2.png",
    title: "Winter Aid Campaign",
    country: "Yemen",
    category: "Aid",
    raised: 5500,
    goal: 12000,
    desc: "Distributing winter clothing, blankets, and heating supplies to vulnerable families in Yemen during harsh winter months.",
    details: "Yemen's winters can be bitterly cold, especially in mountainous regions, yet millions of displaced families have no warm clothing or heating. GHAR Foundation's Winter Aid Campaign distributes comprehensive winter kits to the most vulnerable families before the cold season begins. Each kit contains warm clothing, blankets, a heater, and fuel.",
    impact: ["500+ families received winter kits", "2,500+ individuals protected", "Coverage across 3 governorates", "Zero cold-related deaths among beneficiaries"],
    gallery: ["/images/HeroImage2.png", "/images/NewsSection1.png", "/images/ProjectCards2.png"],
  },
];

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-dark">Project not found</h1>
        <Link href="/projects" className="text-primary hover:underline">← Back to Projects</Link>
      </div>
    );
  }

  const progress = Math.round((project.raised / project.goal) * 100);

  return (
    <div className="bg-background">

      {/* Hero */}
      <section className="relative h-[50vh]">
        <Image src={project.image} alt={project.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20">
          <Link href="/projects" className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4 transition-colors w-fit">
            <ArrowLeft size={16} /> Back to Projects
          </Link>
          <span className="text-white/70 text-sm mb-2">{project.country} • {project.category}</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white max-w-2xl">{project.title}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Main Content */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-dark mb-4">About This Project</h2>
            <p className="text-gray-600 leading-relaxed text-base mb-8">{project.details}</p>

            <h2 className="text-2xl font-bold text-dark mb-4">Our Impact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {project.impact.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-primary/5 rounded-xl p-4">
                  <span className="text-secondary font-bold text-lg">✓</span>
                  <span className="text-dark text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-dark mb-4">Gallery</h2>
            <div className="grid grid-cols-3 gap-3">
              {project.gallery.map((img, i) => (
                <div key={i} className="relative h-32 rounded-xl overflow-hidden">
                  <Image src={img} alt={`Gallery ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="text-dark font-bold text-lg mb-4">Support This Project</h3>
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Raised: €{project.raised.toLocaleString()}</span>
                  <span>Goal: €{project.goal.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-secondary h-3 rounded-full" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-primary font-bold mt-2">{progress}% funded</p>
              </div>
              <Link href="/donate" className="block bg-secondary hover:bg-green-700 text-white text-center py-3 rounded-lg font-semibold transition-colors mb-3">
                Donate Now
              </Link>
              <Link href="/projects" className="block text-primary text-center py-3 rounded-lg font-semibold transition-colors border border-primary hover:bg-primary/5">
                View All Projects
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}