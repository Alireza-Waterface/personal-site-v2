import { SiReact } from "react-icons/si";
import { FaRegCopyright } from "react-icons/fa6";
import { Locale } from "@/lib/getDictionary";
import CopyEmail from "../footer/CopyEmail";
import TechTicker from "../footer/TechTicker";
import FocusCard from "../footer/FocusCard";
import SocialLinks from "@/components/header/SocialLinks";

export default async function Footer({ lang }: { lang: Locale }) {
   return (
      <footer className="w-full p-4 mt-auto border-t border-black/5 dark:border-white/10 bg-gray-50 dark:bg-gray-950">
         <div className="">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
               <div className="lg:col-span-4 flex flex-col gap-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 px-2">
                     {lang === "en" ? "Let's Connect" : "ارتباط با من"}
                  </h3>

                  <CopyEmail email="Alireza.waterface@outlook.com" />

                  <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl group hover:ring-1 active:ring-1 ring-green-600 transition-all">
                     <div className="flex flex-col">
                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                           {lang === "en" ? "Status" : "وضعیت"}
                        </span>
                        <span className="text-sm font-bold text-green-600 flex items-center gap-2">
                           <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                           </span>
                           {lang === "en"
                              ? "Available for work"
                              : "آماده همکاری"}
                        </span>
                     </div>
                     <div className="text-right">
                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                           {lang === "en" ? "Location" : "محل سکونت"}
                        </span>
                        <span className="block text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-green-600 transition-all">
                           {lang === "en" ? "Iran, Tehran" : "ایران، تهران"}
                        </span>
                     </div>
                  </div>
               </div>

               <div className="lg:col-span-4 flex flex-col items-center justify-center gap-6 py-8 order-first lg:order-0">
                  <div className="relative group cursor-pointer">
                     <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full group-hover:bg-blue-500/30 transition-all duration-500" />
                     <SiReact
                        size={100}
                        className="text-gray-300 dark:text-gray-700 animate-[spin_10s_linear_infinite] group-hover:fill-[#61DBFB] transition-colors duration-300 relative z-10 group-active:fill-[#61DBFB]"
                     />
                  </div>

                  <div className="w-full max-w-[200px] text-center">
                     <TechTicker />
                  </div>
               </div>

               <div className="lg:col-span-4 flex flex-col gap-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 px-2">
                     {lang === "en" ? "Currently" : "فعالیت‌ها"}
                  </h3>

                  <FocusCard lang={lang} />

                  <a
                     href="https://github.com/Alireza-Waterface"
                     target="_blank"
                     className="p-4 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl hover:ring-1 ring-[#DDE2E6] transition-all group active:ring-1"
                  >
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-500 font-mono">
                           git commit -m &quot;update&quot;
                        </span>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
                           24h ago
                        </span>
                     </div>
                     <div className="flex gap-1">
                        {[...Array(7)].map((_, i) => (
                           <div
                              key={i}
                              className={`h-3 flex-1 rounded-sm ${
                                 [1, 3, 4, 6].includes(i)
                                    ? "bg-green-500"
                                    : "bg-gray-200 dark:bg-gray-700"
                              }`}
                           />
                        ))}
                     </div>
                  </a>
               </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-200 dark:border-gray-800">
               <div className="scale-100 origin-left">
                  <SocialLinks lang={lang} />
               </div>

               <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <span>© {new Date().getFullYear()} Waterface</span>
                  <FaRegCopyright size={14} />
                  <span className="hidden md:inline">|</span>
                  <span className="hidden md:inline">
                     {lang === "en"
                        ? "Built with Next.js 16"
                        : "ساخته‌شده با NextJS 16"}
                  </span>
               </div>
            </div>
         </div>
      </footer>
   );
}
