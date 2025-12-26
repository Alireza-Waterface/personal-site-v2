export default function ProjectsLoading() {
   const skeletons = Array.from({ length: 6 }, (_, i) => i);

   return (
      <>
         <header className="w-full p-4 flex justify-center items-center animate-pulse">
            <div className="h-8 md:h-10 w-64 md:w-96 bg-gray-300 dark:bg-gray-700 rounded-lg" />
         </header>

         <main className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 items-stretch">
            {skeletons.map((index) => (
               <div
                  key={index}
                  className="flex flex-col bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm animate-pulse"
               >
                  <div className="relative w-full aspect-video bg-gray-300 dark:bg-gray-700" />

                  <div className="p-4 flex flex-col gap-3 grow">
                     <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md" />

                     <div className="flex flex-col gap-2 mt-2">
                        <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded-md" />
                        <div className="h-4 w-11/12 bg-gray-300 dark:bg-gray-700 rounded-md" />
                        <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded-md" />
                     </div>

                     <div className="mt-auto pt-4">
                        <div className="h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded-md" />
                     </div>
                  </div>
               </div>
            ))}
         </main>
      </>
   );
}
