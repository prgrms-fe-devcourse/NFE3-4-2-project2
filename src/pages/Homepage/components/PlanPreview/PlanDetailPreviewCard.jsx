import PropTypes from 'prop-types';
import PNG_IMAGES from '@public/images/image';
import { Link } from 'react-router';

const PlanDetailPreviewCard = ({ plan }) => {
  const defaultImageURL = PNG_IMAGES.defaultCard;
  return (
    <div className="w-full rounded-4 border-2 border-solid border-gray-4 bg-gray-2">
      <div className="w-full h-150 bg-red-200 rounded-4 relative">
        <img
          src={plan.imgpath ?? defaultImageURL}
          className="w-full h-150 object-fill rounded-t-4"
        />
        <div className="absolute inset-0 bg-black opacity-50 rounded-4"></div>
        <span className="absolute bottom-15 font-bold text-20 px-12 text-white">
          {plan.place_name}
        </span>
      </div>
      <div className="mt-17 px-12 ">
        <h3 className="font-semibold text-20 text-gray-8">{formatDate(plan.date)}</h3>
        <span className="font-medium text-14 text-gray-8 block mt-15">
          <span className="font-semibold text-sub-accent-2">{formatTime(plan.time)}</span> 에 등록된
          일정이에요.
        </span>
        <span className="font-regular text-13 leading-4 text-gray-8 block mt-13">
          {plan.road_address && `📍 ${plan.road_address}`}
        </span>
        <span className="font-regular text-13 leading-4 text-gray-8 block mt-10 pb-10">
          {`🍊 ${plan.description.slice(0, 30)}`}
        </span>
        <Link
          className="text-primary-2 font-bold text-10 w-full block text-end pb-15"
          to={`/detail/${plan.content_id}`}
        >
          더보기
        </Link>
      </div>
    </div>
  );
};

export default PlanDetailPreviewCard;

PlanDetailPreviewCard.propTypes = {
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
  }),
};

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: 'numeric', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('ko-KR', options);
  const replacedString = formattedDate.replace(' ', '월 ') + '일';
  return replacedString.replaceAll('.', '');
}

function formatTime(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  const period = hours < 12 ? '오전' : '오후';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${period} ${formattedHours}시`;
}
