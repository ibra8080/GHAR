import { getProjects, getNews, getHeroSlides, getStats, getHomeContent } from "@/sanity/lib/queries";
import { createClient } from "@supabase/supabase-js";
import HomeClient from "./HomeClient";
import { computeRaisedByProject } from "@/lib/computeRaisedByProject";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    global: {
      fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' }),
    },
  }
);

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  const [projects, news, heroSlides, stats, homeContent, { data: donors }] = await Promise.all([
    getProjects(),
    getNews(),
    getHeroSlides(),
    getStats(),
    getHomeContent(),
    supabase.from("donors").select("project, amount").eq("status", "completed"),
  ]);

  const raisedByProject = computeRaisedByProject(donors, projects);

  const homeProjects = projects.filter((p: { showOnHome?: boolean }) => p.showOnHome);

  return (
    <HomeClient
      projects={projects}
      homeProjects={homeProjects}
      news={news}
      heroSlides={heroSlides}
      stats={stats}
      homeContent={homeContent}
      raisedByProject={raisedByProject}
    />
  );
}