// TODO 여행 일정 보기와 같은 UI, 다른 Handler.. 공통 컴포넌트로 분리하기
const PlanPreviewCard = ({ plan, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="group hover:bg-primary-5 hover:first:text-primary-0 hover:border-primary-0 w-240 h-52 flex p-12 mb-15 items-center bg-white rounded-3 shadow-[21px_33px_11px_0px_rgba(184,183,183,0.00)] border-[1px] border-solid border-gray-4"
      style={{
        boxShadow:
          '0px 41px 11px 0 rgba(188,185,185,0), 0px 26px 10px 0 rgba(188,185,185,0.01), 0px 15px 9px 0 rgba(188,185,185,0.05), 0px 7px 7px 0 rgba(188,185,185,0.09), 0px 2px 4px 0 rgba(188,185,185,0.1)',
      }}
    >
      <div className="group-hover:text-primary-0 text-sub-accent-3 text-12 font-medium">
        {plan.time.slice(0, plan.time.length - 3)}
      </div>
      <div className="grid justify-items-start content-center gap-7 m-20">
        <div className="text-center text-gray-8 text-15 font-medium">
          {plan.place_name.slice(0, 10)}
        </div>
        <div className="text-center text-gray-6 text-13 font-medium">{plan.category}</div>
      </div>
    </button>
  );
};
export default PlanPreviewCard;
