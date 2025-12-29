import "@/app/globals.css";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { getDictionary, Locale } from "@/lib/getDictionary";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export async function generateMetadata({
   params,
}: {
   params: { lang: Locale };
}) {
   const { lang } = await params;
   const dict = await getDictionary(lang);

   return dict.meta;
}

export async function generateStaticParams() {
   return [{ lang: "en" }, { lang: "fa" }];
}

export const viewport = {
   width: "device-width",
   initialScale: 1,
   minimumScale: 1,
   maximumScale: 5,
   userScalable: false,
   themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#f3f4f6" }, // gray-100
      { media: "(prefers-color-scheme: dark)", color: "#111827" }, // gray-900
   ],
};

export default async function RootLayout({
   children,
   params,
}: {
   children: React.ReactNode;
   params: Promise<{ lang: string }>;
}) {
   const { lang } = await params;
   const safeLang = lang as Locale;

   const direction = safeLang === "fa" ? "rtl" : "ltr";

   return (
      <html
         lang={safeLang === "fa" ? "fa-IR" : safeLang}
         dir={direction}
         suppressHydrationWarning
      >
         <body className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-all">
            <Navbar lang={safeLang} />
            {children}
            <Footer lang={safeLang} />

            <Analytics />
            <SpeedInsights />
         </body>
      </html>
   );
}
