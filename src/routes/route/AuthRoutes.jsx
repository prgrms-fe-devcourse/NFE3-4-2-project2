import PATH from '@/constants/path';
import { SigninPage, SignupPage } from '@pages/';
import { Navigate } from 'react-router';

const AUTH_ROUTES = [
  {
    path: PATH.auth,
    element: <SigninPage />,
  },
  {
    path: PATH.signup,
    element: <SignupPage />,
  },
  {
    path: PATH.authWildcard,
    element: <Navigate to={PATH.auths} replace />,
  },
];
export default AUTH_ROUTES;
