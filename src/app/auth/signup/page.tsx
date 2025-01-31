"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ next/navigation에서 import
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { signUp } from "@/utils/authapi";
import { AxiosError } from "axios"; // ✅ AxiosError 타입 추가

export default function Signup() {
   const router = useRouter();

   const [formData, setFormData] = useState({
      email: "",
      fullName: "",
      nickname: "",
      password: "",
      confirmPassword: "",
   });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (formData.password !== formData.confirmPassword) {
         alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
         return;
      }

      try {
         const response = await signUp({
            email: formData.email,
            fullName: formData.fullName,
            password: formData.password,
         });

         console.log("✅ 회원가입 성공:", response.data);

         alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");

         if (typeof window !== "undefined") {
            router.push("/auth/login"); // ✅ 정상적인 클라이언트 사이드 라우팅
         }
      } catch (error) {
         if (error instanceof AxiosError) {
            console.error("❌ 회원가입 실패:", error);
            alert(error.response?.data?.message || "회원가입에 실패했습니다. 다시 시도해주세요.");
         } else {
            console.error("❌ 예기치 않은 오류 발생:", error);
            alert("회원가입 중 오류가 발생했습니다.");
         }
      }
   };

   return (
      <div className="min-h-screen">
         <Header />
         <div className="space-y-16 mt-20">
            <div className="mx-auto max-w-460px text-center">
               <div className="text-3xl font-bold text-neutral-800">강원도 여행이 쉬워지는 첫걸음!</div>
               <div className="text-3xl font-bold text-neutral-800">Gangwon Go!</div>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto max-w-460px">
               <div className="grid grid-cols-1 gap-y-4">
                  <input
                     id="email"
                     name="email"
                     type="email"
                     required
                     placeholder="이메일"
                     className="block w-full mt-10 rounded-md bg-white px-3 py-1.5 text-base text-neutral-800 outline outline-1 outline-neutral-300 focus:outline-sky-500"
                     value={formData.email}
                     onChange={handleChange}
                  />
                  <input
                     id="name"
                     name="fullName"
                     type="text"
                     required
                     placeholder="이름"
                     className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-neutral-800 outline outline-1 outline-neutral-300 focus:outline-sky-500"
                     value={formData.fullName}
                     onChange={handleChange}
                  />
                  <input
                     id="nickname"
                     name="nickname"
                     type="text"
                     required
                     placeholder="닉네임"
                     className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-neutral-800 outline outline-1 outline-neutral-300 focus:outline-sky-500"
                     value={formData.nickname}
                     onChange={handleChange}
                  />
                  <input
                     id="password"
                     name="password"
                     type="password"
                     required
                     placeholder="비밀번호(영문 + 숫자 6자리 이상)"
                     className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-neutral-800 outline outline-1 outline-neutral-300 focus:outline-sky-500"
                     value={formData.password}
                     onChange={handleChange}
                  />
                  <input
                     id="confirmPassword"
                     name="confirmPassword"
                     type="password"
                     required
                     placeholder="비밀번호 확인"
                     className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-neutral-800 outline outline-1 outline-neutral-300 focus:outline-sky-500"
                     value={formData.confirmPassword}
                     onChange={handleChange}
                  />

                  <button
                     type="submit"
                     className="w-full mt-10 mb-10 rounded-lg bg-sky-500 px-3 py-2 text-lg font-semibold text-white hover:bg-sky-400">
                     회원가입
                  </button>
               </div>
            </form>
         </div>
         <Footer />
      </div>
   );
}
