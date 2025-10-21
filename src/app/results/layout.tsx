import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Profile Analysis Results - InstaRizz Dating Insights",
  description: "View your personalized Instagram profile analysis results. Discover your dating strengths, areas for improvement, and actionable insights to attract your ideal match.",
  openGraph: {
    title: "Your Profile Analysis Results - InstaRizz Dating Insights",
    description: "View your personalized Instagram profile analysis results. Discover your dating strengths and areas for improvement.",
    url: "https://instarizz.com/results",
  },
  twitter: {
    title: "Your Profile Analysis Results - InstaRizz Dating Insights",
    description: "View your personalized Instagram profile analysis results. Discover your dating strengths and areas for improvement.",
  },
  alternates: {
    canonical: "https://instarizz.com/results",
  },
  robots: {
    index: false, // Don't index personalized results pages
    follow: false,
  },
};

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
