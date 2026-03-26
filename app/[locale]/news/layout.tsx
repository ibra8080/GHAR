import type { Metadata } from 'next';

const titles: Record<string, string> = {
  en: 'Latest News | GHAR Foundation',
  ar: 'آخر الأخبار | مؤسسة غار',
  de: 'Aktuelle Nachrichten | GHAR Foundation',
};

const descriptions: Record<string, string> = {
  en: 'Stay updated with the latest news, stories, and updates from GHAR Foundation humanitarian work in Sudan and Yemen.',
  ar: 'ابق على اطلاع بآخر الأخبار والقصص والتحديثات من عمل مؤسسة غار الإنساني في السودان واليمن.',
  de: 'Bleiben Sie über die neuesten Nachrichten und Updates der humanitären Arbeit der GHAR Foundation informiert.',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
  };
}

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}