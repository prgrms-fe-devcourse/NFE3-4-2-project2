import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { deleteTripApi, getAllTripsApi } from '@/apis/supabaseApi';
import MyPageHeader from '../common/MyPageHeader';
import NoContent from '../common/NoContent';
import Schedule from './Schedule';
import { useNavigate } from 'react-router-dom';

const ScheduleSection = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const { userId } = useSelector(state => state.user);
  const navigate = useNavigate();

  const fetchScheduleData = async userId => {
    try {
      const response = await getAllTripsApi(userId);

      setScheduleData(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchScheduleData(userId);
  }, [userId]);

  const deleteScheduleHandler = async tripID => {
    const isChecked = window.confirm('정말로 여행 일정을 삭제하시겠습니까?');

    if (isChecked) {
      try {
        await deleteTripApi(userId, tripID);
        setScheduleData(prevList => prevList.filter(schedule => schedule.trip_id !== tripID));
      } catch (error) {
        throw new Error(error);
      }
    } else {
      return;
    }
  };

  return (
    <>
      <MyPageHeader title={'여행 일정'}></MyPageHeader>
      <div className="mt-24 [&>*:not(:first-child)]:border-t [&>*:not(:first-child)]:border-solid [&>*:not(:first-child)]:border-t-gray-5">
        {scheduleData.length > 0 ? (
          scheduleData.map((schedule, index) => (
            <Schedule
              key={schedule.trip_id}
              scheduleData={schedule}
              index={index + 1}
              tripDeleteEvent={deleteScheduleHandler}
            ></Schedule>
          ))
        ) : (
          <NoContent onClick={() => navigate('/trip/add-trip')}>아이콘을 눌러 일정을 등록해주세요!</NoContent>
        )}
      </div>
    </>
  );
};

export default ScheduleSection;
