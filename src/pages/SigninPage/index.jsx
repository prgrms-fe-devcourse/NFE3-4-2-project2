import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { postSigninApi } from '@/apis/userApi';
import { setUser } from '@/redux/slices/user.slice';
import { setCookie } from '@/utils/cookie';
import Form from '@/components/common/Form';
import SigninInputs from './SigninInputs';

// 로그인
const SigninPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async data => {
    const { email, password } = data;
    const loginReqData = { email, password };
    // 로그인 요청
    const result = await postSigninApi(loginReqData);

    if (result) {
      // result의 토큰과 유저정보 받아오기
      const jwt = result.token;
      const userData = {
        userEmail: result.user.email,
        userId: result.user._id,
        userFullName: result.user.fullName,
      };
      // 쿠키에 jwt 저장
      setCookie('jwt', jwt, { path: '/' });

      // 사용자 정보를 redux에 저장
      dispatch(
        setUser({
          ...userData,
        }),
      );

      // 이전 페이지로 이동
      navigate(-1);
    }
  };

  const formProps = {
    onSubmit: onSubmit,
    headerText: '로그인',
    guideText: '제주 한 달 살기 서비스를 이용하기 위해 로그인해주세요.',
    submitButtonText: '로그인 하기',
    inputs: SigninInputs,
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full">
        <Form {...formProps}>
          <Button className="w-full">
            <Link to="/auth/signup" className="w-full h-full flex justify-center items-center">
              회원가입
            </Link>
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SigninPage;
