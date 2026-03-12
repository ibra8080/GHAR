"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Search, User, Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-background border-b-2 border-primary sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end h-20 pb-3">

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

          {/* Desktop Center Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-primary hover:text-[#2A2A2A] transition-colors text-sm font-medium">About US</Link>
            <Link href="/projects" className="text-primary hover:text-[#2A2A2A] transition-colors text-sm font-medium">Our Projects</Link>
            <Link href="/volunteer" className="text-primary hover:text-[#2A2A2A] transition-colors text-sm font-medium">Volunteer</Link>
            <Link href="/contact" className="text-primary hover:text-[#2A2A2A] transition-colors text-sm font-medium">Contact US</Link>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-primary hover:text-[#2A2A2A] transition-colors p-1"><Search size={18} /></button>
            <span className="text-gray-300">|</span>
            <button className="text-primary hover:text-[#2A2A2A] transition-colors p-1"><User size={18} /></button>
            <span className="text-gray-300">|</span>
            <button className="text-primary hover:text-[#2A2A2A] transition-colors text-sm font-medium">EN</button>
            <Link href="/donate" className="bg-secondary hover:bg-green-700 text-white px-5 py-2 rounded text-sm font-semibold transition-colors ml-2">
              Donate Now
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden p-2 text-dark" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          <Link href="/about" className="text-dark hover:text-primary text-sm font-medium" onClick={() => setMenuOpen(false)}>About US</Link>
          <Link href="/projects" className="text-dark hover:text-primary text-sm font-medium" onClick={() => setMenuOpen(false)}>Our Projects</Link>
          <Link href="/volunteer" className="text-dark hover:text-primary text-sm font-medium" onClick={() => setMenuOpen(false)}>Volunteer</Link>
          <Link href="/contact" className="text-dark hover:text-primary text-sm font-medium" onClick={() => setMenuOpen(false)}>Contact US</Link>
          <Link href="/donate" className="bg-secondary text-white px-5 py-2 rounded text-sm font-semibold text-center" onClick={() => setMenuOpen(false)}>Donate Now</Link>
        </div>
      )}
    </nav>
  );
}