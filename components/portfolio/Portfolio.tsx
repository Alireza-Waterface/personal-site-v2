import { getDictionary, Locale } from "@/lib/getDictionary";
import Link from "next/link";
import ProjectCards from "./Projects";
import { Suspense } from "react";
import ProjectCardsSkeleton from "./ProjectCardsSkeleton";

export default async function Portfolio({ lang }: { lang: Locale }) {
   const dict = await getDictionary(lang);

   return (
      <section
         id="portfolio"
         className="flex flex-col items-center gap-2 md:gap-4 px-4 py-2"
      >
         <p className="text-lg text-red-600">{dict.homePage.samples.desc}</p>
         <h2 className="text-2xl lg:text-3xl font-bold">
            {dict.homePage.samples.title}
         </h2>

         <Suspense fallback={<ProjectCardsSkeleton />}>
            <ProjectCards />
         </Suspense>

         <Link
            href={"/projects"}
            className="rounded-md px-8 py-3 bg-gray-100 dark:bg-gray-800 border-2 border-red-700 shadow-xl outline-2 outline-transparent outline-offset-[1rem] transition-all duration-200 text-xl hover:outline-red-700 hover:-outline-offset-1 hover:bg-gray-200 dark:hover:bg-gray-900 font-semibold active:translate-y-[3px] mt-8"
         >
            {dict.homePage.samples.all}
         </Link>
      </section>
   );
}
