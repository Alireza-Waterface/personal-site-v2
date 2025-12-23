import { getDictionary, Locale } from "@/lib/getDictionary";
import Introduce from "./Introduce";
import Photo from "./Photo";
import ParticleBackground from "./ParticleBackground";

export default async function Header({ lang }: { lang: Locale }) {
   const dict = await getDictionary(lang);

   return (
      <header className="flex flex-col lg:flex-row gap-8 items-center justify-between h-[85vh] px-4 relative">
         <ParticleBackground />
         <Introduce lang={lang} />
         <Photo />
      </header>
   );
}
