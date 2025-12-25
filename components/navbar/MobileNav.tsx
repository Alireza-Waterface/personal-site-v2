"use client";

import Link from "next/link";
import { useState, useRef } from "react";

import { useOutsideClick } from "@/lib/useOutsideClick";
import { Locale } from "@/lib/getDictionary";

import { IoClose, IoMenu } from "react-icons/io5";

interface NavDict {
   home: string;
   blog: string;
   capabilities: string;
   projects: string;
   resume: string;
   contact: string;
}

export default function MobileNav({
   dict,
   lang,
}: {
   dict: NavDict;
   lang: Locale;
}) {
   const [isOpen, setIsOpen] = useState(false);
   const navRef = useRef<HTMLDivElement>(null);

   useOutsideClick(navRef, () => {
      if (isOpen) setIsOpen(false);
   });

   const closeNav = () => setIsOpen(false);

   const linkStyle =
      "p-2 active:translate-y-0.5 text-sm sm:text-lg rounded-sm transition-all hover:bg-gray-300 dark:hover:bg-gray-800 w-full max-w-sm text-center";

   return (
      <div ref={navRef} className="block sm:hidden">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer text-xl block"
            aria-label="Toggle Navigation"
         >
            {!isOpen && <IoMenu size={30} />}
            {isOpen && <IoClose size={30} />}
         </button>

         <div
            className={`absolute left-0 bg-gray-200/50 dark:bg-gray-700/50 backdrop-blur-sm w-full transition-all duration-300 ease-out z-[-1]
               ${
                  isOpen
                     ? "top-[86px] scale-100 opacity-100 pointer-events-auto"
                     : "-top-40 scale-50 opacity-0 pointer-events-none"
               }
            `}
         >
            <nav className="flex flex-col items-center gap-2 text-xl py-2">
               <Link
                  className={linkStyle}
                  href={`/${lang}/`}
                  onClick={closeNav}
               >
                  {dict.home}
               </Link>
               <Link
                  className={linkStyle}
                  href={`/${lang}/blogs`}
                  onClick={closeNav}
               >
                  {dict.blog}
               </Link>
               <Link
                  className={linkStyle}
                  href={`/${lang}#capabilities`}
                  onClick={closeNav}
               >
                  {dict.capabilities}
               </Link>
               <Link
                  className={linkStyle}
                  href={`/${lang}/projects`}
                  onClick={closeNav}
               >
                  {dict.projects}
               </Link>
               <Link
                  className={linkStyle}
                  href={`/${lang}#resume`}
                  onClick={closeNav}
               >
                  {dict.resume}
               </Link>
               <Link
                  className={linkStyle}
                  href={`/${lang}#contact`}
                  onClick={closeNav}
               >
                  {dict.contact}
               </Link>
            </nav>
         </div>
      </div>
   );
}
