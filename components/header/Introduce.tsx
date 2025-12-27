import { getDictionary, Locale } from "@/lib/getDictionary";
import TechSkills from "./TechSkills";
import SocialLinks from "./SocialLinks";

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
            <div className="flex flex-col gap-4">
               <p className="text-lg">{dict.homePage.header.social}</p>
               <SocialLinks lang={lang} />
            </div>
            <div className="flex flex-col gap-4">
               <p className="text-lg">{dict.homePage.header.skills}</p>
               <TechSkills lang={lang} />
            </div>
         </div>
      </div>
   );
}
