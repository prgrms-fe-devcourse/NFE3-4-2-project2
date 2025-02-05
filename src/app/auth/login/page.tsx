"use client";

import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Link from "next/link";
import { login } from "@/utils/authapi"; // authapi.ts의 login 함수를 가져옵니다.
import { AxiosError } from "axios"; // ✅ AxiosError 타입 추가
import { setCookie } from "@/utils/cookie";

interface LoginResponse {
   token: string;
   user: {
      fullName: string;
      _id: string; // 사용자 ID 추가
   };
}

export default function Login() {
   const [formData, setFormData] = useState({
      email: "",
      password: "",
   });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
         const response = await login({
            email: formData.email,
            password: formData.password,
         });

         const data: LoginResponse = response.data;
         console.log("✅ 로그인 성공:", data);

         // ✅ 토큰과 사용자 ID를 로컬스토리지에 저장
         if (data.token) {
            localStorage.setItem("accessToken", data.token);
            localStorage.setItem("userId", data.user._id); // 사용자 ID 저장
            localStorage.setItem("nickname", data.user.fullName || "사용자");

            setCookie("userId", data.user._id, 7);

            console.log("🍪 쿠키에 저장된 userId:", document.cookie);
         }

         alert("로그인에 성공하였습니다! 메인 페이지로 이동합니다.");

         // ✅ 로그인 후 강제 새로고침
         window.location.replace("/");
      } catch (error) {
         if (error instanceof AxiosError) {
            console.error("❌ 로그인 실패:", error);

            // 비밀번호나 이메일이 틀렸을 때 명확한 메시지 출력
            if (error.response?.status === 401) {
               alert("이메일 또는 비밀번호가 틀렸습니다. 다시 시도해주세요.");
            } else {
               alert(error.response?.data?.message || "로그인에 실패하였습니다.");
            }
         } else {
            console.error("❌ 예기치 않은 오류 발생:", error);
            alert("로그인 중 오류가 발생했습니다.");
         }
      }
   };

   return (
      <div className="min-h-screen">
         <Header />
         {/* 로그인 섹션에 여백 추가 */}
         <div className="space-y-16 mt-12 max-w-screen-xl mx-auto px-4 py-16">
            <div className="mx-auto max-w-460px text-center">
               <div className="text-3xl font-bold text-neutral-800">로그인</div>
            </div>

            <div className="mx-auto max-w-screen-sm">
               <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-4">
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
                        className="block w-[300px] sm:w-full mt-8 rounded-md bg-white px-3 py-1.5 text-base text-neutral-800 outline outline-1 outline-neutral-300 focus:outline-sky-500 mx-auto"
                        value={formData.email}
                        onChange={handleChange}
                     />
                  </div>

                  {/* 비밀번호 */}
                  <div>
                     <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        minLength={6}
                        placeholder="비밀번호"
                        className="block w-[300px] mt-2 sm:w-full rounded-md bg-white px-3 py-1.5 text-base text-neutral-800 outline outline-1 outline-neutral-300 focus:outline-sky-500 mx-auto"
                        value={formData.password}
                        onChange={handleChange}
                     />
                  </div>

                  {/* 로그인 버튼 */}
                  <div className="mt-10 mb-10">
                     <button
                        type="submit"
                        className="w-[300px] sm:w-full rounded-lg bg-sky-500 px-3 py-2 text-lg font-semibold text-white hover:bg-sky-400 mx-auto">
                        로그인
                     </button>
                  </div>

                  {/* 아직 회원이 아니신가요? */}
                  <div className="flex justify-center items-center mt-4 text-base font-normal text-neutral-300 mb-12">
                     <span>아직 회원이 아니신가요?</span>
                     <Link href="/auth/signup">
                        <button className="ml-2 text-sky-500 text-base font-normal hover:underline">
                           회원가입하기
                        </button>
                     </Link>
                  </div>
               </form>
            </div>
         </div>
         <Footer />
      </div>
   );
}
