import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BUSINESS, SOCIAL, DELIVERY, SITE } from "@/lib/constants";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: "#1A0F0A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s \u00b7 Cafe 88",
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  authors: [{ name: "Cafe 88" }],
  creator: "Cafe 88",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: "Cafe 88",
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE.url },
};

// JSON-LD Restaurant schema.
// NOTE: openingHoursSpecification intentionally OMITTED until owner
// confirms hours — standing flag forbids publishing unverified times.
const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": SITE.url,
  name: BUSINESS.name,
  description: BUSINESS.shortDescription,
  url: SITE.url,
  telephone: BUSINESS.phone.display,
  servesCuisine: ["Caf\u00e9", "Desserts", "A\u00e7a\u00ed Bowls", "Crepes", "Turkish Coffee"],
  priceRange: "$$",
  paymentAccepted: "Cash, Credit Card, Apple Pay, Google Pay",
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.state,
    postalCode: BUSINESS.address.zip,
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.address.lat,
    longitude: BUSINESS.address.lng,
  },
  sameAs: [SOCIAL.instagram.url, SOCIAL.facebook.url],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: BUSINESS.rating.stars,
    reviewCount: BUSINESS.rating.count,
    bestRating: 5,
  },
  potentialAction: [
    {
      "@type": "OrderAction",
      target: DELIVERY.doordash.url,
      deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeDirectDownload",
    },
    {
      "@type": "OrderAction",
      target: DELIVERY.ubereats.url,
    },
    {
      "@type": "OrderAction",
      target: DELIVERY.grubhub.url,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
      </head>
      <body className="bg-[#1A0F0A] text-[#FAF6F0] antialiased">
        <SmoothScroll>
          <ScrollProgress />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
