import { getTransparencyContent } from "@/sanity/lib/queries";
import TransparencyClient from "./TransparencyClient";

export default async function TransparencyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  const transparencyContent = await getTransparencyContent();

  const heroImage = transparencyContent?.heroImage || null;

  return (
    <TransparencyClient
      heroImage={heroImage}
      transparencyContent={transparencyContent}
    />
  );
}