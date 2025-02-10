import PropTypes from 'prop-types';
import DayButton from './DayButton.jsx';

const PopUpCard = ({ plan, handleDelete, handleUpdate }) => {
  return (
    <div className="grid w-700 h-200 bg-gray-1 bottom-0 right-51 absolute z-10 rounded-t-3">
      <div className="flex justify-between px-20 py-10 place-items-center">
        <DayButton dayNumber={plan.dayNumber} />
        <a href={`/detail/${plan.content_id}`} target="_blank">
          <div className="text-sub-accent-1">더보기</div>
        </a>
      </div>
      <div className="flex pb-10 px-20 place-items-center">
        <img
          src={plan.thumbnailpath || "/images/no_image.svg"}
          alt="장소사진"
          width="127"
          height="77"
          className="rounded-4 w-127 h-77 object-cover"
        />
        <div className="grid ml-20 w-400 grid-cols-[1fr_2fr]grid-cols-2 grid-rows-3 gap-x-10 gap-y-10">
          <div className="flex w-auto justify-between place-items-center">
            <div className="font-semibold col-span-2">
              {plan.place_name.length > 8 ? (
                plan.place_name.slice(0,8)+'...'
              ) : (
                plan.place_name
              )}
            </div>
            <div className="ml-6 text-gray-6">{plan.category}</div>
          </div>
          <div className="text-gray-7 row-start-2">📍 info</div>
          <div className="text-gray-7 row-span-3 col-start-2 row-start-2 flex">
            {plan.description.length > 50 ? (
              plan.description.slice(0,62) + '...'
            ) : (
              plan.description
            )}
          </div>
        </div>
      </div>
      <div className="flex border-t-[1px] border-solid w-700 border-gray-4 justify-around items-center">
        <div className="w-349 flex items-center justify-center">
          <button className="flex items-center text-gray-7" onClick={handleDelete}>
            <img
              src="/icons/delete-icon.svg"
              height="17"
              width="17"
              alt="쓰레기통"
              className="mx-10"
            />
            일정 삭제
          </button>
        </div>
        <div className="w-1 bg-gray-4 h-[70%] mx-4"></div>
        <div className="w-349 flex items-center justify-center">
          <button className="flex items-center text-gray-7" onClick={handleUpdate}>
            <img src="/icons/timer.svg" height="17" width="17" alt="시계" className="mx-10" />
            시간 변경
          </button>
        </div>
      </div>
    </div>
  );
};

PopUpCard.propTypes = {
  plan: PropTypes.shape({
    category: PropTypes.string,
    content_id: PropTypes.string,
    created_at: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    lat: PropTypes.number,
    lang: PropTypes.number,
    place_name: PropTypes.string,
    road_address: PropTypes.string,
    time: PropTypes.string,
    trip_id: PropTypes.number,
    dayNumber: PropTypes.number,
    totalDates: PropTypes.number,
    thumbnailpath: PropTypes.string,
  }),
  className: PropTypes.string,
  handleDelete: PropTypes.func,
  handleUpdate: PropTypes.func,
};

export default PopUpCard;