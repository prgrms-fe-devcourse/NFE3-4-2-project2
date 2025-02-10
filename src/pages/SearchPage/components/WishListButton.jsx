import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addUserLikedPlace,
  fetchUserLikedPlaces,
  removeUserLikedPlace,
} from '@/redux/slices/wishlist.slice';

const WishListButton = ({ placeInfo }) => {
  const dispatch = useDispatch();
  const { likedPlaces } = useSelector(state => state.wishlist);
  const { isLoggedIn, userId } = useSelector(state => state.user);

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

    if (isLiked) {
      dispatch(removeUserLikedPlace({ userId, contentId: placeInfo.contentsid })).then(() => {
        dispatch(fetchUserLikedPlaces({ userId }));
      });
    } else {
      dispatch(addUserLikedPlace({ userId, placeInfo })).then(() => {
        dispatch(fetchUserLikedPlaces({ userId }));
      });
    }
  };
  return (
    <>
      {isLoggedIn && (
        <button onClick={handleWishlistClick}>
          <img
            src={isLiked ? '/icons/fullHeart.svg' : '/icons/emptyHeart.svg'}
            className="w-21 h-19"
            alt="스크랩 아이콘"
          />
        </button>
      )}
    </>
  );
};

export default WishListButton;

WishListButton.prototype = {
  placeInfo: PropTypes.string.isRequired,
};
