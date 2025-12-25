"use client";

import { Locale } from "@/lib/getDictionary";
import { Activity, useEffect, useLayoutEffect, useRef, useState } from "react";

import { useOutsideClick } from "@/lib/useOutsideClick";

import { FaMoon, FaSun } from "react-icons/fa6";
import { LuMonitorCog } from "react-icons/lu";

type Theme = "dark" | "light" | "system";

export default function ThemeSwitcher({ lang }: { lang: Locale }) {
   const [theme, setTheme] = useState<Theme>("system");
   const [isSwitcherVisible, setIsSwitcherVisible] = useState<boolean>(false);

   function applyTheme(theme: "dark" | "light") {
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(theme);
   }

   useEffect(() => {
      if (theme === "dark" || theme === "light") {
         applyTheme(theme);
         localStorage.setItem("theme", theme);
         return;
      }

      localStorage.removeItem("theme");

      const prefersDark = window.matchMedia(
         "(prefers-color-scheme: dark)"
      ).matches;
      applyTheme(prefersDark ? "dark" : "light");
   }, [theme]);

   useLayoutEffect(() => {
      if (typeof window !== "undefined") {
         const stored = localStorage.getItem("theme");
         if (stored === "dark" || stored === "light") {
            applyTheme(stored);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTheme(stored);
         }
      }
   }, []);

   const switchRef = useRef<HTMLDivElement>(null);

   useOutsideClick(switchRef, () => {
      setIsSwitcherVisible(false);
   });

   function handleThemeChange(e: React.MouseEvent<HTMLDivElement>) {
      e.stopPropagation();

      const button = (e.target as HTMLElement).closest("button");

      if (!button) return;

      const selectedTheme = button.name as Theme;

      localStorage.setItem("theme", selectedTheme);
      setTheme(selectedTheme);
   }

   return (
      <div className="relative">
         <button
            className="cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded-md active:translate-y-[3px] transition-all"
            onClick={() => setIsSwitcherVisible((prev) => !prev)}
            title="Switch theme | تغییر تم"
         >
            {theme === "dark" && <FaMoon size={25} />}
            {theme === "light" && <FaSun size={25} />}
            {theme === "system" && <LuMonitorCog size={25} />}
         </button>

         <Activity mode={isSwitcherVisible ? "visible" : "hidden"}>
            <div
               ref={switchRef}
               className="absolute top-[50px] end-0 bg-gray-300 p-2 rounded-sm dark:bg-gray-700 flex flex-col gap-2 shadow-md"
               onClick={handleThemeChange}
               onMouseLeave={() => setIsSwitcherVisible((prev) => !prev)}
            >
               <button
                  name="dark"
                  className="flex items-center justify-between gap-2 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 transition-all rounded-md cursor-pointer select-none"
               >
                  <FaMoon size={20} />
                  <span>{lang === "en" ? "Dark" : "تاریک"}</span>
               </button>
               <button
                  name="light"
                  className="flex items-center justify-between gap-2 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 transition-all rounded-md cursor-pointer select-none"
               >
                  <FaSun size={20} />
                  <span>{lang === "en" ? "Light" : "روشن"}</span>
               </button>
               <button
                  name="system"
                  className="flex items-center justify-between gap-2 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 transition-all rounded-md cursor-pointer select-none"
               >
                  <LuMonitorCog size={20} />
                  <span>{lang === "en" ? "System" : "سیستم"}</span>
               </button>
            </div>
         </Activity>
      </div>
   );
}
