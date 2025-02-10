import PNG_IMAGES from '@public/images/image';
import { Link } from 'react-router';
const RecommandDetailCard = ({ place }) => {
  const defaultImageURL = PNG_IMAGES.defaultCard;
  const imgpath = place.repPhoto.photoid.thumbnailpath;
  const parsedTag = place.alltag.split(',').at(1);
  return (
    <div className="w-full rounded-4 border-2 border-solid border-gray-4 bg-gray-2">
      <div className="w-full h-150 bg-red-200 rounded-4 relative">
        <img src={imgpath ?? defaultImageURL} className="w-full h-150 object-fill rounded-t-4" />
        <div className="absolute inset-0 bg-black opacity-50 rounded-4"></div>
        <span className="absolute bottom-15 font-bold text-18 px-12 text-white">{place.title}</span>
      </div>
      <div className="mt-17 px-12 ">
        <h3 className="font-semibold text-20 text-gray-8">#{parsedTag}</h3>
        <span className="font-medium text-15 text-gray-8 block mt-15">
          <span className="font-semibold text-sub-accent-2">여행은 바로 지금</span>
        </span>
        <span className="font-regular text-13 leading-4 text-gray-8 block mt-13">
          {place.roadaddress && `📍 ${place.roadaddress}`}
        </span>
        <span className="font-regular text-13 leading-4 text-gray-8 block mt-10 pb-10">
          {`🍊 ${place.introduction.slice(0, 30)}`}
        </span>
        <Link
          className="text-primary-2 font-bold text-10 w-full block text-end pb-15"
          to={`/detail/${place.contentsid}`}
        >
          더보기
        </Link>
      </div>
    </div>
  );
};
export default RecommandDetailCard;
