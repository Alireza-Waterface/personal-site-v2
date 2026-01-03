import { getDictionary, Locale } from "@/lib/getDictionary";
import Link from "next/link";
import { Suspense } from "react";
import BlogCards from "./BlogsList";
import ProjectCardsSkeleton from "../portfolio/ProjectCardsSkeleton";

export default async function Blogs({ lang }: { lang: Locale }) {
   const dict = await getDictionary(lang);

   return (
      <section
         id="portfolio"
         className="flex flex-col items-center p-4 dark:bg-gray-900 bg-gray-100"
      >
         <p className="text-lg text-red-600">
            {lang === "en"
               ? "Improve your knowledge and learn"
               : "افزایش دانش و یادگیری"}
         </p>
         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
            {lang === "en" ? "Blogs" : "وبلاگ"}
         </h2>

         <Suspense fallback={<ProjectCardsSkeleton />}>
            <BlogCards lang={lang} />
         </Suspense>

         <Link
            href={`/${lang}/blogs`}
            className="rounded-md px-6 py-2 bg-gray-100 dark:bg-gray-800 border-2 border-red-700 shadow-xl outline-2 outline-transparent outline-offset-[1rem] transition-all duration-300 text-lg hover:outline-red-700 hover:-outline-offset-1 hover:bg-gray-200 dark:hover:bg-gray-900 font-semibold active:translate-y-[3px] mt-8"
         >
            {dict.homePage.samples.all}
         </Link>
      </section>
   );
}
