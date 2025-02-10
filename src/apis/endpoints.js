export const serverURL = import.meta.env.VITE_API_BASE_URL;

/**
# ======================#
|         AUTH          |
# ======================#
*/

export const AUTH = Object.freeze({
  signup: '/signup',
  login: '/login',
  logout: '/logout',
});

/**
# ======================#
|         USER         |
# ======================#
*/

export const USER = Object.freeze({
  updateUser: '/settings/update-user',
  updatePassword: '/settings/update-password',
  updatePhoto: `${serverURL}/users/upload-photo`,
  deleteUser: '/users/delete-user',
  getUser: userId => `/users/${userId}`,
});

/**
# ======================#
|        CHANNEL        |
# ======================#
*/

export const CHANNEL = '/channels';

/**
# ======================#
|        FOLLOW         |
# ======================#
*/

export const FOLLOW = Object.freeze({
  create: `/follow/create`,
  delete: `/follow/delete`,
});

/**
# ======================#
|          LIKE         |
# ======================#
*/

export const LIKE = Object.freeze({
  create: '/likes/create',
  delete: `/likes/delete`,
});

/**
# ======================#
|          POST         |
# ======================#
*/

export const POST = Object.freeze({
  getChannelPost: channelId => `/posts/channel/${channelId}`,
  getAuthorPost: userId => `/posts/author/${userId}`,
  delete: `/posts/delete`,
  update: `${serverURL}/posts/update`,
  create: `${serverURL}/posts/create`,
});

/**
# ======================#
|         COMMENT       |
# ======================#
*/

export const COMMENT = Object.freeze({
  create: `/comments/create`,
  delete: `/comments/delete`,
});
