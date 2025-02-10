import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addUserLikedPlace,
  fetchUserLikedPlaces,
  removeUserLikedPlace,
} from '@/redux/slices/wishlist.slice';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

// TODO 종희님 코드와 합치기
const WishListButtonMain = ({ placeInfo }) => {
  const dispatch = useDispatch();
  const { likedPlaces } = useSelector(state => state.wishlist);
  const { isLoggedIn, userId } = useSelector(state => state.user);
  const navigate = useNavigate();

  const isLiked =
    Array.isArray(likedPlaces) &&
    likedPlaces.some(place => {
      return place.content_id === placeInfo.contentsid;
    });

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUserLikedPlaces({ userId }));
    }
  }, [isLoggedIn, userId, dispatch]);

  const handleWishlistClick = event => {
    event.stopPropagation();

    if (!isLoggedIn) {
      Modal.warning({
        title: '로그인이 필요합니다.',
        content: '로그인하고 JejuMonth의 다양한 기능을 이용해 보세요.',
        onOk() {
          navigate('/auth');
        },
        okButtonProps: {
          style: {
            backgroundColor: '#FDBA74',
          },
        },
      });
      return;
    }

    if (isLiked) {
      dispatch(removeUserLikedPlace({ userId, contentId: placeInfo.contentsid })).then(() => {
        dispatch(fetchUserLikedPlaces({ userId }));
      });
    } else {
      // TODO 리팩토링 필요
      const convertedPlaceInfo = {
        contentsid: placeInfo.contentsid,
        title: placeInfo.title,
        contentscd : {
          label : placeInfo.category,
        },
        roadaddress : placeInfo.address,
        repPhoto : {
          photoid : {
            thumbnailpath : placeInfo.img,
          }
        }
      }

      dispatch(addUserLikedPlace({ userId, placeInfo : convertedPlaceInfo })).then(() => {
        dispatch(fetchUserLikedPlaces({ userId }));
      });
    }
  };

  return (
    <>
      <button onClick={handleWishlistClick}>
        <img
          src={isLiked ? '/icons/fullHeart.svg' : '/icons/emptyHeart.svg'}
          className="w-21 h-19"
          alt="스크랩 아이콘"
        />
      </button>
    </>
  );
};

export default WishListButtonMain;

WishListButtonMain.propTypes = {
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
};
