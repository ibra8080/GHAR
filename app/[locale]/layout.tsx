import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import CookieBanner from '@/components/layout/CookieBanner';
import { getSiteSettings, getProjects } from '@/sanity/lib/queries';


const locales = ['en', 'ar', 'de'];

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: 'GHAR Foundation — German Humanitarian Relief Organization',
    ar: 'مؤسسة غار — منظمة إنسانية ألمانية',
    de: 'GHAR Foundation — Deutsche Humanitäre Hilfsorganisation',
  };

  const descriptions: Record<string, string> = {
    en: 'GHAR Foundation provides humanitarian aid to crisis-affected regions in Sudan and Yemen. Donate, volunteer, or partner with us.',
    ar: 'مؤسسة غار تقدم المساعدات الإنسانية للمناطق المنكوبة في السودان واليمن. تبرع، تطوع، أو كن شريكاً معنا.',
    de: 'Die GHAR Foundation leistet humanitäre Hilfe in Krisenregionen im Sudan und Jemen. Spenden, ehrenamtlich tätig sein oder Partner werden.',
  };

  return {
    title: {
      default: titles[locale] || titles.en,
      template: `%s | GHAR Foundation`,
    },
    description: descriptions[locale] || descriptions.en,
    metadataBase: new URL('https://ghar-seven.vercel.app'),
    alternates: {
      canonical: `/${locale}`,
      languages: { 'en': '/en', 'ar': '/ar', 'de': '/de' },
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `https://ghar-seven.vercel.app/${locale}`,
      siteName: 'GHAR Foundation',
      images: [{ url: '/images/HeroImage1.png', width: 1200, height: 630, alt: 'GHAR Foundation' }],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: ['/images/HeroImage1.png'],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) notFound();

  const [messages, siteSettings, projects] = await Promise.all([
    getMessages(),
    getSiteSettings(),
    getProjects(),
  ]);

  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer siteSettings={siteSettings} projects={projects} />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}