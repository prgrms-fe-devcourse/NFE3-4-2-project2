import React, { useEffect } from 'react';
import { getPostByChannelApi } from '@/apis/postApi';

const TabPosts = ({ activeTab, channels, setPosts, setError }) => {
  useEffect(() => {
    const fetchPosts = async () => {
      if (!channels.length) return;

      try {
        let allPosts = [];

        if (activeTab === '베스트') {
          for (const channel of channels) {
            if (channel.name !== '전체' && channel.name !== '베스트') {
              const channelPosts = await getPostByChannelApi(channel._id);
              allPosts = allPosts.concat(channelPosts);
            }
          }

          const sortedPosts = allPosts.sort((a, b) => b.likes.length - a.likes.length);
          setPosts(sortedPosts);

        } else if (activeTab === '전체') {
          for (const channel of channels) {
            if (channel.name !== '전체' && channel.name !== '베스트') {
              const channelPosts = await getPostByChannelApi(channel._id);
              allPosts = allPosts.concat(channelPosts);
            }
          }

          const sortedPosts = allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setPosts(sortedPosts);

        } else {
          const selectedChannel = channels.find(ch => ch.name === activeTab);
          if (selectedChannel) {
            const channelPosts = await getPostByChannelApi(selectedChannel._id);

            const sortedPosts = channelPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setPosts(sortedPosts);
          }
        }
      } catch (error) {
        setError('게시글을 가져오는 데 실패했습니다.');
      }
    };

    fetchPosts();
  }, [activeTab, channels, setPosts, setError]);

  return null;
};

export default TabPosts;


