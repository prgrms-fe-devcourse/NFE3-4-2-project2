import { useEffect, useState } from 'react';
import { deleteUserLikedPlaceApi, getAllUserLikedPlacesApi } from '@/apis/supabaseApi';
import ScrapPlaceCard from './ScrapPlaceCard';
import { useSelector } from 'react-redux';
import MyPageHeader from '../common/MyPageHeader';
import NoContent from '../common/NoContent';
import Container from './Container';

// import useEmblaCarousel from 'embla-carousel-react';

const ScrapSection = () => {
  const [scrapsData, setScrapData] = useState([]);

  const { userId } = useSelector(state => state.user);

  const categoryData = [
    { title: '관광지' },
    { title: '숙박' },
    { title: '음식점' },
    { title: '쇼핑' },
  ];

  async function getData(userId) {
    const data = await getAllUserLikedPlacesApi(userId);
    setScrapData(data);
  }
  useEffect(() => {
    getData(userId);
  }, [userId]);

  const handleDeleteScrap = async (userId, contentId) => {
    const isChecked = window.confirm('정말로 스크랩을 취소하시겠습니까?');

    if (isChecked) {
      try {
        await deleteUserLikedPlaceApi(userId, contentId);

        setScrapData(prevData => prevData.filter(scrapData => scrapData.content_id !== contentId));
      } catch (error) {
        console.error('스크렙 취소하기를 실패했습니다.');
        throw new Error(error);
      }
    }
  };

  return (
    <>
      <MyPageHeader title={'스크랩'}></MyPageHeader>

      {categoryData.map(category => {
        const filteredData = scrapsData.filter(item => item.category === category.title);

        return (
          <div key={category.title} className="mb-40 mt-24">
            <h2 className="text-16 mb-16">
              {category.title} <strong className="text-sub-accent-1">{filteredData.length}</strong>
            </h2>

            {filteredData.length > 0 ? (
              <Container slideLength={filteredData.length}>
                <div className="embla__container">
                  {filteredData.map(scrapData => (
                    <ScrapPlaceCard
                      key={scrapData.content_id}
                      scrapData={scrapData}
                      onDelete={handleDeleteScrap}
                      slideLength={filteredData.length}
                    />
                  ))}
                </div>
              </Container>
            ) : (
              <NoContent>아직 스크랩한 컨텐츠가 없습니다!</NoContent>
            )}
          </div>
        );
      })}
    </>
  );
};

export default ScrapSection;
