export default function TechTicker() {
   const techs = [
      "React",
      "NextJS",
      "TypeScript",
      "JavaScript",
      "Tailwind",
      "Git",
      "Vue",
   ];

   return (
      <div className="w-full overflow-hidden mask-linear-fade">
         <div className="flex w-max gap-8 animate-infinite-scroll">
            {[...techs, ...techs].map((tech, i) => (
               <span
                  key={i}
                  className="text-sm font-mono text-gray-400 dark:text-gray-600 whitespace-nowrap"
               >
                  {tech}
               </span>
            ))}
         </div>
      </div>
   );
}
