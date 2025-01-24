/* eslint-disable @next/next/no-img-element */
// /auth/login

export default function Login() {
    return (
        <div className="space-y-[16px] mt-20">
            <div className="mx-auto max-w-[460px] text-center">
                <div className="text-3xl font-bold text-neutral-800">
                    로그인{" "}
                </div>
            </div>

            <div className="mx-auto max-w-[460px]">
                <div className="grid grid-cols-1 gap-y-4">
                    {/* 이메일 */}
                    <div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            minLength={5}
                            placeholder="이메일"
                            className="block w-full mt-10 rounded-md bg-white px-3 py-1.5 text-base text-neutral-300 outline outline-1 -outline-offset-1 outline-neutral-300 placeholder:font-normal focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6"
                        />
                    </div>

                    {/* 비밀번호 */}
                    <div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            minLength={6}
                            placeholder="비밀번호(영문 + 숫자 6자리 이상)"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-neutral-300 outline outline-1 -outline-offset-1 outline-neutral-300 placeholder:font-normal focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6"
                        />
                    </div>

                    {/* 로그인 버튼 */}
                    <div className="mt-10 mb-10">
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-sky-500 px-3 py-2 text-lg font-semibold text-white hover:bg-sky-400"
                        >
                            로그인
                        </button>
                    </div>

                    {/* 구분선 - SNS 로그인 */}
                    <div className="flex items-center my-6">
                        <hr className="flex-grow border-t border-neutral-300" />
                        <span className="mx-4 text-base font-normal text-neutral-300">
                            SNS 로그인
                        </span>
                        <hr className="flex-grow border-t border-neutral-300" />
                    </div>

                    <div className="flex justify-center gap-4 mt-6">
                        {/* 네이버 버튼 */}
                        <button className="flex items-center justify-center w-14 h-14 rounded-full overflow-hidden">
                            <img
                                src="/images/naver.png"
                                alt="네이버 로고"
                                className="w-full h-full object-cover"
                            />
                        </button>

                        {/* 카카오 버튼 */}
                        <button className="flex items-center justify-center w-14 h-14 rounded-full overflow-hidden">
                            <img
                                src="/images/kakao.png"
                                alt="카카오 로고"
                                className="w-full h-full object-cover"
                            />
                        </button>
                    </div>

                    {/* 아직 회원이 아니신가요? */}
                    <div className="flex justify-center items-center mt-4 text-base font-normal text-neutral-300">
                        <span>아직 회원이 아니신가요? </span>
                        <button className="ml-2 text-sky-500 text-base font-norma">
                            회원가입하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
