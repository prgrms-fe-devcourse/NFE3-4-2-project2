import Button from './Button';
import { useDispatch } from 'react-redux';
import { removeCookie } from '@/utils/cookie';
import { deleteUser } from '@/redux/slices/user.slice';
import { useNavigate } from 'react-router';
import { postLogoutUserApi } from '../../../../apis/userApi';

const ButtonWrapper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await postLogoutUserApi();
    dispatch(deleteUser()); // 리덕스의 유저정보 삭제
    removeCookie('jwt'); // 토큰 삭제
    navigate('/');
  };

  const logoutProps = {
    borderColor: 'gray-5',
    textColor: 'red-500',
    label: '로그아웃',
    onClick: handleLogout,
  };

  const withdrawalProps = {
    borderColor: 'gray-5',
    textColor: 'gray-5',
    label: '회원 탈퇴',
    onClick: async () => {
      alert('관리자만 삭제가 가능합니다.');
    },
  };

  return (
    <div className="flex gap-6 items-center justify-center mt-14 pt-25 border-t border-solid border-t-gray-5">
      <Button {...logoutProps} />
      <Button {...withdrawalProps} />
    </div>
  );
};
export default ButtonWrapper;
