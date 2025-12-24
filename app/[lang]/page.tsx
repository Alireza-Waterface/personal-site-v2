import { Locale, getDictionary } from "@/lib/getDictionary";

import Header from "@/components/header/Header";
import Capabilities from "@/components/capabilities/Capabilities";

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
            <Capabilities lang={lang} />
         </main>
      </>
   );
}
