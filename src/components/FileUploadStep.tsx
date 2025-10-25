"use client";

import React, { useState, useRef } from "react";
import Title from "./Title";
import Button from "./Button";

const MAX_FILES = 10;

interface FileUploadStepProps {
  question: string;
  onContinue: (files: File[], username?: string) => void;
  currentFiles?: File[];
  currentUsername?: string;
}

export default function FileUploadStep({
  question,
  onContinue,
  currentFiles = [],
  currentUsername = "",
}: FileUploadStepProps) {
  const [files, setFiles] = useState<File[]>(currentFiles);
  const [username, setUsername] = useState<string>(currentUsername);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const totalFiles = files.length + selectedFiles.length;

    if (totalFiles > MAX_FILES) {
      setError(`You can only upload up to ${MAX_FILES} screenshots`);
      return;
    }

    // Filter for image files only
    const imageFiles = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length !== selectedFiles.length) {
      setError("Please upload only image files");
    }

    setFiles([...files, ...imageFiles]);
    setError(""); // Clear error when files are successfully added
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    if (files.length === 0 && !username.trim()) {
      setError(
        "Please upload at least 1 screenshot or enter your Instagram username"
      );
      return;
    }
    setError("");
    onContinue(files, username.trim() || undefined);
  };

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  return (
    <div className="flex flex-col h-full flex-1">
      <div className="flex-1 overflow-y-auto py-8 pb-32">
        <div className="flex flex-col items-center">
          <Title>{question}</Title>
          {/* Username Input */}
          <div className="w-full flex justify-center py-6 px-6 mt-6">
            <input
              type="text"
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              placeholder="Enter Instagram username"
              className="w-full text-xl font-extrabold text-[#0D0D0D] placeholder:text-[#0D0D0D] placeholder:opacity-50 text-center"
              style={{
                outline: "none",
                border: "none",
                background: "transparent",
              }}
            />
          </div>

          <p className="text-black text-sm font-bold text-center opacity-60 mb-4">
            OR
          </p>

          <p className="text-black text-base font-extrabold text-center mb-2">
            Open your Instagram and take <br /> screenshots of your profile
          </p>

          <div className="flex flex-col gap-6 mt-4 w-full items-center">
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

            {/* Display uploaded files */}
            {files.length > 0 && (
              <div className="w-full max-w-[600px]">
                <div className="text-black font-semibold text-lg mb-4">
                  Uploaded Screenshots ({files.length}/{MAX_FILES})
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {files.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="relative aspect-square overflow-hidden rounded-lg bg-[#FFF2E1] border border-[#D8C8B9]/60"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Screenshot ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center font-bold transition-colors"
                        aria-label="Remove image"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="w-full max-w-[600px] bg-red-50 border border-red-200 rounded-2xl px-4 py-3 animate-fade-in">
                <p className="text-red-600 font-semibold text-sm text-center">
                  {error}
                </p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 w-full bg-gradient-to-t from-[#FF9671] via-[#FF9671] to-transparent pt-6 pb-8 flex justify-center">
        <Button variant="green" onClick={handleContinue}>
          <span className="text-white font-extrabold text-2xl">
            Analyze for free
          </span>
        </Button>
      </div>
    </div>
  );
}
