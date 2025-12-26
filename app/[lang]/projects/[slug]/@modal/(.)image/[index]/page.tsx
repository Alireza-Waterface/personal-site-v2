import Image from "next/image";
import { notFound } from "next/navigation";

import Modal from "@/components/ui/Modal";
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

   if (isNaN(index) || index < 0 || index >= images.length) return null;

   return images[index];
}

export default async function InterceptedImagePage({
   params,
}: {
   params: Promise<{ slug: string; index: string }>;
}) {
   const { slug, index } = await params;
   const imageUrl = await getProjectImage(slug, index);

   if (!imageUrl) notFound();

   return (
      <Modal>
         <div className="relative w-full aspect-video md:h-[95vh]">
            <Image
               src={imageUrl}
               alt="Full screen project view"
               fill
               className="object-contain"
               priority
               sizes="95vw"
            />
         </div>
      </Modal>
   );
}
