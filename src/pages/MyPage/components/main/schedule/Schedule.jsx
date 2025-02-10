import PropTypes from 'prop-types';

import { Link } from 'react-router';

const Schedule = ({ scheduleData, index, tripDeleteEvent }) => {
  const totalDay = (startDay, endDay) => {
    const startDate = new Date(startDay);
    const endDate = new Date(endDay);

    const totalDay = endDate.getTime() - startDate.getTime();

    return totalDay / (1000 * 60 * 60 * 24) + 1;
  };

  const handleDeleteClick = (e, tripId) => {
    e.preventDefault();
    tripDeleteEvent(tripId);
  };

  return (
    <div className="w-full pt-40 px-20 pb-50 ">
      <Link to={`/trip/my?trip_id=${scheduleData.trip_id}`}>
        <div className="w-full flex justify-between">
          <div>
            <p className="text-gray-7">
              {scheduleData.start_date} ~ {scheduleData.end_date} 총 (
              {totalDay(scheduleData.start_date, scheduleData.end_date)}일)
            </p>
          </div>
          <div
            className="cursor-pointer w-14"
            onClick={e => handleDeleteClick(e, scheduleData.trip_id)}
          >
            <img src="/icons/delete.svg" alt="삭제 아이콘" className="w-full" />
          </div>
        </div>

        <div>
          <h3 className="text-24 text-gary-8 mt-16">{index}번째 여행</h3>
        </div>
      </Link>
    </div>
  );
};

export default Schedule;

Schedule.propTypes = {
  scheduleData: PropTypes.shape({
    trip_id: PropTypes.number.isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
  }),
  index: PropTypes.number.isRequired,
  tripDeleteEvent: PropTypes.func.isRequired,
};
