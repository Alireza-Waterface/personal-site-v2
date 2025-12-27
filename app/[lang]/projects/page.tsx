import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { supabase } from "@/lib/supabase";
import { Locale } from "@/lib/getDictionary";

import { FaSearch } from "react-icons/fa";

export const revalidate = 3600;

interface Props {
   params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const { lang } = await params;

   const { count } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true });

   const projectCount = count || 0;

   if (lang === "en") {
      return {
         title: `Alireza Waterface | Projects & Portfolio - ${projectCount} Projects`,
         description:
            "Frontend Developer & Freelancer | Portfolio, Projects and Work Experience",
         keywords: [
            "Freelancer",
            "Frontend Developer",
            "Next.js",
            "React",
            "Web Developer",
            "Alireza Waterface",
         ],
         authors: [{ name: "Alireza Waterface" }],
         robots: "index, follow",
         openGraph: {
            title: `Alireza Abchehreh | Portfolio - ${projectCount} Projects`,
            description: "Frontend Developer Portfolio",
            url: "https://waterface.ir/en/projects",
            siteName:
               "Alireza Waterface personal website | FrontEnd web developer",
            locale: "en_US",
            type: "website",
            images: [
               {
                  url: "https://wjbwobxiekyzfcjxjnkt.supabase.co/storage/v1/object/public/me/me.webp",
                  width: 640,
                  height: 640,
                  alt: "Alireza Abchehre",
               },
            ],
         },
      };
   }

   // Persian Metadata
   return {
      title: `علیرضا آبچهره | پروژه‌ها و نمونه‌کار ها - ${projectCount} پروژه`,
      description:
         "علیرضا آبچهره | توسعه دهنده فرانت‌اند و فریلنسر | پروژه‌ها، نمونه‌کار ها و سوابق کاری",
      authors: [{ name: "علیرضا آبچهره" }],
      robots: "index, follow",
      keywords: [
         "فریلنسر",
         "علیرضا آبچهره",
         "برنامه نویس وب",
         "برنامه نویس فرانت اند",
         "توسعه دهنده فرانت اند",
         "waterface",
         "alireza waterface",
         "توسعه دهنده وب",
         "نمونه‌کار",
         "پروژه ها",
      ],
      openGraph: {
         title: `علیرضا آبچهره | پروژه‌ها و نمونه‌کار ها - ${projectCount} پروژه`,
         description: "علیرضا آبچهره | توسعه دهنده فرانت‌اند و فریلنسر",
         url: "https://waterface.ir/projects",
         siteName: "وب‌سایت شخصی علیرضا آبچهره | توسعه‌دهنده فرانت‌اند",
         locale: "fa_IR",
         type: "website",
         images: [
            {
               url: "https://wjbwobxiekyzfcjxjnkt.supabase.co/storage/v1/object/public/me/me.webp",
               width: 640,
               height: 640,
               alt: "علیرضا آبچهره",
            },
         ],
      },
   };
}

export default async function Projects({ params }: Props) {
   const { lang } = await params;

   const { data: projects, error } = await supabase
      .from("projects")
      .select("id, slug, title, description, cover_image")
      .order("created_at", { ascending: false });

   if (error) {
      console.error("Error fetching projects:", error);
   }

   return (
      <>
         <header className="w-full p-4 flex justify-center items-center bg-gray-200 dark:bg-gray-800">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
               {lang === "en"
                  ? "All Projects & Portfolio"
                  : "همه پروژه‌ها و نمونه‌کار ها"}
            </h1>
         </header>

         <main className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 items-stretch bg-gray-200 dark:bg-gray-800">
            {projects && projects.length > 0 ? (
               projects.map((project) => (
                  <Link
                     key={project.id}
                     href={`/${lang}/projects/${project.slug}`}
                     className="group flex flex-col bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                     <div className="relative w-full aspect-video">
                        <Image
                           src={project.cover_image!}
                           alt={project.title}
                           fill
                           className="object-cover transition-transform duration-500 group-hover:scale-105"
                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                     </div>
                     <div className="p-4 flex flex-col gap-2 grow">
                        <h2 className="text-lg lg:text-xl font-bold group-hover:text-red-600 transition-colors">
                           {project.title}
                        </h2>
                        <p className="text-base text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed">
                           {project.description}
                        </p>
                        <span className="mt-auto pt-4 text-sm font-medium text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                           {lang === "en"
                              ? "View Details →"
                              : "مشاهده جزئیات ←"}
                        </span>
                     </div>
                  </Link>
               ))
            ) : (
               <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-20 px-4 text-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                  <div className="p-4 rounded-full bg-gray-200 dark:bg-gray-800 mb-4">
                     <FaSearch
                        size={48}
                        className="text-gray-500 dark:text-gray-400"
                     />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                     {lang === "en" ? "No Projects Found" : "پروژه‌ای یافت نشد"}
                  </h3>
                  <p className="text-gray-500 max-w-md">
                     {lang === "en"
                        ? "We couldn't find any projects at the moment. Please check back later."
                        : "در حال حاضر پروژه‌ای برای نمایش وجود ندارد. لطفاً بعداً بررسی کنید."}
                  </p>
               </div>
            )}
         </main>
      </>
   );
}
