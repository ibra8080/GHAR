import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";

async function getNewsItem(id: string) {
  try {
    return await client.fetch(`
      *[_type == "news" && (slug.current == $id || _id == $id)][0] {
        "id": coalesce(slug.current, _id),
        "image": image.asset->url,
        "title": title.en,
        "titleAr": title.ar,
        "titleDe": title.de,
        "excerpt": excerpt.en,
        "excerptAr": excerpt.ar,
        "excerptDe": excerpt.de,
        "content": content.en,
        "contentAr": content.ar,
        "contentDe": content.de,
        "date": date,
        category,
      }
    `, { id });
  } catch {
    return null;
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  const item = await getNewsItem(id);

  if (!item) notFound();

  const getTitle = () => locale === "ar" ? item.titleAr : locale === "de" ? item.titleDe : item.title;
  const getContent = () => locale === "ar" ? item.contentAr : locale === "de" ? item.contentDe : item.content;
  const getExcerpt = () => locale === "ar" ? item.excerptAr : locale === "de" ? item.excerptDe : item.excerpt;

  return (
    <div className="bg-background">

      {/* Hero */}
      <section className="relative h-[50vh]">
        {item.image && (
          <>
            <Image src={item.image} alt={getTitle()} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/50" />
          </>
        )}
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20">
          <Link href={`/${locale}/news`} className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4 transition-colors w-fit">
            <ArrowLeft size={16} />
            {locale === "ar" ? "العودة للأخبار" : locale === "de" ? "Zurück zu Nachrichten" : "Back to News"}
          </Link>
          {item.category && (
            <span className="text-white/70 text-sm mb-2">{item.category} • {item.date}</span>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-white max-w-3xl">{getTitle()}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        {getExcerpt() && (
          <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium border-l-4 border-primary pl-4">
            {getExcerpt()}
          </p>
        )}
        {getContent() ? (
          <div className="prose max-w-none">
            {getContent()?.split('\n').map((paragraph: string, i: number) => (
              paragraph.trim() && (
                <p key={i} className="text-gray-600 leading-relaxed mb-4">
                  {paragraph}
                </p>
              )
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">
            {locale === "ar" ? "المحتوى قيد الإعداد" : locale === "de" ? "Inhalt wird vorbereitet" : "Content coming soon"}
          </p>
        )}

        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link href={`/${locale}/news`}
            className="inline-flex items-center gap-2 text-primary hover:text-secondary font-medium transition-colors">
            <ArrowLeft size={16} />
            {locale === "ar" ? "العودة لكل الأخبار" : locale === "de" ? "Alle Nachrichten" : "Back to all news"}
          </Link>
        </div>
      </section>

    </div>
  );
}