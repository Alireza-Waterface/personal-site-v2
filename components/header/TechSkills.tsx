import { RiNextjsFill } from "react-icons/ri";
import { FaReact, FaGitAlt } from "react-icons/fa6";
import { SiTypescript } from "react-icons/si";

export default function TechSkills({ lang }: { lang: "en" | "fa" }) {
   const skills = [
      {
         name: "NextJS",
         faName: "نکست‌جی‌اس",
         icon: RiNextjsFill,
         color: "#0f0",
         iconClass: "fill-black dark:fill-white",
      },
      {
         name: "React",
         faName: "ری‌اکت",
         icon: FaReact,
         color: "#61DBFB",
         iconClass: "fill-[#61DBFB]",
      },
      {
         name: "TypeScript",
         faName: "تایپ‌اسکریپت",
         icon: SiTypescript,
         color: "#3178C6",
         iconClass: "fill-[#3178C6]",
      },
      {
         name: "Git",
         faName: "گیت",
         icon: FaGitAlt,
         color: "#F1502F",
         iconClass: "fill-[#F1502F]",
      },
   ];

   return (
      <div className="flex flex-wrap gap-4 items-center justify-center">
         {skills.map((skill) => (
            <div
               key={skill.name}
               className="relative group w-14 h-14 md:w-18 md:h-18 flex justify-center items-center select-none"
            >
               <div
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-2 rounded-full transition-all duration-500 group-hover:top-0 group-hover:w-[80%] group-hover:h-[50%] group-hover:rounded-[30px] group-active:top-0 group-active:w-[80%] group-active:h-[50%] group-active:rounded-[30px]"
                  style={{
                     backgroundColor: skill.color,
                     boxShadow: `0 0 5px ${skill.color}, 0 0 15px ${skill.color}, 0 0 30px ${skill.color}`,
                  }}
               />
               <div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-2 rounded-full transition-all duration-500 group-hover:bottom-0 group-hover:w-[80%] group-hover:h-[50%] group-hover:rounded-[30px] group-active:bottom-0 group-active:w-[80%] group-active:h-[50%] group-active:rounded-[30px]"
                  style={{
                     backgroundColor: skill.color,
                     boxShadow: `0 0 5px ${skill.color}, 0 0 15px ${skill.color}, 0 0 30px ${skill.color}`,
                  }}
               />
               <span
                  className="relative z-10 flex justify-center items-center w-full h-full rounded-xl
                       bg-white/5 backdrop-blur-md border-t border-b border-white/10 shadow-lg
                       overflow-hidden transition-all duration-500 hover:tracking-widest"
                  title={lang === "en" ? skill.name : skill.faName}
               >
                  <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent -skew-x-45 transition-transform duration-500 -translate-x-[150%] group-hover:translate-x-[250%]" />

                  <skill.icon
                     className={`relative z-20 w-8 h-8 md:w-12 md:h-12 transition-transform duration-500 group-active:fill-white group-hover:fill-white group-hover:scale-110 group-active:scale-110 ${skill.iconClass}`}
                  />
               </span>
            </div>
         ))}
      </div>
   );
}
