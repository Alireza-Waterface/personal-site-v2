import { getDictionary, Locale } from "@/lib/getDictionary";
import Grid from "./Grid";

export default async function Capabilities({ lang }: { lang: Locale }) {
   const dict = await getDictionary(lang);

   return (
      <section
         id="capabilities"
         className="flex flex-col gap-2 items-center bg-gray-200 dark:bg-gray-800 py-2 px-4"
      >
         <p className="text-lg text-red-600">{dict.homePage.skills.desc}</p>

         <h2 className="text-md sm:text-xl md:text-2xl lg:text-3xl font-bold">
            {dict.homePage.skills.title}
         </h2>

         <Grid lang={lang} />
      </section>
   );
}
