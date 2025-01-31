"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ useRouter 추가
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import Link from "next/link";
import { login } from "@/utils/authapi"; // authapi.ts의 login 함수를 가져옵니다.

export default function Login() {
   const router = useRouter(); // ✅ useRouter 정상 동작

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

         console.log("로그인 성공:", response.data);

         alert("로그인에 성공하였습니다! 메인 페이지로 이동합니다."); // ✅ 로그인 성공 알림

         if (typeof window !== "undefined") {
            router.push("/"); // ✅ 메인 페이지로 이동
         }
      } catch (error) {
         console.error("로그인 실패:", error.message);
         alert("로그인에 실패하였습니다. 이메일 또는 비밀번호를 확인해주세요."); // ✅ 로그인 실패 알림
      }
   };

   return (
      <div className="min-h-screen">
         <Header />
         <div className="space-y-16 mt-20">
            <div className="mx-auto max-w-460px text-center">
               <div className="text-3xl font-bold text-neutral-800">로그인</div>
            </div>

            <div className="mx-auto max-w-460px">
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
                        className="block w-full mt-10 rounded-md bg-white px-3 py-1.5 text-base text-neutral-800 outline outline-1 outline-neutral-300 focus:outline-sky-500"
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
                        placeholder="비밀번호(영문 + 숫자 6자리 이상)"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-neutral-800 outline outline-1 outline-neutral-300 focus:outline-sky-500"
                        value={formData.password}
                        onChange={handleChange}
                     />
                  </div>

                  {/* 로그인 버튼 */}
                  <div className="mt-10 mb-10">
                     <button
                        type="submit"
                        className="w-full rounded-lg bg-sky-500 px-3 py-2 text-lg font-semibold text-white hover:bg-sky-400">
                        로그인
                     </button>
                  </div>

                  {/* 구분선 - SNS 로그인 */}
                  <div className="flex items-center my-6">
                     <hr className="flex-grow border-t border-neutral-300" />
                     <span className="mx-4 text-base font-normal text-neutral-300">SNS 로그인</span>
                     <hr className="flex-grow border-t border-neutral-300" />
                  </div>

                  <div className="flex justify-center gap-4 mb-12">
                     {/* 네이버 버튼 */}
                     <button
                        className="flex items-center justify-center rounded-full overflow-hidden"
                        onClick={() => alert("네이버 로그인 버튼 클릭됨")}>
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
                        onClick={() => alert("카카오 로그인 버튼 클릭됨")}>
                        <Image
                           src="/images/kakao.png"
                           alt="카카오 로고"
                           className="w-full h-full object-cover"
                           width={50}
                           height={50}
                        />
                     </button>
                  </div>

                  {/* 아직 회원이 아니신가요? */}
                  <div className="flex justify-center items-center mt-4 text-base font-normal text-neutral-300 mb-12">
                     <span>아직 회원이 아니신가요?</span>
                     <Link href="/auth/signup">
                        <button className="ml-2 text-sky-500 text-base font-normal">회원가입하기</button>
                     </Link>
                  </div>
               </form>
            </div>
         </div>
         <Footer />
      </div>
   );
}
