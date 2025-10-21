import Main from "@/components/Main";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Your Profile Analysis - Free Instagram Dating Assessment",
  description: "Discover your dating potential with our free AI-powered Instagram profile analysis. Get personalized insights to attract your ideal match and improve your dating success rate.",
  openGraph: {
    title: "Start Your Profile Analysis - Free Instagram Dating Assessment",
    description: "Discover your dating potential with our free AI-powered Instagram profile analysis. Get personalized insights to attract your ideal match.",
    url: "https://instarizz.com",
  },
  twitter: {
    title: "Start Your Profile Analysis - Free Instagram Dating Assessment",
    description: "Discover your dating potential with our free AI-powered Instagram profile analysis. Get personalized insights to attract your ideal match.",
  },
  alternates: {
    canonical: "https://instarizz.com",
  },
};

export default function Home() {
  return <Main />;
}
