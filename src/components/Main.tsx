"use client";
import React from "react";
import Button from "./Button";
import ProfileCounter from "./ProfileCounter";

interface MainProps {
  onStartOnboarding: () => void;
}

const Main = ({ onStartOnboarding }: MainProps) => {
  return (
    <div className="flex flex-col gap-7 overflow-y-auto flex-1 pb-4 h-dvh">
      <h1 className="font-poppins font-extrabold text-xl tracking-normal text-black pt-5">
        Everyone knows: <br /> Instagram is the{" "}
        <span className="font-poppins font-extrabold text-xl tracking-normal text-white">
          {" "}
          #1 Dating App
        </span>
      </h1>
      <img
        src="/onboarding.png"
        alt="InstaRizz"
        className="max-h-[280px] object-contain"
      />
      <p className="font-poppins font-medium text-base tracking-normal">
        Your Instagram says more than you think. Whether in dating or real life,
        it&apos;s your social resume. This tool helps you analyze and upgrade it
        for maximum attraction.
      </p>
      <div className="flex flex-col gap-7 mt-auto">
        <Button onClick={onStartOnboarding} className="mx-auto">
          <span className="text-black font-extrabold text-2xl leading-none">
            Analyze my Profile
          </span>
        </Button>
        <ProfileCounter />
      </div>
    </div>
  );
};

export default Main;
