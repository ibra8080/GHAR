import { getPageSettings, getTransparencyContent } from "@/sanity/lib/queries";
import TransparencyClient from "./TransparencyClient";

export default async function TransparencyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  const [pageSettings, transparencyContent] = await Promise.all([
    getPageSettings(),
    getTransparencyContent(),
  ]);

  const heroImage = pageSettings?.heroTransparency || null;

  return (
    <TransparencyClient
      heroImage={heroImage}
      transparencyContent={transparencyContent}
    />
  );
}