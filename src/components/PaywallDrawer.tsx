"use client";

import React, { useEffect, useState } from "react";
import Button from "./Button";

interface PaywallDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckout: () => void;
}

interface Testimonial {
  rating: number;
  text: string;
  author: string;
}

const testimonials: Testimonial[] = [
  {
    rating: 5,
    text: "This analysis completely transformed my dating profile. Got 3x more matches in the first week!",
    author: "Sarah M., verified user"
  },
  {
    rating: 4,
    text: "The detailed feedback was incredibly helpful. I never realized what I was doing wrong until now!",
    author: "Mike T., verified user"
  },
  {
    rating: 5,
    text: "Worth every penny! The photo recommendations alone made a huge difference in my match quality.",
    author: "Jessica R., verified user"
  },
  {
    rating: 4,
    text: "Finally getting matches with people I'm actually interested in. This tool is a game changer!",
    author: "David L., verified user"
  }
];

export default function PaywallDrawer({ isOpen, onClose, onOpenCheckout }: PaywallDrawerProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        setIsTransitioning(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleDotClick = (index: number) => {
    if (index === currentTestimonial) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTestimonial(index);
      setIsTransitioning(false);
    }, 300);
  };

  const handleGetFullReview = () => {
    onClose(); // Close the paywall drawer
    setTimeout(() => {
      onOpenCheckout(); // Open the checkout UI
    }, 300); // Small delay for smooth transition
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up">
        <div className="bg-white rounded-t-[32px] shadow-2xl max-w-md mx-auto">
          {/* Handle Bar */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 bg-black/20 rounded-full" />
          </div>

          {/* Content */}
          <div className="px-6 pb-8 pt-4 max-h-[85vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-black/40 hover:text-black transition-colors"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-6 mt-2">
              <h2 className="text-3xl font-extrabold text-black mb-2">
                Unlock Your Full Analysis
              </h2>
              <p className="text-black/60 font-medium text-base">
                Get detailed insights to maximize your profile&apos;s potential
              </p>
            </div>

            {/* Pricing Card */}
            <div className="bg-gradient-to-br from-[#FFBFA8] to-[#FFA88A] rounded-3xl p-6 mb-6 border-2 border-[#E38E75]">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl font-extrabold text-white">
                  $9.99
                </span>
              </div>
              <p className="text-white/90 text-center font-semibold text-sm">
                One-time payment • Lifetime access
              </p>
              <div className="mt-4 bg-white/20 rounded-2xl px-3 py-2">
                <p className="text-white text-center font-bold text-xs">
                  🎉 LIMITED OFFER: 50% OFF (Regular $19.99)
                </p>
              </div>
            </div>

            {/* What's Included */}
            <div className="mb-6">
              <h3 className="text-black font-extrabold text-lg mb-4">
                Full Review Includes:
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#00D66F]"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-black font-semibold text-sm">
                      Detailed photo-by-photo analysis with specific improvement
                      advice
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#00D66F]"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-black font-semibold text-sm">
                      Expert bio review and prompt analyses to improve your
                      written content
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#00D66F]"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-black font-semibold text-sm">
                      Optimal photo order recommendations
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#00D66F]"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-black font-semibold text-sm">
                      Personalized action plan to maximize your matches
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof - Testimonial Carousel */}
            <div className="bg-[#FFF2E1] rounded-2xl p-4 mb-6 relative overflow-hidden">
              {/* Testimonial Content */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex">
                    {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="#FF897C"
                        stroke="#FF897C"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-black font-bold text-sm">4.9/5</span>
                </div>
                <p className="text-black/80 text-sm italic min-h-[3rem]">
                  &quot;{testimonials[currentTestimonial].text}&quot;
                </p>
                <p className="text-black/60 text-xs mt-2">
                  — {testimonials[currentTestimonial].author}
                </p>
              </div>

              {/* Navigation Dots */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? "w-6 bg-[#FF897C]"
                        : "w-2 bg-[#FF897C]/30 hover:bg-[#FF897C]/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="w-full mb-4 flex items-center justify-center">
              <Button
                variant="green"
                onClick={handleGetFullReview}
              >
                <span className="text-white font-extrabold text-2xl">
                  Get Full Review Now
                </span>
              </Button>
            </div>

            {/* Trust Signals */}
            <div className="flex items-center justify-center gap-4 text-black/40 text-xs">
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
                <span>Money-back Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
