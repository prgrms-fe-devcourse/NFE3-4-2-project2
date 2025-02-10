import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { fetchChannels } from '@/apis/channelApi';
import ChannelTabs from './components/ChannelList';
import leftArray from '/icons/left-array.svg';
import SearchBar from './components/SearchBar';
import Dropdown from './components/Dropdown';
import PostForm from './components/PostForm';
import TabPosts from './components/DetailedPosts';
import PostRender from './components/PostRender';

const CommunityPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialTab = searchParams.get('tab') || '베스트';
  const initialQuery = searchParams.get('search') || '';
  const initialFilter = searchParams.get('filter') || '작성자';
  const initialPage = parseInt(searchParams.get('page'), 10) || 1;

  const [activeTab, setActiveTab] = useState(initialTab);
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filter, setFilter] = useState(initialFilter);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    const getChannels = async () => {
      try {
        const data = await fetchChannels();
        setChannels(data);
      } catch (error) {
        setError(error.message);
      }
    };

    getChannels();
  }, []);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredPosts(posts);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const newFilteredPosts = posts.filter((post) => {
        if (filter === '작성자') {
          return post.author?.fullName?.toLowerCase().includes(lowercasedQuery);
        } else if (filter === '내용') {
          return post.title?.toLowerCase().includes(lowercasedQuery);
        }
        return false;
      });

      setFilteredPosts(newFilteredPosts);
    }

    setSearchParams({ tab: activeTab, search: searchQuery, filter });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab, page: 1 }); 
    navigate(`/community?tab=${tab}&page=1`);
  };

  const handlePageChange = (page) => {
    setSearchParams({ tab: activeTab, page });
    navigate(`/community?tab=${activeTab}&page=${page}`);
  };

  const handlePostSubmit = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handlePostClick = (post) => {
    navigate(`/community/post/${post._id}`, { state: { post } });
  };

  return (
    <div className="container mx-auto px-10 py-10 mt-100">
      <div className="flex items-center mb-4">
        <button className="text-gray-500 hover:text-orange-500 text-lg mr-10">
          <img src={leftArray} alt="뒤로 가기" style={{ width: '15px', height: '15px' }}/>
        </button>
        <h2 className="text-2xl font-bold text-gray-800">커뮤니티</h2>
      </div>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="mt-20">
          <ChannelTabs channels={channels} activeTab={activeTab} setActiveTab={handleTabChange} />
        </div>
      )}

      <div className="flex items-center justify-end space-x-4 mt-6 mb-8">
        <Dropdown
          options={['작성자', '내용']}
          onSelect={(selected) => setFilter(selected)}
        />
        <SearchBar
          onSearch={(query) => setSearchQuery(query)}
          onSearchSubmit={handleSearch}
        />
      </div>

      <div className="mb-30 p-4">
        <PostForm onSubmit={handlePostSubmit} />
      </div>

      <div>
        <TabPosts
          activeTab={activeTab}
          channels={channels}
          setPosts={setPosts}
          setError={setError}
        />
        <PostRender
          posts={filteredPosts}
          onPostClick={handlePostClick}
          currentPage={initialPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CommunityPage;
