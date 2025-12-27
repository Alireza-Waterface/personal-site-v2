import { getDictionary, Locale } from "@/lib/getDictionary";
import Grid from "./Grid";

export default async function Capabilities({ lang }: { lang: Locale }) {
   const dict = await getDictionary(lang);

   return (
      <section
         id="capabilities"
         className="flex flex-col gap-2 items-center bg-gray-200 dark:bg-gray-800 p-4"
      >
         <p className="text-lg text-red-600">
            {dict.homePage.capabilities.desc}
         </p>

         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {dict.homePage.capabilities.title}
         </h2>

         <Grid lang={lang} />
      </section>
   );
}
