"use client";

import React, { useState } from "react";
import Title from "./Title";
import Button from "./Button";

interface OnboardingInputStepProps {
  question: string;
  placeholder?: string;
  inputType?: string;
  currentValue: string | null;
  onContinue: (value: string) => void;
}

export default function OnboardingInputStep({
  question,
  placeholder = "",
  inputType = "text",
  currentValue,
  onContinue,
}: OnboardingInputStepProps) {
  const [value, setValue] = useState<string>(currentValue || "");

  const handleContinue = () => {
    if (!value.trim()) {
      return;
    }
    onContinue(value);
  };

  return (
    <div className="flex flex-col h-full flex-1">
      <div className="flex-1 overflow-y-auto pt-12 pb-32">
        <div className="flex flex-col items-center">
          <Title>{question}</Title>

          <div className="flex flex-col mt-14 w-full items-center px-4">
            <div className="w-[250px] flex justify-center">
              <input
                type={inputType}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className="w-full text-xl font-extrabold text-[#0D0D0D] placeholder:text-[#0D0D0D] placeholder:opacity-50 text-center"
                style={{
                  outline: "none",
                  border: "none",
                  background: "transparent",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 w-full bg-gradient-to-t from-[#FF9671] via-[#FF9671] to-transparent pt-6 pb-8 flex justify-center">
        <Button onClick={handleContinue} isActive={false}>
          <span className="text-black font-extrabold text-2xl leading-none">
            Continue
          </span>
        </Button>
      </div>
    </div>
  );
}
