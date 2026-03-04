"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/GahrLogo.svg"
              alt="GHAR Foundation"
              width={120}
              height={60}
              priority
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-dark hover:text-primary transition-colors text-sm font-medium">About</Link>
            <Link href="/projects" className="text-dark hover:text-primary transition-colors text-sm font-medium">Projects</Link>
            <Link href="/transparency" className="text-dark hover:text-primary transition-colors text-sm font-medium">Transparency</Link>
            <Link href="/volunteer" className="text-dark hover:text-primary transition-colors text-sm font-medium">Volunteer</Link>
            <Link href="/contact" className="text-dark hover:text-primary transition-colors text-sm font-medium">Contact</Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Link href="/donate" className="bg-accent hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors">
              Donate Now
            </Link>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={`block w-6 h-0.5 bg-dark transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
              <span className={`block w-6 h-0.5 bg-dark transition-all ${menuOpen ? "opacity-0" : ""}`}></span>
              <span className={`block w-6 h-0.5 bg-dark transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          <Link href="/about" className="text-dark hover:text-primary text-sm font-medium" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/projects" className="text-dark hover:text-primary text-sm font-medium" onClick={() => setMenuOpen(false)}>Projects</Link>
          <Link href="/transparency" className="text-dark hover:text-primary text-sm font-medium" onClick={() => setMenuOpen(false)}>Transparency</Link>
          <Link href="/volunteer" className="text-dark hover:text-primary text-sm font-medium" onClick={() => setMenuOpen(false)}>Volunteer</Link>
          <Link href="/contact" className="text-dark hover:text-primary text-sm font-medium" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
}