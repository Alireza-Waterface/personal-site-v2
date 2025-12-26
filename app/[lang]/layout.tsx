import "@/app/globals.css";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { getDictionary, Locale } from "@/lib/getDictionary";

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
};

export default async function RootLayout({
   children,
   params,
}: {
   children: React.ReactNode;
   params: Promise<{ lang: Locale }>;
}) {
   const { lang } = await params;
   const direction = lang === "fa" ? "rtl" : "ltr";

   return (
      <html
         lang={lang === "fa" ? "fa-IR" : lang}
         dir={direction}
         suppressHydrationWarning
      >
         <body className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all">
            <Navbar lang={lang} />
            {children}
            <Footer lang={lang} />
         </body>
      </html>
   );
}
