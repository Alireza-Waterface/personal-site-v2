import { Locale } from "@/lib/getDictionary";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";

interface Blog {
   id: number;
   slug: string;
   title: string;
   excerpt: string;
   cover_image: string;
}

export default async function BlogCards({
   lang,
}: {
   lang: Locale;
}): Promise<ReactElement | null> {
   const { data, error } = await supabase
      .from("blogs")
      .select("id, slug, title, excerpt, cover_image")
      .order("created_at", { ascending: false })
      .limit(4);

   if (error) {
      console.error("Error fetching blogs:", error);
      return null;
   }

   const blogs = data as Blog[] | null;

   if (!blogs || blogs.length === 0) {
      return (
         <p className="text-red-600 text-center text-lg">
            {lang === "en"
               ? "There are no blogs to show"
               : "بلاگی جهت نمایش وجود ندارد"}
         </p>
      );
   }

   return (
      <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch gap-2 mt-4">
         {blogs.map((card) => (
            <li
               key={card.id}
               className="p-2 flex flex-col bg-gray-200 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-xl cursor-pointer transition-all"
            >
               <Link
                  href={`${lang}/projects/${card.slug}`}
                  className="flex gap-4 flex-col w-full"
               >
                  <div className="relative min-h-48">
                     <Image
                        fill
                        src={card.cover_image}
                        alt={card.title || "تصویر بلاگ"}
                        loading="lazy"
                        fetchPriority="low"
                        quality={75}
                        className="h-60 w-full rounded-lg object-cover object-top"
                     />
                  </div>
                  <div className="flex justify-center items-center flex-col gap-2">
                     <h3 className="text-gray-900 dark:text-gray-100 text-center text-lg font-bold">
                        {card.title}
                     </h3>
                     <p className="text-gray-800 dark:text-gray-400 text-justify text-base">
                        {card.excerpt.length > 100
                           ? card.excerpt.slice(0, 100) + " ..."
                           : card.excerpt.slice(0, 100)}
                     </p>
                  </div>
               </Link>
            </li>
         ))}
      </ul>
   );
}
