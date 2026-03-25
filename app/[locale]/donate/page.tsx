"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, RefreshCw, Shield, Globe } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { projects } from "@/lib/data";
import { useTranslations, useLocale } from "next-intl";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const amounts = [10, 25, 50, 100];

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState<"once" | "monthly">("once");
  const [selectedProject, setSelectedProject] = useState("general");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const t = useTranslations("donate");
  const locale = useLocale();

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  const handleDonate = async () => {
    if (!name || !email || !finalAmount) return;
    setStatus("loading");

    const { error } = await supabase.from("donors").insert([{
      name,
      email,
      amount: finalAmount,
      donation_type: donationType,
      project: selectedProject,
      status: "pending",
    }]);

    if (error) { setStatus("error"); return; }

    setStatus("success");
    window.open(`https://www.paypal.com/donate?business=info@ghar.de&amount=${finalAmount}&currency_code=EUR`, "_blank");
  };

  const projectOptions = [
    { id: "general", label: t("generalDonation") },
    { id: "zakat", label: t("zakat") },
    ...projects.map((p) => ({ id: p.id, label: p.title })),
  ];

  return (
    <div className="bg-background">

      {/* Hero */}
      <section className="relative h-[40vh]">
        <Image src="/images/HeroImage1.png" alt="Donate" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">{t("heroTitle")}</h1>
          <p className="text-white/80 mt-4 text-lg max-w-2xl">{t("heroSubtitle")}</p>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

              {/* Donation Type */}
              <div className="mb-8">
                <h3 className="text-dark font-bold text-lg mb-4">{t("donationType")}</h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDonationType("once")}
                    className={`flex-1 py-3 rounded-lg font-medium text-sm transition-colors ${
                      donationType === "once"
                        ? "bg-primary text-white"
                        : "border border-gray-200 text-dark hover:border-primary hover:text-primary"
                    }`}
                  >
                    <Heart size={16} className="inline mr-2" />
                    {t("oneTime")}
                  </button>
                  <button
                    onClick={() => setDonationType("monthly")}
                    className={`flex-1 py-3 rounded-lg font-medium text-sm transition-colors ${
                      donationType === "monthly"
                        ? "bg-primary text-white"
                        : "border border-gray-200 text-dark hover:border-primary hover:text-primary"
                    }`}
                  >
                    <RefreshCw size={16} className="inline mr-2" />
                    {t("monthly")}
                  </button>
                </div>
              </div>

              {/* Amount */}
              <div className="mb-8">
                <h3 className="text-dark font-bold text-lg mb-4">{t("selectAmount")}</h3>
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {amounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => { setSelectedAmount(amount); setCustomAmount(""); }}
                      className={`py-3 rounded-lg font-semibold text-sm transition-colors ${
                        selectedAmount === amount && !customAmount
                          ? "bg-secondary text-white"
                          : "border border-gray-200 text-dark hover:border-secondary hover:text-secondary"
                      }`}
                    >
                      €{amount}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder={t("customAmount")}
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Project */}
              <div className="mb-8">
                <h3 className="text-dark font-bold text-lg mb-4">{t("selectProject")}</h3>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark focus:outline-none focus:border-primary transition-colors"
                >
                  {projectOptions.map((p) => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </select>
              </div>

              {/* Personal Info */}
              <div className="mb-8">
                <h3 className="text-dark font-bold text-lg mb-4">{t("yourInfo")}</h3>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder={t("namePlaceholder")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark focus:outline-none focus:border-primary transition-colors"
                  />
                  <input
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="bg-primary/5 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-dark font-medium text-sm">{t("summaryDonation")}</span>
                  <span className="text-primary font-bold text-xl">€{finalAmount || 0}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-gray-500 text-xs">{t("summaryType")}</span>
                  <span className="text-gray-500 text-xs capitalize">{donationType}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-gray-500 text-xs">{t("summaryProject")}</span>
                  <span className="text-gray-500 text-xs">{projectOptions.find(p => p.id === selectedProject)?.label}</span>
                </div>
              </div>

              {status === "success" && (
                <p className="text-secondary text-sm text-center mb-4">{t("successMessage")}</p>
              )}
              {status === "error" && (
                <p className="text-red-500 text-sm text-center mb-4">{t("errorMessage")}</p>
              )}

              <button
                onClick={handleDonate}
                disabled={status === "loading" || !name || !email || !finalAmount}
                className="w-full bg-[#0070BA] hover:bg-[#005EA6] text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.72a.641.641 0 0 1 .633-.537h7.66c2.589 0 4.377.592 5.314 1.76.434.548.712 1.12.825 1.699.118.61.098 1.32-.064 2.11l-.007.038v.52l.233.132c.196.108.376.234.537.374.292.252.509.567.641.933.136.38.18.826.135 1.323-.055.611-.229 1.163-.514 1.638-.258.434-.594.8-.998 1.084-.388.274-.843.48-1.353.613-.493.13-1.053.196-1.664.196h-.396c-.283 0-.557.102-.773.286a1.154 1.154 0 0 0-.39.726l-.03.159-.476 3.02-.022.11a.641.641 0 0 1-.632.537H7.076z"/>
                </svg>
                {status === "loading" ? t("processing") : t("donatePayPal")}
              </button>

              <p className="text-center text-gray-400 text-xs mt-3">{t("redirectMessage")}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-dark font-bold text-lg mb-4">{t("whyTitle")}</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <Shield size={20} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-dark font-medium text-sm">{t("transparent")}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{t("transparentDesc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe size={20} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-dark font-medium text-sm">{t("directImpact")}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{t("directImpactDesc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart size={20} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-dark font-medium text-sm">{t("zakatEligible")}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{t("zakatDesc")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-dark font-bold text-lg mb-4">{t("otherWays")}</h3>
              <div className="flex flex-col gap-3">
                  <a
                  href="https://www.launchgood.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full border border-primary text-primary text-center py-3 rounded-lg font-medium text-sm hover:bg-primary hover:text-white transition-colors"
                >
                  {t("launchgood")}
                </a>
                <div className="border border-gray-100 rounded-lg p-4">
                  <p className="text-dark font-medium text-sm mb-2">{t("bankTransfer")}</p>
                  <p className="text-gray-500 text-xs">IBAN: DE00 0000 0000 0000 0000 00</p>
                  <p className="text-gray-500 text-xs">BIC: XXXXXXXX</p>
                  <p className="text-gray-500 text-xs">Bank: Sparkasse Bremen</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}