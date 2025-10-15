"use client";

import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export default function SliderDemo() {
  const [singleValue, setSingleValue] = useState([50]);
  const [rangeValue, setRangeValue] = useState([25, 75]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl space-y-12">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Radix UI Slider Demo
          </h1>
        </div>

        {/* Single Value Slider */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Single Value Slider
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Current value: {singleValue[0]}
            </p>
          </div>
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            value={singleValue}
            onValueChange={setSingleValue}
          />
        </div>

        {/* Range Slider */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Range Slider
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Range: {rangeValue[0]} - {rangeValue[1]}
            </p>
          </div>
          <Slider
            defaultValue={[25, 75]}
            max={100}
            step={1}
            value={rangeValue}
            onValueChange={setRangeValue}
            minStepsBetweenThumbs={1}
          />
        </div>

        {/* Step Slider */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Step Slider (increments of 10)
            </h2>
          </div>
          <Slider defaultValue={[50]} max={100} step={10} />
        </div>

        {/* Disabled Slider */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Disabled Slider
            </h2>
          </div>
          <Slider defaultValue={[60]} max={100} step={1} disabled />
        </div>

        {/* Custom Min/Max */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Custom Min/Max (0-200)
            </h2>
          </div>
          <Slider defaultValue={[100]} min={0} max={200} step={5} />
        </div>
      </div>
    </div>
  );
}
