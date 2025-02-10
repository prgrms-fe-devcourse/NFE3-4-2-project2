import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { followUser, unfollowUser } from '@/apis/followApi';
import { getUserFollowersApi } from '@/apis/userApi';

const FollowButton = ({ targetUserId, onFollowUpdate }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followId, setFollowId] = useState(null);
  const [loading, setLoading] = useState(false);
  const userId = useSelector(state => state.user.userId);
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  useEffect(() => {
    if (!userId) return;

    const checkFollowingStatus = async () => {
      try {
        const { following } = await getUserFollowersApi(userId);

        const foundFollow = following.find(f => f.user === targetUserId || f._id === targetUserId);

        if (foundFollow) {
          setIsFollowing(true);
          setFollowId(foundFollow._id);
        } else {
          setIsFollowing(false);
          setFollowId(null);
        }
      } catch (error) {
        console.error('⚠️ 팔로우 상태 확인 실패:', error);
      }
    };

    checkFollowingStatus();
  }, [userId, targetUserId]);

  const handleFollow = async () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }

    setLoading(true);

    try {
      if (isFollowing) {
        if (!followId) {
          console.error('⚠️ 언팔로우 요청 실패: followId가 없습니다.');
          alert('언팔로우할 팔로우 정보가 없습니다.');
          setLoading(false);
          return;
        }

        await unfollowUser(followId);

        setIsFollowing(false);
        setFollowId(null);
        onFollowUpdate(targetUserId, false, null);
      } else {
        const response = await followUser(targetUserId);

        if (response._id) {
          setFollowId(response._id);
          onFollowUpdate(targetUserId, true, response._id);
        } else {
          console.error('⚠️ 팔로우 요청 후 followId 없음:', response);
        }

        setIsFollowing(true);
      }
    } catch (error) {
      console.error('⚠️ 팔로우/언팔로우 요청 실패:', error);
      alert('요청 처리 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      className={`text-sm font-semibold px-10 py-3 rounded-full ${
        isFollowing ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-500'
      } hover:${isFollowing ? 'bg-red-200' : 'bg-blue-200'}`}
      disabled={loading || !isLoggedIn}
    >
      {loading ? '처리 중...' : isFollowing ? '언팔로우' : '팔로우'}
    </button>
  );
};

export default FollowButton;
