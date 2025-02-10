import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlaceByExplanationApi } from '@/apis/visitJejuApi';
import Detail from './components/Detail';

const DetailPage = () => {
  const { contentsid } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!contentsid) {
          navigate('/search');
          return;
        }
        const result = await getPlaceByExplanationApi(contentsid);
        if (!result) {
          navigate('/search');
          return;
        }
        setData(result);
      } catch (error) {
        setError(error.message);
        navigate('/search');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [contentsid]);

  if (loading) return <div className="mt-20 h-1233"></div>;

  if (error) return <div className="text-center mt-20">에러 발생: {error}</div>;

  if (!data) return <div className="text-center mt-20">데이터가 없습니다.</div>;

  return (
    <div>
      <Detail data={data} />
    </div>
  );
};

export default DetailPage;
