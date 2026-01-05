import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { ComponentPropsWithoutRef } from "react";

import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

import { supabase } from "@/lib/supabase";
import { Locale } from "@/lib/getDictionary";

import Back from "@/components/ui/Back";

import { FaCalendar, FaClock, FaTag } from "react-icons/fa6";

export const revalidate = 21600;
export const dynamicParams = true;

interface Props {
   params: Promise<{ slug: string; lang: Locale }>;
}

interface BlogImageProps {
   src: string;
   alt?: string;
}

async function getPost(slug: string, lang: Locale) {
   const query =
      lang === "en"
         ? "title:title_en, slug, tags, content:content_en, cover_image, created_at, excerpt:excerpt_en, metaDescription:metaDesc_en, metaKeywords:metaKeywords_en, reading_time"
         : "title, slug, tags, content, cover_image, created_at, excerpt, metaDescription, metaKeywords, reading_time";

   const { data } = await supabase
      .from("blogs")
      .select(query)
      .eq("slug", slug)
      .single();

   return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const { slug, lang } = await params;
   const post = await getPost(slug, lang);

   if (!post) return {};

   const isEn = lang === "en";

   const keywordsArray = Array.isArray(post.metaKeywords)
      ? (post.metaKeywords as string[])
      : Array.isArray(post.tags)
      ? (post.tags as string[])
      : [];

   return {
      title: isEn
         ? `Alireza Waterface | Blog: ${post.title}`
         : `علیرضا آبچهره | بلاگ: ${post.title}`,
      description: post.metaDescription || post.excerpt,
      keywords: keywordsArray,
      authors: [{ name: isEn ? "Alireza Waterface" : "علیرضا آبچهره" }],
      openGraph: {
         title: post.title,
         description: post.metaDescription || post.excerpt,
         type: "article",
         publishedTime: post.created_at,
         authors: [isEn ? "Alireza Waterface" : "علیرضا آبچهره"],
         locale: isEn ? "en_US" : "fa_IR",
         images: [
            {
               url: post.cover_image || "",
               alt: post.title,
            },
         ],
      },
      twitter: {
         card: "summary_large_image",
         title: post.title,
         description: post.metaDescription || post.excerpt,
         images: [post.cover_image || ""],
      },
   };
}

const mdxComponents = {
   img: (props: ComponentPropsWithoutRef<"img">) => (
      <div className="relative w-full h-auto my-8 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
         <Image
            alt={props.alt || "Image"}
            src={props.src as string}
            fill
            className="w-full object-cover"
            loading="lazy"
         />
      </div>
   ),
   BlogImage: (props: BlogImageProps) => (
      <div className="relative w-full aspect-video my-4 rounded-xl overflow-hidden shadow-lg">
         <Image
            src={props.src}
            alt={props.alt || "Blog Image"}
            fill
            className="object-cover"
         />
      </div>
   ),
   a: (
      props: ComponentPropsWithoutRef<"a"> & { children: React.ReactNode }
   ) => (
      <a
         {...props}
         className="text-red-600 font-medium hover:underline underline-offset-4"
         target="_blank"
         rel="noopener noreferrer"
      >
         {props.children}
      </a>
   ),
   h2: (
      props: ComponentPropsWithoutRef<"h2"> & { children: React.ReactNode }
   ) => (
      <h2
         {...props}
         className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight"
      >
         {props.children}
      </h2>
   ),
   h3: (
      props: ComponentPropsWithoutRef<"h3"> & { children: React.ReactNode }
   ) => (
      <h3
         {...props}
         className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-tight"
      >
         {props.children}
      </h3>
   ),
   table: (props: ComponentPropsWithoutRef<"table">) => (
      <div className="overflow-x-auto my-6 rounded-lg border border-gray-200 dark:border-gray-700">
         <table {...props} className="w-full text-left text-sm" />
      </div>
   ),
   th: (props: ComponentPropsWithoutRef<"th">) => (
      <th
         {...props}
         className="bg-gray-100 dark:bg-gray-800 p-3 font-bold border-b dark:border-gray-700"
      />
   ),
   td: (props: ComponentPropsWithoutRef<"td">) => (
      <td {...props} className="p-3 border-b dark:border-gray-800" />
   ),
};

export default async function BlogPostPage({ params }: Props) {
   const { slug, lang } = await params;
   const post = await getPost(slug, lang);

   if (!post) notFound();

   const options = {
      mdxOptions: {
         remarkPlugins: [remarkGfm],
         rehypePlugins: [rehypeHighlight],
      },
   };

   return (
      <article className="w-full bg-gray-200 dark:bg-gray-800 relative">
         <Back
            text={lang === "en" ? "Back to Blogs" : "بازگشت به بلاگ‌ها"}
            path={`/${lang}/blogs`}
            className="flex items-center gap-2 w-full max-w-4xl mx-auto sticky top-[60px] sm:top-[80px] bg-gray-300/50 dark:bg-gray-800/50 px-2 py-4 z-10 backdrop-blur-sm"
         />

         <header className="flex flex-col max-w-4xl mx-auto gap-6 mb-4 p-4 border-y border-gray-300 dark:border-gray-700">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
               {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-8 text-sm md:text-base text-gray-600 dark:text-gray-300">
               <div className="flex items-center gap-4 flex-wrap">
                  <span className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 py-1 px-2 rounded-md">
                     <FaCalendar size={16} />
                     {new Date(post.created_at).toLocaleDateString(
                        lang === "en" ? "en-US" : "fa-IR",
                        {
                           year: "numeric",
                           month: "long",
                           day: "numeric",
                        }
                     )}
                  </span>
                  <span className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 py-1 px-2 rounded-md">
                     <FaClock size={16} />
                     {post.reading_time}{" "}
                     {lang === "en" ? "min read" : "دقیقه مطالعه"}
                  </span>
               </div>

               <div className="flex flex-wrap gap-2">
                  {(post.tags as string[])?.map((tag: string) => (
                     <span
                        key={tag}
                        className="flex items-center justify-center gap-2 text-xs md:text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 px-3 py-1 rounded-full"
                     >
                        <FaTag size={16} /> {tag}
                     </span>
                  ))}
               </div>
            </div>
         </header>

         {post.cover_image && (
            <div className="relative w-[95%] max-w-4xl mx-auto aspect-video object-cover p-4 mb-8 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
               <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  fetchPriority="high"
               />
            </div>
         )}

         <div
            className="
               max-w-4xl mx-auto text-justify p-4
               prose prose-lg dark:prose-invert
               prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100
               prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-justify
               prose-li:text-gray-700 dark:prose-li:text-gray-300
               prose-strong:text-red-600
               prose-code:text-red-600 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:my-2 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
               prose-pre:bg-[#282c34] prose-pre:p-0 prose-pre:rounded-lg prose-pre:overflow-hidden
               "
         >
            {post.content && (
               <MDXRemote
                  source={post.content}
                  components={mdxComponents}
                  options={options}
               />
            )}
         </div>
      </article>
   );
}
