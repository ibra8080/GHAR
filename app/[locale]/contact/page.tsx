import { getTranslations } from "next-intl/server";
import { getSiteSettings } from "@/sanity/lib/queries";
import ContactClient from "./ContactClient";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const siteSettings = await getSiteSettings();

  return (
    <div className="bg-background">

      {/* Hero */}
      <section className="relative h-[40vh] bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-900" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">{t("heroTitle")}</h1>
          <p className="text-white/80 mt-4 text-lg max-w-2xl">{t("heroSubtitle")}</p>
        </div>
      </section>

      <ContactClient siteSettings={siteSettings} />

    </div>
  );
}