import { FaLinkedin, FaGithub, FaTelegram, FaWhatsapp } from "react-icons/fa6";

export default function SocialLinks({ lang }: { lang: "en" | "fa" }) {
   const socials = [
      {
         name: "LinkedIn",
         faName: "لینکدین",
         url: "https://www.linkedin.com/in/waterface/",
         icon: FaLinkedin,
         color: "#0077B5",
         iconClass: "fill-[#0077B5] group-hover:fill-white",
      },
      {
         name: "GitHub",
         faName: "گیت‌هاب",
         url: "https://github.com/Alireza-Waterface",
         icon: FaGithub,
         color: "#DDE2E6",
         iconClass: "fill-black dark:fill-[#DDE2E6] group-hover:fill-black",
      },
      {
         name: "Telegram",
         faName: "تلگرام",
         url: "https://t.me/+989155706085",
         icon: FaTelegram,
         color: "#24A1DE",
         iconClass: "fill-[#24A1DE] group-hover:fill-white",
      },
      {
         name: "Whatsapp",
         faName: "واتس‌اپ",
         url: "https://wa.me/+989155706085",
         icon: FaWhatsapp,
         color: "#25D366",
         iconClass: "fill-[#25D366] group-hover:fill-white",
      },
   ];

   return (
      <div className="flex flex-wrap gap-4 items-center justify-center">
         {socials.map((social) => (
            <div
               key={social.name}
               className="relative group w-14 h-14 md:w-18 md:h-18 flex justify-center items-center"
            >
               <div
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-2 rounded-full transition-all duration-500 group-hover:top-0 group-hover:w-[80%] group-hover:h-[50%] group-hover:rounded-[30px]"
                  style={{
                     backgroundColor: social.color,
                     boxShadow: `0 0 5px ${social.color}, 0 0 15px ${social.color}, 0 0 30px ${social.color}`,
                  }}
               />

               <div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-2 rounded-full transition-all duration-500 group-hover:bottom-0 group-hover:w-[80%] group-hover:h-[50%] group-hover:rounded-[30px]"
                  style={{
                     backgroundColor: social.color,
                     boxShadow: `0 0 5px ${social.color}, 0 0 15px ${social.color}, 0 0 30px ${social.color}`,
                  }}
               />

               <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="relative z-10 flex justify-center items-center w-full h-full rounded-xl
                       bg-white/5 backdrop-blur-md border-t border-b border-white/10 shadow-lg
                       overflow-hidden transition-all duration-500 active:scale-95"
                  title={lang === "en" ? social.name : social.faName}
                  aria-label={lang === "en" ? social.name : social.faName}
               >
                  <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent -skew-x-45 transition-transform duration-500 -translate-x-[150%] group-hover:translate-x-[250%]" />

                  <social.icon
                     className={`relative z-20 w-8 h-8 md:w-10 md:h-10 transition-transform duration-500 group-hover:scale-110 ${social.iconClass}`}
                  />
               </a>
            </div>
         ))}
      </div>
   );
}
