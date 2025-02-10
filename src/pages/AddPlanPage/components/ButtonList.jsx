import React from 'react';
import { generateTimeArray, TIME_BOUNDARY } from '@/utils/hourFormat';
import { Button } from 'antd';
import { useMemo } from 'react';

const TimeButton = ({ onButtonClick, label }) => {
  return (
    <Button
      color="orange"
      variant="text"
      className="w-104 h-40 font-semibold text-15 focus-within:bg-primary-5 focus-within:border-primary-2 focus-within:border-2 border-gray-5"
      onClick={onButtonClick}
    >
      {label}
    </Button>
  );
};

const TimezoneButtonList = ({ timezone, hoursArray, setTime }) => {
  const filterBySection = section => hoursArray.filter(clock => clock.section === section);
  return (
    <div className="flex flex-row">
      <div className="min-w-100 text-center pt-15 font-semibold text-gray-8">{timezone}</div>
      <div className="flex flex-wrap gap-10">
        {filterBySection(timezone).map((clock, index) => (
          <TimeButton key={index} onButtonClick={() => setTime(clock.time)} label={clock.label} />
        ))}
      </div>
    </div>
  );
};

const ButtonList = ({ setTime }) => {
  const hoursArray = useMemo(() => generateTimeArray(), []);

  const timeZone = Object.values(TIME_BOUNDARY); // ['오전','오후','저녁']
  return (
    <div className="flex flex-col gap-15 ">
      {timeZone.map((timezone, index) => (
        <TimezoneButtonList
          timezone={timezone}
          hoursArray={hoursArray}
          key={index}
          setTime={setTime}
        />
      ))}
    </div>
  );
};

export default React.memo(ButtonList);
