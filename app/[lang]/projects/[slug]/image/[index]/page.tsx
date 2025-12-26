import Image from "next/image";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

async function getProjectImage(slug: string, indexStr: string) {
   const { data } = await supabase
      .from("projects")
      .select("cover_image, gallery_images")
      .eq("slug", slug)
      .single();
   if (!data) return null;
   const images = [data.cover_image, ...(data.gallery_images || [])].filter(
      Boolean
   );
   const index = parseInt(indexStr);
   return images[index];
}

export default async function FullPageImage({
   params,
}: {
   params: Promise<{ slug: string; index: string }>;
}) {
   const { slug, index } = await params;
   const imageUrl = await getProjectImage(slug, index);

   if (!imageUrl) notFound();

   return (
      <div className="flex items-center justify-center w-full min-h-[80vh] bg-black p-4">
         <div className="relative w-full h-[85vh] max-w-7xl mx-auto">
            <Image
               src={imageUrl}
               alt="Full screen view"
               fill
               className="object-contain"
               priority
            />
         </div>
      </div>
   );
}
