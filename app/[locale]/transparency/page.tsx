import { getPageSettings } from "@/sanity/lib/queries";
import TransparencyClient from "./TransparencyClient";

export default async function TransparencyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  const pageSettings = await getPageSettings();
  const heroImage = pageSettings?.heroTransparency || null;

  return <TransparencyClient heroImage={heroImage} />;
}