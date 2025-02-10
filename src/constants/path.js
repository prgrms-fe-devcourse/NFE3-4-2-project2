const PATH = {
  root: '/',

  // general
  search: '/search',
  community: '/community',
  communityPost: '/community/post/:postId',
  detail: '/detail/:contentsid',

  // auth
  auth: '/auth',
  signup: '/auth/signup',
  authWildcard: '/auth/*',

  // trip
  addTrip: '/trip/add-trip',
  myTrip: '/trip/my',

  // plan
  plan: '/plan',

  // mypage
  myScrap: '/mypage/scrapsection',
  myPost: '/mypage/postssection',
  myComment: '/mypage/commentsection',
  myLiked: '/mypage/likedSection',
  mySchedule: '/mypage/scheduleSection',
  myUpdate: '/mypage/update',
  myWildcard: '/mypage/*',
};

export default PATH;
