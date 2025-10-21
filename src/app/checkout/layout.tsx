import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout - Unlock Your Full Analysis | InstaRizz",
  description: "Complete your purchase to unlock comprehensive Instagram profile analysis and personalized dating insights. Secure payment processing.",
  openGraph: {
    title: "Secure Checkout - Unlock Your Full Analysis | InstaRizz",
    description: "Complete your purchase to unlock comprehensive Instagram profile analysis and personalized dating insights.",
    url: "https://instarizz.com/checkout",
  },
  twitter: {
    title: "Secure Checkout - Unlock Your Full Analysis | InstaRizz",
    description: "Complete your purchase to unlock comprehensive Instagram profile analysis and personalized dating insights.",
  },
  alternates: {
    canonical: "https://instarizz.com/checkout",
  },
  robots: {
    index: false, // Don't index checkout pages
    follow: false,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
