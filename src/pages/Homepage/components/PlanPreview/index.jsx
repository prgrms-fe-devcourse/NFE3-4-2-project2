import useFetchAllUserPlans from '@/hooks/react-query/useFetchAllUserPlans';
import filterSelectedPlans from '@/utils/filterPlans';
import useMySelector from '@/hooks/useMySelector';
import RoundedLink from '@/components/common/Link/RoundedLink';
import PlanPreviewListWrapper from './PlanPreviewListWrapper';
import PlanDetailPreviewCard from './PlanDetailPreviewCard';
import RecommandDetailCard from './RecommandDetailCard';
import getRandomNumber from '@/utils/randomNumber';
import DetailCardWrapper from './DetailCardWrapper';
import PlanPreviewItem from './PlanPreviewItem';
import CalenderWrapper from './CalenderWrapper';
import PlanPreviewCard from './PlanPreviewCard';
import EmptyPlanCard from './EmptyPlanCard';
import RECOMMAND_PLACE from '@/constants/recommend';
import PinnedItem from './PinnedItem';
import LoginCard from './LoginCard';
import Calender from './Calender';
import PATH from '@/constants/path';
import { useState, useEffect } from 'react';

const PlanPreview = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userId] = useMySelector(state => [state.user.userId]);
  const { trips, plans, isLoadingPlans } = useFetchAllUserPlans(userId);

  useEffect(() => {
    setSelectedPlan(null);
  }, [selectedDate]);

  const newSelectedPlans = filterSelectedPlans(plans, selectedDate);

  if (isLoadingPlans) {
    return <div className="w-full h-350"> 여행 계획 정보를 불러오는 중..</div>;
  }

  const renderPreviewContent = () => {
    if (userId === null) {
      return <LoginCard />;
    }

    if (newSelectedPlans.length === 0) {
      return <EmptyPlanCard link={trips ? PATH.mySchedule : PATH.addTrip} />;
    }

    return (
      <div className="pl-20 max-h-350 overflow-y-scroll">
        <PinnedItem label="📍 이날의 제주도 여행" />
        {plans &&
          newSelectedPlans.map((plan, index) => (
            <PlanPreviewItem key={index}>
              <PlanPreviewCard
                plan={plan}
                handleClick={() => {
                  setSelectedPlan(plan);
                }}
              />
            </PlanPreviewItem>
          ))}
        <RoundedLink
          link={PATH.mySchedule}
          label="새로운 일정 추가"
          width="w-214"
          height="h-30"
          borderColor="border-sub-accent-2"
        />
      </div>
    );
  };

  return (
    <div className="w-full flex gap-20 my-100 ">
      {/* 캘린더 컴포넌트 */}
      <CalenderWrapper>
        <Calender selectedDate={selectedDate} setSelectedDate={setSelectedDate} plans={plans} />
      </CalenderWrapper>

      {/* 날짜별 일정 보여주는 컴포넌트 */}
      {selectedDate && (
        <PlanPreviewListWrapper
          header={`✍️ ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일의 예상 일정`}
        >
          {renderPreviewContent()}
        </PlanPreviewListWrapper>
      )}

      {/* 세부일정 카드 컴포넌트 */}
      {selectedPlan ? (
        <DetailCardWrapper
          header="✅ 상세일정 확인하기"
          guide=" 날짜, 시간, 장소를 한 번 더 체크해요!"
        >
          <PlanDetailPreviewCard plan={selectedPlan} />
        </DetailCardWrapper>
      ) : (
        <DetailCardWrapper
          header="🍧 이런 메뉴는 어때요?"
          guide="추천하는 여행맛집을 일정에 추가해보세요"
        >
          <RecommandDetailCard place={RECOMMAND_PLACE[getRandomNumber(RECOMMAND_PLACE.length)]} />
        </DetailCardWrapper>
      )}
    </div>
  );
};

export default PlanPreview;
