import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserLikedPlaces,
  addUserLikedPlace,
  removeUserLikedPlace,
} from '@/redux/slices/wishlist.slice';
import fullHeart from '/icons/fullHeart.svg';
import emptyHeart from '/icons/emptyHeart.svg';

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

  const handleWishlistClick = () => {
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
        <button
          onClick={handleWishlistClick}
          className="w-[110px] h-[45px] rounded-[25px] bg-gray-2 flex items-center justify-center gap-4 shadow-md mr-20 mt-30 transition-all duration-300 ease-in-out hover:bg-primary-2"
          style={{
            boxShadow:
              '0px 35px 10px 0 rgba(97,97,97,0), 0px 22px 9px 0 rgba(97,97,97,0.01), 0px 13px 8px 0 rgba(97,97,97,0.05), 0px 6px 6px 0 rgba(97,97,97,0.09), 0px 1px 3px 0 rgba(97,97,97,0.1)',
          }}
        >
          <img
            src={isLiked ? fullHeart : emptyHeart}
            alt={isLiked ? 'Full Heart' : 'Empty Heart'}
            className="w-16 h-16 mr-5"
          />
          <p className="text-sm text-[#595959]">{isLiked ? '찜해제' : '찜하기'}</p>
        </button>
      )}
    </>
  );
};

export default WishListButton;
