"use client";

import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { signUp } from "@/utils/authapi";

export default function Signup() {
   const router = useRouter();

   const [formData, setFormData] = useState({
      email: "",
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
   });

   const [passwordError, setPasswordError] = useState<string | null>(null);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });

      if (name === "password") {
         validatePassword(value);
      }
   };

   const validatePassword = (password: string) => {
      const isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
      setPasswordError(isValid ? null : "비밀번호는 영문과 숫자를 포함한 6자 이상이어야 합니다.");
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (passwordError) {
         alert(passwordError);
         return;
      }

      if (formData.password !== formData.confirmPassword) {
         alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
         return;
      }

      try {
         const response = await signUp({
            email: formData.email,
            fullName: formData.fullName,
            username: formData.username,
            password: formData.password,
         });

         console.log("✅ 회원가입 성공:", response.data);

         alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");

         if (typeof window !== "undefined") {
            router.push("/auth/login");
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
         <div className="flex flex-col justify-center items-center px-6 py-24 pt-[180px] pb-[160px]">
            <div className="text-center mb-12">
               <h1 className="text-4xl font-extrabold text-neutral-800">강원도 여행이 쉬워지는 첫걸음!</h1>
               <h2 className="text-4xl font-extrabold text-sky-600 mt-2">Gangwon Go!</h2>
            </div>

            <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 border">
               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                     <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="이메일"
                        className="block w-full rounded-lg bg-gray-100 px-4 py-3 pl-12 text-base text-neutral-800 outline-none focus:ring-2 focus:ring-sky-500"
                        value={formData.email}
                        onChange={handleChange}
                     />
                     <i className="bi bi-envelope-fill absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                  </div>

                  <div className="relative">
                     <input
                        id="name"
                        name="fullName"
                        type="text"
                        required
                        placeholder="이름"
                        className="block w-full rounded-lg bg-gray-100 px-4 py-3 pl-12 text-base text-neutral-800 outline-none focus:ring-2 focus:ring-sky-500"
                        value={formData.fullName}
                        onChange={handleChange}
                     />
                     <i className="bi bi-person-fill absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                  </div>

                  <div className="relative">
                     <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        placeholder="닉네임"
                        className="block w-full rounded-lg bg-gray-100 px-4 py-3 pl-12 text-base text-neutral-800 outline-none focus:ring-2 focus:ring-sky-500"
                        value={formData.username}
                        onChange={handleChange}
                     />
                     <i className="bi bi-person-badge-fill absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                  </div>

                  <div className="relative">
                     <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="비밀번호(영문 + 숫자 6자리 이상)"
                        className={`block w-full rounded-lg px-4 py-3 pl-12 text-base text-neutral-800 outline-none focus:ring-2 
                           ${passwordError ? "border-red-500 focus:ring-red-500" : "bg-gray-100 focus:ring-sky-500"}`}
                        value={formData.password}
                        onChange={handleChange}
                     />
                     <i className="bi bi-lock-fill absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                     {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
                  </div>

                  <div className="relative">
                     <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        placeholder="비밀번호 확인"
                        className="block w-full rounded-lg bg-gray-100 px-4 py-3 pl-12 mb-4 text-base text-neutral-800 outline-none focus:ring-2 focus:ring-sky-500"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                     />
                     <i className="bi bi-lock-fill absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                  </div>

                  <button
                     type="submit"
                     className="w-full mt-8 py-3 rounded-lg bg-sky-500 text-lg font-semibold text-white hover:bg-sky-600 transition-shadow shadow-lg hover:shadow-xl">
                     회원가입
                  </button>
               </form>
            </div>
         </div>
         <Footer />
      </div>
   );
}
