import { getDictionary, Locale } from "@/lib/getDictionary";
import Details from "./Details";
import Form from "./Form";

export default async function Contact({ lang }: { lang: Locale }) {
   const dict = await getDictionary(lang);

   return (
      <section
         id="contact"
         className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] lg:gap-x-4 gap-y-4 items-start p-4 border-y border-black/10 dark:border-white/10 w-full"
      >
         <div className="col-span-1 lg:col-span-2 flex flex-col items-center mb-4">
            <p className="text-sm text-red-600 font-medium">
               {lang === "en" ? "Contact Form" : "فرم تماس با من"}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
               {dict.nav.contact}
            </h2>
         </div>

         <div className="order-1">
            <Details lang={lang} />
         </div>

         <div className="order-2">
            <Form lang={lang} />
         </div>
      </section>
   );
}
