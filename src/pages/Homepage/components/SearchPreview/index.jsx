import {
  TOUR_PLACES,
  SHOPPING_PLACES,
  ACCOMMODATIONS,
  RESTAURANTS,
  FESTIVALS,
  THEME_TOURS,
} from '@/constants/mainExamplePlaces.js';
import MainCard from './MainCard.jsx';
import CATEGORY_CODES from '@/constants/category.js';
import { useState } from 'react';
import CategoryButton from './CategoryButton.jsx';
import { useNavigate } from 'react-router-dom';

const SearchPreview = () => {
  const [category, setCategory] = useState('관광지');
  const [places, setPlaces] = useState(TOUR_PLACES);
  const navigate = useNavigate();

  const handleCategoryClick = categoryName => {
    setCategory(categoryName);
    switch (categoryName) {
      case '관광지':
        setPlaces(TOUR_PLACES);
        break;
      case '쇼핑':
        setPlaces(SHOPPING_PLACES);
        break;
      case '숙박':
        setPlaces(ACCOMMODATIONS);
        break;
      case '음식':
        setPlaces(RESTAURANTS);
        break;
      case '축제/행사':
        setPlaces(FESTIVALS);
        break;
      case '테마여행':
        setPlaces(THEME_TOURS);
        break;
    }
  };

  const handleCardClick = contentId => {
    navigate(`/detail/${contentId}`); // 상세 페이지로 이동
    window.scrollTo(0, 0);
  };

  const handleSearchClick = () => {
    navigate('/search');
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-screen relative left-1/2 -translate-x-1/2 bg-gray-2 mb-50">
      <div className="max-w-962 mx-auto">
        <div className="h-903 w-full flex flex-col justify-center items-center gap-20">
          <div className="flex w-945 justify-between">
            <div className="flex text-40 font-extrabold">
              <div>⛰️&nbsp;</div>
              <div className="text-sub-accent-1">LOOKING&nbsp;</div>
              <div className="text-gray-12">for&nbsp;</div>
              <div className="text-primary-0">Jeju</div>
            </div>
            <button
              className="w-521 h-52 bg-white rounded-40 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)] text-gray-6"
              onClick={handleSearchClick}
            >
              여기를 클릭해 제주도 장소를 검색해보세요!
            </button>
          </div>
          <div className="flex w-500 justify-between">
            {CATEGORY_CODES.filter(item => item.value !== 'all').map((item, index) => (
              <CategoryButton
                key={index}
                category={item.label}
                isClicked={category === item.label}
                onClick={() => handleCategoryClick(item.label)}
              />
            ))}
          </div>
          <div className="flex w-940 justify-between mx-13">
            <div className="text-gray-8 font-semibold">📍 제주도 추천 명소</div>
            <button onClick={handleSearchClick} className="text-sub-accent-1 font-bold">
              더보기
            </button>
          </div>
          <div className="grid grid-cols-3 grid-rows-2 place-items-center gap-15">
            {places.map((item, index) => (
              <MainCard
                key={index}
                onClick={() => handleCardClick(item.contentsid)}
                placeInfo={item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPreview;
