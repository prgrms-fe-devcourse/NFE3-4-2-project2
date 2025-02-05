"use client";

import Image from "next/image";

export default function Footer() {
   return (
      <footer className="bg-amber-50 pt-12 pb-10">
         <div className="mx-auto max-w-screen-xl px-4">
            <div className="flex justify-between">
               <div className="text-orange-500">
                  <h2 className=" font-black text-3xl">Gangwon Go</h2>
                  <p >Programmers 2nd Project - 3Team</p>
               </div>
               <div className="flex gap-16 text-neutral-800">
                  <div>
                     <p className="font-semibold">Team</p>
                     <div className="flex gap-2 font-light ">
                        <a className="hover:underline" href="https://github.com/cj2174/3team-gangwon" target="_blank">Github</a>
                        <span className="text-neutral-300">|</span>
                        <a className="hover:underline" href="https://www.notion.so/2-Project-3-3045e48721fd42149f27ccedfa13bcdd" target="_blank">Notion</a>
                     </div>
                  </div>
                  <div>
                     <p className="font-semibold">Member</p>
                     <div className="flex gap-2 font-light">
                        <a className="hover:underline" href="https://github.com/erase0250" target="_blank">Kim Jiu</a>
                        <span className="text-neutral-300">|</span>
                        <a className="hover:underline" href="https://github.com/DohyoungSeong" target="_blank">Seong Dohyeong</a>
                        <span className="text-neutral-300">|</span>
                        <a className="hover:underline" href="https://github.com/erase0250" target="_blank">Choi Yunseo</a>
                        <span className="text-neutral-300">|</span>
                        <a className="hover:underline" href="https://github.com/jihye-c" target="_blank">Choi Jihye</a>
                     </div>
                  </div>
               </div>
            </div>
            <hr className="my-6" />
            <div className="flex justify-between">
            <p className="text-sm text-neutral-500">© 2025 Gangwon GO All Rights Reserved.</p>
            <div className="flex justify-end items-center gap-x-4">
               <Image className="mr-2" width={90} height={20} style={{width:"auto", height:"auto"}} src="/images/tourapi.png" alt="tourAPI" />
               <Image width={80} height={20} style={{width:"auto", height:"auto"}} src="/images/ktoLogo.webp" alt="KTO Logo" />
            </div>
            </div>
            
         </div>
      </footer>
   );
}
