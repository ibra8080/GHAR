"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { getCountryName } from "@/lib/utils";

type Project = {
  id: string;
  image: string;
  title: string;
  titleAr: string;
  titleDe: string;
  desc: string;
  descAr: string;
  descDe: string;
  countryCode: string;
  category: string;
  raised: number;
  goal: number;
};

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const t = useTranslations("projects");
  const locale = useLocale();

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

  const getTitle = (p: Project) => locale === "ar" ? p.titleAr : locale === "de" ? p.titleDe : p.title;
  const getDesc = (p: Project) => locale === "ar" ? p.descAr : locale === "de" ? p.descDe : p.desc;

  return (
    <>
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
            const progress = Math.round(((project.raised || 0) / (project.goal || 1)) * 100);
            return (
              <Link key={i} href={`/${locale}/projects/${project.id}`} className="rounded-xl overflow-hidden shadow-md bg-white flex flex-col hover:shadow-lg transition-shadow group">
                <div className="relative h-52">
                  <Image
                    src={project.image || "/images/ProjectCards1.png"}
                    alt={getTitle(project)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-primary font-semibold">
                      {getCountryName(project.countryCode, locale)}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-400">{project.category}</span>
                  </div>
                  <h3 className="text-dark font-bold text-lg mb-2">{getTitle(project)}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-grow group-hover:underline">{getDesc(project)}</p>

                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{t("raised")}: €{(project.raised || 0).toLocaleString()}</span>
                      <span>{t("goal")}: €{(project.goal || 0).toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-secondary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="text-xs text-primary font-semibold mt-1">{progress}% {t("funded")}</p>
                  </div>

                  <span className="mt-3 text-primary text-xs group-hover:underline text-center block">
                    {t("readMore")}
                  </span>
                  <Link
                    href={`/${locale}/donate`}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-2 bg-secondary hover:bg-green-700 text-white text-center py-2 rounded font-medium text-sm transition-colors"
                  >
                    {t("donateNow")}
                  </Link>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}