import PNG_IMAGES from '@public/images/image';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Hero = () => {
  const userId = useSelector(state => state.user.userId);
  const navigate = useNavigate();
  const onButtonClick = e => {
    if (userId) {
      navigate('/trip/add-trip');
    } else {
      navigate('/auth');
    }
  };
  return (
    <div className="after:block after:h-350">
      <div className="absolute top-0 left-0 right-0 h-546 -z-10">
        {/* <div className="relative w-full"> */}
        <img src={PNG_IMAGES.hero} className="w-full h-[25rem] object-cover" />
        {/* </div> */}
      </div>
      <div className="relative">
        <div className="absolute top-90 left-50  w-850">
          <div className="font-extrabold text-40 text-white">
            <span className="block mb-10">자연이 주는 힐링의 순간</span>
            <span>당신이 몰랐던 제주를 발견해보세요</span>
          </div>
          <div className="flex justify-end mt-40">
            <button
              onClick={onButtonClick}
              className="w-200 h-60 rounded-full font-bold text-20 border  border-white text-white bg-black/30 hover:cursor-pointer hover:bg-black/50 transition duration-300 ease-in-outs"
            >
              여행 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
