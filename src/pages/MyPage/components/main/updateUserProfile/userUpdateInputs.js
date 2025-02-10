const userUpdateInputs = getValues => {
  return {
    image: {
      attributes: {
        type: 'file',
      },
      validate: {},
      options: {
        fileHeader: '프로필 사진',
        fileGuide: '프로필 사진을 등록하여 자신을 나타내주세요.',
        buttonLabel: '사진 업로드',
        hasPreview: true,
      },
    },
    password: {
      attributes: {
        placeholder: '비밀번호를 입력해주세요.',
        type: 'text',
      },
      validate: {
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
    confirmPassword: {
      attributes: {
        placeholder: '비밀번호를 입력해주세요',
        type: 'text',
      },
      validate: {
        validate: value => {
          const password = getValues('password');
          return password === value || '비밀번호가 일치하지 않습니다.';
        },
      },
      options: {
        label: '비밀번호 확인',
      },
    },
    nickname: {
      attributes: {
        placeholder: '닉네임을 입력해주세요',
        type: 'text',
      },
      validate: {
        minLength: {
          value: 3,
          message: '닉네임은 3글자 이상 입력해주십시오',
        },
        maxLength: {
          value: 10,
          message: '닉네임은 10글자를 초과할 수 없습니다.',
        },
      },
      options: {
        inputGuide: '3글자 이상 10글자 이하',
        label: '닉네임',
      },
    },
  };
};

export default userUpdateInputs;
