import { useSelector } from 'react-redux';
import { getCookie } from '@/utils/cookie';

const useAuth = () => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const jwt = getCookie('jwt');

  if ((isLoggedIn === true) & (jwt !== '')) {
    return true;
  } else {
    return false;
  }
};

export default useAuth;
