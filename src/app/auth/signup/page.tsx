"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Image from "next/image";

export default function Signup() {
    return (
        <div className="min-h-screen">
            <Header />
            <div className="space-y-[16px] mt-20">
                <div className="mx-auto max-w-[460px] text-center">
                    <div className="text-3xl font-bold text-neutral-800">
                        강원도 여행이 쉬워지는 첫걸음!
                    </div>
                    <div className="text-3xl font-bold text-neutral-800">
                        Gangwon Go!
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

                        {/* 이름 */}
                        <div>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                minLength={2}
                                placeholder="이름"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-neutral-300 outline outline-1 -outline-offset-1 outline-neutral-300 placeholder:font-normal focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6"
                            />
                        </div>

                        {/* 닉네임 */}
                        <div>
                            <input
                                id="nickname"
                                name="nickname"
                                type="text"
                                autoComplete="nickname"
                                required
                                minLength={2}
                                placeholder="닉네임"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-neutral-300 outline outline-1 -outline-offset-1 outline-neutral-300 placeholder:font-normal focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6"
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

                        {/* 비밀번호 확인 */}
                        <div>
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                autoComplete="new-password"
                                required
                                minLength={6}
                                placeholder="비밀번호 확인"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-neutral-300 outline outline-1 -outline-offset-1 outline-neutral-300 placeholder:font-normal focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6"
                            />
                        </div>

                        {/* 회원가입 버튼 */}
                        <div className="mt-10 mb-10">
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-sky-500 px-3 py-2 text-lg font-semibold text-white hover:bg-sky-400"
                                onClick={() => alert("회원가입 버튼 클릭됨")}
                            >
                                회원가입
                            </button>
                        </div>

                        {/* 구분선 - SNS 회원가입 */}
                        <div className="flex items-center my-6">
                            <hr className="flex-grow border-t border-neutral-300" />
                            <span className="mx-4 text-base font-normal text-neutral-300">
                                SNS 회원가입
                            </span>
                            <hr className="flex-grow border-t border-neutral-300" />
                        </div>

                        <div className="flex justify-center gap-4 mb-12">
                            {/* 네이버 버튼 */}
                            <button
                                className="flex items-center justify-center rounded-full overflow-hidden"
                                onClick={() =>
                                    alert("네이버 로그인 버튼 클릭됨")
                                }
                            >
                                <Image
                                    src="/images/naver.png"
                                    alt="네이버 로고"
                                    className="w-full h-full object-cover"
                                    width={50}
                                    height={50}
                                />
                            </button>

                            {/* 카카오 버튼 */}
                            <button
                                className="flex items-center justify-center rounded-full overflow-hidden"
                                onClick={() =>
                                    alert("카카오 로그인 버튼 클릭됨")
                                }
                            >
                                <Image
                                    src="/images/kakao.png"
                                    alt="카카오 로고"
                                    className="w-full h-full object-cover"
                                    width={50}
                                    height={50}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
