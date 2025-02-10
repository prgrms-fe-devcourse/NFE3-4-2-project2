import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { postSignupApi } from '@/apis/userApi';
import { setUser } from '@/redux/slices/user.slice';
import { setCookie } from '@/utils/cookie';
import { Button } from 'antd';
import Form from '@/components/common/Form';
import SignupInputs from './SignupInputs';

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async data => {
    const { email, nickname, password } = data;
    const signUpReqData = {
      email,
      nickname,
      password,
    };
    // 회원가입 요청
    const result = await postSignupApi(signUpReqData);

    // userData를 전역에 저장
    if (result) {
      // result 의 토큰과 유저정보 받아오기
      const jwt = result.token;
      const userData = {
        userEmail: result.user.email,
        userId: result.user._id,
        userFullName: result.user.fullName,
      };

      //쿠키에 jwt 저장
      setCookie('jwt', jwt, { path: '/' });

      // 사용자 정보를 redux에 저장
      dispatch(
        setUser({
          ...userData,
        }),
      );

      // 메인 화면으로 이동
      navigate('/');
    }
  };

  const formProps = {
    onSubmit: onSubmit,
    headerText: '회원가입',
    guideText: '회원가입에 필요한 정보를 작성해주세요.',
    submitButtonText: '가입하기',
    inputs: SignupInputs,
    watchTarget: 'password',
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full">
        <Form {...formProps}>
          <Button className="w-full">
            <Link to="/" className="w-full h-full flex justify-center items-center">
              이전으로 돌아가기
            </Link>
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignupPage;
