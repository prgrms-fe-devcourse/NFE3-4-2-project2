import React from "react";
import Logo from "@public/icons/jejumonth-logo"

const Footer = () => {
  return (
    <footer className=" w-full bg-gray-3 py-10">
      <div className="container mx-auto flex flex-wrap justify-between px-6 p-30">
        <div className="w-full md:w-1/4 flex flex-col items-start justify-center">
          <Logo width={153} height={44} className="flex justify-center"/>
          <p className="text-gray-10 mt-2 text-sm">
            Book your trip in minutes, get full control for much longer.
          </p>
        </div>

        <div className="w-full md:w-1/5">
          <h3 className="font-bold text-black text-lg mb-3">회사소개</h3>
          <ul className="space-y-4">
            <li><a href="#" className="text-gray-8 hover:text-primary-2">About</a></li>
            <li><a href="#" className="text-gray-8 hover:text-primary-2">Careers</a></li>
            <li><a href="#" className="text-gray-8 hover:text-primary-2">Mobile</a></li>
          </ul>
        </div>

        <div className="w-full md:w-1/5">
          <h3 className="font-bold text-black text-lg mb-3">이용약관</h3>
          <ul className="space-y-4">
            <li><a href="#" className="text-gray-8 hover:text-primary-2">Help / FAQ</a></li>
            <li><a href="#" className="text-gray-8 hover:text-primary-2">Press</a></li>
            <li><a href="#" className="text-gray-8 hover:text-primary-2">Affiliates</a></li>
          </ul>
        </div>

        <div className="w-full md:w-1/5">
          <h3 className="font-bold text-black text-lg mb-3">고객센터</h3>
          <ul className="space-y-4">
            <li><a href="#" className="text-gray-8 hover:text-primary-2">Airline fees</a></li>
            <li><a href="#" className="text-gray-8 hover:text-primary-2">Airline</a></li>
            <li><a href="#" className="text-gray-8 hover:text-primary-2">Low fare tips</a></li>
          </ul>
        </div>
      </div>


      <div className="border-t-8 border-gray-10 mt-6 pt-4 text-center">
        <p className="text-gray-7 text-xs">
          © {new Date().getFullYear()} JEJUMONTH. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
