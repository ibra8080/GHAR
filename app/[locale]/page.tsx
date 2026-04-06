import { getProjects, getNews, getHeroSlides, getStats, getHomeContent } from "@/sanity/lib/queries";
import HomeClient from "./HomeClient";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  const [projects, news, heroSlides, stats, homeContent] = await Promise.all([
    getProjects(),
    getNews(),
    getHeroSlides(),
    getStats(),
    getHomeContent(),
  ]);

  return (
    <HomeClient
      projects={projects}
      news={news}
      heroSlides={heroSlides}
      stats={stats}
      homeContent={homeContent}
    />
  );
}