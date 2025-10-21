"use client";

import React, { useState, useEffect } from "react";
import Title from "./Title";
import Button from "./Button";
import { Slider } from "./ui/slider";

interface OnboardingSliderStepProps {
  question: string;
  description?: string;
  min: number;
  max: number;
  defaultValue: number[];
  currentValue: number[] | null;
  onContinue: (value: number[]) => void;
}

export default function OnboardingSliderStep({
  question,
  description,
  min,
  max,
  defaultValue,
  currentValue,
  onContinue,
}: OnboardingSliderStepProps) {
  const [value, setValue] = useState<number[]>(currentValue || defaultValue);

  // Update state when currentValue prop changes
  useEffect(() => {
    if (currentValue) {
      setValue(currentValue);
    }
  }, [currentValue]);

  return (
    <div className="flex flex-col h-full flex-1">
      <div className="flex-1 overflow-y-auto pt-12 pb-32">
        <div className="flex flex-col items-center">
          <Title>{question}</Title>

          {description && (
            <p className="text-center text-black/70 mt-4 px-6 text-base whitespace-pre-line">
              {description}
            </p>
          )}

          <div className="flex flex-col mt-14 w-full items-center px-4">
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
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 w-full bg-gradient-to-t from-[#FF9671] via-[#FF9671] to-transparent pt-6 pb-8 flex justify-center">
        <Button onClick={() => onContinue(value)} isActive={false}>
          <span className="text-black font-extrabold text-2xl leading-none">
            Continue
          </span>
        </Button>
      </div>
    </div>
  );
}
