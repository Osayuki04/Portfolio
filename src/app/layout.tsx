import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";
import { siteUrl, siteName, personJsonLd, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollProgress } from "@/components/motion/ScrollProgress";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
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
  themeColor: "#041b18",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}if(t==='light'){document.documentElement.classList.add('light');}}catch(e){}})();`;

  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
