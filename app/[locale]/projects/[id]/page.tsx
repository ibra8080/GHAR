"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/lib/data";


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