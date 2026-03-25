"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { projects } from "@/lib/data";
import { useTranslations, useLocale } from "next-intl";
import { getCountryName } from "@/lib/utils";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const t = useTranslations("projects");
  const locale = useLocale();

  // استخرج الدول الفريدة من البيانات تلقائياً
  const uniqueCountries = [...new Set(projects.map((p) => p.countryCode))];

  const filters = [
    { key: "All", label: t("filterAll") },
    ...uniqueCountries.map((code) => ({
      key: code,
      label: getCountryName(code, locale),
    })),
  ];

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.countryCode === activeFilter);

  return (
    <div className="bg-background">

      {/* Hero */}
      <section className="relative h-[40vh]">
        <Image src="/images/ProjectCards1.png" alt="Our Projects" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">{t("heroTitle")}</h1>
          <p className="text-white/80 mt-4 text-lg max-w-2xl">{t("heroSubtitle")}</p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="flex gap-3 justify-center flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter.key
                  ? "bg-primary text-white"
                  : "bg-white text-dark border border-gray-200 hover:border-primary hover:text-primary"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((project, i) => {
            const progress = Math.round((project.raised / project.goal) * 100);
            return (
              <div key={i} className="rounded-xl overflow-hidden shadow-md bg-white flex flex-col">
                <div className="relative h-52">
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-primary font-semibold">
                      {getCountryName(project.countryCode, locale)}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-400">{project.category}</span>
                  </div>
                  <h3 className="text-dark font-bold text-lg mb-2">{project.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-grow">{project.desc}</p>

                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{t("raised")}: €{project.raised.toLocaleString()}</span>
                      <span>{t("goal")}: €{project.goal.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-secondary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="text-xs text-primary font-semibold mt-1">{progress}% {t("funded")}</p>
                  </div>

                  <Link href={`/${locale}/projects/${project.id}`} className="mt-3 text-primary text-xs hover:underline text-center block">
                    {t("readMore")}
                  </Link>
                  <Link href={`/${locale}/donate`} className="mt-2 bg-secondary hover:bg-green-700 text-white text-center py-2 rounded font-medium text-sm transition-colors">
                    {t("donateNow")}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">{t("ctaTitle")}</h2>
          <p className="text-white/80 mb-8 text-lg">{t("ctaSubtitle")}</p>
          <Link href={`/${locale}/donate`} className="bg-secondary hover:bg-green-700 text-white px-12 py-3 rounded font-semibold text-lg transition-colors">
            {t("donateNow")}
          </Link>
        </div>
      </section>

    </div>
  );
}