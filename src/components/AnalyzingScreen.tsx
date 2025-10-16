"use client";

import React, { useState, useEffect } from "react";
import Title from "./Title";

interface AnalyzingScreenProps {
  onComplete: () => void;
}

export default function AnalyzingScreen({ onComplete }: AnalyzingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  const analysisSteps = [
    {
      message: "Analyzing your profile...",
      icon: (
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
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      message: "Evaluating image quality...",
      icon: (
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
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      ),
    },
    {
      message: "Assessing visual appeal...",
      icon: (
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
        >
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      message: "Calculating attraction score...",
      icon: (
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
        >
          <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
        </svg>
      ),
    },
    {
      message: "Generating insights...",
      icon: (
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
      ),
    },
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
      setCurrentMessage((prev) => (prev + 1) % analysisSteps.length);
    }, 1400);

    return () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
    };
  }, [onComplete, analysisSteps.length]);

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-12">
      <Title>Analyzing Your Profile</Title>

      <div className="flex flex-col items-center gap-8 mt-12 w-full max-w-[600px]">
        {/* AI Icon with pulse animation - changes with each step */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#FF897C] rounded-full opacity-20 animate-ping" />
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#FF897C] to-[#FFA88A] flex items-center justify-center">
            <div className="animate-pulse transition-all duration-500 ease-in-out animate-icon-change" key={currentMessage}>
              {analysisSteps[currentMessage].icon}
            </div>
          </div>
        </div>

        {/* Status message */}
        <div className="h-8 flex items-center justify-center">
          <p className="text-black font-extrabold text-lg text-center animate-fade-in" key={currentMessage}>
            {analysisSteps[currentMessage].message}
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
