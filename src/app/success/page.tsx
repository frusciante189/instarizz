"use client";

import { useEffect, useState } from "react";
import { getAnswer } from "@/utils/answers";

export default function SuccessPage() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Get email from answers (question ID 6)
    const emailAnswer = getAnswer(6);
    if (emailAnswer && typeof emailAnswer === "string") {
      setEmail(emailAnswer);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gradient-radial-pink">
      <div className="min-h-screen w-full max-w-[430px] mx-auto flex flex-col">
        {/* Content */}
        <div className="flex-1 overflow-y-auto pt-12 pb-32 px-6">
          <div className="flex flex-col items-center">
            {/* Title matching onboarding style */}
            <h1
              className="font-extrabold text-5xl leading-[125%] text-center text-white mb-12"
              style={{
                WebkitTextStroke: "2px black",
                WebkitTextFillColor: "white",
                textShadow: "0px 0px 10px #000000B2",
              }}
            >
              Hey! Just So You Know...
            </h1>

            {/* Info Cards */}
            <div className="w-full space-y-6">
              {/* Test Payment Notice */}
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl animate-fade-in">
                <div className="text-center mb-4">
                  <span className="text-5xl">💳</span>
                </div>
                <p className="text-black font-bold text-xl text-center mb-3">
                  This was just a test payment
                </p>
                <p className="text-black/70 font-medium text-base text-center leading-relaxed">
                  We didn&apos;t charge you anything. This is only a demo to show you how the checkout process works!
                </p>
              </div>

              {/* Coming Soon */}
              <div
                className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="text-center mb-4">
                  <span className="text-5xl">🚀</span>
                </div>
                <p className="text-black font-bold text-xl text-center mb-3">
                  Actual App Coming Soon!
                </p>
                <p className="text-black/70 font-medium text-base text-center leading-relaxed mb-4">
                  The full Instagram Profile Analysis app will be launching in just a few days.
                </p>
                <div className="bg-gradient-to-r from-[#FF6F91] to-[#FF9671] rounded-2xl p-4">
                  <p className="text-white font-bold text-sm text-center mb-1">
                    📧 We&apos;ll notify you at:
                  </p>
                  <p className="text-white font-extrabold text-lg text-center">
                    {email || "your-email@example.com"}
                  </p>
                </div>
              </div>

              {/* What to Expect */}
              <div
                className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-center mb-4">
                  <span className="text-5xl">✨</span>
                </div>
                <p className="text-black font-bold text-xl text-center mb-4">
                  What to Expect
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF6F91] font-bold text-xl mt-0.5 flex-shrink-0">•</span>
                    <span className="text-black/80 font-medium">Deep AI-powered analysis of your Instagram profile</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF6F91] font-bold text-xl mt-0.5 flex-shrink-0">•</span>
                    <span className="text-black/80 font-medium">Personalized recommendations to boost engagement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF6F91] font-bold text-xl mt-0.5 flex-shrink-0">•</span>
                    <span className="text-black/80 font-medium">Content strategy tips for better reach</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Button - Fixed like onboarding */}
        <div className="sticky bottom-0 w-full bg-gradient-to-t from-[#FF9671] via-[#FF9671] to-transparent pt-6 pb-8 flex justify-center">
          <button
            onClick={() => window.location.href = "/"}
            className="h-20 w-20 rounded-full bg-white shadow-[0px_0px_30px_0px_#FF897C] hover:shadow-[0px_0px_40px_0px_#FF897C] transition-all flex items-center justify-center"
          >
            <span className="text-black font-extrabold text-2xl leading-none">
              ✓
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
