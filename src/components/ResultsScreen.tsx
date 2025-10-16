"use client";

import React, { useState, useEffect, useRef } from "react";
import Title from "./Title";
import PaywallDrawer from "./PaywallDrawer";

export default function ResultsScreen() {
  const [showPaywall, setShowPaywall] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const contentEndRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Detect scroll to bottom using Intersection Observer
  useEffect(() => {
    if (!contentEndRef.current || hasTriggered) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered) {
            setShowPaywall(true);
            setHasTriggered(true);
            // Disconnect observer after first trigger
            if (observerRef.current) {
              observerRef.current.disconnect();
            }
          }
        });
      },
      {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    observerRef.current.observe(contentEndRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasTriggered]);

  return (
    <div className="flex flex-col items-center py-8 flex-1"
    >
      <Title>Your Profile Analysis</Title>

      <div className="w-full max-w-[600px] mt-8 space-y-6">
        {/* Overall Score */}
        <div className="bg-[#FFF2E1] rounded-3xl p-6 border border-[#D8C8B9]/60 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-black font-extrabold text-xl">Overall Score</h3>
            <div className="flex items-center gap-2">
              <span className="text-4xl font-extrabold text-[#FF897C]">8.5</span>
              <span className="text-lg font-semibold text-black/60">/10</span>
            </div>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-[#E8D9C9]">
            <div
              className="h-full bg-gradient-to-r from-[#FF897C] to-[#FFA88A] rounded-full transition-all duration-1000"
              style={{ width: "85%" }}
            />
          </div>
        </div>

        {/* Strong Points */}
        <div
          className="bg-[#FFF2E1] rounded-3xl p-6 border border-[#D8C8B9]/60 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <h3 className="text-black font-extrabold text-xl mb-4 flex items-center gap-2">
            <span className="text-2xl">✨</span>
            Strong Points
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[#00D66F] font-bold text-lg mt-0.5">✓</span>
              <span className="text-black font-medium">
                High-quality images with good lighting
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#00D66F] font-bold text-lg mt-0.5">✓</span>
              <span className="text-black font-medium">
                Authentic and engaging profile aesthetic
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#00D66F] font-bold text-lg mt-0.5">✓</span>
              <span className="text-black font-medium">
                Good variety of content types
              </span>
            </li>
          </ul>
        </div>

        {/* Improvement Areas */}
        <div
          className="bg-[#FFF2E1] rounded-3xl p-6 border border-[#D8C8B9]/60 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <h3 className="text-black font-extrabold text-xl mb-4 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            Improvement Areas
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[#FF897C] font-bold text-lg mt-0.5">→</span>
              <span className="text-black font-medium">
                Add more lifestyle and hobby photos
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#FF897C] font-bold text-lg mt-0.5">→</span>
              <span className="text-black font-medium">
                Consider updating bio for better engagement
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#FF897C] font-bold text-lg mt-0.5">→</span>
              <span className="text-black font-medium">
                Include more photos showing personality
              </span>
            </li>
          </ul>
        </div>

        {/* Key Insights */}
        <div
          className="bg-gradient-to-br from-[#FFBFA8] to-[#FFA88A] rounded-3xl p-6 border border-[#E38E75]/80 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <h3 className="text-white font-extrabold text-xl mb-3 flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            Key Insight
          </h3>
          <p className="text-white font-medium leading-relaxed">
            Your profile shows great potential! Focus on diversifying your content
            to showcase different aspects of your personality and lifestyle. This
            will help create a more well-rounded and attractive profile.
          </p>
        </div>

        {/* Extra content to make scrollable */}
        <div
          className="bg-[#FFF2E1] rounded-3xl p-6 border border-[#D8C8B9]/60 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <h3 className="text-black font-extrabold text-xl mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Additional Insights
          </h3>
          <p className="text-black/80 font-medium leading-relaxed mb-4">
            Based on our analysis, implementing these changes could significantly
            improve your profile's appeal and increase your match rate.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[#FF897C] font-bold text-lg mt-0.5">•</span>
              <span className="text-black font-medium">
                Profile completeness: 85%
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#FF897C] font-bold text-lg mt-0.5">•</span>
              <span className="text-black font-medium">
                Visual appeal score: High
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#FF897C] font-bold text-lg mt-0.5">•</span>
              <span className="text-black font-medium">
                Engagement potential: Very promising
              </span>
            </li>
          </ul>
        </div>

        {/* Spacer for scroll */}
        <div className="h-32" />

        {/* Invisible marker for scroll detection */}
        <div ref={contentEndRef} className="h-1" />
      </div>

      {/* Paywall Drawer */}
      <PaywallDrawer isOpen={showPaywall} onClose={() => setShowPaywall(false)} />
    </div>
  );
}
