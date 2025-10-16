import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
  variant?: "default" | "green";
}

export default function Button({
  children,
  isActive = false,
  variant = "default",
  className = "",
  ...props
}: ButtonProps) {
  const getStyles = () => {
    if (variant === "green") {
      return "bg-[#00D66F] border-[#00D66F] text-white";
    }

    return isActive
      ? "bg-gradient-to-b from-[#FFBFA8] to-[#FFA88A] border-[#E38E75]/80"
      : "bg-[#FFF2E1] border-[#D8C8B9]/60";
  };

  return (
    <button
      className={`h-[72px] w-full max-w-[340px] rounded-[24px] border font-medium ${getStyles()} ${className}`}
      style={variant === "green" ? { boxShadow: "0px 2px 4px 0px #EFC97C4D" } : undefined}
      {...props}
    >
      {children}
    </button>
  );
}
