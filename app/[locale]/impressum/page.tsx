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
  const isEn = !isAr && !isDe;

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

        {/* Section 1 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-bold text-dark mb-4">
            {isAr ? "بيانات المنظمة (§ 5 TMG)" : isDe ? "Angaben gemäß § 5 TMG" : "Legal Information (§ 5 TMG)"}
          </h2>
          <div className="space-y-1 text-gray-600 text-sm leading-relaxed">
            <p className="font-semibold text-dark">German Humanitarian Relief Organization e.V.</p>
            <p>Kullenkampffallee 193</p>
            <p>28217 Bremen, Deutschland</p>
          </div>
        </div>

        {/* Section 2 - Contact */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-bold text-dark mb-4">
            {isAr ? "التواصل" : isDe ? "Kontakt" : "Contact"}
          </h2>
          <div className="space-y-2 text-gray-600 text-sm">
            <p>
              <span className="font-medium text-dark">
                {isAr ? "الهاتف:" : isDe ? "Telefon:" : "Phone:"}
              </span>{" "}
              <a href="tel:+4901772839465" className="text-primary hover:underline">+49 01772839465</a>
            </p>
            <p>
              <span className="font-medium text-dark">
                {isAr ? "البريد الإلكتروني:" : isDe ? "E-Mail:" : "Email:"}
              </span>{" "}
              <a href="mailto:info@ghar-ngo.com" className="text-primary hover:underline">info@ghar-ngo.com</a>
            </p>
            <p>
              <span className="font-medium text-dark">
                {isAr ? "الموقع:" : isDe ? "Website:" : "Website:"}
              </span>{" "}
              <a href="https://www.ghar-ngo.com" className="text-primary hover:underline">www.ghar-ngo.com</a>
            </p>
          </div>
        </div>

        {/* Section 3 - Register */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-bold text-dark mb-4">
            {isAr ? "سجل الجمعيات" : isDe ? "Vereinsregister" : "Association Register"}
          </h2>
          <div className="space-y-2 text-gray-600 text-sm">
            <p>
              <span className="font-medium text-dark">
                {isAr ? "رقم التسجيل:" : isDe ? "Registernummer:" : "Register Number:"}
              </span>{" "}
              VR 8792 HB
            </p>
            <p>
              <span className="font-medium text-dark">
                {isAr ? "جهة التسجيل:" : isDe ? "Registergericht:" : "Register Court:"}
              </span>{" "}
              Amtsgericht Bremen
            </p>
            <p>
              <span className="font-medium text-dark">
                {isAr ? "رقم الضريبة:" : isDe ? "Steuernummer:" : "Tax Number:"}
              </span>{" "}
              60/147/03398
            </p>
          </div>
        </div>

        {/* Section 4 - Board */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-bold text-dark mb-4">
            {isAr ? "مجلس الإدارة" : isDe ? "Vorstand" : "Board of Directors"}
          </h2>
          <div className="space-y-3 text-gray-600 text-sm">
            <div>
              <p className="font-medium text-dark">
                {isAr ? "الرئيس الأول:" : isDe ? "1. Vorsitzende:" : "1st Chairperson:"}
              </p>
              <p>Eman Saad</p>
            </div>
            <div>
              <p className="font-medium text-dark">
                {isAr ? "الرئيس الثاني:" : isDe ? "2. Vorsitzende:" : "2nd Chairperson:"}
              </p>
              <p>Aya Ayoub</p>
            </div>
            <div>
              <p className="font-medium text-dark">
                {isAr ? "أمين الصندوق:" : isDe ? "Schatzmeister:" : "Treasurer:"}
              </p>
              <p>Ibrahim Mohamed Ahmed Abusaif</p>
            </div>
          </div>
        </div>

        {/* Section 5 - Responsible */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-bold text-dark mb-4">
            {isAr
              ? "المسؤول عن المحتوى (§ 55 Abs. 2 RStV)"
              : isDe
              ? "Verantwortlich für den Inhalt (§ 55 Abs. 2 RStV)"
              : "Responsible for Content (§ 55 Abs. 2 RStV)"}
          </h2>
          <div className="text-gray-600 text-sm space-y-1">
            <p className="font-medium text-dark">Eman Saad</p>
            <p>Kullenkampffallee 193</p>
            <p>28217 Bremen, Deutschland</p>
          </div>
        </div>

        {/* Section 6 - Disclaimer */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-dark mb-4">
            {isAr ? "إخلاء المسؤولية" : isDe ? "Haftungsausschluss" : "Disclaimer"}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            {isAr
              ? "تم إعداد محتوى هذا الموقع بعناية فائقة. ومع ذلك، لا نتحمل أي مسؤولية عن دقة المحتوى أو اكتماله أو حداثته. وفقاً للمادة 7 الفقرة 1 من قانون TMG، نحن كمزودي خدمة مسؤولون عن محتوياتنا الخاصة على هذه الصفحات وفقاً للقوانين العامة."
              : isDe
              ? "Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich."
              : "The contents of our pages have been created with the utmost care. However, we cannot guarantee the accuracy, completeness or timeliness of the content. As a service provider, we are responsible for our own content on these pages in accordance with general laws pursuant to § 7 Abs.1 TMG."}
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