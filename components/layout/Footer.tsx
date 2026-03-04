import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Logo & Description */}
          <div>
            <Image
              src="/images/GahrLogo.svg"
              alt="GHAR Foundation"
              width={100}
              height={50}
            />
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              German Humanitarian Relief Organization providing aid to crisis-affected regions in Sudan and Yemen.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</Link></li>
              <li><Link href="/projects" className="text-gray-400 hover:text-white text-sm transition-colors">Projects</Link></li>
              <li><Link href="/donate" className="text-gray-400 hover:text-white text-sm transition-colors">Donate</Link></li>
              <li><Link href="/transparency" className="text-gray-400 hover:text-white text-sm transition-colors">Transparency</Link></li>
              <li><Link href="/volunteer" className="text-gray-400 hover:text-white text-sm transition-colors">Volunteer</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Germany</li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2025 GHAR Foundation. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/imprint" className="text-gray-400 hover:text-white transition-colors">Imprint</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}