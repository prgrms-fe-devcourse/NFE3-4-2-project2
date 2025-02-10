import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Comment from './Comment';
import { useSelector } from 'react-redux';
import { deleteCommentApi } from '@/apis/commentApi';
import NoContent from '../common/NoContent';
import { getUserApi } from '@/apis/userApi';
import MyPageHeader from '../common/MyPageHeader';

const CommentSection = () => {
  const { userId } = useSelector(state => state.user);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['userData', userId],
    queryFn: async () => await getUserApi(userId),
  });

  const { mutate } = useMutation({
    mutationFn: deleteCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData', userId] });
    },
    onError: error => {
      console.error('삭제 실패:', error);
    },
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>데이터를 불러오는 데 실패했습니다.</p>;
  return (
    <>
      <article className="w-full">
        <MyPageHeader title={'작성한 댓글'}></MyPageHeader>

        <div className="mt-24 [&>*:not(:first-child)]:border-t [&>*:not(:first-child)]:border-solid [&>*:not(:first-child)]:border-t-gray-5">
          {data?.comments.length > 0 ? (
            data.comments.map((comment, index) => (
              <Comment
                key={index}
                commentData={comment}
                deleteEvent={() => mutate(comment._id)}
              ></Comment>
            ))
          ) : (
            <NoContent>아직 작성한 댓글이 없습니다!</NoContent>
          )}
        </div>
      </article>
    </>
  );
};

export default CommentSection;
