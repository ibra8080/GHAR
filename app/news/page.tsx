"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";

const allNews = [
  { id: 1, image: "/images/NewsSection1.png", title: "GHAR Foundation launches new water project in Sudan", excerpt: "The new water project aims to provide clean drinking water to over 5,000 families in rural Sudan through solar-powered pumping stations.", date: "March 15, 2026", year: 2026, category: "Water" },
  { id: 2, image: "/images/NewsSection2.png", title: "Food distribution campaign reaches 1,000 families in Yemen", excerpt: "Our latest food aid campaign successfully distributed emergency food packages to families in the most affected areas of Yemen.", date: "February 20, 2026", year: 2026, category: "Food" },
  { id: 3, image: "/images/ProjectCards3.png", title: "Medical camp serves 800 patients in refugee camp", excerpt: "GHAR Foundation's mobile medical team provided free consultations, medicines and emergency care to hundreds of patients.", date: "January 10, 2026", year: 2026, category: "Medical" },
  { id: 4, image: "/images/ProjectCards4.png", title: "New school opens its doors for 200 children", excerpt: "Thanks to the generous support of our donors, a new school has been built providing quality education to 200 children in conflict zones.", date: "December 5, 2025", year: 2025, category: "Education" },
  { id: 5, image: "/images/HeroImage1.png", title: "Emergency shelter project completed in Sudan", excerpt: "GHAR Foundation has successfully completed the construction of 50 permanent homes for displaced families in Sudan.", date: "November 18, 2025", year: 2025, category: "Shelter" },
  { id: 6, image: "/images/HeroImage2.png", title: "Winter aid campaign kicks off in Yemen", excerpt: "As temperatures drop, GHAR Foundation begins distributing winter kits to vulnerable families across three governorates in Yemen.", date: "October 30, 2025", year: 2025, category: "Aid" },
  { id: 7, image: "/images/NewsSection1.png", title: "GHAR Foundation receives recognition from German authorities", excerpt: "The foundation has been officially recognized by German humanitarian authorities for its transparent operations and effective aid delivery.", date: "September 12, 2025", year: 2025, category: "News" },
  { id: 8, image: "/images/NewsSection2.png", title: "Partnership signed with local organizations in Sudan", excerpt: "A new partnership agreement has been signed with three local organizations in Sudan to strengthen our presence and reach on the ground.", date: "August 3, 2025", year: 2025, category: "News" },
  { id: 9, image: "/images/ProjectCards1.png", title: "Clean water project phase 2 begins", excerpt: "Following the success of phase 1, GHAR Foundation has launched phase 2 of the clean water project, targeting 8 additional villages.", date: "July 20, 2025", year: 2025, category: "Water" },
  { id: 10, image: "/images/ProjectCards2.png", title: "Ramadan food campaign distributes 2,000 packages", excerpt: "During Ramadan 2025, GHAR Foundation distributed 2,000 food packages to families in Sudan and Yemen, bringing joy during the holy month.", date: "March 25, 2025", year: 2025, category: "Food" },
  { id: 11, image: "/images/ProjectCards3.png", title: "Medical training program launched for local health workers", excerpt: "A new training program has been launched to build local capacity in basic healthcare delivery in remote areas of Sudan.", date: "February 14, 2025", year: 2025, category: "Medical" },
  { id: 12, image: "/images/ProjectCards4.png", title: "GHAR Foundation celebrates its first anniversary", excerpt: "One year after its founding, GHAR Foundation reflects on its achievements and looks ahead to an ambitious year of growth and impact.", date: "January 1, 2025", year: 2025, category: "News" },
];

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