import Link from "next/link";

import { LuFileQuestion } from "react-icons/lu";

export default function NotFound() {
   return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 gap-6 animate-in fade-in zoom-in duration-500">
         <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-full shadow-lg">
            <LuFileQuestion size={64} className="text-red-600" />
         </div>

         <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
               Page Not Found
            </h2>
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 font-vazir">
               صفحه مورد نظر یافت نشد
            </h2>
         </div>

         <div className="flex flex-col gap-1 text-gray-600 dark:text-gray-400">
            <p>
               The page you are looking for does not exist or has been moved.
            </p>
            <p className="font-vazir">
               صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
            </p>
         </div>

         <Link
            href="/"
            className="mt-4 px-8 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all shadow-md active:scale-95 flex items-center gap-2"
         >
            <span>Return Home</span>
            <span className="w-px h-4 bg-white/40 mx-1" />
            <span className="font-vazir">بازگشت به خانه</span>
         </Link>
      </div>
   );
}
