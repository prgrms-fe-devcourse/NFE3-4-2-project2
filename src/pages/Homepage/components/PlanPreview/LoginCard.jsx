import PNG_IMAGES from '@public/images/image.js';
import { Link } from 'react-router';

const LoginCard = () => {
  return (
    <div className="flex flex-col  items-center  gap-10 py-40 bg-gray-2 rounded-10">
      <div>
        <img src={PNG_IMAGES.mandarine} className="w-150 h-150 mb-20" />
      </div>
      <span className="font-medium text-12 text-gray-7">계획한 여행이 있나요?</span>
      <span className="font-medium text-12 text-gray-7">로그인 후 여행을 시작해보세요</span>
      <Link
        to="/auth"
        className="border border-solid border-gray-5 w-[80%] px-20 py-15 rounded-5 flex justify-center items-center text-15 font-semibold text-gray-7 hover:bg-gray-3 gap-10"
      >
        <img src={PNG_IMAGES.dummyUser} className="w-30 h-30" />
        <span className="text-gray-7 text-12 font-semibold">jejumonth 시작하기</span>
      </Link>
    </div>
  );
};
export default LoginCard;
