import { createClient } from "@supabase/supabase-js";

export type Database = {
   public: {
      Tables: {
         projects: {
            Row: {
               id: number;
               slug: string;
               created_at: string;
               title: string;
               description: string;
               tools: string[];
               features: string[];
               github: string | null;
               visitLink: string | null;
               metaDesc: string;
               metaKeywords: string[];
               cover_image: string;
               gallery_images: string[];
            };
         };
         skills: {
            Row: {
               id: number;
               created_at: string;
               skill: string;
               value: number;
            };
         };
      };
   };
};

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
   throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient<Database>(
   process.env.SUPABASE_URL,
   process.env.SUPABASE_KEY
);
