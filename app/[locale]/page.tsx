import { getProjects, getNews } from "@/sanity/lib/queries";
import HomeClient from "./HomeClient";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const projects = await getProjects();
  const news = await getNews();

  return <HomeClient projects={projects} news={news} />;
}