import PropTypes from 'prop-types';
import formatAddress from '@/utils/addressFormat';
import ScrapIcon from '../../icon/ScrapIcon';
import { Link } from 'react-router';

const ScrapPlaceCard = ({ scrapData, onDelete, slideLength }) => {
  const handleDeleteClick = e => {
    e.preventDefault();
    onDelete(scrapData.user_id, scrapData.content_id);
  };

  return (
    <>
      {scrapData && (
        <Link
          to={`/detail/${scrapData.content_id}`}
          className={`  ${slideLength <= 4 && 'first:ml-[-16px]'}`}
        >
          <div className={`w-155 h-150 rounded-8 relative border border-gray-5 border-solid ml-16`}>
            <div className="scrap-icon absolute top-[5%] right-[5%]">
              <div onClick={handleDeleteClick} className="cursor-pointer">
                <ScrapIcon size={18} scrapped={true}></ScrapIcon>
              </div>
            </div>
            <div className="w-full h-[75%]">
              <img
                src={scrapData.img_thumbnail_url}
                alt={`${scrapData.title} 이미지`}
                className="rounded-t-8 w-full h-full"
              />
            </div>
            <div className="h-[25%] p-4 flex flex-col justify-between">
              <h3 className="text-12 truncate">{scrapData.title}</h3>
              <p className="text-10 text-gray-7">{formatAddress(scrapData.address)}</p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default ScrapPlaceCard;

ScrapPlaceCard.propTypes = {
  scrapData: PropTypes.shape({
    address: PropTypes.string,
    category: PropTypes.string,
    content_id: PropTypes.string,
    created_at: PropTypes.string,
    id: PropTypes.number,
    img_full_url: PropTypes.string,
    img_thumbnail_url: PropTypes.string,
    title: PropTypes.string,
    user_id: PropTypes.string,
  }),
  onDelete: PropTypes.func,
  slideLength: PropTypes.number,
};
