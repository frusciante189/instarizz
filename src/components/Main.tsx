"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import ProfileCounter from "./ProfileCounter";
import { STEPS } from "@/config/steps";

const Main = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-7 overflow-y-auto flex-1 pb-4 h-dvh">
      <h1 className="font-poppins font-extrabold text-xl tracking-normal text-black pt-5">
        Your Instagram profile is why girls leave you on read!
      </h1>
      <div className="flex gap-3 items-start relative">
        {/* Before Image */}
        <div className="relative flex-1">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-red-500 text-white px-5 py-1.5 rounded-lg text-xs font-extrabold tracking-widest uppercase shadow-lg">
            Before
          </div>
          <img
            src="/l1.png"
            alt="Before Profile Optimization"
            className="w-full h-auto object-contain rounded-xl"
          />
        </div>

        {/* Arrow Between */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="bg-[#00D66F] rounded-full p-2 shadow-lg">
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
        <div className="relative flex-1">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-[#00D66F] text-white px-5 py-1.5 rounded-lg text-xs font-extrabold tracking-widest uppercase shadow-lg">
            After
          </div>
          <img
            src="/l2.png"
            alt="After Profile Optimization"
            className="w-full h-auto object-contain rounded-xl"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-poppins font-bold text-base tracking-normal text-white">
          90% of guys have unoptimized profiles!
          <br />
          Fix 2 simple parts and you&apos;ll:
        </p>
        <ul className="flex font-bold flex-col gap-1 font-poppins text-base text-white">
          <li>• Look instantly more confident</li>
          <li>• 3x more dates</li>
        </ul>
        <p className="font-poppins text-base tracking-normal text-white font-bold">
          👉 See if your profile misses these 2 core parts
        </p>
      </div>
      <div className="flex flex-col gap-7 mt-auto">
        <Button
          onClick={() => router.push(`/analyze/${STEPS[0].slug}`)}
          className="mx-auto"
          variant="green"
        >
          <span className="font-extrabold text-2xl leading-none">
            Analyze my Profile
          </span>
        </Button>
        <ProfileCounter />
      </div>
    </div>
  );
};

export default Main;
