import PropTypes from 'prop-types';
import CommentIcon from '../../icon/CommentIcon';
import LikesIcon from '../../icon/LikesIcon';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import timeFormatter from '@/utils/timeDifferenceFormat';

const Post = ({ postData, postDeleteEvent }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const goToPostDetail = () => {
    navigate(`/community/post/${postData._id}`, { state: { post: postData } });
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <>
      {!postData && <p>데이터가없습니다</p>}
      {postData && (
        <div className="w-full pt-40 px-20 pb-50 relative">
          <div onClick={goToPostDetail} className="cursor-pointer">
            <div className="flex justify-between">
              <div
                className="w-50 h-50 bg-cover bg-center rounded-[50%]"
                style={{ backgroundImage: `url('/images/dummy-user-img.png')` }}
              ></div>

              <div className="flex flex-col w-[90%] justify-between">
                <p className="text-16 text-gray-7 mb-16">
                  {postData.channel.name} · {timeFormatter(postData.createdAt)}
                </p>
                <p className="line-clamp-2 text-14 text-gray-8 leading-5">{postData.title}</p>
              </div>
            </div>
          </div>

          {/* right conetnt */}
          <div className="icon-box absolute right-[3%] flex gap-20 mt-15">
            <div className="flex items-center gap-10">
              <LikesIcon size={14} baseColor="#BFBFBF"></LikesIcon>
              <span className="text-gray-6 text-14">{postData.likes.length}</span>
            </div>
            <div className="flex items-center gap-10">
              <CommentIcon size={14} baseColor="#BFBFBF"></CommentIcon>
              <span className="text-gray-6 text-14">{postData.comments.length}</span>
            </div>
            <div onClick={toggleMenu} className="cursor-pointer relative">
              <img className="w-16 h-16" src="/icons/more.svg" alt="더보기 아이콘" />

              {menuOpen && (
                <div className="absolute left-0 top-full mt-2 w-120 bg-white rounded-lg text-gray-11 flex flex-col py-2 z-[10000] shadow-md">
                  <button
                    className="text-center hover:bg-gray-100 py-8"
                    onClick={() => postDeleteEvent(postData._id)}
                  >
                    삭제하기
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* right conetnt */}
        </div>
      )}
    </>
  );
};

export default Post;

Post.propTypes = {
  postData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    channel: PropTypes.object.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    createdAt: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }),
  postDeleteEvent: PropTypes.func.isRequired,
};
