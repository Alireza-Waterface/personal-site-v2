import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";

import logo from "@/app/icon.png";

import { getDictionary, Locale } from "@/lib/getDictionary";

import MobileNav from "./MobileNav";
import LanguageSwitcher from "./LangSwitch";
import ThemeSwitcher from "./ThemeSwitch";

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
      <div className="p-2 h-[60px] sm:h-[80px] bg-gray-300/50 dark:bg-gray-800/50 backdrop-blur-sm sticky top-0 flex items-center justify-between gap-4 z-20">
         <div className="flex items-center gap-8 relative h-full">
            <MobileNav lang={lang} dict={dict.nav} />

            <Link
               href={`/${lang}/`}
               title={lang === "en" ? "Home page" : "صفحه اصلی"}
               className="h-full flex items-center"
            >
               <Image
                  src={logo.src}
                  alt="Innovation Logo"
                  width={70}
                  height={70}
                  quality={75}
                  className="rounded-full select-none h-[50px] w-[50px] sm:h-full sm:w-full"
               />
            </Link>

            <nav className="hidden sm:flex items-center gap-2 text-sm md:text-lg lg:gap-4">
               <Link
                  className={`${baseStyle} ${
                     isActive("/") ? activeStyle : inactiveStyle
                  }`}
                  href={`/${lang}/`}
               >
                  {dict.nav.home}
               </Link>
               <Link
                  className={`${baseStyle} ${
                     isActive("/blogs") ? activeStyle : inactiveStyle
                  }`}
                  href={`/${lang}/blogs`}
               >
                  {dict.nav.blog}
               </Link>
               <Link
                  className={`${baseStyle} ${inactiveStyle}`}
                  href={`/${lang}#capabilities`}
               >
                  {dict.nav.capabilities}
               </Link>
               <Link
                  className={`${baseStyle} ${
                     isActive("/projects") ? activeStyle : inactiveStyle
                  }`}
                  href={`/${lang}/projects`}
               >
                  {dict.nav.projects}
               </Link>
               <Link
                  className={`${baseStyle} ${inactiveStyle}`}
                  href={`/${lang}#resume`}
               >
                  {dict.nav.resume}
               </Link>
               <Link
                  className={`${baseStyle} ${inactiveStyle}`}
                  href={`/${lang}#contact`}
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
      </div>
   );
}
