import { useState } from 'react';
import { message } from 'antd';

const WEEK = ['일', '월', '화', '수', '목', '금', '토'];

// date 객체를 받아서 해당 날짜가 포함된 일~토 주차를 반환.
const makeWeekArray = date => {
  let day = date.getDay(); // 화요일은 2
  let week = [];
  for (let i = 0; i < 7; i++) {
    let newDate = new Date(date.valueOf() + 86400000 * (i - day));
    week.push([i, newDate]);
  }
  return week;
};

// '2025-04-05'를 받아 시간선을 초기화한 Date객체를 생성한다.
export const getRefinedDate = dateString => {
  const temp = new Date(dateString);
  return new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
};

// 여행일정을 만들고자 선택된 기본 날짜가 주어진다.
const WeekCalendar = ({
  initialTargetDate,
  selectedDay,
  setSelectedDay,
  startDate: startDay,
  endDate: endDay,
}) => {
  const [targetDay, setTargetDay] = useState(() => getRefinedDate(initialTargetDate)); // ui 상에서 선택된 날짜
  const [targetWeek, setTargetWeek] = useState(() => makeWeekArray(targetDay)); // 현재 보여주는 주차
  const [messageApi, contextHolder] = message.useMessage();

  // 시작날짜와 종료 날짜를 Date 객체로 변환
  const startDate = new Date(startDay);
  const endDate = new Date(endDay);

  // 오늘날짜 표시를 위함.
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // 한 주 전으로 이동
  const onClickLeft = () => {
    let newDate = new Date(targetDay.valueOf() - 86400000 * 7); // 타겟 날짜를 일주일 전으로 이동시킨다.
    let newWeek = makeWeekArray(newDate); // 보여질 주차를 일주일 전으로 이동시킨다.
    setTargetDay(newDate);
    setTargetWeek(newWeek);
  };

  // 한 주 뒤로 이동
  const onClickRight = () => {
    let newDate = new Date(targetDay.valueOf() + 86400000 * 7);
    let newWeek = makeWeekArray(newDate);
    setTargetDay(newDate);
    setTargetWeek(newWeek);
  };

  const onButtonClick = event => {
    // 현재 선택된 날짜를 selected day로 정한다.
    const clickedDate = event.target.value;
    if (isValidDay(clickedDate)) {
      const newDate = new Date(clickedDate);
      setSelectedDay(newDate);
    } else {
      showError();
    }
  };

  // 특정 날짜가 시작일과 종료일 사이에 있는 유효한 날짜인지 판별
  const isValidDay = date => {
    const currentDate = new Date(date);
    return currentDate < startDate || currentDate > endDate ? false : true;
  };

  // ? showError, showSucess를 한곳에서 관리하는 방법
  const showError = () => {
    messageApi.open({
      type: 'error',
      content: '여행 기간내의 날짜를 선택해주세요',
      style: {
        marginTop: '100px',
      },
    });
  };
  return (
    <div className="relatvie">
      {contextHolder}
      <div className="font-semibold text-20 ml-21">{targetDay.getMonth() + 1}월</div>

      <hr className="border-gray-5 border-1 my-12" />
      <div className="grid grid-cols-7 grid-rows-[32px_50px] ">
        {WEEK.map((day, index) => (
          <div key={index} className="text-center text-16 text-gray-6 ">
            {day}
          </div>
        ))}

        {targetWeek.map(([index, day]) => (
          <div key={index} className="flex justify-center">
            <div className="flex flex-col items-center">
              <button
                value={day}
                onClick={onButtonClick}
                className={`text-16 w-31 h-31 rounded-full  text-gray-8 font-semibold hover:bg-primary-3
                ${day.getTime() == selectedDay.getTime() ? 'font-semibold bg-primary-1 text-white' : ''}
                `}
              >
                {day.getDate()}
              </button>
              <span className="text-sub-accent-1 text-15 font-semibold left-0">
                {day.getTime() == today.getTime() ? '오늘' : ' '}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-5 text-10 font-semibold text-gray-7">
        <button onClick={onClickLeft}> {'<-'}지난주 </button>
        <button onClick={onClickRight}> 다음주{'->'} </button>
      </div>
    </div>
  );
};

export default WeekCalendar;
