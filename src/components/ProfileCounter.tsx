"use client";
import React, { useState, useEffect } from "react";

interface ProfileCounterProps {
  baseCount?: number;
  minInterval?: number; // in seconds
  maxInterval?: number; // in seconds
  minIncrement?: number;
  maxIncrement?: number;
  className?: string;
}

const ProfileCounter = ({
  baseCount = 270,
  minInterval = 15,
  maxInterval = 20,
  minIncrement = 2,
  maxIncrement = 3,
  className = "",
}: ProfileCounterProps) => {
  const [profileCount, setProfileCount] = useState(baseCount);

  useEffect(() => {
    // Random interval between min-max seconds (in milliseconds)
    const getRandomInterval = () => {
      return (minInterval + Math.random() * (maxInterval - minInterval)) * 1000;
    };

    // Random increment between min-max profiles
    const getRandomIncrement = () => {
      return Math.floor(
        Math.random() * (maxIncrement - minIncrement + 1) + minIncrement
      );
    };

    let timeoutId: NodeJS.Timeout;

    const scheduleNextUpdate = () => {
      const interval = getRandomInterval();

      timeoutId = setTimeout(() => {
        setProfileCount((prev) => prev + getRandomIncrement());
        scheduleNextUpdate(); // Schedule the next update
      }, interval);
    };

    // Start the update cycle
    scheduleNextUpdate();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [minInterval, maxInterval, minIncrement, maxIncrement]);

  return (
    <p
      className={`font-poppins font-extrabold text-sm tracking-normal text-center text-black ${className}`}
    >
      Over {profileCount.toLocaleString()} Instagram profiles <br /> analyzed
      in the last 24h
    </p>
  );
};

export default ProfileCounter;
