"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { news as allNews } from "@/lib/data";


const ITEMS_PER_PAGE = 10;
const years = ["All", "2026", "2025"];

export default function NewsPage() {
  const [activeYear, setActiveYear] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = activeYear === "All"
    ? allNews
    : allNews.filter((n) => n.year === parseInt(activeYear));

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleYearChange = (year: string) => {
    setActiveYear(year);
    setCurrentPage(1);
  };

  return (
    <div className="bg-background">

      {/* Hero */}
      <section className="relative h-[40vh]">
        <Image src="/images/NewsSection1.png" alt="News" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Latest News</h1>
          <p className="text-white/80 mt-4 text-lg max-w-2xl">
            Stay updated with our latest activities, projects, and impact stories
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="flex gap-3 justify-center flex-wrap">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => handleYearChange(year)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeYear === year
                  ? "bg-primary text-white"
                  : "bg-white text-dark border border-gray-200 hover:border-primary hover:text-primary"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
        <p className="text-center text-gray-400 text-sm mt-4">
          {filtered.length} articles found
        </p>
      </section>

      {/* News Grid */}
      <section className="pb-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginated.map((item) => (
            <div key={item.id} className="flex gap-4 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
              <div className="relative w-40 shrink-0">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{item.category}</span>
                  </div>
                  <h3 className="text-dark font-semibold text-sm leading-snug mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.excerpt}</p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <Calendar size={12} />
                    <span>{item.date}</span>
                  </div>
                  <Link href={`/news/${item.id}`} className="text-primary text-xs hover:underline font-medium">
                    Read more →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="pb-16 px-4 max-w-7xl mx-auto">
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-sm text-dark hover:border-primary hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={14} /> Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "border border-gray-200 text-dark hover:border-primary hover:text-primary"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-sm text-dark hover:border-primary hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next <ArrowRight size={14} />
            </button>
          </div>
          <p className="text-center text-gray-400 text-xs mt-3">
            Page {currentPage} of {totalPages}
          </p>
        </section>
      )}

    </div>
  );
}