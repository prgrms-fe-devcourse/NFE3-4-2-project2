import { format, addMonths, subMonths } from 'date-fns';
import makeCalender from '@/utils/makeCalender';

const Calender = ({ selectedDate, setSelectedDate, plans }) => {
  const { currentMonthAllDates, weekDays } = makeCalender(selectedDate);

  // 다음 달로 이동
  const nextMonth = () => {
    setSelectedDate(addMonths(selectedDate, 1));
  };

  // 지난 달로 이동
  const prevMonth = () => {
    setSelectedDate(subMonths(selectedDate, 1));
  };

  // 선택한 날짜로 Date 변경
  const onChangeDate = date => {
    setSelectedDate(date);
  };

  const isSameMonth = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth()
    );
  };

  // 특정 날짜에 계획이 있는지 없는지
  const hasPlan = calenderDate => {
    //plans의 date과 매칭되는 date가 있는지 없는지
    return plans.some(plan => {
      const { date } = plan;

      const date1 = new Date(date);
      const date2 = new Date(calenderDate);

      date1.setHours(0, 0, 0, 0);
      date2.setHours(0, 0, 0, 0);

      return date1.getTime() === date2.getTime();
    });
  };

  return (
    <div className="w-350 h-350 mt-20">
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-between px-3">
          <div className="w-full flex place-content-between items-center">
            <button
              type="button"
              onClick={prevMonth}
              className="w-15 h-15 flex justify-center items-center"
            >
              <svg className="embla__button__svg" viewBox="0 0 532 532">
                <path
                  fill="currentColor"
                  d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
                />
              </svg>
            </button>
            <div className="flex gap-1">
              <span className="text-sub-accent-1 font-semibold">
                {format(selectedDate, 'MMM yyyy')}
              </span>
            </div>
            <button
              type="button"
              onClick={nextMonth}
              className="w-15 h-15 flex justify-center items-center"
            >
              <svg className="embla__button__svg" viewBox="0 0 532 532">
                <path
                  fill="currentColor"
                  d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 place-items-center gap-x-10 ">
          {weekDays.map((days, index) => (
            <div key={index} className="font-semibold w-40 h-40 flex items-center justify-center">
              {days}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-x-10 gap-y-10 ">
          {currentMonthAllDates.map((date, index) => (
            <button
              key={index}
              className={`p-2 rounded-full w-40 h-40 font-semibold
        ${isSameMonth(selectedDate, date) ? 'text-gray-7' : 'text-gray-5'}
        ${hasPlan(date) ? 'bg-gray-5 text-gray-9' : 'text-gray-6'}
        ${isSameDay(selectedDate, date) ? 'bg-sub-accent-2 font-semibold text-white' : ''}
        `}
              type="button"
              onClick={() => onChangeDate(date)}
            >
              {date.getDate()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Calender;
