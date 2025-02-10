import { useLocation, useNavigate } from 'react-router-dom';

const DayCard = ({ dayNumber, date, children, count }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tripId = queryParams.get('trip_id');

  const handleClick = () => {
    navigate(`/plan?trip_id=${tripId}&date=${date}`);
  };

  return (
    <div className="w-371 h-auto grid gap-12 pb-25">
      <div className="flex items-center justify-around mb-15">
        <div className="text-gray-8 text-sm font-semibold">
          day {dayNumber}
        </div>
        <div className="text-gray-6 text-xs font-semibold">{date}</div>
        <div>
          <span className="text-gray-6 text-xs font-semibold">총 </span>
          <span className="text-sub-accent-1 text-xs font-semibold">{count}개</span>
          <span className="text-gray-6 text-xs font-semibold">의 일정</span>
        </div>
      </div>
      <div className="grid place-items-center w-full gap-12">
        {children}
      </div>
      <div className="flex items-center justify-around h-20">
        <button
          onClick={handleClick}
          className="flex items-center text-primary-0 text-13 font-medium"
        >
          <img src="/icons/plus-icon.svg" alt="plus-icon" width="17" height="17" />
          추가
        </button>
      </div>
      <hr/>
    </div>
  );
};

export default DayCard;
