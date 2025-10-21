import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You - Analysis Complete | InstaRizz",
  description: "Thank you for completing your Instagram profile analysis. We'll notify you when your personalized dating insights are ready.",
  openGraph: {
    title: "Thank You - Analysis Complete | InstaRizz",
    description: "Thank you for completing your Instagram profile analysis. We'll notify you when your personalized dating insights are ready.",
    url: "https://instarizz.com/success",
  },
  twitter: {
    title: "Thank You - Analysis Complete | InstaRizz",
    description: "Thank you for completing your Instagram profile analysis. We'll notify you when your personalized dating insights are ready.",
  },
  alternates: {
    canonical: "https://instarizz.com/success",
  },
  robots: {
    index: false, // Don't index success pages
    follow: false,
  },
};

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
