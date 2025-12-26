"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Link from "next/link";

interface ProjectGalleryProps {
   cover: string;
   gallery?: string[] | null;
}

const variants = {
   enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
   }),
   center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
   },
   exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
   }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
   return Math.abs(offset) * velocity;
};

export default function ProjectGallery({
   cover,
   gallery = [],
}: ProjectGalleryProps) {
   const params = useParams();
   const currentSlug = params?.slug as string;

   const images = [cover, ...(gallery || [])].filter(Boolean);

   const [[page, direction], setPage] = useState([0, 0]);

   const imageIndex = Math.abs(page % images.length);
   const activeImage = images[imageIndex];

   const paginate = useCallback((newDirection: number) => {
      setPage((prev) => [prev[0] + newDirection, newDirection]);
   }, []);

   const handleDragEnd = (
      e: MouseEvent | TouchEvent | PointerEvent,
      { offset, velocity }: PanInfo
   ): void => {
      const swipe = swipePower(offset.x, velocity.x);

      if (swipe < -swipeConfidenceThreshold) {
         paginate(1);
      } else if (swipe > swipeConfidenceThreshold) {
         paginate(-1);
      }
   };

   if (images.length === 0) return null;

   return (
      <div className="flex flex-col gap-4 w-full max-w-5xl mx-auto select-none">
         <div className="relative group w-full aspect-video md:aspect-video lg:aspect-21/9 bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
            <div className="absolute inset-0 z-0 opacity-50 blur-3xl scale-110 saturate-150">
               <Image
                  src={activeImage}
                  alt="background blur"
                  fill
                  className="object-cover"
                  priority
               />
            </div>

            <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing">
               <AnimatePresence
                  initial={false}
                  custom={direction}
                  mode="popLayout"
               >
                  <motion.div
                     key={page}
                     custom={direction}
                     variants={variants}
                     initial="enter"
                     animate="center"
                     exit="exit"
                     transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                     }}
                     drag="x"
                     dragConstraints={{ left: 0, right: 0 }}
                     dragElastic={1}
                     onDragEnd={handleDragEnd}
                     className="relative w-full h-full"
                  >
                     <Link
                        href={`/projects/${currentSlug}/image/${imageIndex}`}
                        scroll={false}
                        className="relative block w-full h-full"
                     >
                        <Image
                           src={activeImage}
                           alt={`Gallery image ${imageIndex + 1}`}
                           fill
                           className="object-contain pointer-events-none"
                           sizes="(max-width: 768px) 100vw, 85vw"
                           priority
                        />
                     </Link>
                  </motion.div>
               </AnimatePresence>
            </div>

            {images.length > 1 && (
               <>
                  <button
                     className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white backdrop-blur-md hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100 md:opacity-0 focus:opacity-100 -translate-x-4 group-hover:translate-x-0 cursor-pointer"
                     onClick={() => paginate(-1)}
                     aria-label="Previous image"
                  >
                     <FaChevronLeft size={24} />
                  </button>
                  <button
                     className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white backdrop-blur-md hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100 md:opacity-0 focus:opacity-100 translate-x-4 group-hover:translate-x-0 cursor-pointer"
                     onClick={() => paginate(1)}
                     aria-label="Next image"
                  >
                     <FaChevronRight size={24} />
                  </button>
               </>
            )}

            <div className="absolute bottom-4 right-4 z-20 px-3 py-1 text-xs font-bold text-white bg-black/40 backdrop-blur-md rounded-full">
               {imageIndex + 1} / {images.length}
            </div>
         </div>

         {images.length > 1 && (
            <div className="relative">
               <div className="flex gap-3 px-2 py-1 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scroll-smooth snap-x">
                  {images.map((imgUrl, index) => {
                     const isActive = index === imageIndex;
                     return (
                        <button
                           key={index}
                           onClick={() => {
                              const direction = index > imageIndex ? 1 : -1;
                              setPage([index, direction]);
                           }}
                           className={`
                      relative shrink-0 w-20 h-14 cursor-pointer md:w-24 md:h-16 rounded-lg overflow-hidden transition-all duration-300 snap-start
                      ${
                         isActive
                            ? "ring-2 ring-red-600 scale-105 opacity-100 shadow-md"
                            : "opacity-60 hover:opacity-100 grayscale hover:grayscale-0"
                      }
                   `}
                           aria-label={`Go to image ${index + 1}`}
                        >
                           <Image
                              src={imgUrl}
                              alt={`Thumbnail ${index + 1}`}
                              fill
                              className="object-cover"
                           />
                        </button>
                     );
                  })}
               </div>
            </div>
         )}
      </div>
   );
}
