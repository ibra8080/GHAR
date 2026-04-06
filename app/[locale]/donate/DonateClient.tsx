"use client";

import { useState } from "react";
import { Heart, RefreshCw, Shield, Globe, Building2, CreditCard, CheckCircle } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { useTranslations, useLocale } from "next-intl";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const amounts = [10, 25, 50, 100];

type Project = {
  id: string;
  title: string;
  titleAr: string;
  titleDe: string;
};

type SiteSettings = {
  bankIban: string;
  bankBic: string;
  bankName: string;
  email: string;
} | null;

type PaymentMethod = "paypal" | "bank" | "card";

export default function DonateClient({
  projects,
  siteSettings,
}: {
  projects: Project[];
  siteSettings: SiteSettings;
}) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState<"once" | "monthly">("once");
  const [selectedProject, setSelectedProject] = useState("general");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("paypal");
  const [status, setStatus] = useState<"idle" | "loading" | "success_paypal" | "success_bank" | "error">("idle");
  const t = useTranslations("donate");
  const locale = useLocale();

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  const getTitle = (p: Project) => locale === "ar" ? p.titleAr : locale === "de" ? p.titleDe : p.title;

  const projectOptions = [
    { id: "general", label: t("generalDonation") },
    { id: "zakat", label: t("zakat") },
    ...projects.map((p) => ({ id: p.id, label: getTitle(p) })),
  ];

  const paypalEmail = siteSettings?.email || 'info@ghar.de';
  const bankIban = siteSettings?.bankIban || 'DE00 0000 0000 0000 0000 00';
  const bankBic = siteSettings?.bankBic || 'XXXXXXXX';
  const bankName = siteSettings?.bankName || 'Sparkasse Bremen';

  const isFormValid = name && email && finalAmount;

  const handleDonate = async () => {
    if (!isFormValid) return;
    setStatus("loading");

    const { error } = await supabase.from("donors").insert([{
      name,
      email: email.toLowerCase(),
      amount: finalAmount,
      donation_type: donationType,
      project: selectedProject,
      payment_method: paymentMethod,
      status: "pending",
    }]);

    if (error) { setStatus("error"); return; }

    if (paymentMethod === "paypal") {
      setStatus("success_paypal");
      window.open(
        `https://www.paypal.com/donate?business=${paypalEmail}&amount=${finalAmount}&currency_code=EUR`,
        "_blank"
      );
    } else if (paymentMethod === "bank") {
      setStatus("success_bank");
    }
  };

  const paymentMethods = [
    {
      id: "paypal" as PaymentMethod,
      label: "PayPal",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.72a.641.641 0 0 1 .633-.537h7.66c2.589 0 4.377.592 5.314 1.76.434.548.712 1.12.825 1.699.118.61.098 1.32-.064 2.11l-.007.038v.52l.233.132c.196.108.376.234.537.374.292.252.509.567.641.933.136.38.18.826.135 1.323-.055.611-.229 1.163-.514 1.638-.258.434-.594.8-.998 1.084-.388.274-.843.48-1.353.613-.493.13-1.053.196-1.664.196h-.396c-.283 0-.557.102-.773.286a1.154 1.154 0 0 0-.39.726l-.03.159-.476 3.02-.022.11a.641.641 0 0 1-.632.537H7.076z"/>
        </svg>
      ),
      available: true,
      color: "bg-[#0070BA]",
    },
    {
      id: "bank" as PaymentMethod,
      label: locale === "ar" ? "تحويل بنكي" : locale === "de" ? "Banküberweisung" : "Bank Transfer",
      icon: <Building2 size={20} />,
      available: true,
      color: "bg-primary",
    },
    {
      id: "card" as PaymentMethod,
      label: locale === "ar" ? "بطاقة ائتمان (قريباً)" : locale === "de" ? "Kreditkarte (Demnächst)" : "Credit Card (Soon)",
      icon: <CreditCard size={20} />,
      available: false,
      color: "bg-gray-400",
    },
  ];

  // Bank Transfer Success Screen
  if (status === "success_bank") {
    return (
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
          <CheckCircle size={64} className="text-secondary mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-dark mb-3">
            {locale === "ar" ? "شكراً لك!" : locale === "de" ? "Vielen Dank!" : "Thank You!"}
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {locale === "ar"
              ? "لقد تلقينا طلب تبرعك. يرجى إتمام التحويل البنكي باستخدام البيانات التالية. سنتواصل معك خلال 5 أيام عمل لتأكيد وصول التبرع."
              : locale === "de"
              ? "Wir haben Ihre Spendenanfrage erhalten. Bitte führen Sie die Banküberweisung mit den folgenden Daten durch. Wir werden uns innerhalb von 5 Werktagen bei Ihnen melden."
              : "We have received your donation request. Please complete the bank transfer using the details below. We will contact you within 5 business days to confirm receipt."}
          </p>

          <div className="bg-primary/5 rounded-xl p-6 text-left mb-6">
            <h3 className="text-dark font-bold text-base mb-4">
              {locale === "ar" ? "بيانات التحويل البنكي" : locale === "de" ? "Bankverbindung" : "Bank Transfer Details"}
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Bank:</span>
                <span className="text-dark font-medium text-sm">{bankName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">IBAN:</span>
                <span className="text-dark font-medium text-sm font-mono">{bankIban}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">BIC:</span>
                <span className="text-dark font-medium text-sm font-mono">{bankBic}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">
                  {locale === "ar" ? "المبلغ:" : locale === "de" ? "Betrag:" : "Amount:"}
                </span>
                <span className="text-primary font-bold text-lg">€{finalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">
                  {locale === "ar" ? "المرجع:" : locale === "de" ? "Verwendungszweck:" : "Reference:"}
                </span>
                <span className="text-dark font-medium text-sm">{name} — {selectedProject}</span>
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-xs">
            {locale === "ar"
              ? `سيتم إرسال تأكيد إلى ${email}`
              : locale === "de"
              ? `Eine Bestätigung wird an ${email} gesendet`
              : `A confirmation will be sent to ${email}`}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Form */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

            {/* Donation Type */}
            <div className="mb-8">
              <h3 className="text-dark font-bold text-lg mb-4">{t("donationType")}</h3>
              <div className="flex gap-3">
                <button onClick={() => setDonationType("once")}
                  className={`flex-1 py-3 rounded-lg font-medium text-sm transition-colors ${donationType === "once" ? "bg-primary text-white" : "border border-gray-200 text-dark hover:border-primary hover:text-primary"}`}>
                  <Heart size={16} className="inline mr-2" />{t("oneTime")}
                </button>
                <button onClick={() => setDonationType("monthly")}
                  className={`flex-1 py-3 rounded-lg font-medium text-sm transition-colors ${donationType === "monthly" ? "bg-primary text-white" : "border border-gray-200 text-dark hover:border-primary hover:text-primary"}`}>
                  <RefreshCw size={16} className="inline mr-2" />{t("monthly")}
                </button>
              </div>
            </div>

            {/* Amount */}
            <div className="mb-8">
              <h3 className="text-dark font-bold text-lg mb-4">{t("selectAmount")}</h3>
              <div className="grid grid-cols-4 gap-3 mb-4">
                {amounts.map((amount) => (
                  <button key={amount} onClick={() => { setSelectedAmount(amount); setCustomAmount(""); }}
                    className={`py-3 rounded-lg font-semibold text-sm transition-colors ${selectedAmount === amount && !customAmount ? "bg-secondary text-white" : "border border-gray-200 text-dark hover:border-secondary hover:text-secondary"}`}>
                    €{amount}
                  </button>
                ))}
              </div>
              <input type="number" placeholder={t("customAmount")} value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark focus:outline-none focus:border-primary transition-colors" />
            </div>

            {/* Project */}
            <div className="mb-8">
              <h3 className="text-dark font-bold text-lg mb-4">{t("selectProject")}</h3>
              <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark focus:outline-none focus:border-primary transition-colors">
                {projectOptions.map((p) => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
            </div>

            {/* Personal Info */}
            <div className="mb-8">
              <h3 className="text-dark font-bold text-lg mb-4">{t("yourInfo")}</h3>
              <div className="flex flex-col gap-3">
                <input type="text" placeholder={t("namePlaceholder")} value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark focus:outline-none focus:border-primary transition-colors" />
                <input type="email" placeholder={t("emailPlaceholder")} value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-dark focus:outline-none focus:border-primary transition-colors" />
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

            {/* Payment Method */}
            <div className="mb-6">
              <h3 className="text-dark font-bold text-lg mb-4">
                {locale === "ar" ? "طريقة الدفع" : locale === "de" ? "Zahlungsmethode" : "Payment Method"}
              </h3>
              <div className="flex flex-col gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => method.available && setPaymentMethod(method.id)}
                    disabled={!method.available}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors text-left ${
                      !method.available
                        ? "border-gray-100 bg-gray-50 cursor-not-allowed opacity-50"
                        : paymentMethod === method.id
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-primary/50"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg ${method.color} text-white flex items-center justify-center shrink-0`}>
                      {method.icon}
                    </div>
                    <span className="text-dark font-medium text-sm">{method.label}</span>
                    {paymentMethod === method.id && method.available && (
                      <CheckCircle size={16} className="text-primary ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {status === "success_paypal" && (
              <p className="text-secondary text-sm text-center mb-4">{t("successMessage")}</p>
            )}
            {status === "error" && (
              <p className="text-amber-600 text-sm text-center mb-4">{t("errorMessage")}</p>
            )}

            <button
              onClick={handleDonate}
              disabled={status === "loading" || !isFormValid}
              className={`w-full text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed ${
                paymentMethod === "paypal" ? "bg-[#0070BA] hover:bg-[#005EA6]" : "bg-primary hover:bg-secondary"
              }`}
            >
              {status === "loading" ? (
                <RefreshCw size={20} className="animate-spin" />
              ) : paymentMethod === "paypal" ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.72a.641.641 0 0 1 .633-.537h7.66c2.589 0 4.377.592 5.314 1.76.434.548.712 1.12.825 1.699.118.61.098 1.32-.064 2.11l-.007.038v.52l.233.132c.196.108.376.234.537.374.292.252.509.567.641.933.136.38.18.826.135 1.323-.055.611-.229 1.163-.514 1.638-.258.434-.594.8-.998 1.084-.388.274-.843.48-1.353.613-.493.13-1.053.196-1.664.196h-.396c-.283 0-.557.102-.773.286a1.154 1.154 0 0 0-.39.726l-.03.159-.476 3.02-.022.11a.641.641 0 0 1-.632.537H7.076z"/>
                  </svg>
                  {t("donatePayPal")}
                </>
              ) : (
                <>
                  <Building2 size={20} />
                  {locale === "ar" ? "تأكيد التبرع بالتحويل البنكي" : locale === "de" ? "Spende per Banküberweisung bestätigen" : "Confirm Bank Transfer Donation"}
                </>
              )}
            </button>

            {paymentMethod === "paypal" && (
              <p className="text-center text-gray-400 text-xs mt-3">{t("redirectMessage")}</p>
            )}
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

        </div>

      </div>
    </section>
  );
}