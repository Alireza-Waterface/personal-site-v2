import Image from "next/image";
import { Locale, getDictionary } from "@/lib/getDictionary";

export default async function Details({ lang }: { lang: Locale }) {
   const dict = await getDictionary(lang);

   return (
      <div className="flex flex-col gap-2 p-4 rounded-lg shadow-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 transition-all hover:shadow-xl">
         <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-2">
            <Image
               src="https://wjbwobxiekyzfcjxjnkt.supabase.co/storage/v1/object/public/images/co-work.webp"
               alt="Contact me"
               fill
               className="object-cover"
               loading="lazy"
            />
         </div>

         <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-900 dark:text-gray-100">
            {dict.homePage.contact.info.title}
         </p>

         <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            {dict.homePage.contact.info.desc}
         </h3>

         <div className="flex flex-col gap-2 mt-4 text-sm md:text-base font-medium">
            <a
               href="tel:+989155706085"
               className="group flex items-center gap-2 text-gray-700 dark:text-gray-300 w-fit"
            >
               {lang === "en" ? "Phone:" : "تلفن:"}
               <span className="relative text-gray-900 dark:text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-red-600 after:transition-all after:duration-300 group-hover:text-red-600 group-hover:after:w-full">
                  09155706085
               </span>
            </a>
            <a
               href="mailto:alireza.waterface@outlook.com"
               className="group flex items-center gap-2 text-gray-700 dark:text-gray-300 w-fit"
            >
               {lang === "en" ? "Email:" : "ایمیل:"}
               <span className="relative text-gray-900 dark:text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-red-600 after:transition-all after:duration-300 group-hover:text-red-600 group-hover:after:w-full">
                  Alireza.waterface@outlook.com
               </span>
            </a>
         </div>
      </div>
   );
}
