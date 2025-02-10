import { useQuery } from '@tanstack/react-query';
import { getUserApi } from '@/apis/userApi';
import QUERY_KEY from '@/constants/querykey';

const useFetchUser = userId => {
  return useQuery({
    queryKey: QUERY_KEY.user.detail(userId),
    queryFn: () => getUserApi(userId),
  });
};
export default useFetchUser;
