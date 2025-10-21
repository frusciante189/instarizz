import type { Metadata } from "next";
import { getStepBySlug } from "@/config/steps";
import questions from "@/data/questions.json";

type Props = {
  params: Promise<{ step: string }>;
  children: React.ReactNode;
};

const stepTitles: Record<string, string> = {
  gender: "Select Your Gender - Profile Analysis Step 1",
  age: "What's Your Age? - Profile Analysis Step 2",
  "interested-in": "Who Are You Interested In? - Profile Analysis Step 3",
  "looking-for": "What Are You Looking For? - Profile Analysis Step 4",
  "age-range": "Target Age Range - Profile Analysis Step 5",
  email: "Enter Your Email - Profile Analysis Step 6",
  profile: "Upload Your Profile - Profile Analysis Step 7",
};

const stepDescriptions: Record<string, string> = {
  gender: "Tell us about yourself to get personalized Instagram profile insights for dating success.",
  age: "Help us understand your demographic to provide accurate dating profile recommendations.",
  "interested-in": "Let us know your preferences to tailor your profile analysis and dating insights.",
  "looking-for": "Share your relationship goals to receive customized profile optimization tips.",
  "age-range": "Specify your target age range to optimize your Instagram profile for your ideal match.",
  email: "Get your personalized Instagram profile analysis delivered straight to your inbox.",
  profile: "Upload your Instagram profile photo for comprehensive AI-powered dating analysis.",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { step } = await params;
  const stepData = getStepBySlug(step);

  if (!stepData) {
    return {
      title: "Profile Analysis",
      description: "Complete your profile analysis to get personalized dating insights.",
    };
  }

  const question = questions.find((q) => q.id === stepData.questionId);
  const title = stepTitles[step] || `${question?.question || "Profile Analysis"} - Step ${stepData.id}`;
  const description = stepDescriptions[step] || "Complete this step to continue your Instagram profile analysis for dating success.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://instarizz.com/analyze/${step}`,
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: `https://instarizz.com/analyze/${step}`,
    },
    robots: {
      index: false, // Don't index individual steps
      follow: true,
    },
  };
}

export default function AnalyzeStepLayout({ children }: Props) {
  return <>{children}</>;
}
