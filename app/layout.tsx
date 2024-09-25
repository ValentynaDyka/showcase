import { storyblokInit, apiPlugin } from "@storyblok/react";
import { StoryblokProvider } from "../app/components/StoryblokProvider";
import type { Metadata } from "next";
import { Providers } from './providers';
import Footer from "./components/Footer";
import { fetchFooterContent } from './components/storyblokService';
import Script from "next/script";
import { GoogleAnalytics } from '@next/third-parties/google'
import { GoogleTagManager } from '@next/third-parties/google'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.spilnota.de/'),
  title: "Спільнота by Valentyna Dyka | Web developer",
  description: "Спільнота Українців у Німеччині",
  openGraph: {
    locale: "ua",
    type: "website",
    title: 'Підготовка до співбесіди у Німеччині',
    description: 'Рандомайзер питань для підготовки до співбесіди у Німеччині. Питтання відповідь',
    siteName: "Підготовка до співбесіди у Німеччині ин Valentyna Dyka | Web developer / Web entwicklerin", 
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  }
};

const cachedFetch = (input: any, init?: any): Promise<Response> => {
  return fetch(input, {
    ...init,
    cache: "force-cache",
  });
}

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: "eu",
    fetch: cachedFetch,
  },
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // const headerContent = await fetchHeaderContent();
  const footerContent = await fetchFooterContent();
  

  return (
    <StoryblokProvider>
      <html lang="ua">
        <body>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
               <Script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="3f0565d0-ef96-4c20-97a5-07a5c130a9fd" data-blockingmode="auto" type="text/javascript"></Script>
         <GoogleAnalytics gaId="G-MNTH9X44PG" />
         <GoogleTagManager gtmId="G-MNTH9X44PG" />
          <Providers >
            {/* <Header blok={headerContent} /> */}
            {children}
            <Footer blok={footerContent} />
          </Providers>
        </body>
      </html>
    </StoryblokProvider>
  );
}