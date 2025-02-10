import {
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  eachDayOfInterval,
  addMonths,
  startOfYear,
} from 'date-fns';

const makeCalender = selectedDate => {
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const allMonth = [];
  const startMonth = startOfYear(selectedDate);
  for (let month = 0; month < 12; month++) {
    allMonth.push(addMonths(startMonth, month));
  }

  const startDayOfCurrentMonth = startOfMonth(selectedDate); // 현재 달의 시작 날짜
  const endDayOfCurrentMonth = endOfMonth(selectedDate); // 현재달의마지막날짜
  const startDayOfFirstWeek = startOfWeek(startDayOfCurrentMonth); // 현재달의첫주의시작날짜
  const endDayOfLastWeek = endOfWeek(endDayOfCurrentMonth); // 현재달마지막주의끝날짜
  const currentMonthAllDates = eachDayOfInterval({
    start: startDayOfFirstWeek,
    end: endDayOfLastWeek,
  });

  return { weekDays, currentMonthAllDates, allMonth };
};

export default makeCalender;
