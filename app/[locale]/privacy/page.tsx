import Link from "next/link";
import { Shield } from "lucide-react";

const content = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: March 2026",
    intro: "GHAR Foundation is committed to protecting your privacy. This policy explains how we collect, use, and protect your personal data in accordance with the EU General Data Protection Regulation (GDPR).",
    sections: [
      {
        title: "1. Data Controller",
        text: "GHAR Foundation, Kullenkampffallee 193, 28217 Bremen, Germany. Email: info@ghar.de",
      },
      {
        title: "2. Data We Collect",
        text: "We collect personal data you provide when donating (name, email, amount), volunteering (name, email, phone, country, specialty), or contacting us via our contact form.",
      },
      {
        title: "3. How We Use Your Data",
        text: "We use your data to process donations, send confirmation emails, manage volunteer applications, and respond to your inquiries. We do not sell or share your data with third parties for marketing purposes.",
      },
      {
        title: "4. Cookies",
        text: "We use essential cookies to ensure the website functions properly. We also use analytics cookies to understand how visitors use our site. You can accept or decline cookies via the cookie banner.",
      },
      {
        title: "5. Data Storage",
        text: "Your data is stored securely on Supabase servers located in Frankfurt, Germany (EU). We retain your data for as long as necessary to fulfill the purposes described in this policy.",
      },
      {
        title: "6. Your Rights",
        text: "Under GDPR, you have the right to access, correct, delete, or export your personal data. You may also object to processing or withdraw consent at any time. Contact us at info@ghar.de to exercise your rights.",
      },
      {
        title: "7. Third-Party Services",
        text: "We use PayPal for donation processing and Resend for email delivery. These services have their own privacy policies. We also use Vercel for hosting and Sanity for content management.",
      },
      {
        title: "8. Contact",
        text: "For any privacy-related questions, contact us at: info@ghar.de or write to GHAR Foundation, Kullenkampffallee 193, 28217 Bremen, Germany.",
      },
    ],
  },
  ar: {
    title: "سياسة الخصوصية",
    lastUpdated: "آخر تحديث: مارس 2026",
    intro: "تلتزم مؤسسة غار بحماية خصوصيتك. توضح هذه السياسة كيفية جمع بياناتك الشخصية واستخدامها وحمايتها وفقاً للائحة الأوروبية العامة لحماية البيانات (GDPR).",
    sections: [
      { title: "1. المتحكم في البيانات", text: "مؤسسة غار، Kullenkampffallee 193، 28217 بريمن، ألمانيا. البريد الإلكتروني: info@ghar.de" },
      { title: "2. البيانات التي نجمعها", text: "نجمع البيانات الشخصية التي تقدمها عند التبرع (الاسم، البريد الإلكتروني، المبلغ)، أو التطوع، أو التواصل معنا." },
      { title: "3. كيف نستخدم بياناتك", text: "نستخدم بياناتك لمعالجة التبرعات وإرسال رسائل تأكيد وإدارة طلبات التطوع والرد على استفساراتك. لا نبيع بياناتك لأطراف ثالثة." },
      { title: "4. ملفات تعريف الارتباط", text: "نستخدم ملفات تعريف الارتباط الأساسية لضمان عمل الموقع بشكل صحيح. يمكنك قبول أو رفض ملفات تعريف الارتباط عبر شريط الموافقة." },
      { title: "5. تخزين البيانات", text: "تُخزّن بياناتك بأمان على خوادم Supabase في فرانكفورت، ألمانيا (الاتحاد الأوروبي)." },
      { title: "6. حقوقك", text: "بموجب GDPR، لديك الحق في الوصول إلى بياناتك الشخصية وتصحيحها وحذفها. تواصل معنا على info@ghar.de لممارسة حقوقك." },
      { title: "7. خدمات الطرف الثالث", text: "نستخدم PayPal لمعالجة التبرعات وResend لتسليم البريد الإلكتروني وVercel للاستضافة وSanity لإدارة المحتوى." },
      { title: "8. التواصل", text: "لأي أسئلة متعلقة بالخصوصية، تواصل معنا على: info@ghar.de" },
    ],
  },
  de: {
    title: "Datenschutzrichtlinie",
    lastUpdated: "Zuletzt aktualisiert: März 2026",
    intro: "Die GHAR Foundation verpflichtet sich zum Schutz Ihrer Privatsphäre. Diese Richtlinie erläutert, wie wir Ihre personenbezogenen Daten gemäß der EU-Datenschutz-Grundverordnung (DSGVO) erheben, verwenden und schützen.",
    sections: [
      { title: "1. Verantwortlicher", text: "GHAR Foundation, Kullenkampffallee 193, 28217 Bremen, Deutschland. E-Mail: info@ghar.de" },
      { title: "2. Erhobene Daten", text: "Wir erheben personenbezogene Daten, die Sie beim Spenden (Name, E-Mail, Betrag), bei der Freiwilligenarbeit oder beim Kontakt über unser Formular angeben." },
      { title: "3. Verwendung Ihrer Daten", text: "Wir verwenden Ihre Daten zur Spendenverarbeitung, zum Versand von Bestätigungs-E-Mails und zur Bearbeitung von Freiwilligenanfragen. Wir verkaufen Ihre Daten nicht an Dritte." },
      { title: "4. Cookies", text: "Wir verwenden notwendige Cookies für die Funktionalität der Website. Sie können Cookies über das Cookie-Banner akzeptieren oder ablehnen." },
      { title: "5. Datenspeicherung", text: "Ihre Daten werden sicher auf Supabase-Servern in Frankfurt, Deutschland (EU) gespeichert." },
      { title: "6. Ihre Rechte", text: "Gemäß DSGVO haben Sie das Recht auf Zugang, Berichtigung und Löschung Ihrer personenbezogenen Daten. Kontaktieren Sie uns unter info@ghar.de." },
      { title: "7. Drittanbieter-Dienste", text: "Wir nutzen PayPal für die Spendenverarbeitung, Resend für E-Mail-Zustellung, Vercel für Hosting und Sanity für Content-Management." },
      { title: "8. Kontakt", text: "Bei datenschutzbezogenen Fragen kontaktieren Sie uns unter: info@ghar.de oder GHAR Foundation, Kullenkampffallee 193, 28217 Bremen." },
    ],
  },
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = content[locale as keyof typeof content] || content.en;

  return (
    <div className="bg-background">

      {/* Hero */}
      <section className="bg-primary py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <Shield size={48} className="text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-3">{t.title}</h1>
          <p className="text-white/70 text-sm">{t.lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <p className="text-gray-600 leading-relaxed mb-10 text-base">{t.intro}</p>
        <div className="flex flex-col gap-8">
          {t.sections.map((section, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-dark font-bold text-lg mb-3">{section.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href={`/${locale}`} className="text-primary hover:underline text-sm font-medium">
            ← {locale === "ar" ? "العودة للرئيسية" : locale === "de" ? "Zurück zur Startseite" : "Back to Home"}
          </Link>
        </div>
      </section>

    </div>
  );
}