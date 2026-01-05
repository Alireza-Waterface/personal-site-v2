import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const baseUrl = "https://waterface.ir";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
   const { data: projects } = await supabase
      .from("projects")
      .select("slug, created_at");
   const { data: blogs } = await supabase
      .from("blogs")
      .select("slug, created_at");

   const routes = ["", "/projects", "/blogs"];
   const languages = ["en", "fa"];

   const staticEntries = routes.flatMap((route) =>
      languages.map((lang) => ({
         url: `${baseUrl}/${lang}${route}`,
         lastModified: new Date(),
         changeFrequency: "weekly" as const,
         priority: route === "" ? 1 : 0.8,
      }))
   );

   const projectEntries = (projects || []).flatMap((project) =>
      languages.map((lang) => ({
         url: `${baseUrl}/${lang}/projects/${project.slug}`,
         lastModified: new Date(project.created_at),
         changeFrequency: "monthly" as const,
         priority: 0.7,
      }))
   );

   const blogEntries = (blogs || []).flatMap((blog) =>
      languages.map((lang) => ({
         url: `${baseUrl}/${lang}/blogs/${blog.slug}`,
         lastModified: new Date(blog.created_at),
         changeFrequency: "weekly" as const,
         priority: 0.7,
      }))
   );

   return [...staticEntries, ...projectEntries, ...blogEntries];
}
