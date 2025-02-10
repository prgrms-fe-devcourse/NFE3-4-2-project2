import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CommentDelete from './CommentDelete';
import ProfileImage from './icon/ProfileImage';
import ProfileCard from './ProfileCard';
import FollowButton from './FollowButton';

const CommentList = ({ comments, onCommentsUpdate }) => {
  const currentUser = useSelector(state => state.user) || { userId: null, isLoggedIn: false };
  const [showProfile, setShowProfile] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  if (!comments || !Array.isArray(comments) || comments.length === 0) {
    return <p className="text-gray-500 mt-30">댓글이 없습니다.</p>;
  }

  const alreadyRenderedAuthors = new Set();

  const handleDelete = deletedCommentId => {
    onCommentsUpdate(prevComments =>
      prevComments.filter(comment => comment._id !== deletedCommentId),
    );
  };

  const handleProfileClick = author => {
    setSelectedAuthor(author);
    setShowProfile(true);
  };

  const handleFollowUpdate = (targetUserId, isFollowing, followId) => {
    onCommentsUpdate(prevComments =>
      prevComments.map(comment =>
        comment.author?._id === targetUserId
          ? { ...comment, author: { ...comment.author, isFollowing, followId } }
          : comment,
      ),
    );
  };

  return (
    <div className="mt-55">
      {comments.map(comment => {
        const shouldRenderFollowButton =
          comment.author?._id &&
          currentUser.userId !== comment.author._id &&
          !alreadyRenderedAuthors.has(comment.author._id);

        if (comment.author?._id) {
          alreadyRenderedAuthors.add(comment.author._id);
        }

        return (
          <div key={comment._id} className="p-4 mb-4 border-b border-gray-200">
            <div className="flex items-center mb-2">
              <div
                className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0 cursor-pointer"
                onClick={() => handleProfileClick(comment.author)}
              >
                <ProfileImage
                  src={comment.author?.image}
                  alt="작성자 프로필"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="ml-15 flex-1">
                <div className="flex items-center">
                  <h4
                    className="title-md font-bold mb-1 cursor-pointer"
                    onClick={() => handleProfileClick(comment.author)}
                  >
                    {comment.author?.fullName || '익명 사용자'}
                  </h4>

                  {shouldRenderFollowButton && (
                    <div className="ml-10 mb-3">
                      <FollowButton
                        targetUserId={comment.author?._id}
                        isFollowingInitial={comment.author?.isFollowing || false}
                        followIdInitial={comment.author?.followId || null}
                        onFollowUpdate={handleFollowUpdate}
                      />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500">{comment.author?.email || '이메일 없음'}</p>
              </div>

              {currentUser.userId &&
                comment.author &&
                String(currentUser.userId) === String(comment.author._id) && (
                  <CommentDelete
                    commentId={comment._id}
                    userId={currentUser.userId}
                    authorId={comment.author._id}
                    isLoggedIn={currentUser.isLoggedIn}
                    onDelete={handleDelete}
                  />
                )}
            </div>

            <p className="text-gray-800 ml-55 mb-45 text-sm">{comment.comment || '내용 없음'}</p>
          </div>
        );
      })}

      {showProfile && selectedAuthor && (
        <ProfileCard user={selectedAuthor} onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
};

export default CommentList;
