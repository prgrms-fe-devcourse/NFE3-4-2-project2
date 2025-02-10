import PATH from '@/constants/path';
import { AddTripPage, MyTripPage } from '@pages/';

const TRIP_ROUTES = [
  {
    path: PATH.addTrip,
    element: <AddTripPage />,
  },

  {
    path: PATH.myTrip,
    element: <MyTripPage />,
  },
];
export default TRIP_ROUTES;
