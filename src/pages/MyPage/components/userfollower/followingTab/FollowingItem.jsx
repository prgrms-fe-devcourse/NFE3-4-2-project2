import PropTypes from 'prop-types';

const FollowingItem = ({ followingData, unfollowUserHandler }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mt-28">
        <img
          src={(followingData.image && followingData.image) || `/images/dummy-user-img.png`}
          alt="더미이미지입니다."
          className="rounded-[50%] w-36 h-36"
        />

        <div className="grow-[2] pl-16">
          <p className="text-12">{followingData.fullName}</p>
        </div>

        <div
          className="bg-white border-sub-accent-2 border border-solid px-10 py-6 rounded-12 text-12 cursor-pointer text-sub-accent-2"
          onClick={() => unfollowUserHandler(followingData.following_ID)}
        >
          팔로우 취소
        </div>
      </div>
    </div>
  );
};

export default FollowingItem;

FollowingItem.propTypes = {
  followingData: PropTypes.shape({
    image: PropTypes.string,
    fullName: PropTypes.string.isRequired,
    following_ID: PropTypes.string.isRequired,
  }),

  unfollowUserHandler: PropTypes.func.isRequired,
};
