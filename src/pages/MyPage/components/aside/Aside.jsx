import ScrapIcon from '../icon/ScrapIcon';
import PostsIcon from '../icon/PostsIcon ';
import MessageIcon from '../icon/MessageIcon';
import LikesIcon from '../icon/LikesIcon';
import ScheduleIcon from '../icon/ScheduleIcon';
import { NavLink } from 'react-router';
import ButtonWrapper from './ButtonWrapper';
import Profile from './Profile';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';
import UserFollow from '../userfollower/UserFollow.jsx';
import { getUserApi } from '@/apis/userApi';

const Aside = () => {
  const { userId, userFullName } = useSelector(state => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navData = [
    { icon: ScrapIcon, title: '내 스크랩', link: '/mypage/scrapsection' },
    { icon: ScheduleIcon, title: '내 여행 일정', link: '/mypage/scheduleSection' },
    { icon: LikesIcon, title: '좋아요 누른 게시판', link: '/mypage/likedSection' },
    { icon: PostsIcon, title: '작성한 게시글', link: '/mypage/postssection' },
    { icon: MessageIcon, title: '작성한 댓글', link: '/mypage/commentsection' },
  ];

  const { data } = useQuery({
    queryKey: ['userData', userId],
    queryFn: async () => await getUserApi(userId),
  });

  const showFollow = () => {
    setTimeout(() => {
      setIsModalOpen(true);
    }, 0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <UserFollow
        isOpen={isModalOpen}
        closeModal={closeModal}
        userData={data}
        userName={userFullName}
      ></UserFollow>

      <aside className="w-234 h-auto">
        <Profile showFollowrModalEvent={() => showFollow()} />
        <nav className="w-full pt-20">
          <ul className="w-full flex flex-col items-center gap-14">
            {navData.map((item, index) => (
              <li
                key={item.title}
                className={`${index === 1 ? 'border-b border-solid border-b-gray-5' : ''}  w-full py-10`}
              >
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `ml-46 gap-20 m-auto text-center flex items-center py-8 ${isActive ? 'font-bold text-sub-accent-1' : ''}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon active={isActive} />

                      <p className={`text-14 ${isActive ? 'text-sub-accent-1' : 'text-gray-10'}`}>
                        {item.title}
                      </p>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          <ButtonWrapper />
        </nav>
      </aside>
    </>
  );
};

export default Aside;
