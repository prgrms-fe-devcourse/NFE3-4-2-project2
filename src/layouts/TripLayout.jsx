import { Outlet } from 'react-router-dom';
import Header from '@components/common/Header';

const TripLayout = () => {
  return (
    <div>
      <div className="w-full max-w-1234 mx-auto flex flex-col h-full">
        <div className="h-70">
          <Header />
        </div>
        <div className="flex-1 h-full mt-50">
          <Outlet />
        </div>
      </div>
    </div>

  );
};

export default TripLayout;
