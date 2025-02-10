import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchChannels } from '@/apis/channelApi';
import { deleteUserLikedArticleApi, postUserLikedArticleApi } from '@/apis/supabaseApi.js';

import leftArray from '/icons/left-array.svg';
import commentIcon from '/icons/comment.svg';
import ProfileImage from './components/icon/ProfileImage';

import ChannelTabs from '../CommunityPage/components/ChannelList';
import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';
import PostDelete from './components/PostDelete';
import LikeButton from './components/LikeButton'; 

const CommunityDetailPage = () => {
  const { postId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const userId = useSelector(state => state.user.userId);

  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(state?.post || null);
  const [channels, setChannels] = useState([]);
  const [channel, setChannel] = useState(null);
  const [activeTab, setActiveTab] = useState('베스트');
  const [comments, setComments] = useState([]);
  const [initialCommentsLoaded, setInitialCommentsLoaded] = useState(false);

  useEffect(() => {
    if (!post) {
      const foundPost = posts.find(p => p._id === postId);
      if (foundPost) {
        setPost(foundPost);
        setComments(foundPost.comments || []);
        setInitialCommentsLoaded(true);
      } else {
        console.error('게시물 데이터를 찾을 수 없습니다.');
      }
    } else if (!initialCommentsLoaded) {
      setComments(post.comments || []);
      setInitialCommentsLoaded(true);
    }
  }, [post, postId, posts, initialCommentsLoaded]);

  useEffect(() => {
    const loadChannels = async () => {
      try {
        const channelData = await fetchChannels();
        setChannels(channelData);

        if (post && post.channel?._id) {
          const foundChannel = channelData.find(c => c._id === post.channel._id);
          setChannel(foundChannel);
          setActiveTab(foundChannel?.name || '베스트');
        }
      } catch (error) {
        console.error('채널 정보를 불러오는 데 실패했습니다:', error);
      }
    };

    loadChannels();
  }, [post]);

  const calculateTimeAgo = date => {
    const now = new Date();
    const postTime = new Date(date);
    const diff = Math.floor((now - postTime) / (1000 * 60));
    if (diff < 60) return `${diff}분 전`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours}시간 전`;
    const days = Math.floor(hours / 24);
    return `${days}일 전`;
  };

  const handleCommentCreated = newComment => {
    setComments(prevComments => [...prevComments, newComment]);
    setPost(prevPost => ({
      ...prevPost,
      comments: [...(prevPost.comments || []), newComment],
    }));
  };

  // 수파베이스 좋아요 기능
  const handlePostLike = async () => {
    if (post === null) {
      alert('에러')
      return;
    }
    const articleInfo = {
      articleId : post._id,
      title : post.title,
      profileUrl : post.author.image,
      likes : post.likes.length + 1,
      comments : post.comments.length,
      time : post.createdAt,
      channel : post.channel.name,
    }
    try {
      const response = await postUserLikedArticleApi(userId, articleInfo);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  // 수파베이스 좋아요 취소 기능
  const handleDeleteLike = async () => {
    const articleId = post._id;
    try {
      const response = await deleteUserLikedArticleApi(userId, articleId);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  if (!post) {
    return (
      <div className="container mx-auto px-10 py-10 ">
        <p className="text-red-500">게시물 데이터를 찾을 수 없습니다.</p>
        <button
          onClick={() => navigate('/community')}
          className="text-gray-500 hover:text-orange-500"
        >
          ← 목록으로 돌아가기
        </button>
      </div>
    );
  }

  const currentUserId = user?.userId;

  const initialLikeCount = post.likes?.length || 0;
  const currentUserLike = post.likes?.find(like => like.user === currentUserId);
  const initialLiked = !!currentUserLike;
  const initialLikeId = currentUserLike ? currentUserLike._id : null;

  return (
    <div className="container mx-auto px-10 py-10 mt-100">
      <div className="flex items-center pb-10 mb-10">
        <button
          className="text-gray-500 hover:text-orange-500 text-lg mr-10"
          onClick={() => navigate('/community')}
        >
          <img src={leftArray} alt="뒤로 가기" style={{ width: '15px', height: '15px' }}/>
        </button>
        <h2 className="text-2xl font-bold text-gray-800">커뮤니티</h2>
      </div>

      <ChannelTabs
        channels={channels}
        activeTab={activeTab}
        setActiveTab={tab => {
          setActiveTab(tab);
          navigate(`/community?tab=${tab}`);
        }}
      />

      <div className="bg-white p-1">
        <div className="flex items-center justify-between mb-30 mt-35">
          <div className="text-lg font-bold text-gray-800 bg-gray-200 rounded-7 px-45 py-5">
            <h3 className="text-lg font-bold text-gray-800">
              {channel?.name || '알 수 없는 채널'}
            </h3>
          </div>

          <PostDelete
            postId={post._id}
            userId={user.userId}
            authorId={post?.author?._id || post?.author}
            isLoggedIn={user?.isLoggedIn}
            setPosts={setPosts}
            post={post}
            onUpdate={updatedPost => {
              setPosts(prevPosts =>
                prevPosts.map(p => (p._id === updatedPost._id ? updatedPost : p))
              );
              setPost(updatedPost);
              setComments(updatedPost.comments || []);
            }}
          />
        </div>

        <div className="flex items-center mb-30 ml-">
          <div className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0">
            <ProfileImage
              src={post.author?.image}
              alt="작성자 프로필"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-10">
            <h3 className="text-lg font-bold">
              {post.author?.fullName || '익명 사용자'}
            </h3>
            <p className="text-sm text-gray-500">
              {post.author?.email || '이메일 없음'}
            </p>
            <p className="text-sm text-gray-400">
              {calculateTimeAgo(post.createdAt)} 작성
            </p>
          </div>
        </div>

        <p className="text-md mb-13">{post.title}</p>

        {post.image && (
          <div className="mb-20 mt-30">
            <img src={post.image} alt={post.title} className="w-801 h-475" />
          </div>
        )}

        <div className="flex items-center space-x-30 text-sm text-gray-500 mt-60">
          <LikeButton
            postId={post._id}
            initialLikeCount={initialLikeCount}
            initialLiked={initialLiked}
            initialLikeId={initialLikeId}
            handlePostLike={handlePostLike}
            handleDeleteLike={handleDeleteLike}
          />
          <div className="flex items-center space-x-2">
            <img src={commentIcon} alt="댓글" className="w-25 h-23" />
            <span style={{ marginLeft: '15px' }}>{comments.length}</span>
          </div>
        </div>

        <CommentList comments={comments} onCommentsUpdate={setComments} />
      </div>

      <div className="mt-8">
        <CommentForm postId={post._id} onCommentCreated={handleCommentCreated} />
      </div>
    </div>
  );
};

export default CommunityDetailPage;
