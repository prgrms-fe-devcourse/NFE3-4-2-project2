import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostFormModal from './PostFormModal';
import pencil from '/icons/pencil.svg';
import { useSelector } from 'react-redux';
import ProfileImage from '@/pages/CommunityDetailPage/components/icon/ProfileImage';

const PostForm = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const navigate = useNavigate();

  const { isLoggedIn, userFullName, profileImage } = useSelector((state) => state.user);
  const userProfileImage = profileImage || '';

  const handleOpenModal = () => {
    if (!isLoggedIn) {
      setAlertOpen(true);
      return;
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);
  const handleCloseAlert = () => setAlertOpen(false);
  const handleConfirmLogin = () => {
    navigate('/auth');
  };

  return (
    <>
      <div className="flex items-right gap-4 ml-[0px]">
        <div className="w-[40px] h-[40px] rounded-full flex-shrink-0 overflow-hidden mt-[10px] ">
          <ProfileImage
            src={userProfileImage}
            alt="프로필"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
  
        <button
          className="flex items-start ml-[25px] gap-4 p-6 w-[882px] h-[133px] rounded-[15px] bg-gray-100 border border-gray-300 text-gray-700 text-xl font-medium hover:bg-gray-200 active:bg-gray-300 focus:ring-2 focus:ring-gray-400 shadow-sm transition"
          onClick={handleOpenModal}
        >
          <img
            src={pencil}
            alt="pencil"
            className="w-[20px] h-[20px] text-gray-400 mt-3 ml-3"
          />
          <span className="mt-3 text-gray-400">
            {userFullName ? userFullName + '님' : '회원님'}, 글을 작성해 보세요!
          </span>
        </button>
      </div>
  
      {isModalOpen && (
        <PostFormModal isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
  
      {isAlertOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-lg shadow-xl w-[460px] h-[280px] relative flex flex-col items-center">
            <button 
              onClick={handleCloseAlert}
              className="absolute top-5 right-7 text-gray-400 hover:text-gray-600 text-xl"
            >
              ✖
            </button>
            
            <div className="text-center mt-70">
              <p className="text-xl font-medium text-gray-800 mb-3">
                로그인이 필요한 서비스입니다.
              </p>
              <p className="text-lg text-gray-600">
                로그인 하시겠습니까?
              </p>
            </div>
            
            <div className="flex justify-center gap-4 mt-40">
              <button
                onClick={handleCloseAlert}
                className="px-10 py-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all duration-200 font-medium w-[140px] text-lg"
              >
                아니오
              </button>
              <button
                onClick={handleConfirmLogin}
                className="px-10 py-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-all duration-200 font-medium w-[140px] text-lg"
              >
                예
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostForm;
