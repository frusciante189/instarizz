"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StripeCheckoutUI from "@/components/StripeCheckoutUI";
import { getAnswer } from "@/utils/answers";

export default function CheckoutPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Get email from answers (question ID 6)
    const emailAnswer = getAnswer(6);
    if (emailAnswer && typeof emailAnswer === "string") {
      setUserEmail(emailAnswer);
    }
  }, []);

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="flex-1 flex flex-col">
      <StripeCheckoutUI
        isOpen={true}
        onClose={handleClose}
        userEmail={userEmail}
      />
    </div>
  );
}
