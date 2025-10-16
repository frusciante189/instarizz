import React from "react";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function Title({ children, className = "" }: TitleProps) {
  return (
    <h1
      className={`font-extrabold text-5xl leading-[125%] text-center ${className}`}
      style={{
        WebkitTextStroke: "2px black",
        textShadow: "0px 0px 10px #000000B2",
      }}
    >
      {children}
    </h1>
  );
}
