"use client";

import { useEffect, useState } from "react";
import ResultsScreen from "@/components/ResultsScreen";
import { getAnswer } from "@/utils/answers";

export default function ResultsPage() {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Get email from answers (question ID 6)
    const emailAnswer = getAnswer(6);
    if (emailAnswer && typeof emailAnswer === "string") {
      setUserEmail(emailAnswer);
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <ResultsScreen userEmail={userEmail} />
    </div>
  );
}
