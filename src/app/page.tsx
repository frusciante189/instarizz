"use client";

import { useState } from "react";
import Main from "@/components/Main";
import Onboarding from "@/components/Onboarding";

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (showOnboarding) {
    return <Onboarding />;
  }

  return <Main onStartOnboarding={() => setShowOnboarding(true)} />;
}
