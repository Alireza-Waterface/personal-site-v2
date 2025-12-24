import { Locale } from "@/lib/getDictionary";
import Introduce from "./Introduce";
import Photo from "./Photo";
import ParticleBackground from "./ParticleBackground";

export default async function Header({ lang }: { lang: Locale }) {
   return (
      <header className="flex flex-col lg:flex-row gap-8 items-center justify-between min-h-[calc(100vh-86px)] p-4 relative">
         <ParticleBackground />
         <Introduce lang={lang} />
         <Photo />
      </header>
   );
}
