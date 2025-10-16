"use client";

import React, { useState, useEffect } from "react";
import Title from "./Title";

interface AnalyzingScreenProps {
  onComplete: () => void;
}

export default function AnalyzingScreen({ onComplete }: AnalyzingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    "Analyzing your profile...",
    "Evaluating image quality...",
    "Assessing visual appeal...",
    "Calculating attraction score...",
    "Generating insights...",
  ];

  useEffect(() => {
    // Progress bar animation (0 to 100 in ~7 seconds)
    const duration = 7000; // 7 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = 100 / steps;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => onComplete(), 500); // Small delay before showing results
          return 100;
        }
        return newProgress;
      });
    }, interval);

    // Message rotation (change every ~1.4 seconds)
    const messageTimer = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 1400);

    return () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-12">
      <Title>Analyzing Your Profile</Title>

      <div className="flex flex-col items-center gap-8 mt-12 w-full max-w-[600px]">
        {/* AI Icon with pulse animation */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#FF897C] rounded-full opacity-20 animate-ping" />
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#FF897C] to-[#FFA88A] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
            >
              <path d="M12 2v6" />
              <path d="M12 16v6" />
              <path d="m4.93 4.93 4.24 4.24" />
              <path d="m14.83 14.83 4.24 4.24" />
              <path d="M2 12h6" />
              <path d="M16 12h6" />
              <path d="m4.93 19.07 4.24-4.24" />
              <path d="m14.83 9.17 4.24-4.24" />
            </svg>
          </div>
        </div>

        {/* Status message */}
        <div className="h-8 flex items-center justify-center">
          <p className="text-black font-extrabold text-lg text-center animate-fade-in" key={currentMessage}>
            {messages[currentMessage]}
          </p>
        </div>

        {/* Progress bar container */}
        <div className="w-full max-w-md px-6 py-4 bg-[#FFF2E1] rounded-3xl">
          <div className="mb-3">
            <p className="text-black font-semibold text-sm mb-4 text-center">
              {Math.round(progress)}% Complete
            </p>
            {/* Progress bar track */}
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#E8D9C9]">
              {/* Progress bar fill */}
              <div
                className="absolute h-full bg-gradient-to-r from-[#FF897C] to-[#FFA88A] transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>
        </div>

        {/* Dots animation */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-[#FF897C] animate-bounce"
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: "0.6s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
