import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

const locales = ["en", "ar", "de"];

export default getRequestConfig(async () => {
  // Auto-detect from browser
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "en";

  let locale = "en";
  for (const lang of locales) {
    if (acceptLanguage.startsWith(lang)) {
      locale = lang;
      break;
    }
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});