const USER = {
  detail: id => ['user', 'detail', { userId: id }],
};

const TRIP = {
  list: userId => ['trip', 'list', { userId: userId }],
  detail: tripId => ['trip', 'detail', { tripId: tripId }],
};

const PLAN = {
  all: userId => ['plan', 'list', { userId: userId }],
  list: (userId, tripId) => ['plan', 'list', { userId: userId, tripId: tripId }],
  detail: tripId => ['plan', 'detail', { tripId: tripId }],
};

const CHANNEL = {
  list: ['channel', 'list'],
};

const POST = {
  attractionList: ['post', 'list', { category: 'attractions' }],
};

const PLACE = {
  detail: contentId => ['jeju_place', 'detail', contentId],
  list: (category, keyword) => ['jeju_place', 'list', { category: category, keyword: keyword }],
};

const QUERY_KEY = Object.freeze({
  user: { ...USER },
  trip: { ...TRIP },
  plan: { ...PLAN },
  channel: { ...CHANNEL },
  post: { ...POST },
  place: { ...PLACE },
});

export default QUERY_KEY;
