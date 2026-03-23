import Link from "next/link";
import { Shield, FileText, PieChart, Users, Award, Download } from "lucide-react";

const reports = [
  { year: "2025", title: "Annual Financial Report 2025", size: "2.4 MB", status: "Available" },
  { year: "2024", title: "Annual Financial Report 2024", size: "1.8 MB", status: "Available" },
  { year: "2023", title: "Annual Financial Report 2023", size: "1.2 MB", status: "Available" },
];

const allocations = [
  { label: "Direct Aid & Projects", percentage: 75, color: "#1A6FA0" },
  { label: "Operations & Admin", percentage: 15, color: "#2D8F16" },
  { label: "Fundraising", percentage: 7, color: "#EF8800" },
  { label: "Reserve Fund", percentage: 3, color: "#2A2A2A" },
];

const governance = [
  { role: "Executive Director", name: "Ahmed Al-Rashid", responsibility: "Overall leadership and strategic direction" },
  { role: "Finance Director", name: "Lena Weber", responsibility: "Financial oversight and compliance" },
  { role: "Program Manager", name: "Sara Müller", responsibility: "Project implementation and monitoring" },
  { role: "Field Coordinator", name: "Omar Hassan", responsibility: "On-ground operations in Sudan & Yemen" },
];

const certifications = [
  { name: "Registered NGO in Germany", body: "Amtsgericht Bremen", year: "2024" },
  { name: "Tax-Exempt Status", body: "Finanzamt Bremen", year: "2024" },
  { name: "DZI Certification (Pending)", body: "Deutsches Zentralinstitut für soziale Fragen", year: "2026" },
];

export default function TransparencyPage() {
  return (
    <div className="bg-background">

      {/* Hero - No Image */}
      <section className="bg-primary py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <Shield size={48} className="text-white mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Transparency & Accountability</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            We believe that trust is built through openness. Here you will find everything you need to know about how we operate and use your donations.
          </p>
        </div>
      </section>

      {/* Financial Reports */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <FileText size={28} className="text-primary" />
          <h2 className="text-3xl font-bold text-dark">Financial Reports</h2>
        </div>
        <div className="flex flex-col gap-4">
          {reports.map((report, i) => (
            <div key={i} className="flex items-center justify-between bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary font-bold text-sm px-3 py-1 rounded-lg">
                  {report.year}
                </div>
                <div>
                  <p className="text-dark font-semibold text-sm">{report.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{report.size}</p>
                </div>
              </div>
              <button className="flex items-center gap-2 text-primary hover:text-white hover:bg-primary border border-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <Download size={14} />
                Download
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* How We Use Donations */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <PieChart size={28} className="text-primary" />
            <h2 className="text-3xl font-bold text-dark">How We Use Your Donations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Bar Chart */}
            <div className="flex flex-col gap-4">
              {allocations.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-dark text-sm font-medium">{item.label}</span>
                    <span className="text-dark font-bold text-sm">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-4">
                    <div
                      className="h-4 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Text */}
            <div>
              <h3 className="text-2xl font-bold text-dark mb-4">Our Commitment to Efficiency</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We are committed to ensuring that the maximum possible portion of every donation goes directly to those who need it most. Our operational costs are kept to a minimum through efficient management and the dedication of our volunteers.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                We follow the guidelines set by the DZI (Deutsches Zentralinstitut für soziale Fragen) and aim to achieve full certification as we grow.
              </p>
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <p className="text-primary font-bold text-2xl">75%</p>
                <p className="text-gray-500 text-sm">of every euro donated goes directly to aid projects</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <Users size={28} className="text-primary" />
          <h2 className="text-3xl font-bold text-dark">Governance Structure</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {governance.map((member, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs text-primary font-semibold uppercase mb-1">{member.role}</p>
              <p className="text-dark font-bold text-base mb-1">{member.name}</p>
              <p className="text-gray-500 text-sm">{member.responsibility}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <Award size={28} className="text-primary" />
            <h2 className="text-3xl font-bold text-dark">Certifications & Registration</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center">
                <Award size={32} className="text-primary mx-auto mb-3" />
                <p className="text-dark font-bold text-base mb-1">{cert.name}</p>
                <p className="text-gray-500 text-xs mb-1">{cert.body}</p>
                <p className="text-primary text-xs font-semibold">{cert.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Questions About Our Finances?</h2>
          <p className="text-white/80 mb-8 text-lg">
            We are always happy to answer any questions about how we operate and use donations.
          </p>
          <Link href="/about#contact" className="bg-secondary hover:bg-green-700 text-white px-12 py-3 rounded font-semibold text-lg transition-colors">
            Contact Us
          </Link>
        </div>
      </section>

    </div>
  );
}