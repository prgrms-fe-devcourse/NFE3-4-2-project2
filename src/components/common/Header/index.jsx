import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router';
import { Button, ConfigProvider, Modal } from 'antd';
import Logo from '@public/icons/jejumonth-logo';

const Header = () => {
  const { pathname } = useLocation();
  const userId = useSelector(state => state.user.userId);
  const headerType = pathname.split('/').at(1) === '' ? 'main' : 'etc';
  const navigate = useNavigate();

  const TextColorVariation = {
    main: 'text-white',
    etc: 'text-gray-8',
  };

  const ButtonVariation = {
    main: 'text-white bg-transparent ',
    etc: 'text-gray-7 ',
  };

  const PaddingVaration = {
    etc: 'px-0',
    main: 'px-30',
  };

  const handleTripClick = event => {
    if (!userId) {
      event.preventDefault();
      Modal.warning({
        title: '로그인이 필요합니다.',
        content: '로그인하고 JejuMonth의 다양한 기능을 이용해 보세요.',
        onOk() {
          navigate('/auth');
        },
        okButtonProps: {
          style: {
            backgroundColor: '#FDBA74',
          },
        },
      });
    }
  };

  return (
    <div
      className={`flex flex-row items-center place-content-between pt-27 ${PaddingVaration[headerType]}`}
    >
      <div className="items-center">
        <NavLink to="/">
          <Logo width={128} height={28} />
        </NavLink>
      </div>

      <div className="flex gap-80 items-center">
        <div className={`flex gap-29 ${TextColorVariation[headerType]} `}>
          <NavLink
            to="/community"
            className="font-semibold text-15 hover:text-primary-2 transition duration-300 ease-in-out"
          >
            커뮤니티
          </NavLink>
          <NavLink
            to="/trip/add-trip"
            onClick={handleTripClick}
            className="font-semibold text-15 hover:text-primary-2 transition duration-300 ease-in-out"
          >
            여행계획
          </NavLink>
        </div>
        <div className={`rounded-full w-100 h-34 flex items-center justify-center font-semibold`}>
          {userId ? (
            <NavLink to="/mypage">
              <ConfigProvider theme={{ token: { colorPrimary: '#f78f07' } }}>
                <Button
                  variant="text"
                  className={`font-bold w-100 h-34 rounded-4 ${ButtonVariation[headerType]} `}
                >
                  Mypage
                </Button>
              </ConfigProvider>
            </NavLink>
          ) : (
            <NavLink to="/auth">
              <ConfigProvider theme={{ token: { colorPrimary: '#f78f07' } }}>
                <Button
                  variant="text"
                  className={`font-bold w-100 h-34 rounded-4 ${ButtonVariation[headerType]} `}
                >
                  Login
                </Button>
              </ConfigProvider>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
