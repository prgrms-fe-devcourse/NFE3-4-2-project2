import { getAllUserLikedArticlesApi } from '@/apis/supabaseApi';
import LikedPost from './LikedPost';
import { useSelector } from 'react-redux';
import MyPageHeader from '../common/MyPageHeader';
import NoContent from '../common/NoContent';
import { deleteUserLikedArticleApi } from '@/apis/supabaseApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const LikedSection = () => {
  const queryClient = useQueryClient();

  const userId = useSelector(state => state.user.userId);

  const { data } = useQuery({
    queryKey: ['liked', userId],
    queryFn: async () => {
      const response = await getAllUserLikedArticlesApi(userId);

      return response;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async articleId => await deleteUserLikedArticleApi(userId, articleId),
    onSuccess: () => {
      queryClient.invalidateQueries(['liked', userId]);
    },
  });

  const deleteLikedPostHandler = async articleId => {
    const isChecked = window.confirm('좋아요를 취소하시겠습니까?');

    if (isChecked) {
      try {
        mutate(articleId);
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  return (
    <>
      <MyPageHeader title={'좋아하는 게시글'}></MyPageHeader>

      <div className="mt-24 [&>*:not(:first-child)]:border-t [&>*:not(:first-child)]:border-solid [&>*:not(:first-child)]:border-t-gray-5">
        {data?.length > 0 ? (
          data.map(post => (
            <LikedPost
              key={post.article_id}
              postData={post}
              deleteLikedPostEvent={deleteLikedPostHandler}
            ></LikedPost>
          ))
        ) : (
          <NoContent>아직 좋아요를 누른 게시글이 없습니다!</NoContent>
        )}
      </div>
    </>
  );
};

export default LikedSection;
