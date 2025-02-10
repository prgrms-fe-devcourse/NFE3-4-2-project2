import { useSearchParams } from 'react-router-dom';

const useQueryString = keywordArray => {
  const [search] = useSearchParams();
  const result = [];
  keywordArray.forEach((keyword, index) => {
    const value = search.get(keyword);
    result.push(value);
  });
  return [...result];
};
export default useQueryString;
