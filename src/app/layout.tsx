import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Script from "next/script";
import MetaPixel from "@/components/MetaPixel";
import Hotjar from "@/components/Hotjar";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://instarizz.com"),
  title: {
    default:
      "InstaRizz - AI-Powered Instagram Profile Analysis & Dating Insights",
    template: "%s | InstaRizz",
  },
  description:
    "Get personalized AI analysis of your Instagram profile for dating success. Discover your dating potential, attract your ideal match, and optimize your profile with expert insights.",
  keywords: [
    "Instagram profile analysis",
    "dating profile tips",
    "AI dating coach",
    "Instagram optimization",
    "dating insights",
    "profile improvement",
    "dating success",
    "social media dating",
  ],
  authors: [{ name: "InstaRizz" }],
  creator: "InstaRizz",
  publisher: "InstaRizz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://instarizz.com",
    siteName: "InstaRizz",
    title:
      "InstaRizz - AI-Powered Instagram Profile Analysis & Dating Insights",
    description:
      "Get personalized AI analysis of your Instagram profile for dating success. Discover your dating potential and attract your ideal match.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InstaRizz - AI-Powered Instagram Profile Analysis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "InstaRizz - AI-Powered Instagram Profile Analysis & Dating Insights",
    description:
      "Get personalized AI analysis of your Instagram profile for dating success. Discover your dating potential and attract your ideal match.",
    images: ["/og-image.png"],
    creator: "@instarizz",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/ir.png" }],
    apple: [{ url: "/ir.png" }],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "google-site-verification-code", // Replace with actual verification code
    // yandex: "yandex-verification-code",
    // bing: "bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        {/* Privacy-friendly analytics by Plausible */}
        <Script
          src="https://plausible.io/js/pa-7c98QKDVwJG9SGbeoBCtv.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`
            window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
            plausible.init()
          `}
        </Script>
        {/* Meta Pixel tracking */}
        <MetaPixel />
        {/* Hotjar tracking */}
        <Hotjar />
        <div className="w-full max-w-md mx-auto min-h-screen flex flex-col px-4">
          <div className="py-4">
            <Image
              src={"/instarizz.png"}
              width={103}
              height={28}
              alt="InstaRizz"
              quality={100}
            />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
