import Image from "next/image";

import { getDictionary, Locale } from "@/lib/getDictionary";

import DelayedGlobe from "./DelayedGlobe";

interface Items {
   id: number;
   title: string;
   description?: string;
   className?: string;
   img?: string;
   spareImg?: string;
}

export default async function Grid({ lang }: { lang: Locale }) {
   const dict = await getDictionary(lang);

   const gridItems: Items[] = [
      {
         id: 1,
         title: dict.homePage.capabilities.coOp,
         className: "min-h-[50vh] lg:col-span-2 lg:row-span-2",
         img: "/b1.webp",
      },
      {
         id: 2,
         title: dict.homePage.capabilities.ready,
      },
      {
         id: 3,
         description: dict.homePage.capabilities.try.part1,
         title: dict.homePage.capabilities.try.part2,
      },
      {
         id: 4,
         title: dict.homePage.capabilities.pation,
         className: "lg:col-span-2",
         img: "/grid.webp",
         spareImg: "/b4.webp",
      },
      {
         id: 5,
         title: dict.homePage.capabilities.contact.part1,
         description: dict.homePage.capabilities.contact.part2,
         className: "lg:col-start-3 lg:row-start-3",
      },
   ];

   return (
      <div className="grid gap-4 mt-2 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(160px,auto)]">
         {gridItems.map((item) => (
            <div
               key={item.id}
               className={`relative rounded-xl overflow-hidden bg-gray-950 transition-all text-gray-100 ${item.className}`}
            >
               {item.id === 1 && (
                  <div>
                     <h3 className="absolute top-4 start-4 z-10 text-lg md:text-xl lg:text-2xl font-bold">
                        {item.title}
                     </h3>
                     <Image
                        alt=""
                        src={item.img!}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 66vw"
                        loading="lazy"
                     />
                  </div>
               )}
               {item.id === 2 && (
                  <div className="h-full">
                     <h3 className="absolute top-2 start-4 text-lg lg:text-xl pe-4 font-bold z-20">
                        {item.title}
                     </h3>
                     <DelayedGlobe />
                  </div>
               )}
               {item.id === 3 && (
                  <div className="flex gap-2 justify-between items-stretch px-2 py-2 h-full">
                     <div className="flex flex-col items-start justify-center h-full">
                        <p className="opacity-80 text-sm">{item.description}</p>
                        <h3 className="text-lg lg:text-xl font-bold">
                           {item.title}
                        </h3>
                     </div>

                     <div className="flex items-center gap-2 h-full relative text-sm">
                        <div className="flex flex-col gap-2 mb-auto -translate-y-4 lg:translate-y-0">
                           <span className="bg-gray-800 w-22 h-10 grid place-items-center rounded-md text-center"></span>
                           <span className="bg-gray-800 w-22 h-10 grid place-items-center rounded-md text-center">
                              NextJS
                           </span>
                           <span className="bg-gray-800 w-22 h-10 grid place-items-center rounded-md text-center">
                              React
                           </span>
                           <span className="bg-gray-800 w-22 h-10 grid place-items-center rounded-md text-center">
                              TypeScript
                           </span>
                        </div>
                        <div className="flex flex-col gap-2 mt-auto translate-y-4 lg:translate-y-0">
                           <span className="bg-gray-800 w-22 h-10 grid place-items-center rounded-md text-center">
                              Performance
                           </span>
                           <span className="bg-gray-800 w-22 h-10 grid place-items-center rounded-md text-center">
                              SEO
                           </span>
                           <span className="bg-gray-800 w-22 h-10 grid place-items-center rounded-md text-center">
                              Network
                           </span>
                           <span className="bg-gray-800 w-22 h-10 grid place-items-center rounded-md text-center"></span>
                        </div>
                     </div>
                  </div>
               )}
               {item.id === 4 && (
                  <div>
                     <h3 className="font-bold text-lg md:text-xl start-4 top-4 absolute">
                        {item.title}
                     </h3>
                     <Image
                        alt={lang === "en" ? "Background" : "پس‌زمینه"}
                        src={item.spareImg!}
                        width={180}
                        height={180}
                        className="absolute bottom-0 end-0 sm:w-[220px] lg:w-[300px]"
                     />
                     <Image
                        src={item.img!}
                        alt={lang === "en" ? "Background" : "پس‌زمینه"}
                        fill
                        className="absolute w-full h-full top-0 left-0"
                     />
                  </div>
               )}
               {item.id === 5 && (
                  <div className="flex flex-col gap-2 p-4 justify-between h-full items-center">
                     <div className="self-start">
                        <p className="opacity-80 text-sm">{item.description}</p>
                        <h3 className="text-lg font-bold">{item.title}</h3>
                     </div>

                     <a
                        href="tel:+989155706085"
                        title={lang === "en" ? "Contact me" : "تماس بگیرید"}
                        className="px-16 py-2 text-lg rounded-md bg-gray-800 w-fit mt-auto active:translate-y-1 transition-all"
                     >
                        {lang === "en" ? "Call now" : "تماس"}
                     </a>
                  </div>
               )}
            </div>
         ))}
      </div>
   );
}
