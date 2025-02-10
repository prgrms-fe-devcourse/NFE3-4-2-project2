import PropTypes from 'prop-types';
import WishListButton from './WishListButton';

const DetailMediumCard = ({ onClick, title, city, street, img, contentid }) => {
  return (
    <div onClick={onClick} className="border-solid border border-[#E9E9E9] rounded-8  shadow-lg mb-32 w-313 overflow-hidden hover:border-[#ffd3be] border-2 cursor-pointer">
      <img className="h-209 w-full" src={img} alt="상세 사진" />
      <div className="p-20 text-left">
        <div className="flex justify-between mb-13">
          <div className="text-18 font-semibold w-220 line-clamp-1">{title}</div>
          <WishListButton placeInfo={contentid} />
        </div>
        <div className="text-14 text-gray-7">{`${city} > ${street}`}</div>
      </div>
    </div>
  );
};

export default DetailMediumCard;

DetailMediumCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  contentid: PropTypes.object.isRequired,
};
