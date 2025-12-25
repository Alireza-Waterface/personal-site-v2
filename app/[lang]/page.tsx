import { Locale } from "@/lib/getDictionary";

import Header from "@/components/header/Header";
import Capabilities from "@/components/capabilities/Capabilities";
import Portfolio from "@/components/portfolio/Portfolio";

export default async function HomePage({
   params,
}: {
   params: Promise<{ lang: Locale }>;
}) {
   const { lang } = await params;

   return (
      <>
         <main className="text-base">
            <Header lang={lang} />
            <Capabilities lang={lang} />
            <Portfolio lang={lang} />
         </main>
      </>
   );
}
