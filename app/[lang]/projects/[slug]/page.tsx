import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { supabase } from "@/lib/supabase";
import { Locale } from "@/lib/getDictionary";
import ProjectGallery from "./Gallery";
import { FaGithub, FaLink } from "react-icons/fa6";

export const revalidate = 3600;
export const dynamicParams = true;

interface Props {
   params: Promise<{ lang: Locale; slug: string }>;
}

async function getProjectData(slug: string) {
   const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .single();

   if (error || !data) return null;
   return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const { lang, slug } = await params;
   const project = await getProjectData(slug);

   if (!project) return {};

   const title =
      lang === "en"
         ? `Alireza Abchehreh | Project: ${project.title}`
         : `علیرضا آبچهره | پروژه ${project.title}`;

   const description =
      lang === "en"
         ? `Project details for ${project.title}`
         : `علیرضا آبچهره | پروژه ${
              project.metaDesc || project.description.slice(0, 100)
           }`;

   const keywordsArray = Array.isArray(project.metaKeywords)
      ? (project.metaKeywords as string[])
      : [];

   return {
      title,
      description,
      keywords: [
         "Freelancer",
         "Frontend Developer",
         "Web Development",
         ...keywordsArray,
      ],
      authors: [{ name: "Alireza Waterface" }],
      robots: "index, follow",
      openGraph: {
         title,
         description,
         url: `https://waterface.ir/${lang}/projects/${slug}`,
         siteName: "Alireza Abchehreh | Frontend Developer",
         locale: lang === "en" ? "en_US" : "fa_IR",
         type: "website",
         images: [
            {
               url: project.cover_image || "",
               width: 1280,
               height: 720,
               alt: project.title,
            },
         ],
      },
   };
}

export default async function ProjectPage({ params }: Props) {
   const { lang, slug } = await params;
   const project = await getProjectData(slug);

   if (!project) notFound();

   const features = Array.isArray(project.features)
      ? (project.features as string[])
      : [];
   const tools = Array.isArray(project.tools)
      ? (project.tools as string[])
      : [];

   const linkStyle =
      "flex items-center gap-2 text-red-600 font-medium relative w-fit after:content-[''] after:bg-red-600 after:h-[2px] after:rounded-md after:w-0 after:transition-all after:duration-300 after:absolute after:bottom-0 after:right-0 hover:after:w-full";
   const legendStyle = "text-lg text-red-600 font-bold mb-2";

   return (
      <article className="w-full">
         <section className="flex flex-col gap-6 p-4 border-b border-black dark:border-white/10">
            <div className="w-full flex justify-center">
               <div className="w-full md:w-[80%]">
                  <ProjectGallery
                     cover={project.cover_image || ""}
                     gallery={project.gallery_images || []}
                  />
               </div>
            </div>

            <header className="mt-4">
               <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                  {project.title}
               </h1>
            </header>

            <div className="text-gray-800 dark:text-gray-300 leading-relaxed text-justify space-y-4">
               {project.description.split("\n").map((part, index) => (
                  <p key={index}>{part}</p>
               ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mt-2">
               {project.visitLink && (
                  <Link
                     className={linkStyle}
                     title={lang === "en" ? "Visit Website" : "مشاهده وب‌سایت"}
                     href={project.visitLink}
                     target="_blank"
                     rel="noreferrer"
                  >
                     <FaLink size={20} />
                     {lang === "en" ? "Visit Live Website" : "مشاهده وب‌سایت"}
                  </Link>
               )}
               {project.github && (
                  <Link
                     className={linkStyle}
                     title={
                        lang === "en"
                           ? "Github Repository"
                           : "ریپازیتوری گیت‌هاب پروژه"
                     }
                     href={project.github}
                     target="_blank"
                     rel="noreferrer"
                  >
                     <FaGithub size={20} />
                     {lang === "en"
                        ? "View Source Code"
                        : "ریپازیتوری گیت‌هاب پروژه"}
                  </Link>
               )}
            </div>

            {features.length > 0 && (
               <div className="mt-4">
                  <p className={legendStyle}>
                     {lang === "en"
                        ? "Project Features:"
                        : "امکانات این پروژه:"}
                  </p>
                  <ul className="flex flex-col gap-1 list-decimal list-inside marker:text-red-600 text-gray-800 dark:text-gray-300">
                     {features.map((feature, idx) => (
                        <li key={idx} className="ps-2 text-sm md:text-base">
                           {feature}
                        </li>
                     ))}
                  </ul>
               </div>
            )}

            {tools.length > 0 && (
               <div>
                  <p className={legendStyle}>
                     {lang === "en"
                        ? "Tools & Technologies:"
                        : "ابزار های استفاده شده در این پروژه:"}
                  </p>
                  <ul className="flex flex-col gap-1 list-decimal list-inside marker:text-red-600 text-gray-800 dark:text-gray-300">
                     {tools.map((tool, idx) => (
                        <li key={idx} className="ps-2 text-sm md:text-base">
                           {tool}
                        </li>
                     ))}
                  </ul>
               </div>
            )}
         </section>
      </article>
   );
}
