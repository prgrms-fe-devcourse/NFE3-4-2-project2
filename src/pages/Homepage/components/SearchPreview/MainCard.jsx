import PropTypes from 'prop-types';
import WishListButtonMain from './WishListButtonMain.jsx';

// TODO 종희님 코드와 합치기
const MainCard = ({ placeInfo, onClick }) => {
  const locationText = placeInfo.street ? `${placeInfo.city} > ${placeInfo.street}` : `${placeInfo.city}`;

  return (
    <div
      className="border-solid border border-[#E9E9E9] rounded-8 shadow-lg w-313 overflow-hidden hover:border-[#ffd3be] hover : border-2 [&:nth-child(3n)]:mr-0 cursor-pointer"
      onClick={onClick}
    >
      <img className="h-209 w-full" src={placeInfo.img} alt="상세 사진" />
      <div className="p-20">
        <div className="flex justify-between mb-13">
          <div className="text-18 font-semibold line-clamp-1">{placeInfo.title}</div>
          <WishListButtonMain placeInfo={placeInfo} />
        </div>
        <div className="text-14 text-gray-7">{locationText}</div>
      </div>
    </div>
  );
};

export default MainCard;

MainCard.propTypes = {
  placeInfo: PropTypes.shape({
    contentsid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
