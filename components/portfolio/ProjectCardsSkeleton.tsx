import { ReactElement } from "react";

export default function ProjectCardsSkeleton(): ReactElement {
   const items = [1, 2, 3, 4];

   return (
      <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch gap-2">
         {items.map((item) => (
            <li
               key={item}
               className="p-2 flex flex-col bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl animate-pulse"
            >
               <div className="flex gap-4 flex-col w-full h-full">
                  {/* Image Placeholder - Matches h-60 */}
                  <div className="relative h-60 w-full rounded-lg bg-gray-300/50 dark:bg-gray-700/50" />

                  {/* Content Placeholder */}
                  <div className="flex justify-center items-center flex-col gap-3 px-2 pb-2">
                     {/* Title */}
                     <div className="h-7 w-1/2 rounded bg-gray-300/50 dark:bg-gray-700/50" />

                     {/* Description (2 lines) */}
                     <div className="w-full flex flex-col gap-2">
                        <div className="h-4 w-full rounded bg-gray-300/50 dark:bg-gray-700/50" />
                        <div className="h-4 w-4/5 self-center rounded bg-gray-300/50 dark:bg-gray-700/50" />
                     </div>
                  </div>
               </div>
            </li>
         ))}
      </ul>
   );
}
