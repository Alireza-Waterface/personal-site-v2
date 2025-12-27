import { Locale } from "@/lib/getDictionary";
import Introduce from "./Introduce";
import Photo from "./Photo";
import ParticleBackground from "./ParticleBackground";

export default async function Header({ lang }: { lang: Locale }) {
   return (
      <header
         id="header"
         className="flex flex-col lg:flex-row pb-20 lg:pb-0 gap-8 items-center justify-between min-h-[calc(100vh-80px)] bg-gray-100 dark:bg-black p-4 relative"
      >
         <ParticleBackground />
         <Introduce lang={lang} />
         <Photo />
      </header>
   );
}
