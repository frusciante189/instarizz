"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface StripeCheckoutUIProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}

export default function StripeCheckoutUI({
  isOpen,
  onClose,
  userEmail,
}: StripeCheckoutUIProps) {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [email, setEmail] = useState(userEmail);
  const [country, setCountry] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(" ") : cleaned;
  };

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + " / " + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    if (value.length <= 16) {
      setCardNumber(formatCardNumber(value));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setExpiryDate(formatExpiryDate(value));
    }
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCvc(value);
    }
  };

  const handlePay = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to success page after payment
      router.push("/success");
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Full Page Container - Mobile First */}
      <div className="min-h-screen w-full max-w-[430px] mx-auto bg-white">
        {/* Header */}
        <div className="bg-gradient-radial-pink p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-full  flex items-center justify-center text-white font-bold">
              InstaRizz
            </div>
          </div>

          <div className="text-center text-white space-y-2">
            <h1 className="text-lg font-medium">
              Instagram Profile Full Analysis
            </h1>
            <div className="text-4xl font-bold">$9.99</div>
            <p className="text-sm">
              Complete profile review with detailed insights and
              <br />
              personalized recommendations
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-transparent text-base text-gray-600 placeholder:text-gray-400"
            />
          </div>

          {/* Payment Method Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Payment method
            </h2>

            {/* Card Information Label */}
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card information
            </label>

            {/* Card Number Field */}
            <div className="relative">
              <input
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 1234 1234 1234"
                className="w-full px-4 py-3 border border-gray-300 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-transparent text-base text-gray-600 pr-32 placeholder:text-gray-400"
              />
              {/* Card Brand Icons */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {/* Visa */}
                <svg
                  width="32"
                  height="20"
                  viewBox="0 0 32 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="32" height="20" rx="2" fill="#1A1F71" />
                  <path
                    d="M13.8 14.5L15.2 6H17.3L15.9 14.5H13.8Z"
                    fill="#F7B600"
                  />
                  <path
                    d="M22.5 6.2C22.1 6.05 21.5 5.9 20.7 5.9C18.7 5.9 17.3 6.9 17.3 8.3C17.3 9.35 18.3 9.95 19.05 10.3C19.8 10.65 20.05 10.85 20.05 11.15C20.05 11.65 19.45 11.9 18.9 11.9C18.1 11.9 17.65 11.75 17 11.45L16.75 11.3L16.5 12.95C16.95 13.15 17.75 13.35 18.6 13.35C20.7 13.35 22.1 12.35 22.1 10.85C22.1 10.05 21.6 9.45 20.5 8.95C19.8 8.6 19.4 8.4 19.4 8.05C19.4 7.75 19.75 7.4 20.5 7.4C21.15 7.4 21.6 7.55 21.95 7.7L22.15 7.8L22.5 6.2Z"
                    fill="#F7B600"
                  />
                  <path
                    d="M25.5 6H23.9C23.4 6 23 6.2 22.8 6.65L19.8 14.5H21.9L22.35 13.2H24.9L25.15 14.5H27L25.5 6ZM23 11.5L23.85 9.1L24.3 11.5H23Z"
                    fill="#F7B600"
                  />
                  <path
                    d="M11.5 6L9.5 11.9L9.3 10.8C8.95 9.5 7.75 8.1 6.4 7.4L8.2 14.5H10.3L13.6 6H11.5Z"
                    fill="#F7B600"
                  />
                  <path
                    d="M7.5 6H4.5L4.5 6.2C7 6.75 8.7 8.3 9.3 10.8L8.6 6.7C8.5 6.25 8.1 6 7.5 6Z"
                    fill="#F7B600"
                  />
                </svg>

                {/* Mastercard */}
                <svg
                  width="32"
                  height="20"
                  viewBox="0 0 32 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="32" height="20" rx="2" fill="white" />
                  <circle cx="12" cy="10" r="6" fill="#EB001B" />
                  <circle cx="20" cy="10" r="6" fill="#FF5F00" />
                  <path
                    d="M16 5.5C14.8 6.5 14 8.2 14 10C14 11.8 14.8 13.5 16 14.5C17.2 13.5 18 11.8 18 10C18 8.2 17.2 6.5 16 5.5Z"
                    fill="#FF5F00"
                  />
                </svg>

                {/* American Express */}
                <svg
                  width="32"
                  height="20"
                  viewBox="0 0 32 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="32" height="20" rx="2" fill="#016FD0" />
                  <path
                    d="M8 8H9.5L10.5 10.5L11.5 8H13V13H11.8V9.5L10.6 12H10.4L9.2 9.5V13H8V8Z"
                    fill="white"
                  />
                  <path
                    d="M14 8H17V9H15V10H16.8V11H15V12H17V13H14V8Z"
                    fill="white"
                  />
                  <path
                    d="M18 8H19.2L20 9.5L20.8 8H22L20.5 10.5L22 13H20.8L20 11.5L19.2 13H18L19.5 10.5L18 8Z"
                    fill="white"
                  />
                </svg>

                {/* Discover */}
                <svg
                  width="32"
                  height="20"
                  viewBox="0 0 32 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="32" height="20" rx="2" fill="white" />
                  <circle cx="24" cy="10" r="8" fill="#E55C20" />
                  <path
                    d="M6 8H7.5C8.3 8 9 8.7 9 9.5V11.5C9 12.3 8.3 13 7.5 13H6V8ZM7 9V12H7.5C7.8 12 8 11.8 8 11.5V9.5C8 9.2 7.8 9 7.5 9H7Z"
                    fill="#000000"
                  />
                </svg>
              </div>
            </div>

            {/* Expiry and CVC Row */}
            <div className="grid grid-cols-2 gap-0">
              <input
                type="text"
                value={expiryDate}
                onChange={handleExpiryChange}
                placeholder="MM / YY"
                className="px-4 py-3 border border-gray-300 border-t-0 border-r-0 rounded-bl-lg focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-transparent text-base text-gray-600 placeholder:text-gray-400"
              />
              <div className="relative">
                <input
                  type="text"
                  value={cvc}
                  onChange={handleCvcChange}
                  placeholder="CVC"
                  className="w-full px-4 py-3 border border-gray-300 border-t-0 rounded-br-lg focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-transparent text-base text-gray-600 pr-10 placeholder:text-gray-400"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-400"
                  >
                    <rect
                      x="2"
                      y="5"
                      width="20"
                      height="14"
                      rx="2"
                      fill="none"
                    />
                    <path d="M2 9h20" />
                    <text x="14" y="16" fontSize="8" fill="currentColor">
                      123
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Cardholder Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cardholder name
            </label>
            <input
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder="Full name on card"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-transparent text-base text-gray-600 placeholder:text-gray-400"
            />
          </div>

          {/* Country or Region */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country or region
            </label>
            <div className="relative">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-transparent text-base text-gray-600 appearance-none bg-white"
              >
                <option value="" disabled>
                  Select country
                </option>
                <option value="Turkey">Turkey</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  className="text-gray-600"
                >
                  <path
                    d="M1 1L6 6L11 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Save Information Checkbox */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={saveInfo}
                onChange={(e) => setSaveInfo(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-[#635BFF] border-gray-300 rounded focus:ring-[#635BFF]"
              />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  Save my information for faster checkout
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Pay securely at Emin Karayel and everywhere{" "}
                  <span className="underline">Link</span> is accepted.
                </div>
              </div>
            </label>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePay}
            disabled={isProcessing}
            className="w-full bg-[#635BFF] hover:bg-[#5349E6] text-white font-semibold py-4 rounded-full transition-colors text-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </>
            ) : (
              "Pay"
            )}
          </button>

          {/* Footer */}
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-2">
            <div className="flex items-center gap-1">
              <span>Powered by</span>
              <svg
                width="33"
                height="14"
                viewBox="0 0 33 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 7.5C1.5 4.46243 3.96243 2 7 2H26C29.0376 2 31.5 4.46243 31.5 7.5C31.5 10.5376 29.0376 13 26 13H7C3.96243 13 1.5 10.5376 1.5 7.5Z"
                  fill="#635BFF"
                />
                <text x="7" y="10" fontSize="7" fill="white" fontWeight="bold">
                  stripe
                </text>
              </svg>
            </div>
            <span className="text-gray-300">|</span>
            <button className="hover:text-gray-700">Terms</button>
            <button className="hover:text-gray-700">Privacy</button>
          </div>
        </div>
      </div>
    </div>
  );
}
