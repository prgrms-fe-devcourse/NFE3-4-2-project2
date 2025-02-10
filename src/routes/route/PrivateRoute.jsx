import useAuth from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router';
import PATH from '@/constants/path';

// 로그인한 회원만 접근 가능.
const PrivateRoute = () => {
  const isLogin = useAuth();

  return isLogin ? <Outlet /> : <Navigate to={PATH.auth} />;
};
export default PrivateRoute;
