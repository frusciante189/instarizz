"use client";

import React, { useState, useRef } from "react";
import Title from "./Title";
import Button from "./Button";

const MAX_FILES = 10;

interface FileUploadStepProps {
  question: string;
  onContinue: (files: File[]) => void;
  currentFiles?: File[];
}

export default function FileUploadStep({
  question,
  onContinue,
  currentFiles = [],
}: FileUploadStepProps) {
  const [files, setFiles] = useState<File[]>(currentFiles);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const totalFiles = files.length + selectedFiles.length;

    if (totalFiles > MAX_FILES) {
      alert(`You can only upload up to ${MAX_FILES} screenshots`);
      return;
    }

    // Filter for image files only
    const imageFiles = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length !== selectedFiles.length) {
      alert("Please upload only image files");
    }

    setFiles([...files, ...imageFiles]);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    if (files.length === 0) {
      alert("Please upload at least one screenshot");
      return;
    }
    onContinue(files);
  };

  return (
    <div className="flex flex-col items-center h-full pt-12 px-4">
      <Title>{question}</Title>
      <p className="text-black text-base font-extrabold text-center mt-4">
        Open your Instagram and take <br /> screenshots of your profile
      </p>
      <div className="flex flex-col gap-6 my-8 w-full items-center justify-end flex-1 overflow-y-auto">
        {/* Upload Button */}
        <button
          onClick={handleUploadClick}
          className="w-full max-w-[600px] rounded-[32px] bg-[#FFF2E1] border border-[#D8C8B9]/60 hover:border-[#D8C8B9] transition-colors flex flex-col items-center justify-center gap-4 pt-5 pb-2.5"
        >
          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-share-icon lucide-share text-black"
            >
              <path d="M12 2v13" />
              <path d="m16 6-4-4-4 4" />
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            </svg>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-black font-extrabold text-base">
              Tap to upload <br /> up to {MAX_FILES} Screenshots
            </span>
          </div>
        </button>

        <Button variant="green" className="text-white font-extrabold text-2xl">
          Analyze for free
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Display uploaded files */}
        {files.length > 0 && (
          <div className="w-full max-w-[600px]">
            <div className="text-black font-semibold text-lg mb-4">
              Uploaded Screenshots ({files.length}/{MAX_FILES})
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="relative aspect-square rounded-2xl overflow-hidden bg-[#FFF2E1] border border-[#D8C8B9]/60"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center font-bold transition-colors"
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 truncate">
                    {file.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Continue Button */}
        {files.length > 0 && (
          <button
            onClick={handleContinue}
            className="h-[72px] w-full max-w-[340px] rounded-[24px] border font-medium bg-gradient-to-b from-[#FFBFA8] to-[#FFA88A] border-[#E38E75]/80 text-black font-extrabold text-2xl mt-4 hover:opacity-90 transition-opacity"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
