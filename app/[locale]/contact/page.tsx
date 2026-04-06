import { getTranslations } from "next-intl/server";
import { getSiteSettings, getPageSettings } from "@/sanity/lib/queries";
import Image from "next/image";
import ContactClient from "./ContactClient";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const [siteSettings, pageSettings] = await Promise.all([
    getSiteSettings(),
    getPageSettings(),
  ]);

  const heroImage = pageSettings?.heroContact || null;

  return (
    <div className="bg-background">

      {/* Hero */}
      <section className="relative h-[40vh]">
        {heroImage ? (
          <Image src={heroImage} alt="Contact" fill className="object-cover" priority />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-900" />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">{t("heroTitle")}</h1>
          <p className="text-white/80 mt-4 text-lg max-w-2xl">{t("heroSubtitle")}</p>
        </div>
      </section>

      <ContactClient siteSettings={siteSettings} />

    </div>
  );
}