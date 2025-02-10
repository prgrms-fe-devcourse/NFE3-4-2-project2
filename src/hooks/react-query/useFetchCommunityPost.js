import { useQuery } from '@tanstack/react-query';
import { fetchChannels } from '@/apis/channelApi';
import { getPostByChannelApi } from '@/apis/postApi';
import QUERY_KEY from '@/constants/querykey';

const useFetchCommunityPost = () => {
  //1. 모든 채널 조회
  const { data: channels } = useQuery({
    queryKey: QUERY_KEY.channel.list,
    queryFn: () => fetchChannels(),
  });

  //2. 관광지 채널의 posts만 조회
  const {
    data: postsData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: QUERY_KEY.post.attractionList,
    queryFn: () => {
      if (!channels) return [];
      const attractionId = channels[0]['_id'];
      return Promise.all([getPostByChannelApi(attractionId)]);
    },
    enabled: !!channels,
  });

  if (isSuccess) {
    let posts = postsData[0];
    return { posts, isLoading, isSuccess };
  } else {
    return { posts: postsData, isLoading, isSuccess };
  }
};

export default useFetchCommunityPost;
