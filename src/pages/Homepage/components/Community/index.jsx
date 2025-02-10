import { Link } from 'react-router';
import useFetchCommunityPost from '@/hooks/react-query/useFetchCommunityPost';
import CommunityPreviewCard from './CommunityPreviewCard';
import Carousel from './Carousel';

const CommunityPreview = () => {
  const { posts, isLoading, isSuccess } = useFetchCommunityPost();

  if (isLoading) {
    return <div>커뮤니티 글을 가져오는 중입니다.</div>;
  }

  if (!isSuccess) {
    return <div> post데이터를 가져오는데 실패했습니다.</div>;
  }

  // chunk posts
  const renderCard = post => {
    return <CommunityPreviewCard post={post} key={post._id} />;
  };

  const renderCardWrapper = cards => {
    return <div className="grid grid-cols-2 gap-10 ">{cards.map(card => card)}</div>;
  };

  // post -> <card /> -> [cardsWrapper, cardsWrapper]
  const chunkpost = postlist => {
    const cardlist = postlist.map(post => renderCard(post));
    const chunkedCardList = [];
    for (let i = 0; i < cardlist.length; i += 4) {
      chunkedCardList.push(cardlist.slice(i, i + 4));
    }
    const wrappers = chunkedCardList.map(cards => renderCardWrapper(cards));
    return wrappers;
  };

  return (
    <div className="mb-100">
      <h2 className="font-semibold text-24 text-gray-8">
        최근에 올라온 <span className="text-primary-1">커뮤니티 글</span> 이에요
      </h2>
      <div>
        <Link
          to="/community"
          className="flex justify-end font-bold text-15 text-sub-accent-2 mb-40"
        >
          더보기
        </Link>
      </div>

      <Carousel slides={chunkpost(posts)} options={{ loop: true }} />
    </div>
  );
};
export default CommunityPreview;

// [{},{}]
