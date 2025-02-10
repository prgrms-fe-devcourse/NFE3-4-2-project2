import { getCookie, removeCookie } from '@/utils/cookie';
import { useDispatch } from 'react-redux';
import { deleteUser } from '@/redux/slices/user.slice';
import { useEffect } from 'react';
import PATH from '@/constants/path';
import axios from 'axios';

// 사용처에서 instance에 devAPI 전달해주기
const useAxiosInterceptor = instance => {
  const dispatch = useDispatch();

  const onRequest = config => {
    const jwt = getCookie('jwt');
    if (jwt) {
      config.headers.Authorization = `bearer ${jwt}`;
    }
    return config;
  };

  const onErrorRequest = error => {
    return Promise.reject(error);
  };

  const onError = (status, message, errorDetail) => {
    const error = { status, message, errorDetail };
    throw error;
  };

  const handle401Error = async originalRequest => {
    // iat가 토큰 발급시간으로 사용되는 것이 맞다고 확인됨.
    // 만료시간을 수동으로 확인한다.
    // 1. 에러가 난 요청에 jwt가 있었는지 확인
    const hasToken = originalRequest.headers['Authorization'].split(' ').at(1);
    if (hasToken) {
      // 있었으면 토큰 만료 오류로 판단. -> 쿠키와 유저 상태를 지우고 로그인 페이지로 이동
      alert('사용자 정보가 만료되었습니다.홈으로 이동합니다.');
      await dispatch(deleteUser());
      removeCookie('jwt');
      window.location.href = PATH.root;
    } else {
      // 없었으면 토큰 없이 요청보낸 것이므로 -> 로그인 페이지로 이동
      alert('사용자 정보를 찾을 수 없습니다. 로그인 페이지로 이동합니다.');
      await dispatch(deleteUser());
      removeCookie('jwt');
      window.location.href = PATH.auth;
    }
  };
  const onResponse = response => response;

  const onErrorResponse = error => {
    if (axios.isAxiosError(error)) {
      const originalRequest = error.config;
      const { method, url } = originalRequest;
      const { data: message, status: statusCode, statusText } = error.response;

      // TODO : 배포 후 DEV상태에서만 로깅되도록 변경
      console.log(
        `[API] ${method.toUpperCase()} ${url} | ERROR ${statusCode} ${statusText} | ${message}`,
      );

      switch (statusCode) {
        case 400: {
          onError(statusCode, '잘못된 요청입니다.', message);
          break;
        }
        case 401: {
          handle401Error(originalRequest);
          break;
        }
        case 403: {
          onError(statusCode, '권한이 없습니다.', message);
          break;
        }
        case 404: {
          onError(statusCode, '찾을 수 없는 페이지 입니다.', message);
          break;
        }
        case 500: {
          onError(statusCode, '서버 오류입니다.', message);
          break;
        }
        default: {
          onError(statusCode, '에러가 발생했습니다.', message);
        }
      }
    } else if (error && error.name === 'TimeoutError') {
      console.log(`[API] | Timeout ERROR ${error.toString()}`);
      onError(0, '요청시간이 초과되었습니다.', '');
    } else {
      console.log(`[API] | ERROR ${error.toString()}`);
      onError(0, '에러가 발생했습니다.', '');
    }
    return Promise.reject(error);
  };

  // interceptor 추가
  const setupInterceptors = () => {
    const requestInterceptor = instance.interceptors.request.use(onRequest, onErrorRequest);
    const responseInterceptor = instance.interceptors.response.use(onResponse, onErrorResponse);

    return { requestInterceptor, responseInterceptor };
  };

  // interceptor 제거
  const ejectInterceptors = (requestInterceptor, responseInterceptor) => {
    instance.interceptors.request.eject(requestInterceptor);
    instance.interceptors.response.eject(responseInterceptor);
  };

  useEffect(() => {
    const { requestInterceptor, responseInterceptor } = setupInterceptors();

    return () => {
      ejectInterceptors(requestInterceptor, responseInterceptor);
    };
  }, []);
};
export default useAxiosInterceptor;
