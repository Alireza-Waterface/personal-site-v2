export default function ProjectLoading() {
   return (
      <article className="w-full animate-pulse">
         <section className="flex flex-col gap-6 p-4 border-b border-black dark:border-white/10">
            <div className="w-full flex justify-center">
               <div className="w-full md:w-[70%] aspect-video bg-gray-300 dark:bg-gray-700 rounded-xl" />
            </div>

            <div className="mt-4 space-y-2">
               <div className="h-8 md:h-10 w-2/3 md:w-1/3 bg-gray-300 dark:bg-gray-700 rounded-md" />
            </div>

            <div className="space-y-3 mt-2">
               <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded" />
               <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded" />
               <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded" />
               <div className="h-4 w-4/6 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mt-2">
               <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
               <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>

            <div className="mt-4 space-y-2">
               <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-4" />{" "}
               {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-2 items-center ms-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600" />
                     <div className="h-4 w-64 bg-gray-300 dark:bg-gray-700 rounded" />
                  </div>
               ))}
            </div>

            <div className="mt-2 space-y-2">
               <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-4" />
               {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-2 items-center ms-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600" />
                     <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
                  </div>
               ))}
            </div>
         </section>
      </article>
   );
}
