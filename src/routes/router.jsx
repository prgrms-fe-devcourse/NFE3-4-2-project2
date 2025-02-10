import { createBrowserRouter } from 'react-router-dom';
import { MyPage } from '../pages';
import { DefaultLayout, AuthLayout, TripLayout, PlanLayout } from '../layouts';
import {
  PrivateRoute,
  PublicRoute,
  MYPAGE_ROUTES,
  COMMUNITY_ROUTES,
  SEARCH_ROUTES,
  DETAIL_ROUTES,
  HOME_ROUTES,
  AUTH_ROUTES,
  TRIP_ROUTES,
  PLAN_ROUTES,
} from './route';

// TODO  Error element 추가하기

const router = createBrowserRouter([
  {
    path: '',
    element: <DefaultLayout />,
    children: [...HOME_ROUTES, ...SEARCH_ROUTES, ...COMMUNITY_ROUTES, ...DETAIL_ROUTES],
  },
  {
    path: '',
    element: <PublicRoute />,
    children: [
      {
        path: '',
        element: <AuthLayout />,
        children: [...AUTH_ROUTES],
      },
    ],
  },
  {
    path: '',
    element: <PrivateRoute />,
    children: [
      {
        path: '',
        element: <TripLayout />,
        children: [...TRIP_ROUTES],
      },
      {
        path: '',
        element: <PlanLayout />,
        children: [...PLAN_ROUTES],
      },
      {
        path: '',
        element: <DefaultLayout />,
        children: [
          {
            path: '',
            element: <MyPage />,
            children: [...MYPAGE_ROUTES],
          },
        ],
      },
    ],
  },
]);

export default router;
