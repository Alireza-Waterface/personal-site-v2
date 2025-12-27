export default function BlogsLoading() {
   const skeletons = Array.from({ length: 6 }, (_, i) => i);

   return (
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-4 bg-gray-100 dark:bg-gray-900 border-b border-black/10 dark:border-white/10 animate-pulse">
         <header className="col-span-full flex justify-center mb-4">
            <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded-lg" />
         </header>

         {skeletons.map((i) => (
            <div
               key={i}
               className="relative bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden p-4 flex flex-col gap-4 h-[180px]"
            >
               <div className="flex justify-between items-start">
                  <div className="flex gap-2">
                     <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
                     <div className="h-5 w-12 bg-gray-300 dark:bg-gray-700 rounded" />
                  </div>
                  <div className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded" />
               </div>

               <div className="flex flex-col gap-2 mt-2">
                  <div className="h-7 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
                  <div className="h-7 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
               </div>

               <div className="flex justify-between items-center mt-auto">
                  <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
                  <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700" />
               </div>
            </div>
         ))}
      </main>
   );
}
