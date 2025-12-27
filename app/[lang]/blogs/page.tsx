import { Locale } from "@/lib/getDictionary";
import BlogsList from "./BlogsList";
import { supabase } from "@/lib/supabase";
import { Metadata } from "next";

interface Props {
   params: Promise<{ lang: string }>;
}

export interface BlogPost {
   id: number;
   slug: string;
   title: string;
   excerpt: string;
   cover_image: string | null;
   created_at: string;
   reading_time: number;
   tags: string[] | null;
   content?: string;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const resolvedParams = await params;
   const lang = resolvedParams.lang as Locale;

   const { count } = await supabase
      .from("blogs")
      .select("*", { count: "exact", head: true });

   const blogsCount = count || 0;

   if (lang === "en") {
      return {
         title: `Alireza Waterface | Blogs and posts - ${blogsCount} blogs`,
         description:
            "Frontend Developer & Freelancer | Blogs and posts about tech, web development, front-end and more",
         keywords: [
            "Freelancer",
            "Frontend Developer",
            "Next.js",
            "React",
            "Web Developer",
            "Alireza Waterface",
            "Waterface blogs",
            "blogs",
            "blog",
         ],
         authors: [{ name: "Alireza Waterface" }],
         robots: "index, follow",
         openGraph: {
            title: `Alireza Waterface | Blogs and posts - ${blogsCount} blogs`,
            description:
               "Read useful blogs about web development, tech and more written by Alireza Waterface",
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

   return {
      title: `علیرضا آبچهره | بلاگ‌ها و پست‌ها - ${blogsCount} بلاگ`,
      description:
         "علیرضا آبچهره | توسعه دهنده فرانت‌اند و فریلنسر | بلاگ‌ها و پست‌ها",
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
         "بلاگ",
         "وبلاگ",
         "پست",
      ],
      openGraph: {
         title: `علیرضا آبچهره | بلاگ‌ها و پست‌ها - ${blogsCount} بلاگ`,
         description:
            "علیرضا آبچهره | توسعه دهنده فرانت‌اند و فریلنسر | پست‌های وبلاگ",
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

export default async function Blogs({ params }: Props) {
   const resolvedParams = await params;
   const lang = resolvedParams.lang as Locale;

   const { data, error } = await supabase
      .from("blogs")
      .select(
         "id, slug, title, excerpt, cover_image, created_at, reading_time, tags"
      )
      .order("created_at", { ascending: false });

   if (error) {
      console.error("Error fetching blogs:", error);
   }

   const blogs = data as BlogPost[];

   return (
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4 bg-gray-100 dark:bg-gray-800 border-b border-black/10 dark:border-white/10">
         <header className="col-span-full">
            <h1 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
               {lang === "en" ? "All blogs" : "همه بلاگ‌ها"}
            </h1>
         </header>

         <BlogsList blogs={blogs} lang={lang} />
      </main>
   );
}
