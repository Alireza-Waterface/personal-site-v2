export default function BlogPostLoading() {
   return (
      <article className="w-full max-w-4xl mx-auto p-4 animate-pulse">
         <div className="h-5 w-32 bg-gray-200 dark:bg-gray-800 rounded mb-4" />

         <header className="flex flex-col gap-6 mb-4 py-4 border-y border-gray-200 dark:border-gray-800">
            <div className="space-y-3">
               <div className="h-8 md:h-10 w-3/4 bg-gray-200 dark:bg-gray-800 rounded" />
               <div className="h-8 md:h-10 w-1/2 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-8">
               <div className="flex gap-4">
                  <div className="h-8 w-32 bg-gray-200 dark:bg-gray-800 rounded" />
                  <div className="h-8 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
               </div>
               <div className="flex gap-2">
                  <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded-full" />
                  <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded-full" />
               </div>
            </div>
         </header>

         <div className="w-full aspect-video mb-12 rounded-2xl bg-gray-200 dark:bg-gray-800" />

         <div className="space-y-4">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded" />

            <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded mt-8" />
            <div className="h-4 w-11/12 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-800 rounded" />
         </div>
      </article>
   );
}
