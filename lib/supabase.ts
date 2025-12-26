import { createClient } from "@supabase/supabase-js";

export type Json =
   | string
   | number
   | boolean
   | null
   | { [key: string]: Json | undefined }
   | Json[];

export type Database = {
   __InternalSupabase: {
      PostgrestVersion: "12.2.3 (519615d)";
   };
   graphql_public: {
      Tables: {
         [_ in never]: never;
      };
      Views: {
         [_ in never]: never;
      };
      Functions: {
         graphql: {
            Args: {
               extensions?: Json;
               operationName?: string;
               query?: string;
               variables?: Json;
            };
            Returns: Json;
         };
      };
      Enums: {
         [_ in never]: never;
      };
      CompositeTypes: {
         [_ in never]: never;
      };
   };
   public: {
      Tables: {
         about: {
            Row: {
               created_at: string;
               desc: string | null;
               id: number;
               title: string | null;
            };
            Insert: {
               created_at?: string;
               desc?: string | null;
               id?: number;
               title?: string | null;
            };
            Update: {
               created_at?: string;
               desc?: string | null;
               id?: number;
               title?: string | null;
            };
            Relationships: [];
         };
         blogs: {
            Row: {
               created_at: string;
               desc: string | null;
               end: string | null;
               file: string | null;
               id: number;
               image: string | null;
               intro: string | null;
               link: string | null;
               slug: string;
               thumbnail: string | null;
               title: string;
            };
            Insert: {
               created_at?: string;
               desc?: string | null;
               end?: string | null;
               file?: string | null;
               id?: number;
               image?: string | null;
               intro?: string | null;
               link?: string | null;
               slug: string;
               thumbnail?: string | null;
               title: string;
            };
            Update: {
               created_at?: string;
               desc?: string | null;
               end?: string | null;
               file?: string | null;
               id?: number;
               image?: string | null;
               intro?: string | null;
               link?: string | null;
               slug?: string;
               thumbnail?: string | null;
               title?: string;
            };
            Relationships: [];
         };
         projects: {
            Row: {
               cover_image: string | null;
               created_at: string;
               description: string;
               features: Json | null;
               gallery_images: string[] | null;
               github: string | null;
               id: number;
               metaDesc: string | null;
               metaKeywords: Json | null;
               slug: string;
               title: string;
               tools: Json | null;
               visitLink: string | null;
            };
            Insert: {
               cover_image?: string | null;
               created_at?: string;
               description: string;
               features?: Json | null;
               gallery_images?: string[] | null;
               github?: string | null;
               id?: number;
               metaDesc?: string | null;
               metaKeywords?: Json | null;
               slug: string;
               title: string;
               tools?: Json | null;
               visitLink?: string | null;
            };
            Update: {
               cover_image?: string | null;
               created_at?: string;
               description?: string;
               features?: Json | null;
               gallery_images?: string[] | null;
               github?: string | null;
               id?: number;
               metaDesc?: string | null;
               metaKeywords?: Json | null;
               slug?: string;
               title?: string;
               tools?: Json | null;
               visitLink?: string | null;
            };
            Relationships: [];
         };
         requests: {
            Row: {
               created_at: string;
               description: string;
               id: number;
               name: string;
               phone: string;
               title: string;
               viewed: boolean;
            };
            Insert: {
               created_at?: string;
               description: string;
               id?: number;
               name: string;
               phone: string;
               title: string;
               viewed?: boolean;
            };
            Update: {
               created_at?: string;
               description?: string;
               id?: number;
               name?: string;
               phone?: string;
               title?: string;
               viewed?: boolean;
            };
            Relationships: [];
         };
         skills: {
            Row: {
               created_at: string;
               id: number;
               skill: string;
               value: number | null;
            };
            Insert: {
               created_at?: string;
               id?: number;
               skill: string;
               value?: number | null;
            };
            Update: {
               created_at?: string;
               id?: number;
               skill?: string;
               value?: number | null;
            };
            Relationships: [];
         };
      };
      Views: {
         [_ in never]: never;
      };
      Functions: {
         [_ in never]: never;
      };
      Enums: {
         [_ in never]: never;
      };
      CompositeTypes: {
         [_ in never]: never;
      };
   };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
   keyof Database,
   "public"
>];

export type Tables<
   DefaultSchemaTableNameOrOptions extends
      | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
      | { schema: keyof DatabaseWithoutInternals },
   TableName extends DefaultSchemaTableNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals;
   }
      ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
           DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
      : never = never
> = DefaultSchemaTableNameOrOptions extends {
   schema: keyof DatabaseWithoutInternals;
}
   ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
        Row: infer R;
     }
      ? R
      : never
   : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
   ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
     }
      ? R
      : never
   : never;

export type TablesInsert<
   DefaultSchemaTableNameOrOptions extends
      | keyof DefaultSchema["Tables"]
      | { schema: keyof DatabaseWithoutInternals },
   TableName extends DefaultSchemaTableNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals;
   }
      ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
      : never = never
> = DefaultSchemaTableNameOrOptions extends {
   schema: keyof DatabaseWithoutInternals;
}
   ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I;
     }
      ? I
      : never
   : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
   ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
     }
      ? I
      : never
   : never;

export type TablesUpdate<
   DefaultSchemaTableNameOrOptions extends
      | keyof DefaultSchema["Tables"]
      | { schema: keyof DatabaseWithoutInternals },
   TableName extends DefaultSchemaTableNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals;
   }
      ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
      : never = never
> = DefaultSchemaTableNameOrOptions extends {
   schema: keyof DatabaseWithoutInternals;
}
   ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U;
     }
      ? U
      : never
   : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
   ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
     }
      ? U
      : never
   : never;

export type Enums<
   DefaultSchemaEnumNameOrOptions extends
      | keyof DefaultSchema["Enums"]
      | { schema: keyof DatabaseWithoutInternals },
   EnumName extends DefaultSchemaEnumNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals;
   }
      ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
      : never = never
> = DefaultSchemaEnumNameOrOptions extends {
   schema: keyof DatabaseWithoutInternals;
}
   ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
   : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
   ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
   : never;

export type CompositeTypes<
   PublicCompositeTypeNameOrOptions extends
      | keyof DefaultSchema["CompositeTypes"]
      | { schema: keyof DatabaseWithoutInternals },
   CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals;
   }
      ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
      : never = never
> = PublicCompositeTypeNameOrOptions extends {
   schema: keyof DatabaseWithoutInternals;
}
   ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
   : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
   ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
   : never;

export const Constants = {
   graphql_public: {
      Enums: {},
   },
   public: {
      Enums: {},
   },
} as const;

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
   throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient<Database>(
   process.env.SUPABASE_URL,
   process.env.SUPABASE_KEY
);
