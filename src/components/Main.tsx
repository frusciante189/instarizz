"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import ProfileCounter from "./ProfileCounter";
import { STEPS } from "@/config/steps";

const Main = () => {
  const router = useRouter();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "Got way more matches after fixing my profile. The feedback was spot on!",
      author: "Marcus, 24",
    },
    {
      text: "Never knew my bio was that bad. Changed it and saw results immediately 🔥",
      author: "Jake, 27",
    },
    {
      text: "The detailed analysis helped me understand what I was doing wrong. Game changer!",
      author: "Ryan, 26",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="flex flex-col h-full relative overflow-x-hidden">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden pb-[200px]">
        <div className="flex flex-col gap-7 pt-5">
          {/* Hero Section */}
          <div className="flex flex-col gap-2.5">
            <h1 className="font-poppins font-black text-[28px] leading-[1.1] tracking-tight text-white">
              Your Instagram profile is why girls leave you on read!
            </h1>
          </div>

          {/* Before/After Comparison */}
          <div className="flex gap-3 items-start relative">
            {/* Before Image */}
            <div className="relative flex-1 min-w-0">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-red-500 text-white px-5 py-1.5 rounded-lg text-xs font-extrabold tracking-widest uppercase shadow-lg">
                Before
              </div>
              <img
                src="/l1.png"
                alt="Before Profile Optimization"
                className="w-full h-auto object-contain rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              />
            </div>

            {/* Arrow Between */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="bg-[#00D66F] rounded-full p-2.5 shadow-xl shadow-[#00D66F]/30">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </div>

            {/* After Image */}
            <div className="relative flex-1 min-w-0">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-[#00D66F] text-white px-5 py-1.5 rounded-lg text-xs font-extrabold tracking-widest uppercase shadow-lg">
                After
              </div>
              <img
                src="/l2.png"
                alt="After Profile Optimization"
                className="w-full h-auto object-contain rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col gap-5 bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg">
            <div className="flex flex-col gap-3.5">
              <h2 className="font-poppins font-black text-[20px] leading-tight tracking-tight text-white">
                90% of guys have unoptimized profiles!
              </h2>
              <p className="font-poppins font-bold text-[17px] leading-snug text-white">
                Fix 2 simple parts and you&apos;ll:
              </p>
            </div>

            <ul className="flex flex-col gap-3 font-poppins text-[17px]">
              <li className="flex items-start gap-3">
                <span className="text-2xl">💪</span>
                <span className="font-bold text-white mt-0.5">
                  Look instantly more confident
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🔥</span>
                <span className="font-black text-white mt-0.5">
                  3x more dates
                </span>
              </li>
            </ul>

            <p className="font-poppins text-[17px] leading-snug tracking-tight font-black text-white flex items-center gap-2 mt-1">
              <span className="text-2xl">👉</span>
              <span>See if your profile misses these 2 core parts</span>
            </p>
          </div>

          {/* How It Works Section */}
          <div className="flex flex-col gap-4 bg-white/20 backdrop-blur-sm rounded-2xl p-5 border border-white/30">
            <h3 className="font-poppins font-extrabold text-[18px] text-white">
              How It Works
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="bg-[#00D66F] rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div className="flex-1">
                  <p className="font-poppins text-[15px] text-white/90 font-medium">
                    <span className="font-extrabold text-white">
                      Share Details
                    </span>{" "}
                    about your goals and interests
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-[#00D66F] rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div className="flex-1">
                  <p className="font-poppins text-[15px] text-white/90 font-medium">
                    <span className="font-extrabold text-white">
                      Upload Screenshots
                    </span>{" "}
                    of your Instagram profile
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-[#00D66F] rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div className="flex-1">
                  <p className="font-poppins text-[15px] text-white/90 font-medium">
                    <span className="font-extrabold text-white">
                      Get Expert Feedback
                    </span>{" "}
                    with actionable improvements
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof Section */}
          <div className="flex flex-col gap-5">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-xl p-4 shadow-lg text-center">
                <div className="font-poppins font-black text-2xl text-white">
                  13k+
                </div>
                <div className="font-poppins text-xs text-white/90 mt-1 font-bold">
                  Profiles Analyzed
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-xl p-4 shadow-lg text-center">
                <div className="font-poppins font-black text-2xl text-white">
                  4.9★
                </div>
                <div className="font-poppins text-xs text-white/90 mt-1 font-bold">
                  Average Rating
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-xl p-4 shadow-lg text-center">
                <div className="font-poppins font-black text-2xl text-white">
                  95%
                </div>
                <div className="font-poppins text-xs text-white/90 mt-1 font-bold">
                  Satisfaction
                </div>
              </div>
            </div>

            {/* Testimonials Carousel */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-xl p-5 shadow-lg min-h-[120px]">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-white text-base">
                      ★
                    </span>
                  ))}
                </div>
                <p className="font-poppins text-sm text-white italic mb-3">
                  &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                </p>
                <p className="font-poppins text-xs text-white/90 font-bold">
                  — {testimonials[currentTestimonial].author}
                </p>
              </div>

              {/* Carousel Dots */}
              <div className="flex justify-center gap-2 mt-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTestimonial
                        ? "bg-white w-6"
                        : "bg-white/40"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA Section */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#FFA6B9]/80 via-[#FFA6B9]/40 to-transparent pointer-events-none">
        <div className="flex flex-col gap-5 pointer-events-auto">
          <Button
            onClick={() => router.push(`/analyze/${STEPS[0].slug}`)}
            className="mx-auto shadow-[0_8px_24px_rgba(0,214,111,0.35)]"
            variant="green"
          >
            <span className="font-extrabold text-2xl leading-none">
              Analyze my Profile
            </span>
          </Button>
          {/* <ProfileCounter /> */}
        </div>
      </div>
    </div>
  );
};

export default Main;
