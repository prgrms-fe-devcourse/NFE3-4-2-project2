import { useEffect, useState } from "react";

interface MultiRangeProps {
  value?: Record<string, number>;
  fixedMinPrice: number;
  fixedMaxPrice: number;
  min: number;
  max: number;
  handleValueChange?: (minValue: number, maxValue: number) => void;
}

export default function MultiRange({
  value,
  fixedMinPrice,
  fixedMaxPrice,
  min,
  max,
  handleValueChange,
}: MultiRangeProps) {
  const [rangeMinValue, setRangeMinValue] = useState(fixedMinPrice ?? min);
  const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxPrice ?? max);
  const [rangeMinPercent, setRangeMinPercent] = useState(0);
  const [rangeMaxPercent, setRangeMaxPercent] = useState(100);
  const step = 1;

  const prcieRangeMinValueHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRangeMinValue(parseInt(e.target.value));
  };

  const prcieRangeMaxValueHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRangeMaxValue(parseInt(e.target.value));
  };

  const twoRangeHandler = () => {
    if (rangeMaxValue - rangeMinValue < step) {
      setRangeMaxValue(rangeMinValue + step);
      setRangeMinValue(rangeMaxValue - step);
    } else {
      const range = max - min;
      setRangeMinPercent(((rangeMinValue - min) / range) * 100);
      setRangeMaxPercent(((fixedMaxPrice - rangeMaxValue) / range) * 100);
    }
  };
  useEffect(() => {
    setRangeMaxValue(value?.enCcbaAsdt || fixedMaxPrice);
    setRangeMinValue(value?.stCcbaAsdt || fixedMinPrice);
  }, []);
  useEffect(() => {
    twoRangeHandler();
    if (handleValueChange) {
      handleValueChange(rangeMinValue, rangeMaxValue);
    }
  }, [rangeMinValue, rangeMaxValue]); // Depend on state changes

  return (
    <>
      <div className="flex justify-between py-4">
        <div>시대조정</div>
        <div>{`${rangeMinValue}년 - ${rangeMaxValue}년`}</div>
      </div>
      <div className="relative h-1 w-full rounded-lg bg-slate-300">
        <div
          className="absolute h-1 rounded-xl bg-[#B23742]"
          style={{
            left: `${rangeMinPercent}%`,
            right: `${rangeMaxPercent}%`,
          }}
        />
        {/* Slider Inputs */}
        <div className="relative h-1">
          <input
            className="slider-range pointer-events-none absolute -top-[2px] h-[7px] w-full appearance-none bg-transparent"
            type="range"
            min={fixedMinPrice}
            max={fixedMaxPrice - step}
            step={step}
            value={rangeMinValue}
            onChange={(e) => {
              prcieRangeMinValueHandler(e);
              twoRangeHandler();
            }}
          />
          <input
            className="slider-range pointer-events-none absolute -top-[2px] h-[7px] w-full appearance-none bg-transparent"
            type="range"
            min={fixedMinPrice + step}
            max={fixedMaxPrice}
            step={step}
            value={rangeMaxValue}
            onChange={(e) => {
              prcieRangeMaxValueHandler(e);
              twoRangeHandler();
            }}
          />
        </div>
      </div>
      <div className="flex justify-between py-4">
        <div>{min}</div>
        <div>{max}</div>
      </div>
    </>
  );
}
