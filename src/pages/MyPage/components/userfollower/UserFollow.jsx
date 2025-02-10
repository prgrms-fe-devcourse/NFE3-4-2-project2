import PropTypes from 'prop-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { followUser, unfollowUser } from '@/apis/followApi';
import FollowingTab from './followingTab/FollowingTab';
import FollowerTab from './followerTab/FollowerTab';
import { getUserApi } from '@/apis/userApi';

const UserFollow = ({ isOpen, closeModal, userData, userName }) => {
  const [tapMenu, setTapMenu] = useState('follower');
  const queryClient = useQueryClient();

  const { data: followerData } = useQuery({
    queryKey: ['followers', userData?.followers],
    queryFn: async () => {
      if (!userData?.followers) return [];
      return Promise.all(
        userData.followers.map(async element => {
          const followerUser = await getUserApi(element.follower);

          return {
            _id: followerUser._id,
            fullName: followerUser.fullName,
            image: followerUser.image,
            followerForFollower: false,
          };
        }),
      );
    },
  });

  const { data: followingData } = useQuery({
    queryKey: ['followings', userData?.following],
    queryFn: async () => {
      if (!userData?.following) return [];
      return Promise.all(
        userData.following.map(async element => {
          const followingUser = await getUserApi(element.user);
          return {
            id: followingUser._id,
            image: followingUser.image,
            fullName: followingUser.fullName,
            following_ID: element._id,
            user_ID: followingUser._id,
          };
        }),
      );
    },
  });

  const { mutate: unfollowHandler } = useMutation({
    mutationFn: async userId => {
      await unfollowUser(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['followings', userData?.following]);
    },
    onError: error => {
      console.error('언팔로우 실패:', error);
      alert('언팔로우 요청이 실패했습니다. 다시 시도해주세요.');
    },
  });

  const unfollowUserHandler = userId => {
    const isChecked = window.confirm('정말로 언팔하시겠습니까?');

    if (isChecked) {
      unfollowHandler(userId);
    }
  };

  const { mutate: followHandler } = useMutation({
    mutationFn: async userId => {
      await followUser(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['followers', userData?.followers]);
    },
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[9999999999999]"
      onClick={closeModal}
    >
      <div
        className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-20 right-20 cursor-pointer" onClick={closeModal}>
          <img src="/icons/close-icon.svg" alt="닫기 아이콘" />
        </div>
        <div className="w-315 h-480 bg-white py-48 px-40 rounded-10">
          <h3 className="text-20 pb-8 text-gray-12 text-center">{userName}</h3>
          <div className="flex justify-center mt-30">
            <div
              className={`w-75 text-center text-12 text-gray-12 cursor-pointer pb-5 ${tapMenu === 'follower' && 'border-gray-8 border-b border-solid'}`}
              onClick={() => setTapMenu('follower')}
            >
              팔로워 {userData?.followers.length}
            </div>
            <div
              className={`w-75 text-center text-12 text-gray-12 cursor-pointer pb-5 ${tapMenu === 'following' && 'border-gray-8 border-b border-solid'}`}
              onClick={() => setTapMenu('following')}
            >
              팔로잉 {userData?.following.length}
            </div>
          </div>

          <div
            className="h-[85%] overflow-y-auto"
            style={{
              scrollbarWidth: 'none',
            }}
          >
            {tapMenu === 'follower' ? (
              <FollowerTab
                followerDatas={followerData}
                followingDatas={followingData}
                followHandler={followHandler}
              ></FollowerTab>
            ) : (
              <FollowingTab
                followingData={followingData}
                unfollowUserHandler={unfollowUserHandler}
              ></FollowingTab>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

UserFollow.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    followers: PropTypes.array,
    following: PropTypes.array,
  }),
  userName: PropTypes.string,
};

export default UserFollow;
