"use client";

import { usePathname, useRouter } from "next/navigation";
import { Activity, useRef, useState } from "react";

import { useOutsideClick } from "@/lib/useOutsideClick";

import { IoLanguage } from "react-icons/io5";

export default function LanguageSwitcher() {
   const pathName = usePathname();
   const router = useRouter();
   const [isSwitcherVisible, setIsSwitcherVisible] = useState<boolean>(false);

   const switchRef = useRef<HTMLDivElement>(null);

   useOutsideClick(switchRef, () => {
      setIsSwitcherVisible(false);
   });

   const isEnglish = pathName.startsWith("/en");

   function switchLanguage(
      e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
   ) {
      e.stopPropagation();

      const button = (e.target as HTMLElement).closest("button");
      if (!button) return;

      const selectedLang = button.name as "en" | "fa";

      if (selectedLang === "en" && isEnglish) return;
      if (selectedLang === "fa" && !isEnglish) return;

      if (!pathName) return;
      const segments = pathName.split("/");
      if (segments.length < 2) return;

      segments[1] = selectedLang;
      const newPath = segments.join("/") || "/";
      router.push(newPath);
   }

   return (
      <div className="relative">
         <button
            className="cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded-md active:translate-y-[3px] transition-all"
            onClick={() => setIsSwitcherVisible((prev) => !prev)}
            title={isEnglish ? "Switch language" : "تغییر زبان"}
         >
            <IoLanguage size={25} />
         </button>

         <Activity mode={isSwitcherVisible ? "visible" : "hidden"}>
            <div
               ref={switchRef}
               className="absolute top-[50px] end-0 bg-gray-300 p-2 rounded-sm dark:bg-gray-700 flex flex-col gap-2 shadow-md"
               onClick={switchLanguage}
               onMouseLeave={() => setIsSwitcherVisible((prev) => !prev)}
            >
               <button
                  name="en"
                  className="flex items-center justify-between gap-2 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 transition-all rounded-md cursor-pointer select-none"
               >
                  English
               </button>
               <button
                  name="fa"
                  className="flex items-center justify-between gap-2 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 transition-all rounded-md cursor-pointer select-none"
               >
                  فارسی
               </button>
            </div>
         </Activity>
      </div>
   );
}
