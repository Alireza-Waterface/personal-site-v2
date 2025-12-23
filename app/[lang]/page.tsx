import { Locale, getDictionary } from "@/lib/getDictionary";

import Header from "@/components/header/Header";

export default async function HomePage({
   params,
}: {
   params: Promise<{ lang: Locale }>;
}) {
   const { lang } = await params;
   const dict = await getDictionary(lang);

   return (
      <>
         <main className="text-2xl">
            <Header lang={lang} />
         </main>
      </>
   );
}
