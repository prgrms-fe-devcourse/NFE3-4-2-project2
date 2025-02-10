import { useSearchParams, useNavigate, useLocation } from 'react-router';
import DetailCard from './components/DetailCard';
import { ConfigProvider, Pagination } from 'antd';

import { useEffect, useState } from 'react';
import { getList } from '@/apis/searchApi';
import { useQuery } from '@tanstack/react-query';
import Category from './components/Category';
import DetailMediumCard from './components/DetailMediumCard';
import DetailSmallCard from './components/DetailSmallCard';
import SkeletonLayout from './components/SkeletonLayout';

const SearchPage = () => {
  const [searchData, setSearchData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [prevInput, setPrevInput] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState({});
  const [itemListLength, setItemListLength] = useState(10);
  const [pagesLength, setPagesLength] = useState(5);
  const [inputQuery, setInputQuery] = useState({});
  const [searchText, setSearchText] = useState('');
  const [layout, setLayout] = useState('large-layout');

  const categoryType = [
    { id: 1, title: '전체', category: '' },
    { id: 2, title: '관광지', category: 'c1' },
    { id: 3, title: '쇼핑', category: 'c2' },
    { id: 4, title: '숙박', category: 'c3' },
    { id: 5, title: '음식점', category: 'c4' },
    { id: 6, title: '축제와 행사', category: 'c5' },
    { id: 7, title: '테마 여행', category: 'c6' },
  ];

  const { data, isLoading, error } = useQuery({
    queryKey: ['search1', query],
    queryFn: () => getList(query, itemListLength, pagesLength),
    staleTime: 2 * 60 * 1000,
    refetchInterval: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
    keepPreviousData: true,
  });

  const { datas, nextCurrentPageList } = data || {};

  useEffect(() => {}, [itemListLength, pagesLength]);

  useEffect(() => {
    const updatedQuery = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: itemListLength,
      title: searchParams.get('title') || '',
      category: searchParams.get('category') || '',
      cid: searchParams.get('cid') || '',
    };
    setQuery(updatedQuery);
    setSearchText(updatedQuery.title);
  }, [searchParams, itemListLength]);

  useEffect(() => {
    if (!isLoading && datas && datas?.items) {
      const putdata = datas.items.slice(0, 100);
      setSearchData(putdata);
    }
  }, [datas, isLoading]);

  const handleChange = e => {
    const { value, type } = e.target;
    let nextInputQuery = { ...inputQuery };

    if (type === 'text') {
      setSearchText(value);
      nextInputQuery = { ...inputQuery, title: value };
    }
    setInputQuery(nextInputQuery);
  };

  const handleChangeBtnClick = (page, category) => {
    const nextInputQuery = { ...inputQuery, page, category };
    setInputQuery(nextInputQuery);
    setQuery(nextInputQuery);
    let params = '?';
    Object.entries(nextInputQuery).forEach(([key, value]) => {
      if (value) {
        params += `${key}=${value}&`;
      }
    });

    params = params.slice(0, -1);
    if (params) {
      navigate(`${location.pathname}${params}`);
    } else {
      navigate(location.pathname);
    }
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  };

  useEffect(() => {
    if (layout === 'large-layout') {
      setItemListLength(10);
      setPagesLength(10);
    } else if (layout === 'medium-layout') {
      setItemListLength(9);
      setPagesLength(9);
    } else if (layout === 'small-layout') {
      setItemListLength(12);
      setPagesLength(12);
    }

    const totalItems = searchData.length;
    const totalPages = Math.ceil(totalItems / itemListLength);

    if (query.page > totalPages) {
      setQuery(prevQuery => ({
        ...prevQuery,
        page: totalPages,
      }));
    }

    const nextInputQuery = { ...query };

    const filteredQuery = {};
    ['page', 'category', 'title'].forEach(key => {
      if (nextInputQuery[key]) {
        filteredQuery[key] = nextInputQuery[key];
      }
    });

    let params = '?';
    Object.entries(filteredQuery).forEach(([key, value]) => {
      if (value) {
        params += `${key}=${value}&`;
      }
    });

    params = params.slice(0, -1);
    if (params) {
      navigate(`${location.pathname}${params}`);
    } else {
      navigate(location.pathname);
    }
  }, [layout, itemListLength, searchData]);

  const handleLayoutChange = e => {
    const { layouticon } = e.currentTarget.dataset;
    const svgs = document.querySelectorAll('[data-layouticon]');
    svgs.forEach(item => {
      item.classList.remove('fill-gray-8');
    });

    e.currentTarget.classList.add('fill-gray-8');

    setLayout(layouticon);
  };

  const handleCardClick = contentId => {
    navigate(`/detail/${contentId}`); // 상세 페이지로 이동
    window.scrollTo(0, 0);
  };

  const renderCard = item => {
    switch (layout) {
      case 'large-layout':
        return (
          <DetailCard
            key={item.id}
            onClick={() => handleCardClick(item.contentsid)}
            title={item.title || '제목이 없습니다'}
            city={item.region1cd?.label || '도시'}
            street={
              item.region2cd?.label == 'region>' || item.region2cd?.label == undefined
                ? '제주시내'
                : item.region2cd?.label
            }
            description={item.introduction || '설명이 없습니다.'}
            img={item.repPhoto?.photoid?.thumbnailpath || '/images/no_image.svg'}
            contentid={item}
          />
        );
      case 'medium-layout':
        return (
          <DetailMediumCard
            key={item.id}
            onClick={() => handleCardClick(item.contentsid)}
            title={item.title || '제목이 없습니다'}
            city={item.region1cd?.label || '도시'}
            street={
              item.region2cd?.label == 'region>' || item.region2cd?.label == undefined
                ? '제주시내'
                : item.region2cd?.label
            }
            img={item.repPhoto?.photoid?.thumbnailpath || '/images/no_image.svg'}
            category={item.contentscd?.value}
            contentid={item}
          />
        );
      case 'small-layout':
        return (
          <DetailSmallCard
            key={item.id}
            onClick={() => handleCardClick(item.contentsid)}
            title={item.title || '제목이 없습니다'}
            city={item.region1cd?.label || '도시'}
            street={
              item.region2cd?.label == 'region>' || item.region2cd?.label == undefined
                ? '제주시내'
                : item.region2cd?.label
            }
            description={item.introduction || '설명이 없습니다.'}
            img={item.repPhoto?.photoid?.thumbnailpath || '/images/no_image.svg'}
            category={item.contentscd?.value}
            contentid={item}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-60">
      <div className="w-512 h-52 rounded-20  shadow-2md p-16 box-border flex mx-auto mb-60">
        <input
          type="text"
          onChange={handleChange}
          onKeyDown={e => {
            if (e.key == 'Enter') {
              e.preventDefault();
              handleChangeBtnClick(query.page || 1, query.category || 0);
            }
          }}
          className="w-full  inline-block focus:outline-none"
        />
        <button>
          <img
            src="/icons/search.svg"
            alt="search-icon"
            onClick={() => {
              handleChangeBtnClick(query.page || 1, query.category || 0);
            }}
          />
        </button>
      </div>
      <nav className="flex justify-between">
        <ul className="flex">
          {categoryType.map(item => (
            <li key={item.id} className="mx-6">
              <button onClick={() => handleChangeBtnClick(query.page, item.category)}>
                <Category title={item.title} category={item.category} />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex align-middle ">
          <button className="mx-5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              data-layouticon="large-layout"
              className="fill-gray-6  fill-gray-8"
              onClick={event => {
                handleLayoutChange(event, query.page);
              }}
            >
              <path d="M15.8333 10.833H4.16667C3.25 10.833 2.5 11.583 2.5 12.4997V15.833C2.5 16.7497 3.25 17.4997 4.16667 17.4997H15.8333C16.75 17.4997 17.5 16.7497 17.5 15.833V12.4997C17.5 11.583 16.75 10.833 15.8333 10.833ZM15.8333 15.833H4.16667V12.4997H15.8333V15.833Z" />
              <path d="M15.8333 2.5H4.16667C3.25 2.5 2.5 3.25 2.5 4.16667V7.5C2.5 8.41667 3.25 9.16667 4.16667 9.16667H15.8333C16.75 9.16667 17.5 8.41667 17.5 7.5V4.16667C17.5 3.25 16.75 2.5 15.8333 2.5ZM15.8333 7.5H4.16667V4.16667H15.8333V7.5Z" />
            </svg>
          </button>
          <button className="mx-5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              data-layouticon="medium-layout"
              className="fill-gray-6"
              onClick={event => {
                handleLayoutChange(event, query.page);
              }}
            >
              <path d="M2.5 2.5V9.16667H9.16667V2.5H2.5ZM7.5 7.5H4.16667V4.16667H7.5V7.5ZM2.5 10.8333V17.5H9.16667V10.8333H2.5ZM7.5 15.8333H4.16667V12.5H7.5V15.8333ZM10.8333 2.5V9.16667H17.5V2.5H10.8333ZM15.8333 7.5H12.5V4.16667H15.8333V7.5ZM10.8333 10.8333V17.5H17.5V10.8333H10.8333ZM15.8333 15.8333H12.5V12.5H15.8333V15.8333Z" />
            </svg>
          </button>
          <button className="mx-5">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              data-layouticon="small-layout"
              className="fill-gray-6"
              onClick={event => {
                handleLayoutChange(event, query.page);
              }}
            >
              <path d="M15 0H0V1.6667H15V0Z" />
              <path d="M15 13.333H0V14.9997H15V13.333Z" />
              <path d="M15 6.66699H0V8.3337H15V6.66699Z" />
            </svg>
          </button>
        </div>
      </nav>
      <main className="mt-22 ">
        <div className="min-h-658">
          {isLoading ? (
            // <SkeletonLayout layout={layout} itemList={itemListLength} />
            <SkeletonLayout layout={layout} itemList={itemListLength} />
          ) : (
            <div className={layout === 'medium-layout' ? 'flex flex-wrap' : ''}>
              {searchData.length === 0 ? (
                <div className="w-full h-500 flex justify-center">
                  <img
                    src="/icons/no_search_results.svg"
                    className="w-200"
                    alt="No search results"
                  />
                </div>
              ) : (
                !isLoading && nextCurrentPageList.map(item => renderCard(item))
              )}
            </div>
          )}
        </div>
        <ConfigProvider
          theme={{
            token: {
              borderRadiusSM: 6,
              borderRadius: 30,
              fontSize: 12,
              fontFamily:
                'Pretendard Variable, Pretendard ,-apple-system,BlinkMacSystemFont, system-ui, sans-serif',
              fontWeightStrong: 600,
              colorPrimary: '#FFFFFF',
            },
            components: {
              Pagination: {
                itemActiveBg: '#FF7900',
                itemSize: 39,
              },
            },
          }}
        >
          <Pagination
            total={searchData.length}
            pageSize={itemListLength}
            className="justify-center mt-55 mb-70"
            current={query.page}
            onChange={value => {
              handleChangeBtnClick(value, query.category || 0);
            }}
          />
        </ConfigProvider>
      </main>
    </div>
  );
};

export default SearchPage;
