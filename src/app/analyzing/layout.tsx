import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analyzing Your Profile... | InstaRizz",
  description: "Our AI is analyzing your Instagram profile to provide personalized dating insights and recommendations. This will only take a moment.",
  openGraph: {
    title: "Analyzing Your Profile... | InstaRizz",
    description: "Our AI is analyzing your Instagram profile to provide personalized dating insights and recommendations.",
    url: "https://instarizz.com/analyzing",
  },
  twitter: {
    title: "Analyzing Your Profile... | InstaRizz",
    description: "Our AI is analyzing your Instagram profile to provide personalized dating insights and recommendations.",
  },
  alternates: {
    canonical: "https://instarizz.com/analyzing",
  },
  robots: {
    index: false, // Don't index transient loading pages
    follow: false,
  },
};

export default function AnalyzingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
