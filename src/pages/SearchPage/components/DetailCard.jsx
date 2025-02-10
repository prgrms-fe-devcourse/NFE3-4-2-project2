import PropTypes from 'prop-types';
import WishListButton from './WishListButton';

const DetailCard = ({ onClick, title, city, street, description, img, contentid }) => {
  return (
    <div onClick={onClick} className="p-20 border-solid border border-[#E9E9E9] rounded-8  shadow-lg flex mb-13 hover:border-[#ffd3be] border-2 hover:bg-[#f5f5f5]/50 cursor-pointer">
      <div className="flex-1 content-center text-left">
        <div className="flex justify-between">
          <div>
            <span className=" text-24 mr-22 font-medium inline-block max-w-312  leading-7">
              {title}
            </span>
            <span className="text-[#8c8c8c] text-14">{`${city}  >  ${street}`}</span>
          </div>
          <WishListButton placeInfo={contentid} />
        </div>
        <p className="text-[#333333] mt-35 leading-[140%] text-14 font-normal line-clamp-2">
          {description}
        </p>
      </div>
      <img src={img} alt="상세사진" className="rounded-10 w-345 h-171 ml-40" />
    </div>
  );
};

export default DetailCard;

DetailCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  contentid: PropTypes.object.isRequired,
};
