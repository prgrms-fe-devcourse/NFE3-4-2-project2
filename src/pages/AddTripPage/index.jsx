import { Modal } from 'antd';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { postTripApi } from '@/apis/supabaseApi.js';
import { useNavigate } from 'react-router-dom';
import Button from '@components/common/Button/index.jsx';
import { useSelector } from 'react-redux';

const AddTripPage = () => {
  const userId = useSelector(state => state.user.userId);
  const navigate = useNavigate();
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);

  const handleSubmit = async () => {
    try {
      const result = await postTripApi(userId, dates);
      const message = (
        <div>
          {result[0].start_date} 부터 {result[0].end_date} 까지
          <br />
          일정이 생성됐습니다.
        </div>
      );
      const tripId = result[0].trip_id;
      Modal.success({
        title: 'Success',
        content: message,
        centered : true,
        onOk() {
          navigate(`/trip/my?trip_id=${tripId}`);
        },
        okButtonProps: {
          style: {
            backgroundColor: '#FDBA74',
          },
        },
      });
    } catch (error) {
      console.error(error);
      Modal.error({
        title: '일정 생성에 문제가 생겼어요',
        content: '같은 문제가 반복된다면 브라우저를 껐다 켜주세요.',
        okButtonProps: {
          style: {
            backgroundColor: '#FDBA74',
          },
        },
      });
    }
  };

  return (
    <>
      <div className="font-extrabold text-40 text-gray-8 mb-14">여행 일정 등록</div>
      <div className="font-semibold text-14 text-gray-6 mb-40 tracking-[1px]">
        여행을 시작할 날짜, 종료할 날짜를 선택해주세요.
      </div>
      <div className="grid place-items-center">
        <div className="flex h-430 w-full place-items-center justify-around">
          <div className="border-solid h-430 border-gray-200 border-[1px] rounded-md p-10">
            <DateRange
              onChange={item => setDates([item.selection])}
              moveRangeOnFirstSelection={false}
              retainEndDateOnFirstSelection={false}
              ranges={dates}
              direction="horizontal"
              locale={ko}
              color="#FFAE52"
              rangeColors={["#FFAE52"]}
              preventSnapRefocus={true}
              months={2}
              className="rounded-md"
            />
          </div>
        </div>
        <div className="w-250 my-25">
          <Button type="button" label="일정 생성" onClick={handleSubmit} className="h-37">
            다음
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddTripPage;
