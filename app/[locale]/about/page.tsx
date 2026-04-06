import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getTeam, getPartners, getAboutContent, getPageSettings } from "@/sanity/lib/queries";
import AboutClient from "./AboutClient";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const [team, partners, aboutContent, pageSettings] = await Promise.all([
    getTeam(),
    getPartners(),
    getAboutContent(),
    getPageSettings(),
  ]);

  const heroImage = pageSettings?.heroAbout || "/images/HeroImage1.png";

  return (
    <div className="bg-background">

      {/* Hero */}
      <section className="relative h-[50vh]">
        <Image src={heroImage} alt="About GHAR" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">{t("heroTitle")}</h1>
          <p className="text-white/80 mt-4 text-lg max-w-2xl">{t("heroSubtitle")}</p>
        </div>
      </section>

      <AboutClient team={team} partners={partners} aboutContent={aboutContent} />

    </div>
  );
}