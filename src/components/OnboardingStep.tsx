import React from "react";
import Title from "./Title";
import Button from "./Button";

interface Option {
  emoji: string;
  text: string;
  value: string;
}

interface OnboardingStepProps {
  question: string;
  options: Option[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
}

export default function OnboardingStep({
  question,
  options,
  selectedValue,
  onSelect,
}: OnboardingStepProps) {
  return (
    <div className="flex flex-col items-center h-full pt-12 overflow-y-auto flex-1">
      <Title>{question}</Title>

      <div className="flex flex-col gap-8 my-14 w-full items-center flex-1 pb-4">
        {options.map((option) => (
          <Button
            key={option.value}
            isActive={selectedValue === option.value}
            onClick={() => onSelect(option.value)}
          >
            {option.emoji && (
              <span className="text-2xl mr-2">{option.emoji}</span>
            )}
            <span className="text-black font-extrabold text-2xl leading-none">
              {option.text}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
