import { Outlet } from 'react-router-dom';
import Header from '@components/common/Header';

const PlanLayout = () => {
  return (
    <div>
      <div className="w-full max-w-750 mx-auto flex flex-col h-screen">
        <div className="h-70 ">
          <Header />
        </div>
        <div className="flex-1 h-full mt-50 flex justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PlanLayout;
