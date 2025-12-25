export default function ResumeSkeleton() {
   return (
      <section className="flex flex-col p-4 border-t border-black/10 dark:border-white/10 w-full gap-8 animate-pulse">
         <div className="flex flex-col gap-2 items-center">
            <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-10 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-800">
            <div className="h-16 rounded-md bg-gray-300 dark:bg-gray-700" />
            <div className="h-16 rounded-md bg-gray-300 dark:bg-gray-700" />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
               <div key={i} className="flex flex-col gap-4">
                  <div className="flex justify-between">
                     <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
                     <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
                  </div>
                  <div className="h-3 w-full bg-gray-300 dark:bg-gray-700 rounded-full" />
               </div>
            ))}
         </div>
      </section>
   );
}
