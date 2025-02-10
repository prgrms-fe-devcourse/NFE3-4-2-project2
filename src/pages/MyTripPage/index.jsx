import { createContext, useEffect, useState } from 'react';
import DayCard from './components/DayCard.jsx';
import PlanCard from './components/PlanCard.jsx';
import { useLocation } from 'react-router-dom';
import { deletePlanApi, getPlanApi, getTripApi, updatePlanApi } from '@/apis/supabaseApi.js';
import PopUpCard from './components/PopUpCard.jsx';
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import ChangeTimeModal from './components/ChangeTimeModal.jsx';
import { useSelector } from 'react-redux';
const { kakao } = window;

export const CurrentPopUpPlanContext = createContext(null);

const MyTripPage = () => {
  const userId = useSelector(state => state.user.userId);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tripId = queryParams.get('trip_id');
  const [datesData, setDatesData] = useState([]);
  const [planForPopUp, setPlanForPopUp] = useState({});
  const [isOpenChangeModal, setIsOpenChangeModal] = useState(false);
  const [changedTime, setChangedTime] = useState(null);

  // 밑에 두 함수는 util 함수
  const getDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];

    while (start <= end) {
      dates.push(new Date(start).toISOString().split('T')[0]);
      start.setDate(start.getDate() + 1);
    }

    return dates;
  };

  const sortDatesData = (data) => {
    const sortedDatesData = [];
    Object.keys(data).forEach(date => {
      sortedDatesData[date] = data[date].sort((a, b) => a.time.localeCompare(b.time));
    })
    return sortedDatesData;
  }

  const getTripAndPlanInfo = async () => {
    try {
      const tripResult = await getTripApi(userId, tripId);
      const allDates = getDates(tripResult[0].start_date, tripResult[0].end_date);
      const tempDatesData = {};
      for (const date of allDates) {
        tempDatesData[date] = [];
      }
      const planResult = await getPlanApi(userId, tripId);
      for (const planInfo of planResult) {
        if (tempDatesData[planInfo.date]) {
          tempDatesData[planInfo.date].push(planInfo);
        }
      }
      setDatesData(sortDatesData(tempDatesData));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = () => {
    Modal.confirm({
      title: '일정을 삭제할까요?',
      icon: <ExclamationCircleFilled />,
      content: `${planForPopUp.date} 날짜에 대한 일정을 삭제하려고 해요`,
      okText: '예',
      okType: 'danger',
      cancelText: '아니요',
      async onOk() {
        try {
          const result = await deletePlanApi(planForPopUp.id);
          if (result.length > 0) {
            const newDatesData = {};
            Object.keys(datesData).forEach(date => {
              if (date === result[0].date) {
                newDatesData[date] = datesData[date].filter(item => item.id !== result[0].id);
              } else {
                newDatesData[date] = datesData[date];
              }
            });
            setDatesData(newDatesData);
            setPlanForPopUp({});
          }
        } catch (error) {
          console.error(error);
        }
      },
      onCancel() {
      },
      cancelButtonProps: {
        style: {
          textDecoration: '#FDBA74',
        },
      },
    });
  };

  const handleUpdate = () => {
    setIsOpenChangeModal(true);
  };

  const updateConfirm = async () => {
    try {
      const result = await updatePlanApi(planForPopUp.id, changedTime);
      if (result.length > 0) {
        const newDatesData = {};
        Object.keys(datesData).forEach(date => {
          if (date === result[0].date) {
            const tempArray = [];
            for (const plan of datesData[date]) {
              if (plan.id === result[0].id) {
                const newPlan = { ...plan, time: result[0].time };
                tempArray.push(newPlan);
              } else {
                tempArray.push(plan);
              }
            }
            newDatesData[date] = tempArray;
          } else {
            newDatesData[date] = datesData[date];
          }
        });
        setIsOpenChangeModal(false);
        setDatesData(sortDatesData(newDatesData));
        setPlanForPopUp({ ...planForPopUp, time: changedTime });
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  useEffect(() => {
    let latitude = 33.39;
    let longitude = 126.55;
    let level = 10;
    if (Object.hasOwn(planForPopUp, 'lat')) {
      latitude = planForPopUp.lat;
      longitude = planForPopUp.lng;
      level = 3;
    }

    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: level,
    };
    const map = new kakao.maps.Map(container, options);

    const markerPosition = new kakao.maps.LatLng(latitude, longitude);

    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);
  }, [planForPopUp]);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.39, 126.55),
      level: 10,
    };
    const map = new kakao.maps.Map(container, options);
    getTripAndPlanInfo();
  }, []);

  return (
    <>
      <div className="flex items-center">
        <div className="text-48 font-extrabold text-gray-8">제주 여행</div>
        <div className="text-48 font-extrabold text-sub-accent-2 mx-30">·</div>
        <div className="flex place-items-center justify-around bg-gray-4 text-gray-8 w-290 h-35 rounded-md p-10">
          <div className="font-semibold">{Object.keys(datesData)[0]} - {Object.keys(datesData).pop()}</div>
          <div className="w-2 bg-gray-5 h-[50%] mx-4"></div>
          <div className="font-semibold">총 {Object.keys(datesData).length}일</div>
        </div>
      </div>
      <div className="flex relative mt-40 justify-between">
        <CurrentPopUpPlanContext.Provider
          value={{
            planForPopUp,
            setPlanForPopUp,
          }}
        >
          <div
            className="grid h-800 w-397 overflow-auto"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {Object.keys(datesData).map((date, i) => (
              <DayCard key={i} dayNumber={i + 1} date={date} count={datesData[date].length}>
                {datesData[date].map((plan, index) => (
                  <div key={plan.id} className="flex group relative">
                    <div>
                      <img
                        src="/icons/line-icon.svg"
                        alt="라인"
                        height="54"
                        width="3"
                        className="-mt-12 w-3 h-70 ml-50 mr-30 object-cover"
                      />
                      <div
                        className={`absolute top-18 left-44 w-16 h-16 text-13 text-white text-center font-bold rounded-full flex items-center justify-center ${
                          planForPopUp.id === plan.id
                            ? 'bg-primary-0'
                            : 'bg-sub-accent-2 peer-hover:bg-primary-0'
                        }`}
                      >
                        {index + 1}
                      </div>
                    </div>
                    <PlanCard
                      key={plan.id}
                      plan={plan}
                      dayNumber={i + 1}
                      totalDates={Object.keys(datesData).length}
                    />
                  </div>
                ))}
              </DayCard>
            ))}
          </div>
          <div id="map" className="w-800 h-800 rounded-t-3"></div>
          {Object.hasOwn(planForPopUp, 'content_id') && (
            <PopUpCard
              plan={planForPopUp}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          )}
        </CurrentPopUpPlanContext.Provider>
      </div>
      {isOpenChangeModal && (
        <ChangeTimeModal
          setTime={setChangedTime}
          setIsOpenModal={setIsOpenChangeModal}
          onClick={updateConfirm}
        />
      )}
    </>
  );
};

export default MyTripPage;
