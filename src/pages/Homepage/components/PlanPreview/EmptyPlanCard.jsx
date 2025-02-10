import PNG_IMAGES from '@public/images/image.js';
import { Link } from 'react-router';

const EmptyPlanCard = ({ link }) => {
  return (
    <div className="flex flex-col  items-center gap-10 py-40  bg-gray-2 rounded-10">
      <div>
        <img src={PNG_IMAGES.harbang} className="w-150 h-150 mb-20" />
        <div className="flex flex-col items-center">
          <div className="mb-10 font-regular text-14 text-gray-8 flex flex-col items-center gap-5">
            <span>이 날은 계획이 없어요</span>

            <span>새로운 일정을 만들어 볼까요?</span>
          </div>
          <Link
            to={link}
            className="border border-solid border-gray-5 w-full px-20 py-15 rounded-5 flex justify-center items-center text-15 font-semibold text-gray-7 hover:bg-gray-3"
          >
            🍊 일정 추가하기
          </Link>
        </div>
      </div>
    </div>
  );
};
export default EmptyPlanCard;
