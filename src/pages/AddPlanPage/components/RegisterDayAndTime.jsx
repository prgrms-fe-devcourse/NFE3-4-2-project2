import { formatDateKo, formatDate, formatTime } from '@/utils/dateFormat';
import { getRefinedDate } from './WeekCalendar';
import { useState } from 'react';
import WeekCalendar from './WeekCalendar';
import ButtonList from './ButtonList';
import { message } from 'antd';

// TODO 랜더링 최적화
const RegisterDayAndTime = ({ startDate, endDate, initialTargetDate, place, onRegister }) => {
  const [time, setTime] = useState(null);
  const [selectedDay, setSelectedDay] = useState(() => getRefinedDate(initialTargetDate));
  const [messageApi, contextHolder] = message.useMessage();

  const calendarProps = {
    initialTargetDate,
    selectedDay,
    setSelectedDay,
    startDate,
    endDate,
  };
  const onSubmitClick = event => {
    event.preventDefault();

    if (time !== null) {
      const data = {
        day: formatDate(selectedDay), // date 'yyyy-mm-dd'형식
        time,
      };
      onRegister(data);
      showSuccess();
    } else {
      showError();
    }
  };

  const showError = () => {
    messageApi.open({
      type: 'error',
      content: '시간을 등록해주세요',
      style: {
        marginTop: '100px',
      },
      duration: 5,
    });
  };

  const showSuccess = () => {
    messageApi.open({
      type: 'success',
      content: '일정 등록이 완료되었습니다! 🎉',
      style: {
        marginTop: '100px',
      },
      duration: 5,
    });
  };
  return (
    <div>
      <h2 className="text-24 font-semibold ml-7">여행 날짜</h2>
      <div className="mb-25">
        <div className="flex items-center gap-20 ">
          <h3 className="text-20 font-semibold mt-16 mb-22 ml-14"> 날짜 선택</h3>
          <span className="text-12 font-regular text-gray-7">
            {String(startDate).replaceAll('-', '.')} ~ {String(endDate).replaceAll('-', '.')}
          </span>
        </div>
        <div>
          <WeekCalendar {...calendarProps} />
        </div>
      </div>

      <hr className="color-gray-5" />
      <div>
        <h3 className="text-20 font-semibold mt-16 mb-22 ml-14">시간 선택</h3>
        <ButtonList setTime={setTime} />
      </div>

      <hr className="color-gray-5 my-27" />
      <div className="border border-solid border-gray-5 rounded-mds w-full h-80 flex justify-center items-center relative">
        <div>⏰</div>
        <div className="text-16 font-semibold text-gray-8 mx-10">
          <span>{formatDateKo(selectedDay)} </span>
          <span>{time !== null && formatTime(time)}</span>
        </div>
        <div className="text-sub-accent-2 font-bold text-16 mr-5"> {place}</div>
        <span className="font-regular text-16 text-gray-7">에 일정을 만들까요?</span>

        <button
          type="button"
          className="text-16 font-semibold text-green-500 ml-10 abolute right-0 h-45 w-100 bg-green-50 rounded-full hover:bg-green-100"
          onClick={onSubmitClick}
        >
          {contextHolder}
          <span> ✅ 확인</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterDayAndTime;
