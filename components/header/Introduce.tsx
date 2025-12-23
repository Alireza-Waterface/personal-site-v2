import { getDictionary, Locale } from "@/lib/getDictionary";
import {
   FaGitAlt,
   FaGithub,
   FaLinkedin,
   FaReact,
   FaTelegram,
   FaWhatsapp,
} from "react-icons/fa6";
import { RiNextjsFill } from "react-icons/ri";
import { SiTypescript } from "react-icons/si";

export default async function Introduce({ lang }: { lang: Locale }) {
   const dict = await getDictionary(lang);

   return (
      <div className="flex flex-col gap-4 z-10">
         <p className="text-lg opacity-80">{dict.homePage.header.greeting}</p>

         <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            {dict.homePage.header.role}
         </h1>

         <div className="text-lg md:text-xl">
            {dict.homePage.header.desc.split("|").map((item, index) => (
               <p key={index}>{item}</p>
            ))}
         </div>

         <div className="flex flex-wrap flex-col sm:flex-row gap-4 sm:gap-16">
            <div className="flex flex-col gap-2">
               <p className="text-lg">{dict.homePage.header.social}</p>
               <div className="flex gap-4 items-center">
                  <a
                     className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 grid place-items-center"
                     rel="norefferer"
                     target="_blank"
                     title={lang === "en" ? "LinkedIn" : "لینکدین"}
                     href="https://www.linkedin.com/in/waterface/"
                  >
                     <FaLinkedin className="w-8 h-8 md:w-12 md:h-12 fill-[#0077B5]" />
                  </a>
                  <a
                     className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 grid place-items-center"
                     rel="norefferer"
                     target="_blank"
                     title={lang === "en" ? "GitHub" : "گیت‌هاب"}
                     href="https://github.com/Alireza-Waterface"
                  >
                     <FaGithub className="w-8 h-8 md:w-12 md:h-12 dark:fill-[#DDE2E6]" />
                  </a>
                  <a
                     className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 grid place-items-center"
                     rel="norefferer"
                     target="_blank"
                     title={lang === "en" ? "Telegram" : "تلگرام"}
                     href="https://t.me/+989155706085"
                  >
                     <FaTelegram className="w-8 h-8 md:w-12 md:h-12 fill-[#24A1DE]" />
                  </a>
                  <a
                     className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 grid place-items-center"
                     rel="norefferer"
                     target="_blank"
                     title={lang === "en" ? "Whatsapp" : "واتس‌اپ"}
                     href="https://wa.me/+989155706085"
                  >
                     <FaWhatsapp className="w-8 h-8 md:w-12 md:h-12 fill-[#25D366]" />
                  </a>
               </div>
            </div>
            <div className="flex flex-col gap-2">
               <p className="text-lg">{dict.homePage.header.skills}</p>
               <div className="flex gap-4 items-center">
                  <span
                     className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 grid place-items-center"
                     title={lang === "en" ? "NextJS" : "نکست‌جی‌اس"}
                  >
                     <RiNextjsFill className="w-8 h-8 md:w-12 md:h-12 fill-black dark:fill-white" />
                  </span>
                  <span
                     className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 grid place-items-center"
                     title={lang === "en" ? "React" : "ری‌اکت"}
                  >
                     <FaReact className="w-8 h-8 md:w-12 md:h-12 fill-[#61DBFB]" />
                  </span>
                  <span
                     className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 grid place-items-center"
                     title={lang === "en" ? "TypeScript" : "تایپ‌اسکریپت"}
                  >
                     <SiTypescript className="w-8 h-8 md:w-12 md:h-12 fill-[#3178C6]" />
                  </span>
                  <span
                     className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 grid place-items-center"
                     title={lang === "en" ? "Git" : "گیت"}
                  >
                     <FaGitAlt className="w-8 h-8 md:w-12 md:h-12 fill-[#F1502F]" />
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
}
