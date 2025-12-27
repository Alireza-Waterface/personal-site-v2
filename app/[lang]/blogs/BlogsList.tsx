"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { BlogPost } from "./page";

import {
   FaArrowRight,
   FaCalendar,
   FaChevronDown,
   FaChevronUp,
   FaClock,
} from "react-icons/fa6";
import { Locale } from "@/lib/getDictionary";

export default function BlogsList({
   blogs,
   lang,
}: {
   blogs: BlogPost[];
   lang: Locale;
}) {
   const [expandedId, setExpandedId] = useState<number | null>(null);

   const toggleExpand = (id: number) => {
      setExpandedId(expandedId === id ? null : id);
   };

   if (blogs.length <= 0) {
      return (
         <p className="text-red-600 text-center text-base md:text-xl col-span-full">
            {lang === "en"
               ? "There are no blogs to show!"
               : "بلاگی جهت نمایش وجود ندارد!"}
         </p>
      );
   }

   return (
      <section>
         {blogs.map((blog) => {
            const isExpanded = expandedId === blog.id;

            return (
               <motion.article
                  key={blog.id}
                  layout
                  onClick={() => !isExpanded && toggleExpand(blog.id)}
                  className={`relative bg-gray-200 dark:bg-gray-900 rounded-2xl overflow-hidden cursor-pointer border border-transparent hover:border-red-600/30 transition-all ${
                     isExpanded
                        ? "md:col-span-2 shadow-xl ring-2 ring-red-600/20 bg-white dark:bg-gray-700"
                        : "shadow-sm"
                  }`}
               >
                  <motion.div
                     layout="position"
                     className="p-4 flex flex-col gap-3"
                  >
                     <div className="flex justify-between items-start">
                        <div className="flex flex-wrap gap-2 mb-2">
                           {blog.tags?.map((tag) => (
                              <span
                                 key={tag}
                                 className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                              >
                                 #{tag}
                              </span>
                           ))}
                        </div>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                           <FaClock size={14} /> {blog.reading_time} min
                        </span>
                     </div>

                     <motion.h3
                        layout="position"
                        className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100"
                     >
                        {blog.title}
                     </motion.h3>

                     <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                           <FaCalendar size={14} />
                           {new Date(blog.created_at).toLocaleDateString(
                              lang === "en" ? "en-US" : "fa-IR"
                           )}
                        </span>

                        <button
                           onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(blog.id);
                           }}
                           className="ms-auto p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                        >
                           {isExpanded ? (
                              <FaChevronUp size={20} />
                           ) : (
                              <FaChevronDown size={20} />
                           )}
                        </button>
                     </div>
                  </motion.div>

                  <AnimatePresence>
                     {isExpanded && (
                        <motion.div
                           initial={{
                              opacity: 0,
                              height: 0,
                           }}
                           animate={{
                              opacity: 1,
                              height: "auto",
                           }}
                           exit={{
                              opacity: 0,
                              height: 0,
                           }}
                        >
                           <div className="flex flex-col p-4 md:flex-row gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                              {blog.cover_image && (
                                 <motion.div
                                    initial={{ scale: 0.75, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="relative w-full md:w-1/3 aspect-video rounded-lg overflow-hidden"
                                 >
                                    <Image
                                       src={blog.cover_image}
                                       alt={blog.title}
                                       fill
                                       className="object-cover"
                                    />
                                 </motion.div>
                              )}

                              <div className="flex flex-col flex-1 gap-4">
                                 <motion.p
                                    initial={{ opacity: 0, x: 25 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify"
                                 >
                                    {blog.excerpt}
                                 </motion.p>

                                 <motion.div
                                    initial={{ opacity: 0, x: 25 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="mt-auto flex justify-start"
                                 >
                                    <Link
                                       href={`/${lang}/blogs/${blog.slug}`}
                                       className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium active:scale-95"
                                       onClick={(e) => e.stopPropagation()}
                                    >
                                       {lang === "en"
                                          ? "Read Full Post"
                                          : "خواندن کامل مقاله"}
                                       <FaArrowRight
                                          className="rtl:rotate-180"
                                          size={18}
                                       />
                                    </Link>
                                 </motion.div>
                              </div>
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </motion.article>
            );
         })}
      </section>
   );
}
