import { FaTerminal } from "react-icons/fa6";

export default function FocusCard({ lang }: { lang: "en" | "fa" }) {
   return (
      <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl hover:ring-1 active:ring-1 ring-blue-500 transition-all duration-300 group cursor-default">
         <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0 grid place-items-center border border-gray-200 dark:border-gray-700">
            <FaTerminal
               size={24}
               className="text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors"
            />

            <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
         </div>

         <div className="flex flex-col gap-0.5 overflow-hidden">
            <div className="flex items-center gap-2">
               <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  {lang === "en" ? "Current Focus" : "تمرکز فعلی"}
               </span>
            </div>
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate group-hover:text-blue-500 transition-colors">
               {lang === "en"
                  ? "Mastering NextJS & TypeScript"
                  : "تسلط بالا بر NextJS و TypeScript"}
            </span>
         </div>
      </div>
   );
}
