"use client";

import { AxiosError } from "axios";
import Link from "next/link";
import { useState } from "react";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { login } from "@/utils/authapi";
import { setCookie } from "@/utils/cookie";

interface LoginResponse {
   token: string;
   user: {
      fullName: string;
      _id: string;
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

         if (data.token) {
            localStorage.setItem("accessToken", data.token);
            localStorage.setItem("userId", data.user._id);
            localStorage.setItem("nickname", data.user.fullName || "사용자");
            setCookie("userId", data.user._id, 7);
         }

         setTimeout(() => {
            alert("로그인에 성공하였습니다! 메인 페이지로 이동합니다.");
            window.location.replace("/");
         }, 100);
      } catch (error) {
         if (error instanceof AxiosError) {
            console.error("❌ 로그인 실패:", error);
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
         <div className="flex flex-col justify-center items-center px-6 py-24 pt-[200px] pb-[160px]">
            {/* 로그인 타이틀 */}
            <div className="text-center mb-12">
               <h1 className="text-4xl font-extrabold text-neutral-800">다시 만나 반가워요👋</h1>
               <h2 className="text-4xl font-extrabold text-sky-600 mt-2">Gangwon Go!</h2>
            </div>

            {/* 로그인 박스 */}
            <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
               <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 이메일 입력 */}
                  <div className="relative">
                     <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        minLength={5}
                        placeholder="이메일"
                        className="block w-full h-[50px] rounded-lg bg-gray-100 px-4 py-3 pl-12 text-base text-neutral-800 outline-none focus:ring-2 focus:ring-sky-500"
                        value={formData.email}
                        onChange={handleChange}
                     />
                     <i className="bi bi-envelope-fill absolute left-4 top-[50%] -translate-y-1/2 text-gray-500 text-lg"></i>
                  </div>

                  {/* 비밀번호 입력 */}
                  <div className="relative">
                     <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        minLength={6}
                        placeholder="비밀번호"
                        className="block w-full h-[50px] rounded-lg bg-gray-100 px-4 py-3 pl-12 text-base text-neutral-800 outline-none focus:ring-2 focus:ring-sky-500"
                        value={formData.password}
                        onChange={handleChange}
                     />
                     <i className="bi bi-lock-fill absolute left-4 top-[50%] -translate-y-1/2 text-gray-500 text-lg"></i>
                  </div>

                  {/* 로그인 버튼 */}
                  <button
                     type="submit"
                     className="w-full mt-4 py-3 rounded-lg bg-sky-500 text-lg font-semibold text-white hover:bg-sky-600 transition-shadow shadow-md hover:shadow-xl">
                     로그인
                  </button>
               </form>

               {/* 회원가입 링크 */}
               <div className="text-center mt-6">
                  <span className="text-gray-600 text-sm">아직 회원이 아니신가요?</span>
                  <Link href="/auth/signup">
                     <button className="ml-2 text-sky-500 text-sm font-semibold hover:underline">회원가입하기</button>
                  </Link>
               </div>
            </div>
         </div>
         <Footer />
      </div>
   );
}
