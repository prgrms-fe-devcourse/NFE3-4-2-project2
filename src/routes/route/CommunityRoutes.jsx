import PATH from '@/constants/path';
import { CommunityPage, CommunityDetailPage } from '@pages/';

const COMMUNITY_ROUTES = [
  {
    path: PATH.community,
    element: <CommunityPage />,
  },
  {
    path: PATH.communityPost,
    element: <CommunityDetailPage />,
  },
];
export default COMMUNITY_ROUTES;
