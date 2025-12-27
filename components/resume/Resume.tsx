import { supabase } from "@/lib/supabase";
import { getDictionary, Locale } from "@/lib/getDictionary";
import { FaDownload } from "react-icons/fa6";

interface Skill {
   id: number;
   skill: string;
   value: number;
}

export default async function Resume({ lang }: { lang: Locale }) {
   const dict = await getDictionary(lang);

   const { data: skillsData } = await supabase
      .from("skills")
      .select("id, skill, value")
      .order("value", { ascending: false });

   const skills = skillsData as Skill[] | null;

   function getLevel(value: number) {
      if (value < 35) return dict.homePage.resume.skillsTab.levels.preliminary;
      if (value < 50) return dict.homePage.resume.skillsTab.levels.low;
      if (value < 70) return dict.homePage.resume.skillsTab.levels.medium;
      if (value < 90) return dict.homePage.resume.skillsTab.levels.high;
      return dict.homePage.resume.skillsTab.levels.advanced;
   }

   return (
      <section
         id="resume"
         className="flex flex-col p-4 w-full gap-8 bg-gray-200 dark:bg-gray-800"
      >
         <div className="flex flex-col items-center">
            <p className="text-base text-red-600">
               {dict.homePage.resume.desc}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
               {dict.homePage.resume.title}
            </h2>
         </div>

         <div className="relative w-full tab-parent has-[#tab-edu:checked]:[&_.label-edu]:bg-gray-100 has-[#tab-edu:checked]:[&_.label-edu]:text-red-600 dark:has-[#tab-edu:checked]:[&_.label-edu]:bg-gray-800 has-[#tab-edu:checked]:[&_.label-edu]:shadow-xl has-[#tab-skills:checked]:[&_.label-skills]:bg-gray-100 has-[#tab-skills:checked]:[&_.label-skills]:text-red-600 dark:has-[#tab-skills:checked]:[&_.label-skills]:bg-gray-800 has-[#tab-skills:checked]:[&_.label-skills]:shadow-xl">
            <input
               type="radio"
               name="resume_tab"
               id="tab-skills"
               className="peer/skills hidden input-skills"
               defaultChecked
            />

            <input
               type="radio"
               name="resume_tab"
               id="tab-edu"
               className="peer/edu hidden input-edu"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 rounded-lg bg-gray-300 dark:bg-gray-900 mb-8 select-none">
               <label
                  htmlFor="tab-edu"
                  className="label-edu cursor-pointer text-center p-4 md:p-6 text-lg md:text-xl rounded-md transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
               >
                  {dict.homePage.resume.education.title}
               </label>
               <label
                  htmlFor="tab-skills"
                  className="label-skills cursor-pointer text-center p-4 md:p-6 text-lg md:text-xl rounded-md transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
               >
                  {dict.homePage.resume.skillsTab.title}
               </label>
            </div>

            <div className="scale-0 opacity-0 h-0 peer-checked/skills:scale-100 peer-checked/skills:opacity-100 peer-checked/skills:h-[unset] peer-checked/skills:grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               {skills?.map((skill) => (
                  <div key={skill.id} className="flex flex-col gap-3">
                     <div className="flex justify-between items-center text-lg font-medium">
                        <span>{skill.skill}</span>
                        <span className="text-sm opacity-70">
                           {getLevel(skill.value)}
                        </span>
                     </div>
                     <div className="relative h-2.5 w-full bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                           className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-purple-600 to-red-700 dark:from-purple-600 dark:to-red-700 transition-all duration-1000 ease-out rtl:right-0 rtl:left-auto"
                           style={{ width: `${skill.value}%` }}
                        />
                     </div>
                  </div>
               ))}
               {!skills && (
                  <p className="col-span-2 text-center text-red-500">
                     No skills found.
                  </p>
               )}
            </div>

            <div className="scale-0 opacity-0 h-0 peer-checked/edu:scale-100 peer-checked/edu:opacity-100 peer-checked/edu:h-[unset] peer-checked/edu:flex flex-col gap-8 w-full md:w-1/2 rtl:border-r-4 rtl:border-r-gray-100 rtl:dark:border-r-gray-950 rtl:pr-8 ltr:pl-8 ltr:border-l-4 ltr:border-l-gray-100 ltr:dark:border-l-gray-950 duration-500">
               <div className="relative flex flex-col gap-4 bg-gray-100 dark:bg-gray-900 p-6 md:p-8 rounded-lg shadow-sm border-e-4 border-red-600">
                  <span className="absolute top-9 rtl:-right-[46px] ltr:-left-[46px] w-6 h-6 rounded-full border-4 border-gray-100 dark:border-gray-950 bg-gray-300 dark:bg-gray-800 z-10" />
                  <span className="absolute top-[47px] rtl:-right-[20px] ltr:-left-[23px] w-6 h-1 bg-gray-300 dark:bg-gray-950" />

                  <p className="text-2xl font-bold text-red-600">
                     {dict.homePage.resume.education.bachelor.title}
                  </p>
                  <p className="pt-4 border-t border-gray-200 dark:border-gray-700 text-base leading-relaxed opacity-90">
                     {dict.homePage.resume.education.bachelor.desc}
                  </p>
               </div>

               <div className="relative flex flex-col gap-4 bg-gray-100 dark:bg-gray-900 p-6 md:p-8 rounded-lg shadow-sm border-e-4 border-red-600">
                  <span className="absolute top-9 rtl:-right-[46px] ltr:-left-[46px] w-6 h-6 rounded-full border-4 border-gray-100 dark:border-gray-950 bg-gray-300 dark:bg-gray-800 z-10" />
                  <span className="absolute top-[47px] rtl:-right-[22px] ltr:-left-[23px] w-6 h-1 bg-gray-300 dark:bg-gray-950" />

                  <p className="text-2xl font-bold text-red-600">
                     {dict.homePage.resume.education.highSchool.title}
                  </p>
                  <p className="pt-4 border-t border-gray-200 dark:border-gray-700 text-base leading-relaxed opacity-90">
                     {dict.homePage.resume.education.highSchool.desc}
                  </p>
               </div>
            </div>
         </div>

         <a
            href="https://wjbwobxiekyzfcjxjnkt.supabase.co/storage/v1/object/public/me//Resume.pdf"
            title={dict.homePage.resume.download}
            download
            className="group rounded-md px-6 py-4 bg-gray-100 dark:bg-gray-800 border-2 border-red-700 shadow-xl outline-2 outline-transparent outline-offset-[1rem] transition-all duration-300 text-xl hover:outline-red-700 hover:-outline-offset-1 hover:bg-gray-200 dark:hover:bg-gray-900 font-semibold active:translate-y-[3px] mt-8 flex items-center gap-4 max-w-70 mx-auto"
         >
            <FaDownload className="group-hover:animate-bounce" />
            {dict.homePage.resume.download}
         </a>
      </section>
   );
}
