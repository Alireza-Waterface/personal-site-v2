import { Locale } from "@/lib/getDictionary";

import Header from "@/components/header/Header";
import Capabilities from "@/components/capabilities/Capabilities";
import Portfolio from "@/components/portfolio/Portfolio";
import Resume from "@/components/resume/Resume";
import { Suspense } from "react";
import ResumeSkeleton from "@/components/resume/ResumeSkeleton";

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
            <Suspense fallback={<ResumeSkeleton />}>
               <Resume lang={lang} />
            </Suspense>
         </main>
      </>
   );
}
