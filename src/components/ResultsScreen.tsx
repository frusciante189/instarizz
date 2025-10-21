"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Title from "./Title";
import PaywallDrawer from "./PaywallDrawer";

export default function ResultsScreen() {
  const router = useRouter();
  const [showPaywall, setShowPaywall] = useState(false);
  const contentEndRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isAtBottomRef = useRef(false);

  // Detect scroll to bottom using Intersection Observer
  useEffect(() => {
    if (!contentEndRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasAtBottom = isAtBottomRef.current;
          isAtBottomRef.current = entry.isIntersecting;

          // Only show paywall if:
          // 1. User just reached the bottom (wasn't there before)
          // 2. Drawer is not already open
          if (entry.isIntersecting && !wasAtBottom && !showPaywall) {
            setShowPaywall(true);
          }
        });
      },
      {
        root: null, // viewport
        rootMargin: "200px 0px 0px 0px", // Trigger 200px before the marker enters viewport
        threshold: 0,
      }
    );

    observerRef.current.observe(contentEndRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [showPaywall]);

  return (
    <div className="flex flex-col items-center py-8 flex-1"
    >
      <Title>Your Profile Analysis</Title>

      <div className="w-full max-w-[600px] mt-8 space-y-6">
        {/* Overall Score - Lower, more concerning */}
        <div className="bg-[#FFF2E1] rounded-3xl p-6 border border-[#D8C8B9]/60 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-black font-extrabold text-xl">Initial Assessment</h3>
            <div className="flex items-center gap-2">
              <span className="text-4xl font-extrabold text-[#FF6B5B]">5.2</span>
              <span className="text-lg font-semibold text-black/60">/10</span>
            </div>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-[#E8D9C9]">
            <div
              className="h-full bg-gradient-to-r from-[#FF6B5B] to-[#FF897C] rounded-full transition-all duration-1000"
              style={{ width: "52%" }}
            />
          </div>
          <p className="text-black/70 text-sm mt-3 font-medium">
            Your profile has some concerning patterns that might be limiting your success...
          </p>
        </div>

        {/* Critical Issues - Vague but worrying */}
        <div
          className="bg-[#FFE8E5] rounded-3xl p-6 border border-[#FFB8B0]/60 animate-fade-in relative overflow-hidden"
          style={{ animationDelay: "0.1s" }}
        >
          <h3 className="text-black font-extrabold text-xl mb-4 flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            Critical Issues Found
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[#FF6B5B] font-bold text-lg mt-0.5">!</span>
              <span className="text-black font-medium">
                Photo selection showing low engagement signals
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#FF6B5B] font-bold text-lg mt-0.5">!</span>
              <span className="text-black font-medium">
                Profile composition hurting first impressions
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#FF6B5B] font-bold text-lg mt-0.5">!</span>
              <div>
                <span className="text-black font-medium">3 major red flags detected</span>
                <span className="block text-black/50 text-sm mt-1 italic">
                  Unlock to see specific issues
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* What's Working - Minimal positivity */}
        <div
          className="bg-[#FFF2E1] rounded-3xl p-6 border border-[#D8C8B9]/60 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <h3 className="text-black font-extrabold text-xl mb-4 flex items-center gap-2">
            <span className="text-2xl">✓</span>
            What&apos;s Working
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[#00D66F] font-bold text-lg mt-0.5">+</span>
              <span className="text-black/70 font-medium">
                Basic profile structure is functional
              </span>
            </li>
          </ul>
          <p className="text-black/50 text-sm mt-4 italic">
            Only 1 positive element found. Full analysis reveals why...
          </p>
        </div>

        {/* Hidden Potential - Create curiosity */}
        <div
          className="bg-gradient-to-br from-[#FFBFA8] to-[#FFA88A] rounded-3xl p-6 border border-[#E38E75]/80 animate-fade-in relative"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="absolute inset-0 bg-black/5 backdrop-blur-[2px] rounded-3xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🔒</div>
              <p className="text-white font-bold text-lg">Detailed Analysis Locked</p>
            </div>
          </div>
          <h3 className="text-white font-extrabold text-xl mb-3 flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            What You&apos;re Missing
          </h3>
          <p className="text-white font-medium leading-relaxed blur-sm select-none">
            Your profile has 8 specific issues that are killing your match rate.
            Our analysis shows exactly which photos to remove, what order works best,
            and the psychological triggers you&apos;re missing. One simple change could
            increase your matches by 340%...
          </p>
        </div>

        {/* Comparison - Show what they could have */}
        <div
          className="bg-[#FFF2E1] rounded-3xl p-6 border border-[#D8C8B9]/60 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <h3 className="text-black font-extrabold text-xl mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Your Profile vs Top Performers
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-black/70 font-medium">Visual Appeal</span>
                <span className="text-[#FF6B5B] font-bold">48%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#E8D9C9]">
                <div className="h-full bg-[#FF6B5B] rounded-full" style={{ width: "48%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-black/70 font-medium">Profile Optimization</span>
                <span className="text-[#FF6B5B] font-bold">34%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#E8D9C9]">
                <div className="h-full bg-[#FF6B5B] rounded-full" style={{ width: "34%" }} />
              </div>
            </div>
            <div className="relative">
              <div className="flex justify-between mb-2">
                <span className="text-black/70 font-medium">Match Potential</span>
                <span className="text-black/30 font-bold">???</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#E8D9C9] blur-sm">
                <div className="h-full bg-gradient-to-r from-[#FF6B5B] to-[#00D66F] rounded-full" style={{ width: "67%" }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-black/50 bg-white/80 px-2 py-1 rounded">
                  🔒 Unlock Full Report
                </span>
              </div>
            </div>
          </div>
          <p className="text-black/60 text-sm mt-4 italic text-center">
            Top profiles score 8.5+. See exactly what separates you from them...
          </p>
        </div>

        {/* Invisible marker for scroll detection - triggers paywall when visible */}
        <div ref={contentEndRef} className="h-px" />
      </div>

      {/* Paywall Drawer */}
      <PaywallDrawer
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        onOpenCheckout={() => router.push("/checkout")}
      />
    </div>
  );
}
