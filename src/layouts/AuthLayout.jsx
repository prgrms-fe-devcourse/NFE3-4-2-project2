import { Outlet } from 'react-router-dom';
import Header from '@components/common/Header';
import Footer from '@components/common/Footer';

const AuthLayout = () => {
  return (
    <div className="w-screen h-screen flex flex-col min-h-screen">
      <div className="w-full max-w-962  mx-auto flex flex-col h-full">
        <div className="h-70">
          <Header />
        </div>
        <div className="w-400 mx-auto flex-1">
          <Outlet />
        </div>
      </div>

      <div className='w-full h-70 flex-grow'>
          <Footer />

      </div>
    </div>
  );
};

export default AuthLayout;
