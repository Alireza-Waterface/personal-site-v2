import { SiReact } from "react-icons/si";
import {
   FaGithub,
   FaLinkedin,
   FaPhone,
   FaRegCopyright,
   FaTelegram,
   FaInstagramSquare,
} from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { IoLogoWhatsapp } from "react-icons/io5";
import { getDictionary, Locale } from "@/lib/getDictionary";

export default async function Footer({ lang }: { lang: Locale }) {
   const dict = await getDictionary(lang);

   const primaryText = "text-red-600";
   const headerStyle = `text-xl font-medium mb-4 ${primaryText}`;
   const linkHoverUnderline =
      "relative transition-colors duration-200 hover:text-red-600 after:content-[''] after:absolute after:bottom-[-4px] rtl:after:right-0 ltr:after:left-0 after:h-[2px] after:w-0 after:bg-red-600 after:transition-all after:duration-200 after:rounded-[4px] hover:after:w-full";
   const socialIconStyle =
      "p-1 rounded transition-colors duration-200 hover:bg-red-600 hover:text-white text-gray-700 dark:text-gray-300";

   return (
      <footer className="w-full p-4 bg-gray-300 dark:bg-gray-900 grid grid-cols-1 md:grid-cols-[1fr_0.8fr_1fr] gap-8 md:gap-4 items-center">
         <div className="flex flex-col gap-2 order-1 md:order-0">
            <p className={headerStyle}>{dict.footer.related}</p>
            <ul
               className={`flex flex-col gap-2 list-disc list-inside marker:${primaryText}`}
            >
               {[
                  { name: "NextJS", url: "https://nextjs.org/" },
                  { name: "ReactJS", url: "https://react.dev/" },
                  { name: "MDN", url: "https://developer.mozilla.org/en-US/" },
                  { name: "Vite", url: "https://vite.dev/" },
               ].map((site) => (
                  <li key={site.name} className="w-fit ms-4 flex items-center">
                     <a
                        href={site.url}
                        title={site.name}
                        referrerPolicy="no-referrer"
                        rel="external"
                        target="_blank"
                        className={`inline-block ${linkHoverUnderline} text-gray-700 dark:text-gray-300`}
                     >
                        {site.name}
                     </a>
                  </li>
               ))}
            </ul>
         </div>

         <div className="grid place-items-center order-3 md:order-0 self-center">
            <SiReact
               size={120}
               className={`${primaryText} transition-all duration-300 animate-[spin_8s_linear_infinite] hover:drop-shadow-[0_0_1.5em_rgba(220,38,38,1)]`}
            />
         </div>

         <div className="flex flex-col gap-4 self-end order-2 md:order-0 w-full">
            <h3 className={headerStyle}>{dict.nav.contact}</h3>

            <address className="flex flex-col gap-4 not-italic">
               <a
                  href="tel:+989155706085"
                  className="flex items-center gap-2 group w-fit"
                  title={lang === "en" ? "Phone number" : "شماره تماس"}
               >
                  <FaPhone size={20} className={primaryText} />
                  <span
                     className={`text-gray-700 ms-1 dark:text-gray-300 ${linkHoverUnderline}`}
                  >
                     {lang === "en"
                        ? "Phone: 0915 570 6085"
                        : "تلفن تماس: 6085 570 0915"}
                  </span>
               </a>

               <a
                  href="mailto:Alireza.waterface@outlook.com"
                  className="flex items-center gap-2 group w-fit"
                  title={lang === "en" ? "Email" : "ایمیل"}
               >
                  <IoIosMail size={25} className={primaryText} />
                  <span
                     className={`text-gray-700 dark:text-gray-300 ${linkHoverUnderline}`}
                  >
                     {lang === "en"
                        ? "Email: Alireza.waterface@outlook.com"
                        : "آدرس ایمیل: Alireza.waterface@outlook.com"}
                  </span>
               </a>

               <div className="flex flex-wrap gap-4 mt-2">
                  <a
                     href="https://linkedin.com/in/waterface"
                     referrerPolicy="no-referrer"
                     rel="external"
                     target="_blank"
                     className={socialIconStyle}
                     title="LinkedIn"
                  >
                     <FaLinkedin size={45} />
                  </a>

                  <a
                     href="https://github.com/Alireza-Waterface"
                     referrerPolicy="no-referrer"
                     rel="external"
                     target="_blank"
                     className={socialIconStyle}
                     title="GitHub"
                  >
                     <FaGithub size={45} />
                  </a>

                  <a
                     href="https://instagram.com/waterface_ar"
                     referrerPolicy="no-referrer"
                     rel="external"
                     target="_blank"
                     className={socialIconStyle}
                     title="Instagram"
                  >
                     <FaInstagramSquare size={45} />
                  </a>

                  <a
                     href="https://wa.me/+989155706085"
                     referrerPolicy="no-referrer"
                     rel="external"
                     target="_blank"
                     className={socialIconStyle}
                     title="Whatsapp"
                  >
                     <IoLogoWhatsapp size={45} />
                  </a>

                  <a
                     href="https://t.me/+989155706085"
                     referrerPolicy="no-referrer"
                     rel="external"
                     target="_blank"
                     className={socialIconStyle}
                     title="Telegram"
                  >
                     <FaTelegram size={45} />
                  </a>
               </div>
            </address>
         </div>

         <div className="col-span-1 md:col-span-3 order-4 flex items-center justify-center gap-2 mt-8 pt-4 border-t border-black dark:border-white/10 w-full text-center text-sm md:text-base text-gray-700 dark:text-gray-300">
            {dict.footer.copyright}
            <FaRegCopyright />
         </div>
      </footer>
   );
}
