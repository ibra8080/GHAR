import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getProjects, getSiteSettings } from "@/sanity/lib/queries";
import DonateClient from "./DonateClient";

export default async function DonatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "donate" });
  const [projects, siteSettings] = await Promise.all([
    getProjects(),
    getSiteSettings(),
  ]);

  return (
    <div className="bg-background">
      <section className="relative h-[40vh]">
        <Image src="/images/HeroImage1.png" alt="Donate" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">{t("heroTitle")}</h1>
          <p className="text-white/80 mt-4 text-lg max-w-2xl">{t("heroSubtitle")}</p>
        </div>
      </section>
      <DonateClient projects={projects} siteSettings={siteSettings} />
    </div>
  );
}