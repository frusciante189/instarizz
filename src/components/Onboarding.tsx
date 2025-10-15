"use client";

import React, { useState } from "react";
import OnboardingStep from "./OnboardingStep";
import OnboardingSliderStep from "./OnboardingSliderStep";
import OnboardingInputStep from "./OnboardingInputStep";
import FileUploadStep from "./FileUploadStep";
import questions from "@/data/questions.json";

interface Answer {
  questionId: number;
  value: string | number[] | File[];
}

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const currentQuestion = questions[currentStep];

  const handleSelect = (value: string | number[] | File[]) => {
    // Update or add answer
    const updatedAnswers = answers.filter(
      (a) => a.questionId !== currentQuestion.id
    );
    updatedAnswers.push({ questionId: currentQuestion.id, value });
    setAnswers(updatedAnswers);

    // Auto-advance to next step
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Handle completion - you can add your logic here
        console.log("Onboarding completed!", updatedAnswers);
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getCurrentAnswer = () => {
    const answer = answers.find((a) => a.questionId === currentQuestion.id);
    return answer ? answer.value : null;
  };

  const isSliderStep = currentQuestion.type === "slider";
  const isFileUploadStep = currentQuestion.type === "file_upload";
  const isInputStep = currentQuestion.type === "input";

  return (
    <div className="flex-1 flex flex-col">
      {currentStep > 0 && (
        <button
          onClick={handleBack}
          className="absolute top-4 right-4 z-10 text-2xl hover:opacity-70 transition-opacity"
          aria-label="Go back"
        >
          ←
        </button>
      )}

      {isFileUploadStep ? (
        <FileUploadStep
          question={currentQuestion.question}
          currentFiles={
            Array.isArray(getCurrentAnswer()) &&
            getCurrentAnswer()![0] instanceof File
              ? (getCurrentAnswer() as File[])
              : []
          }
          onContinue={(files: File[]) => handleSelect(files)}
        />
      ) : isSliderStep ? (
        <OnboardingSliderStep
          question={currentQuestion.question}
          min={currentQuestion.min || 18}
          max={currentQuestion.max || 70}
          defaultValue={currentQuestion.defaultValue || [18, 70]}
          currentValue={
            Array.isArray(getCurrentAnswer())
              ? (getCurrentAnswer() as number[])
              : null
          }
          onContinue={handleSelect}
        />
      ) : isInputStep ? (
        <OnboardingInputStep
          question={currentQuestion.question}
          placeholder={currentQuestion.placeholder || ""}
          inputType={currentQuestion.inputType || "text"}
          currentValue={
            typeof getCurrentAnswer() === "string"
              ? (getCurrentAnswer() as string)
              : null
          }
          onContinue={(value: string) => handleSelect(value)}
        />
      ) : (
        <OnboardingStep
          question={currentQuestion.question}
          options={currentQuestion.options || []}
          selectedValue={
            typeof getCurrentAnswer() === "string"
              ? (getCurrentAnswer() as string)
              : null
          }
          onSelect={(value: string) => handleSelect(value)}
        />
      )}
    </div>
  );
}
