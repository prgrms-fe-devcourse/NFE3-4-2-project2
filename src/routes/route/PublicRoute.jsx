import useAuth from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router';
import PATH from '@/constants/path';

// 로그인한 회원은 접근 불가능
const PublicRoute = () => {
  const isLogin = useAuth();

  return isLogin ? <Navigate to={PATH.root} /> : <Outlet />;
};
export default PublicRoute;
