"use client";

import React, { useState } from "react";
import Title from "./Title";
import Button from "./Button";
import { Slider } from "./ui/slider";

interface OnboardingSliderStepProps {
  question: string;
  min: number;
  max: number;
  defaultValue: number[];
  currentValue: number[] | null;
  onContinue: (value: number[]) => void;
}

export default function OnboardingSliderStep({
  question,
  min,
  max,
  defaultValue,
  currentValue,
  onContinue,
}: OnboardingSliderStepProps) {
  const [value, setValue] = useState<number[]>(currentValue || defaultValue);

  return (
    <div className="flex flex-col items-center h-full pt-12">
      <Title>{question}</Title>

      <div className="flex flex-col mt-14 w-full items-center flex-1 justify-between pb-8">
        <div className="w-full max-w-md px-4 py-2.5 bg-[#FFF2E1] rounded-3xl">
          <div className="mb-6">
            <p
              className="text-left text-black mb-8 text-base font-extrabold"
              style={{
                letterSpacing: "0%",
              }}
            >
              Between {value[0]} and {value[1]}
            </p>
            <Slider
              min={min}
              max={max}
              step={1}
              value={value}
              onValueChange={setValue}
              className="w-full"
            />
          </div>
        </div>

        <Button onClick={() => onContinue(value)} isActive={false}>
          <span className="text-black font-extrabold text-2xl leading-none">
            Continue
          </span>
        </Button>
      </div>
    </div>
  );
}
