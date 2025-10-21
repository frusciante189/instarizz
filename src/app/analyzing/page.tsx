"use client";

import { useRouter } from "next/navigation";
import AnalyzingScreen from "@/components/AnalyzingScreen";

export default function AnalyzingPage() {
  const router = useRouter();

  const handleComplete = () => {
    router.push("/results");
  };

  return (
    <div className="flex-1 flex flex-col">
      <AnalyzingScreen onComplete={handleComplete} />
    </div>
  );
}
