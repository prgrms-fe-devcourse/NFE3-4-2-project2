"use client";

import { useRouter } from "next/navigation";
import "./globals.css";

import { UserCircleIcon } from "@heroicons/react/20/solid";

import ReduxProvider from "@/lib/redux/provider";
import { useAppSelector } from "@/lib/redux/store";
import GagsiMaskIcon from "@/components/quiz/svg/GagsiMaskIcon";
import React, { useState } from "react";
import NotificationModal from "@/components/NotificationModal";
import Logo from "../../public/logo.png";
import Image from "next/image";

interface props {
  isNotification: boolean;
  notificationHandler: () => void;
}

function Header({ isNotification, notificationHandler }: props) {
  const router = useRouter();
  const { isAuth, userId } = useAppSelector((state) => state.authReducer.value);

  return (
    <header className="flex justify-between items-center h-[70px] px-9 bg-[#FFFFFF] min-w-full">
      {/* 헤더 왼쪽 */}

      <div className="left gap-11 flex ">
        <div
          onClick={() => {
            router.push("/");
          }}
          className="icon gap-4 flex flex-row justify-center items-center hover:cursor-pointer"
        >
          {" "}
          <Image className="w-[68px] h-[44px]" src={Logo} alt={""} />
          <div className="flex flex-col text-black h-[60px]">
            <span className="text-stone-500 font-semibold text-[10px]">
              감춰진 역사 투어
            </span>
            <span className="text-4xl h-3/4 font-bold ">감투</span>
          </div>
        </div>
        <div className="router flex items-center gap-7 font-semibold text-xl text-black hover:cursor-pointer">
          <span
            onClick={() => {
              router.push("/");
            }}
          >
            홈으로
          </span>
          <span
            onClick={() => {
              router.push("/culture");
            }}
          >
            모든문화재
          </span>
          <div
            onClick={() => {
              router.push("/festival");
            }}
            className="flex flex-row "
          >
            {" "}
            <span className="text-[#FA870E]">행사</span>
            <span>달력</span>
          </div>

          <div
            onClick={() => {
              router.push("/quiz");
            }}
            className="flex flex-row"
          >
            <span className="text-[#B23742]">퀴즈</span>
            <span>풀기</span>
          </div>
          <span
            onClick={() => {
              router.push("/qna");
            }}
          >
            Q&A
          </span>
        </div>
      </div>
      {/* 헤더 오른쪽 */}

      {isAuth ? (
        <div className="flex items-center">
          {isNotification ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              onClick={notificationHandler}
              fill="currentColor"
              className="size-8 mr-4"
            >
              <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.57 16.476c-.223.082-.448.161-.674.238L7.319 4.137A6.75 6.75 0 0 1 18.75 9v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206Z" />
              <path
                fillRule="evenodd"
                d="M5.25 9c0-.184.007-.366.022-.546l10.384 10.384a3.751 3.751 0 0 1-7.396-1.119 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={notificationHandler}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-8 mr-4"
            >
              <path
                fillRule="evenodd"
                d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                clipRule="evenodd"
              />
            </svg>
          )}

          <div
            onClick={() => {
              router.push("/user");
            }}
            className="w-[60px] h-[60px] rounded-full border-2 overflow-hidden content-center border-black hover:cursor-pointer"
          >
            <GagsiMaskIcon width={56} height={53} color={"#00000"} />
          </div>
        </div>
      ) : (
        <div className="right flex flex-row items-center gap-5">
          <UserCircleIcon className="size-8 text-black hover:cursor-pointer" />
          <span
            onClick={() => {
              router.push("/login");
            }}
            className="font-semibold text-xl hover:cursor-pointer"
          >
            로그인
          </span>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="text-stone-400 text-xs">
      <div className="upper flex justify-around items-center h-52 bg-[#E9ECEF]">
        <div className="directory flex flex-col">
          <span className="text-black text-xs font-semibold mb-3">
            DIRECTORY
          </span>
          <span>
            Lorem, ipsum dolor sit amet consectetur <br />
            adipisicing elit. Assumenda, saepe.
          </span>
        </div>
        <div className="rentals flex flex-col">
          <span className="text-black text-xs font-semibold mb-3">Rooms</span>
          <span>Map on top</span>
          <span>Side map</span>
          <span>No map</span>
          <span>Room detail</span>
        </div>
        <div className="pages flex flex-col">
          <span className="text-black text-xs font-semibold mb-3">
            Comparison
          </span>
          <span>Team</span>
          <span>Contact</span>
        </div>
        <div className="dailyOffers&Discounts flex flex-col">
          <span className="text-black text-xs font-semibold mb-3">
            DAILY OFFERS & DISCOUNTS
          </span>
          <span>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Architecto, aut?
          </span>
        </div>
      </div>
      <div className="bottom flex flex-row justify-around items-center gap-x-96 h-16 bg-[#343A40]">
        <span className="">2025, Your company. All rights reserved</span>
        <div className="">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
            <path
              fillRule="evenodd"
              d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isNotification, setIsNotificationModal] = useState<boolean>(false);
  const notificationHandler = () => {
    setIsNotificationModal(!isNotification);
  };
  return (
    <>
      <html lang="en">
        <ReduxProvider>
          {
            <body>
              <div id="portal" />{" "}
              <Header
                isNotification={isNotification}
                notificationHandler={notificationHandler}
              />
              {isNotification ? <NotificationModal /> : ""}
              {children}
              <Footer />
            </body>
          }
        </ReduxProvider>
      </html>
    </>
  );
}
