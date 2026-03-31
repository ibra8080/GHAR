import { getProjects, getNews, getHeroSlides, getStats } from "@/sanity/lib/queries";
import HomeClient from "./HomeClient";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  const [projects, news, heroSlides, stats] = await Promise.all([
    getProjects(),
    getNews(),
    getHeroSlides(),
    getStats(),
  ]);

  return (
    <HomeClient
      projects={projects}
      news={news}
      heroSlides={heroSlides}
      stats={stats}
    />
  );
}