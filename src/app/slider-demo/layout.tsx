import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slider Demo - Development Only",
  description: "UI component demonstration page for development purposes only.",
  robots: {
    index: false, // Exclude demo pages from search engines
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function SliderDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
