import PropTypes from 'prop-types';
import FollowingItem from './FollowingItem';

const FollowingTap = ({ followingData, unfollowUserHandler }) => {
  return (
    <>
      {followingData?.length > 0 ? (
        followingData.map(followingData => (
          <FollowingItem
            key={followingData.following_ID}
            followingData={followingData}
            unfollowUserHandler={unfollowUserHandler}
          ></FollowingItem>
        ))
      ) : (
        <div>
          <img src="/images/harbang.png" alt="한라봉 이미지" className="my-20" />
          <p className="text-center text-gray-6">아직 팔로잉이 없습니다!</p>
        </div>
      )}
    </>
  );
};

export default FollowingTap;

FollowingTap.propTypes = {
  followingData: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      fullName: PropTypes.string.isRequired,
      following_ID: PropTypes.string.isRequired,
    }),
  ),
  unfollowUserHandler: PropTypes.func.isRequired,
};
