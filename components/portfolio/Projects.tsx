import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";

interface Data {
   id: number;
   slug: string;
   title: string;
   description: string;
   cover_image: string;
}

export default async function ProjectCards(): Promise<ReactElement | null> {
   const { data, error } = await supabase
      .from("projects")
      .select("id, slug, title, description, cover_image")
      .order("created_at", { ascending: false })
      .limit(4);

   const projects = data as Data[] | null;

   if (error) {
      console.error("Error fetching projects:", error);
      return null;
   }

   if (!projects) {
      return null;
   }

   return (
      <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch gap-2">
         {projects.map((card) => (
            <li
               key={card.id}
               className="p-2 flex flex-col bg-gray-200 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-xl cursor-pointer transition-all"
            >
               <Link
                  href={`/projects/${card.slug}`}
                  className="flex gap-4 flex-col w-full"
               >
                  <div className="relative min-h-50">
                     <Image
                        fill
                        src={card.cover_image}
                        alt={card.title || "تصویر پروژه"}
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
                        {card.description.length > 100
                           ? card.description.slice(0, 100) + " ..."
                           : card.description.slice(0, 100)}
                     </p>
                  </div>
               </Link>
            </li>
         ))}
      </ul>
   );
}
