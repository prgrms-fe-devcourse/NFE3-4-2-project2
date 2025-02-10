// import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Post from './Post';
import { useSelector } from 'react-redux';
import MyPageHeader from '../common/MyPageHeader';
import NoContent from '../common/NoContent';
import { deletePostApi, getUserPost } from '@/apis/postApi';

const PostsSection = () => {
  const { userId } = useSelector(state => state.user);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: [userId],
    queryFn: async ({ queryKey }) => {
      const [userId] = queryKey;
      const response = await getUserPost(userId);
      return response;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async postId => {
      await deletePostApi(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([userId]);
    },
    onError: error => {
      console.error('게시글 삭제에 실패했습니다.', error);
      alert('게시글 삭제에 실패했습니다.');
    },
  });

  const deletePostHandler = postId => {
    const isChecked = window.confirm('정말로 삭제하시겠습니까?');

    if (isChecked) {
      mutate(postId);
    }
  };

  return (
    <>
      <MyPageHeader title={'작성한 게시글'}></MyPageHeader>

      <div className="mt-24 [&>*:not(:first-child)]:border-t [&>*:not(:first-child)]:border-solid [&>*:not(:first-child)]:border-t-gray-5">
        {data?.length > 0 ? (
          data &&
          data.map(post => (
            <Post key={post._id} postData={post} postDeleteEvent={deletePostHandler}></Post>
          ))
        ) : (
          <NoContent>아직 작성한 게시글이 없습니다!</NoContent>
        )}
      </div>
    </>
  );
};

export default PostsSection;
