"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const menus = [
        { name: "주요 관광지", href: "#" },
        { name: "축제·공연·행사", href: "#" },
        { name: "레저 및 체험", href: "#" },
        { name: "예약", href: "#" },
        { name: "커뮤니티", href: "#" },
        { name: "로그인", href: "/auth/login" }, // 경로 테스트
        { name: "회원가입", href: "/auth/signup" }, // 경로 테스트
    ];

    return (
        <header className="bg-white shadow-md">
            <nav className="mx-auto max-w-7xl p-4 lg:px-8">
                <div className="flex lg:flex-col items-start justify-between lg:justify-start">
                    {/* 로고 */}
                    <a
                        href="#"
                        className="text-xl font-bold text-orange-500 no-underline mb-2"
                    >
                        LOGO
                    </a>

                    {/* 데스크탑 메뉴 */}
                    <div className="hidden lg:flex lg:flex-col lg:items-start">
                        <ul className="flex gap-8 text-gray-700 justify-start">
                            {menus.map((menu) => (
                                <li key={menu.name}>
                                    <a
                                        href={menu.href}
                                        className="text-lg font-semibold no-underline hover:text-orange-500"
                                    >
                                        {menu.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 모바일 메뉴 버튼 */}
                    <div className="lg:hidden ml-auto">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700"
                        >
                            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* 모바일 메뉴 */}
            <Dialog
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                className="lg:hidden"
            >
                <div className="fixed inset-0 z-10 bg-gray-800 bg-opacity-25" />
                <DialogPanel className="fixed inset-y-0 right-0 z-20 w-4/5 max-w-xs bg-white p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <a
                            href="#"
                            className="text-2xl font-bold text-orange-500 no-underline"
                        >
                            LOGO
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="rounded-md p-2 text-gray-700"
                        >
                            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6">
                        <ul className="space-y-4">
                            {menus.map((menu) => (
                                <li key={menu.name}>
                                    <a
                                        href={menu.href}
                                        className="block text-lg font-semibold text-gray-700 no-underline hover:text-orange-500"
                                    >
                                        {menu.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
}
