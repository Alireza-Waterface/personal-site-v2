import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";

import logo from "@/app/icon.png";

import { getDictionary, Locale } from "@/lib/getDictionary";

import LanguageSwitcher from "./LangSwitch";
import ThemeSwitcher from "./ThemeSwitch";

import { IoMenu } from "react-icons/io5";

export default async function Navbar({ lang }: { lang: Locale }) {
   const dict = await getDictionary(lang);

   const headerList = await headers();
   const pathName = headerList.get("x-pathname") ?? "/";

   const baseStyle = "p-2 rounded-sm transition-all";
   const activeStyle = "bg-gray-400/50 dark:bg-gray-900";
   const inactiveStyle = "hover:bg-gray-300 dark:hover:bg-gray-700";

   const isActive = (route: string) => {
      if (route === "/") {
         return pathName === "/" || pathName === `/${lang}`;
      }
      return pathName.includes(route);
   };

   return (
      <div className="p-2 bg-gray-200 dark:bg-gray-800 relative flex items-center justify-between gap-4 z-20">
         <div className="flex items-center gap-8">
            <label
               htmlFor="nav-toggle"
               className="cursor-pointer text-xl block sm:hidden"
            >
               <IoMenu size={30} />
            </label>

            <Image
               src={logo.src}
               alt="Innovation Logo"
               width={70}
               height={70}
               quality={75}
               className="rounded-full select-none"
            />

            <nav className="hidden sm:flex items-center gap-2 text-sm md:text-lg lg:gap-4">
               <Link
                  className={`${baseStyle} ${
                     isActive("/") ? activeStyle : inactiveStyle
                  }`}
                  href={"/"}
               >
                  {dict.nav.home}
               </Link>
               <Link
                  className={`${baseStyle} ${
                     isActive("/blogs") ? activeStyle : inactiveStyle
                  }`}
                  href={"/blogs"}
               >
                  {dict.nav.blog}
               </Link>
               <Link
                  className={`${baseStyle} ${inactiveStyle}`}
                  href={"#skills"}
               >
                  {dict.nav.skills}
               </Link>
               <Link
                  className={`${baseStyle} ${
                     isActive("/projects") ? activeStyle : inactiveStyle
                  }`}
                  href={"/projects"}
               >
                  {dict.nav.projects}
               </Link>
               <Link
                  className={`${baseStyle} ${inactiveStyle}`}
                  href={"#resume"}
               >
                  {dict.nav.resume}
               </Link>
               <Link
                  className={`${baseStyle} ${inactiveStyle}`}
                  href={"#contact"}
               >
                  {dict.nav.contact}
               </Link>
            </nav>
         </div>

         <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher lang={lang} />
         </div>

         <input
            type="checkbox"
            name="nav-toggle"
            id="nav-toggle"
            className="hidden peer"
         />

         <div className="absolute sm:hidden left-0 bg-gray-200/50 dark:bg-gray-700/50 backdrop-blur-sm w-full transition-all -top-40 scale-50 opacity-0 pointer-events-none peer-checked:top-[86px] peer-checked:scale-100 peer-checked:opacity-100 peer-checked:pointer-events-auto">
            <nav className="flex flex-col items-center gap-2 text-xl py-2">
               <Link
                  className="p-2 active:translate-y-0.5 text-sm sm:text-lg rounded-sm transition-all hover:bg-gray-300 dark:hover:bg-gray-800 w-full max-w-sm text-center"
                  href={"/"}
               >
                  {dict.nav.home}
               </Link>
               <Link
                  className="p-2 active:translate-y-0.5 text-sm sm:text-lg rounded-sm transition-all hover:bg-gray-300 dark:hover:bg-gray-800 w-full max-w-sm text-center"
                  href={"/blogs"}
               >
                  {dict.nav.blog}
               </Link>
               <Link
                  className="p-2 active:translate-y-0.5 text-sm sm:text-lg rounded-sm transition-all hover:bg-gray-300 dark:hover:bg-gray-800 w-full max-w-sm text-center"
                  href={"#skills"}
               >
                  {dict.nav.skills}
               </Link>
               <Link
                  className="p-2 active:translate-y-0.5 text-sm sm:text-lg rounded-sm transition-all hover:bg-gray-300 dark:hover:bg-gray-800 w-full max-w-sm text-center"
                  href={"/projects"}
               >
                  {dict.nav.projects}
               </Link>
               <Link
                  className="p-2 active:translate-y-0.5 text-sm sm:text-lg rounded-sm transition-all hover:bg-gray-300 dark:hover:bg-gray-800 w-full max-w-sm text-center"
                  href={"#resume"}
               >
                  {dict.nav.resume}
               </Link>
               <Link
                  className="p-2 active:translate-y-0.5 text-sm sm:text-lg rounded-sm transition-all hover:bg-gray-300 dark:hover:bg-gray-800 w-full max-w-sm text-center"
                  href={"#contact"}
               >
                  {dict.nav.contact}
               </Link>
            </nav>
         </div>
      </div>
   );
}
