import { createClient } from '@supabase/supabase-js';
import { formatDate } from '../utils/dateFormat';

const supabaseUrl = import.meta.env.VITE_SUPABASE_BASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function postTripApi(userId, dateInfo) {
  const startDate = formatDate(dateInfo[0].startDate);
  const endDate = formatDate(dateInfo[0].endDate);

  const { data, error } = await supabase
    .from('Trips')
    .insert({
      user_id: userId,
      start_date: startDate,
      end_date: endDate,
    })
    .select();
  return data ? data : error;
}

export async function getTripApi(userId, tripId) {
  const { data, error } = await supabase
    .from('Trips')
    .select()
    .eq('trip_id', tripId)
    .eq('user_id', userId);
  return data ? data : error;
}

export async function getAllTripsApi(userId) {
  const { data, error } = await supabase.from('Trips').select().eq('user_id', userId);
  return data ? data : error;
}

export async function postPlanApi(planData) {
  const { data, error } = await supabase
    .from('Plans')
    .insert({
      ...planData,
    })
    .select();
  return data ? data : error;
}

export async function getPlanApi(userId, tripId) {
  const { data, error } = await supabase.from('Plans').select().eq('trip_id', tripId);
  return data ? data : error;
}

export async function deletePlanApi(planId) {
  const { data, error } = await supabase.from('Plans').delete().eq('id', planId).select();
  return data ? data : error;
}

export async function deleteTripApi(userId, tripId) {
  const { data, error } = await supabase
    .from('Trips')
    .delete()
    .eq('trip_id', tripId)
    .eq('user_id', userId)
    .select();
  return data ? data : error;
}

export async function updatePlanApi(planId, time) {
  const { data, error } = await supabase
    .from('Plans')
    .update({
      time: time,
    })
    .eq('id', planId)
    .select();
  return data ? data : error;
}

// 찜하기한 장소 저장용 API 4개
export async function getAllUserLikedPlacesApi(userId) {
  const { data, error } = await supabase.from('UserLikedPlaces').select().eq('user_id', userId);
  return data ? data : error;
}

export async function getUserLikedPlaceApi(userId, contentId) {
  const { data, error } = await supabase
    .from('UserLikedPlaces')
    .select()
    .eq('user_id', userId)
    .eq('content_id', contentId);
  return data ? data : error;
}

export async function postUserLikedPlaceApi(userId, placeInfo) {
  const { data, error } = await supabase
    .from('UserLikedPlaces')
    .insert({
      user_id: userId,
      content_id: placeInfo.contentsid,
      title: placeInfo.title,
      category: placeInfo.contentscd.label,
      address: placeInfo.roadaddress,
      img_full_url: placeInfo.repPhoto.photoid.imgpath,
      img_thumbnail_url: placeInfo.repPhoto.photoid.thumbnailpath,
    })
    .select();
  if (error) {
    console.error('Error adding liked place:', error); // 에러 출력
  }
  return data ? data : error;
}

export async function deleteUserLikedPlaceApi(userId, contentId) {
  const { error } = await supabase
    .from('UserLikedPlaces')
    .delete()
    .eq('user_id', userId)
    .eq('content_id', contentId);

  if (error) {
    console.error('Supabase 삭제 오류:', error);
    return null;
  }
  return contentId;
}

// 아래 부터 커뮤니티 관련 API
export async function getAllUserCommentsApi(userId) {
  const { data, error } = await supabase.from('UserComments').select().eq('user_id', userId);
  return data ? data : error;
}

export async function postUserCommentApi(userId, commentId, articleId) {
  const { data, error } = await supabase
    .from('UserComments')
    .insert({
      user_id: userId,
      comment_id: commentId,
      article_id: articleId,
    })
    .select();
  return data ? data : error;
}

export async function deleteUserCommentApi(userId, commentId) {
  const { data, error } = await supabase
    .from('UserComments')
    .delete()
    .eq('user_id', userId)
    .eq('comment_id', commentId)
    .select();
  return data ? data : error;
}

export async function getAllUserLikedArticlesApi(userId) {
  const { data, error } = await supabase.from('UserLikedArticles').select().eq('user_id', userId);
  return data ? data : error;
}

// articleInfo 는 객체 형식으로 와야합니다
export async function postUserLikedArticleApi(userId, articleInfo) {
  const { data, error } = await supabase
    .from('UserLikedArticles')
    .insert({
      user_id: userId,
      article_id: articleInfo.articleId,
      title: articleInfo.title,
      author_profile_url: articleInfo.profileUrl,
      count_likes: articleInfo.likes,
      count_comments: articleInfo.comments,
      created_at: articleInfo.time,
      channel: articleInfo.channel,
    })
    .select();
  return data ? data : error;
}

export async function deleteUserLikedArticleApi(userId, articleId) {
  const { data, error } = await supabase
    .from('UserLikedArticles')
    .delete()
    .eq('user_id', userId)
    .eq('article_id', articleId)
    .select();
  return data ? data : error;
}

export async function getAllUserArticlesApi(userId) {
  const { data, error } = await supabase.from('UserArticles').select().eq('user_id', userId);
  return data ? data : error;
}

export async function postUserArticleApi(userId, articleId) {
  const { data, error } = await supabase
    .from('UserArticles')
    .insert({
      user_id: userId,
      article_id: articleId,
    })
    .select();
  return data ? data : error;
}

export async function deleteUserArticleApi(userId, articleId) {
  const { data, error } = await supabase
    .from('UserArticles')
    .delete()
    .eq('user_id', userId)
    .eq('article_id', articleId)
    .select();
  return data ? data : error;
}
