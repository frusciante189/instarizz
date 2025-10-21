"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  getStepBySlug,
  getNextStepSlug,
  getPreviousStepSlug,
  isValidStep,
  STEPS,
} from "@/config/steps";
import { saveAnswer, getAnswer } from "@/utils/answers";
import OnboardingStep from "@/components/OnboardingStep";
import OnboardingSliderStep from "@/components/OnboardingSliderStep";
import OnboardingInputStep from "@/components/OnboardingInputStep";
import FileUploadStep from "@/components/FileUploadStep";
import questions from "@/data/questions.json";

export default function OnboardingStepPage() {
  const router = useRouter();
  const params = useParams();
  const stepSlug = params.step as string;

  const [currentValue, setCurrentValue] = useState<
    string | number[] | File[] | null
  >(null);

  const step = getStepBySlug(stepSlug);
  const currentQuestion = step ? questions.find((q) => q.id === step.questionId) : null;

  // Validate step and redirect if invalid
  useEffect(() => {
    if (!isValidStep(stepSlug)) {
      router.replace(`/analyze/${STEPS[0].slug}`);
    }
  }, [stepSlug, router]);

  // Load saved answer on mount
  useEffect(() => {
    if (step) {
      const savedAnswer = getAnswer(step.questionId);
      if (savedAnswer) {
        setCurrentValue(savedAnswer);
      }
    }
  }, [step]);

  if (!step || !currentQuestion) return null;

  const handleSelect = (value: string | number[] | File[]) => {
    // Save answer
    saveAnswer(step.questionId, value);
    setCurrentValue(value);

    // Navigate to next step or analyzing screen
    setTimeout(() => {
      const nextSlug = getNextStepSlug(stepSlug);
      if (nextSlug) {
        router.push(`/analyze/${nextSlug}`);
      } else {
        // Last step completed - go to analyzing
        router.push("/analyzing");
      }
    }, 300);
  };

  const handleBack = () => {
    const previousSlug = getPreviousStepSlug(stepSlug);
    if (previousSlug) {
      router.push(`/analyze/${previousSlug}`);
    } else {
      router.push("/");
    }
  };

  const isSliderStep = currentQuestion.type === "slider";
  const isFileUploadStep = currentQuestion.type === "file_upload";
  const isInputStep = currentQuestion.type === "input";
  const showBackButton =
    getPreviousStepSlug(stepSlug) !== null || stepSlug !== STEPS[0].slug;

  return (
    <div className="flex-1 flex flex-col">
      {showBackButton && (
        <button
          onClick={handleBack}
          className="cursor-pointer bg-gradient-to-b from-[#FFBFA8] to-[#FFA88A] size-8 rounded-full flex items-center justify-center absolute top-4 right-4 z-10 hover:opacity-70 transition-opacity"
        >
          <div className="text-2xl" aria-label="Go back">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </div>
        </button>
      )}

      {isFileUploadStep ? (
        <FileUploadStep
          question={currentQuestion.question}
          currentFiles={
            Array.isArray(currentValue) && currentValue[0] instanceof File
              ? (currentValue as File[])
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
            Array.isArray(currentValue) && typeof currentValue[0] === "number"
              ? (currentValue as number[])
              : null
          }
          onContinue={handleSelect}
        />
      ) : isInputStep ? (
        <OnboardingInputStep
          question={currentQuestion.question}
          placeholder={currentQuestion.placeholder || ""}
          inputType={currentQuestion.inputType || "text"}
          currentValue={typeof currentValue === "string" ? currentValue : null}
          onContinue={(value: string) => handleSelect(value)}
        />
      ) : (
        <OnboardingStep
          question={currentQuestion.question}
          options={currentQuestion.options || []}
          selectedValue={typeof currentValue === "string" ? currentValue : null}
          onSelect={(value: string) => handleSelect(value)}
        />
      )}
    </div>
  );
}
