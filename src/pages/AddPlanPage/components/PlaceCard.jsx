import makePlaceObject from '../utils/makePlaceObject';

const PlaceCard = ({ item, onNext, onSkipDetail }) => {
  return (
    <div className="w-750 h-66 relative border flex justify-around items-center border-white">
      <img
        className="w-73 h-45 rounded-sm"
        src={item?.repPhoto?.photoid?.thumbnailpath || '/images/no_image.svg'}
        alt="장소 사진"
      />

      <button
        className="w-335 h-auto flex flex-col items-start"
        onClick={() => onNext(item?.contentsid)}
      >
        <span className="text-black text-base font-medium truncate overflow-hidden whitespace-nowrap">
          {item?.title?.length > 30 ? `${item.title.slice(0, 30)}...` : item.title}
          <br />
        </span>
        <span className="text-gray-400 text-base font-medium">
          {item?.contentscd?.label}
          {item?.region1cd?.label ? ` · ${item?.region1cd?.label}` : ''}
        </span>
      </button>
      <button
        className="w-60 h-27 flex justify-center items-center bg-gray-200 rounded-full text-black text-xs font-semibold"
        onClick={() => onSkipDetail({ ...makePlaceObject(item) })}
      >
        선택
      </button>
    </div>
  );
};

export default PlaceCard;
