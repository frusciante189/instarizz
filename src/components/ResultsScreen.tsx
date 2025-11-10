"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Title from "./Title";
import { getAnswer } from "@/utils/answers";
import { getFilesFromSession, type StoredFile } from "@/utils/fileStorage";

export default function ResultsScreen() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<StoredFile[]>([]);

  // Load username and files
  useEffect(() => {
    const savedUsername = getAnswer(8); // questionId 8 for username
    const savedFiles = getAnswer(7); // questionId 7 for files

    if (savedUsername && typeof savedUsername === "string") {
      setUsername(savedUsername);
    }

    if (savedFiles === "FILE_UPLOADED") {
      const files = getFilesFromSession();
      setUploadedFiles(files);
    }
  }, []);

  const handleUnlockClick = () => {
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col items-center py-8 flex-1 relative">
      <Title>Your Profile Analysis</Title>

      {/* Username or Files Info */}
      {(username || uploadedFiles.length > 0) && (
        <div className="w-full max-w-[600px] mt-6 px-6 py-4 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-2xl shadow-lg">
          {username ? (
            <div className="flex items-center justify-center gap-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-black"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <div className="flex flex-col">
                <span className="text-black/60 text-xs font-semibold">
                  Analyzing Profile
                </span>
                <span className="text-black font-bold text-lg">
                  @{username}
                </span>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-black"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
                <span className="text-black font-bold text-lg">
                  {uploadedFiles.length} Screenshot{uploadedFiles.length > 1 ? 's' : ''} Analyzed
                </span>
              </div>
              {/* Display thumbnails of uploaded images */}
              <div className="grid grid-cols-5 gap-2">
                {uploadedFiles.slice(0, 5).map((file, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden border-2 border-black/10"
                  >
                    <img
                      src={file.dataUrl}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              {uploadedFiles.length > 5 && (
                <p className="text-black/70 text-xs text-center mt-2 font-medium">
                  +{uploadedFiles.length - 5} more analyzed
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="w-full max-w-[600px] mt-8 space-y-6 pb-24">
        {/* Overall Score - Lower, more concerning */}
        <div className="bg-[#FFF2E1] rounded-3xl p-6 border border-[#D8C8B9]/60 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-black font-extrabold text-xl">
              Initial Assessment
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-4xl font-extrabold text-[#FF6B5B]">
                5.2
              </span>
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
            Your profile has some concerning patterns that might be limiting
            your success...
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
                <span className="text-black font-medium">
                  3 major red flags detected
                </span>
                <button
                  onClick={handleUnlockClick}
                  className="block text-[#FF6B5B] text-sm mt-1 italic underline hover:text-[#FF897C] transition-colors cursor-pointer"
                >
                  Unlock to see specific issues
                </button>
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
        <button
          onClick={handleUnlockClick}
          className="bg-gradient-to-br from-[#FFBFA8] to-[#FFA88A] rounded-3xl p-6 border border-[#E38E75]/80 animate-fade-in relative w-full cursor-pointer hover:shadow-lg transition-shadow"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="absolute inset-0 bg-black/5 backdrop-blur-[2px] rounded-3xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🔒</div>
              <p className="text-white font-bold text-lg">
                Detailed Analysis Locked
              </p>
            </div>
          </div>
          <h3 className="text-white font-extrabold text-xl mb-3 flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            What You&apos;re Missing
          </h3>
          <p className="text-white font-medium leading-relaxed blur-sm select-none">
            Your profile has 8 specific issues that are killing your match rate.
            Our analysis shows exactly which photos to remove, what order works
            best, and the psychological triggers you&apos;re missing. One simple
            change could increase your matches by 340%...
          </p>
        </button>

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
                <div
                  className="h-full bg-[#FF6B5B] rounded-full"
                  style={{ width: "48%" }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-black/70 font-medium">
                  Profile Optimization
                </span>
                <span className="text-[#FF6B5B] font-bold">34%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#E8D9C9]">
                <div
                  className="h-full bg-[#FF6B5B] rounded-full"
                  style={{ width: "34%" }}
                />
              </div>
            </div>
            <button
              onClick={handleUnlockClick}
              className="relative w-full cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="flex justify-between mb-2">
                <span className="text-black/70 font-medium">
                  Match Potential
                </span>
                <span className="text-black/30 font-bold">???</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#E8D9C9] blur-sm">
                <div
                  className="h-full bg-gradient-to-r from-[#FF6B5B] to-[#00D66F] rounded-full"
                  style={{ width: "67%" }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-[#FF6B5B] bg-white/90 px-3 py-1.5 rounded-full shadow-md hover:bg-white transition-colors">
                  🔒 Unlock Full Report
                </span>
              </div>
            </button>
          </div>
          <p className="text-black/60 text-sm mt-4 italic text-center">
            Top profiles score 8.5+. See exactly what separates you from them...
          </p>
        </div>
      </div>

      {/* Sticky Bottom Button - Always visible */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#FFF5F0] via-[#FFF5F0]/95 to-transparent pointer-events-none">
        <div className="max-w-[600px] mx-auto pointer-events-auto">
          <button
            onClick={handleUnlockClick}
            className="w-full bg-[#00D66F] text-white font-bold text-lg py-4 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span className="text-2xl">🔓</span>
            Unlock Full Report
          </button>
        </div>
      </div>
    </div>
  );
}
