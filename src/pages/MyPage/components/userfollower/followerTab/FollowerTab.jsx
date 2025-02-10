import PropTypes from 'prop-types';
import FollowerItem from './FollowerItem';

const FollowerTap = ({ followerDatas, followingDatas, followHandler }) => {
  const updatedFollowerData = followerDatas?.map(follower => {
    const isFollowingBack = followingDatas?.some(following => following.id === follower._id);
    return {
      ...follower,
      followerForFollower: isFollowingBack,
    };
  });

  return (
    <>
      {updatedFollowerData?.length > 0 ? (
        updatedFollowerData.map(followerData => (
          <FollowerItem
            key={followerData._id}
            followHandler={followHandler}
            followerData={followerData}
          ></FollowerItem>
        ))
      ) : (
        <div>
          <img src="/images/harbang.png" alt="한라봉 이미지" className="my-20" />
          <p className="text-center text-gray-6">아직 팔로워가 없습니다!</p>
        </div>
      )}
    </>
  );
};

export default FollowerTap;

FollowerTap.propTypes = {
  followerDatas: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      fullName: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }).isRequired,
  ),
  followingDatas: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
    }).isRequired,
  ),
  followHandler: PropTypes.func.isRequired,
};
