import type { Metadata, Viewport } from "next";
import { Archivo, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";
import { siteUrl, siteName, personJsonLd, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollProgress } from "@/components/motion/ScrollProgress";

// Archivo's width axis carries both voices from the references: expanded-light
// section titles and condensed-black giant words.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = "Osayuki Obazee - Full Stack Developer & Founder of MEXO";
const description =
  "Osayuki Obazee (Yuki) is a full stack developer and founder of MEXO. From Edo State, Nigeria, now studying Computer Science at the University of Wolverhampton.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s - Osayuki Obazee",
  },
  description,
  applicationName: siteName,
  keywords: [
    "Osayuki Obazee",
    "Yuki",
    "Software Engineer",
    "Yuki_dev04",
    "Osayuki",
    "Obazee",
    "Full Stack Developer",
    "MEXO",
    "Yibera",
    "Football platform",
    "Hospital Management System",
    "Next.js",
    "React",
    "PHP",
    "MySQL",
    "TypeScript",
    "Founder",
    "Public Builder",
    "Edo State",
    "Nigeria",
    "Nigerian software developer",
    "University of Wolverhampton",
    "Computer Science student",
  ],
  authors: [{ name: "Osayuki Obazee", url: siteUrl }],
  creator: "Osayuki Obazee",
  publisher: "Osayuki Obazee",
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    siteName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: profile.socials.x.handle,
  },
};

export const viewport: Viewport = {
  themeColor: "#070908",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
