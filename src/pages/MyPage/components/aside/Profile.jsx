import useMySelector from '@/hooks/useMySelector';
import useFetchUser from '@/hooks/react-query/useFetchUser';
import PNG_IMAGES from '@public/images/image';
import { NavLink } from 'react-router';
import PropTypes from 'prop-types';

const Profile = ({ showFollowrModalEvent }) => {
  const [userFullName, userId] = useMySelector(state => [
    state.user.userFullName,
    state.user.userId,
  ]);
  const { data: userData, isLoading } = useFetchUser(userId);

  if (isLoading) {
    return <>유저 데이터 가져오는 중</>;
  }

  return (
    <div className="w-234 border border-[#F0F0F0] rounded-21 shadow-[0px_0px_9px_0px_#dbdbdb] h-240">
      <div className="pt-20 w-full h-full rounded-96 flex flex-col items-center gap-3">
        <img
          className="w-96 h-96 bg-cover bg-center rounded-[50%]"
          src={userData.image || PNG_IMAGES.defaultProfile}
          alt="사용자 프로필 사진"
        />
        <p className="text-16 mt-8 font-semibold text-center">{userFullName}</p>
        <div
          className="flex justify-around w-[55%] mt-8 cursor-pointer"
          onClick={showFollowrModalEvent}
        >
          <div>
            <p className="text-gray-7 text-10">
              팔로워 <span className="text-sub-accent-1 text-10">{userData.followers.length}</span>
            </p>
          </div>
          <div>
            <p className="text-gray-7 text-10">
              팔로잉 <span className="text-sub-accent-1 text-10">{userData.following.length}</span>
            </p>
          </div>
        </div>
        <NavLink
          to="/mypage/update"
          className="block mt-10 p-[14px_40px] border border-solid border-gray-5 rounded-15 text-12 hover:bg-gray-3"
        >
          프로필 수정
        </NavLink>
      </div>
    </div>
  );
};

export default Profile;

Profile.propTypes = {
  showFollowrModalEvent: PropTypes.func.isRequired,
};
