const SigninInputs = getValues => {
  return {
    email: {
      attributes: {
        placeholder: '이메일을 입력해주세요',
        type: 'email',
      },
      validate: {
        required: {
          value: true,
          message: '이메일은 필수 입력항목입니다.',
        },
        pattern: {
          value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
          message: '올바른 이메일 형식이 아닙니다.',
        },
      },
      options: {
        inputGuide: '@를 포함한 이메일 주소',
        label: '이메일',
      },
    },
    password: {
      attributes: {
        placeholder: '비밀번호를 입력해주세요.',
        type: 'password',
      },
      validate: {
        required: {
          value: true,
          message: '비밀번호는 필수 입력항목입니다.',
        },
        pattern: {
          value:
            /^(?=.*[a-zA-Z])(?=.*\d|.*[!@#$%^&*()_+={}|[\]\\:";'<>?,./])(?=.{8,16}$).*$|^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+={}|[\]\\:";'<>?,./])(?=.{8,16}$).*$|^(?=.*\d)(?=.*[!@#$%^&*()_+={}|[\]\\:";'<>?,./])(?=.{8,16}$).*$/,
          message: '올바른 비밀번호 형식이 아닙니다.',
        },
      },
      options: {
        inputGuide: '영문 대·소문자/숫자.특수문자 중 2가지 이상 조합, 8~16글자',
        label: '비밀번호',
      },
    },
  };
};
export default SigninInputs;
