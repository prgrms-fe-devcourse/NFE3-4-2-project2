"use client";
import { MegaphoneIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { logOut } from "@/lib/redux/slice/authSlice";
export default function User() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const axiosConfig = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  };
  // 로그인된 유저의 정보
  const { isAuth, userName, userId } = useAppSelector(
    (state) => state.authReducer.value
  );

  interface UserInfo {
    email: string;
    fullName: string;
    password: string;
    passwordCheck: string;
  }
  // 현재 유저의 정보
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    fullName: "",
    password: "",
    passwordCheck: "",
  });

  // 유저 정보 받아오기
  async function getUserInfo(userId: string) {
    // const response = await axios.get(`${process.env.NEXT_PUBLIC_BASIC_URL}/login`
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASIC_URL}/users/${userId}`
    );
    const data = response.data;
    console.log(data);
    setUserInfo((state) => ({
      ...state,
      email: data.email,
      fullName: data.fullName,
    }));
  }
  useEffect(() => {
    getUserInfo(userId);
  }, []);

  function handleUpdateSubmit() {
    setUserName();
    setPassword();
  }
  // 유저 이름 변경
  async function setUserName() {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASIC_URL}/settings/update-user`,
        {
          fullName: userInfo.fullName,
          username: userInfo.email,
        },
        axiosConfig
      );
      if (response.status !== 200) {
        console.log("login error => ", response.status);
        return;
      }
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    } catch (error) {
      console.log(error);
    }
  }

  // 비밀번호 변경
  async function setPassword() {
    try {
      if (userInfo.password === userInfo.passwordCheck) {
        console.log("yes");
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BASIC_URL}/settings/update-password`,
          {
            password: userInfo.password,
          },
          axiosConfig
        );
        if (response.status !== 200) {
          console.log("login error => ", response.status);
          return;
        }
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        dispatch(logOut());
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  function handleLoginValueChange(
    field: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setUserInfo((state) => ({
      ...state,
      [field]: e.target.value,
    }));
  }

  return (
    <>
      <div className="bg-[#F6E3C1] h-[850px] flex flex-col items-center">
        {/* 상단 */}
        <div className="w-[50%] h-[30%] bg-white mt-10 rounded-2xl flex flex-col ">
          {/* 제목 */}
          <div className="flex flex-row gap-5 items-center ml-5 mt-6">
            <MegaphoneIcon className="size-9 stroke-[1]" />
            <span>공지사항</span>
          </div>
          {/* 내용 */}
          <div className="flex flex-col items-start mt-4 gap-2 ml-[75px]">
            <div>회원님의 소중한 개인정보는 안전하게 보호됩니다.</div>
            <div>
              변경할 정보를 입력한 후{" "}
              <span className="font-bold">"수정하기"</span> 버튼을 눌러주세요.
            </div>
            <div>
              비밀번호 변경 시 보안 강화를 위해 영문, 숫자, 특수문자를 포함해
              주세요.
            </div>
          </div>
        </div>
        <div className="w-[50%] h-[60%] bg-white mt-20 rounded-2xl flex flex-col gap-5 mb-8 ">
          {/* 제목 */}
          <div className=" text-center mt-12">
            <span className="font-bold text-2xl">회원정보 수정</span>
          </div>
          {/* 내용 */}
          <div className="flex flex-col items-center mt-5 gap-2">
            <form method="post" className="flex flex-col w-[340px] gap-5">
              <input
                type="text"
                value={userInfo?.email}
                onChange={(e) => handleLoginValueChange("email", e)}
                className="px-3 py-2 bg-gray-100 text-black rounded-md placeholder:capitalize placeholder:font-bold placeholder:text-gray-400 focus:outline-none"
              />
              <input
                type="text"
                value={userInfo?.fullName}
                onChange={(e) => handleLoginValueChange("fullName", e)}
                className="px-3 py-2 bg-gray-100 rounded-md text-black placeholder:capitalize placeholder:font-bold  focus:outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => handleLoginValueChange("password", e)}
                className="px-3 py-2 bg-gray-100 rounded-md text-black placeholder:capitalize placeholder:font-bold placeholder:text-gray-300 focus:outline-none"
              />
              <input
                type="password"
                placeholder="Password Check"
                onChange={(e) => handleLoginValueChange("passwordCheck", e)}
                className="px-3 py-2 bg-gray-100 rounded-md text-black placeholder:capitalize placeholder:text-gray-300 focus:outline-none"
              />
              <input
                onClick={handleUpdateSubmit}
                type="button"
                value="수정하기"
                className="px-4 py-2 text-lg font-medium text-white bg-[#EE765E] rounded-md cursor-pointer hover:bg-[#F56042]"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
