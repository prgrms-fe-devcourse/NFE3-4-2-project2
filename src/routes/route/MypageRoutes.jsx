import ScrapSection from '@pages/MyPage/components/main/scrap/ScrapSection.jsx';
import PostsSection from '@pages/MyPage/components/main/post/PostsSection.jsx';
import CommentSection from '@pages/MyPage/components/main/comment/CommentSection.jsx';
import LikedSection from '@pages/MyPage/components/main/liked/LikedSection.jsx';
import UpdateUserSection from '@pages/MyPage/components/main/updateUserProfile/UpdateUserSection.jsx';
import ScheduleSection from '../../pages/MyPage/components/main/schedule/ScheduleSection';
import { Navigate } from 'react-router-dom';
import PATH from '@/constants/path';

const MYPAGE_ROUTES = [
  {
    path: PATH.myScrap,
    element: <ScrapSection />,
  },
  {
    path: PATH.myPost,
    element: <PostsSection />,
  },
  {
    path: PATH.myComment,
    element: <CommentSection />,
  },
  {
    path: PATH.myLiked,
    element: <LikedSection />,
  },
  {
    path: PATH.mySchedule,
    element: <ScheduleSection />,
  },
  {
    path: PATH.myUpdate,
    element: <UpdateUserSection />,
  },
  {
    path: PATH.myWildcard,
    element: <Navigate to={PATH.myScrap} replace />,
  },
];
export default MYPAGE_ROUTES;
