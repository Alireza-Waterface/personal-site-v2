import { Locale, getDictionary } from "@/lib/getDictionary";

export default async function HomePage({
   params,
}: {
   params: Promise<{ lang: Locale }>;
}) {
   const { lang } = await params;
   const dict = await getDictionary(lang);

   return (
      <>
         <main className="text-2xl">{dict.homePage.header.greeting}</main>
      </>
   );
}
