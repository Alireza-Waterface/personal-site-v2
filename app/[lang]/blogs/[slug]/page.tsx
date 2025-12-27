import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { ComponentPropsWithoutRef } from "react";

import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

import { supabase } from "@/lib/supabase";
import { Locale } from "@/lib/getDictionary";

import { BlogPost } from "../page";

import Back from "@/components/ui/Back";

import { FaCalendar, FaClock, FaTag } from "react-icons/fa6";

export const revalidate = 3600;
export const dynamicParams = true;

interface Props {
   params: Promise<{ slug: string; lang: Locale }>;
}

interface BlogImageProps {
   src: string;
   alt?: string;
}

async function getPost(slug: string) {
   const { data } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .single();

   const post = data as BlogPost;
   return post;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const { slug, lang } = await params;
   const post = await getPost(slug);

   if (!post) return {};

   return {
      title:
         lang === "en"
            ? `Alireza Waterface | Blog: ${post.title}`
            : `علیرضا آبچهره | بلاگ: ${post.title}`,
      description: post.excerpt,
      keywords: post.tags,
      authors: [{ name: "Alireza Waterface" }],
      robots: "index, follow",
      openGraph: {
         title: post.title,
         description: post.excerpt,
         type: "article",
         publishedTime: post.created_at,
         authors: ["Alireza Waterface"],
         images: [{ url: post.cover_image || "" }],
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
      <div className="relative w-full aspect-video my-8 rounded-xl overflow-hidden shadow-lg">
         <Image
            src={props.src}
            alt={props.alt || "Blog Image"}
            fill
            className="object-cover"
         />
      </div>
   ),
   a: (props: ComponentPropsWithoutRef<"a">) => (
      <a
         {...props}
         className="text-red-600 font-medium hover:underline underline-offset-4"
         target="_blank"
         rel="noopener noreferrer"
      />
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
   const post = await getPost(slug);

   if (!post) notFound();

   const options = {
      mdxOptions: {
         remarkPlugins: [remarkGfm],
         rehypePlugins: [rehypeHighlight],
      },
   };

   return (
      <article className="w-full max-w-4xl mx-auto p-4">
         <Back
            text={lang === "en" ? "Back to Blogs" : "بازگشت به بلاگ‌ها"}
            path={`/${lang}/blogs`}
            className="mb-4"
         />

         <header className="flex flex-col gap-6 mb-4 py-4 border-y border-gray-200 dark:border-gray-800">
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
                  {post.tags?.map((tag: string) => (
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
            <div className="relative w-full aspect-video md:aspect-video mb-12 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
               <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
               />
            </div>
         )}

         <div
            className="
               prose prose-lg dark:prose-invert max-w-none
               prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100
               prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-justify
               prose-li:text-gray-700 dark:prose-li:text-gray-300
               prose-strong:text-red-600
               prose-code:text-red-600 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
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
