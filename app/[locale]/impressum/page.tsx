import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === "de" ? "Impressum | GHAR Foundation" : locale === "ar" ? "بيانات قانونية | مؤسسة غار" : "Impressum | GHAR Foundation",
  };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const isAr = locale === "ar";
  const isDe = locale === "de";

  return (
    <div className="bg-background min-h-screen">

      {/* Hero */}
      <section className="bg-primary py-16 px-4 text-center">
        <h1 className="text-4xl font-bold text-white">
          {isAr ? "البيانات القانونية" : "Impressum"}
        </h1>
        <p className="text-white/70 mt-3 text-lg">
          {isAr ? "المعلومات القانونية للمؤسسة" : isDe ? "Rechtliche Angaben" : "Legal Information"}
        </p>
      </section>

      {/* Content */}
      <section className="py-16 px-4 max-w-3xl mx-auto">

        {/* Angaben gemäß § 5 TMG */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-bold text-dark mb-4">
            {isAr ? "بيانات المنظمة (§ 5 TMG)" : "Angaben gemäß § 5 TMG"}
          </h2>
          <div className="space-y-1 text-gray-600 text-sm leading-relaxed">
            <p className="font-semibold text-dark">German Humanitarian Relief Organization e.V.</p>
            <p>Kullenkampffallee 193</p>
            <p>28217 Bremen, Deutschland</p>
          </div>
        </div>

        {/* Kontakt */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-bold text-dark mb-4">
            {isAr ? "التواصل" : "Kontakt"}
          </h2>
          <div className="space-y-2 text-gray-600 text-sm">
            <p>
              <span className="font-medium text-dark">{isAr ? "الهاتف:" : "Telefon:"} </span>
              <a href="tel:+4901772839465" className="text-primary hover:underline">+49 01772839465</a>
            </p>
            <p>
              <span className="font-medium text-dark">{isAr ? "البريد الإلكتروني:" : "E-Mail:"} </span>
              <a href="mailto:info@ghar-ngo.com" className="text-primary hover:underline">info@ghar-ngo.com</a>
            </p>
            <p>
              <span className="font-medium text-dark">{isAr ? "الموقع:" : "Website:"} </span>
              <a href="https://www.ghar-ngo.com" className="text-primary hover:underline">www.ghar-ngo.com</a>
            </p>
          </div>
        </div>

        {/* Vereinsregister */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-bold text-dark mb-4">
            {isAr ? "سجل الجمعيات" : "Vereinsregister"}
          </h2>
          <div className="space-y-2 text-gray-600 text-sm">
            <p>
              <span className="font-medium text-dark">{isAr ? "رقم التسجيل:" : "Registernummer:"} </span>
              VR 8792 HB
            </p>
            <p>
              <span className="font-medium text-dark">{isAr ? "جهة التسجيل:" : "Registergericht:"} </span>
              Amtsgericht Bremen
            </p>
            <p>
              <span className="font-medium text-dark">{isAr ? "رقم الضريبة:" : "Steuernummer:"} </span>
              60/147/03398
            </p>
          </div>
        </div>

        {/* Vorstand */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-bold text-dark mb-4">
            {isAr ? "مجلس الإدارة" : "Vorstand"}
          </h2>
          <div className="space-y-3 text-gray-600 text-sm">
            <div>
              <p className="font-medium text-dark">{isAr ? "الرئيس الأول:" : "1. Vorsitzende:"}</p>
              <p>Eman Saad</p>
            </div>
            <div>
              <p className="font-medium text-dark">{isAr ? "الرئيس الثاني:" : "2. Vorsitzende:"}</p>
              <p>Aya Ayoub</p>
            </div>
            <div>
              <p className="font-medium text-dark">{isAr ? "أمين الصندوق:" : "Schatzmeister:"}</p>
              <p>Ibrahim Mohamed Ahmed Abusaif</p>
            </div>
          </div>
        </div>

        {/* Verantwortlich für den Inhalt */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-bold text-dark mb-4">
            {isAr ? "المسؤول عن المحتوى (§ 55 Abs. 2 RStV)" : "Verantwortlich für den Inhalt (§ 55 Abs. 2 RStV)"}
          </h2>
          <div className="text-gray-600 text-sm space-y-1">
            <p className="font-medium text-dark">Eman Saad</p>
            <p>Kullenkampffallee 193</p>
            <p>28217 Bremen, Deutschland</p>
          </div>
        </div>

        {/* Haftungsausschluss */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-dark mb-4">
            {isAr ? "إخلاء المسؤولية" : "Haftungsausschluss"}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            {isAr
              ? "تم إعداد محتوى هذا الموقع بعناية فائقة. ومع ذلك، لا نتحمل أي مسؤولية عن دقة المحتوى أو اكتماله أو حداثته. وفقاً للمادة 7 الفقرة 1 من قانون TMG، نحن كمزودي خدمة مسؤولون عن محتوياتنا الخاصة على هذه الصفحات وفقاً للقوانين العامة."
              : "Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich."
            }
          </p>
        </div>

        {/* Back link */}
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-primary hover:text-secondary font-medium transition-colors"
        >
          <ArrowLeft size={16} />
          {isAr ? "العودة للرئيسية" : isDe ? "Zurück zur Startseite" : "Back to Home"}
        </Link>

      </section>
    </div>
  );
}