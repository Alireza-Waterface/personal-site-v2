"use server";

import { Locale } from "@/lib/getDictionary";
import { getContactSchema, ContactFormState } from "@/lib/schemas";
import { supabase } from "@/lib/supabase";

export async function submitContact(
   lang: Locale,
   prevState: ContactFormState,
   formData: FormData
): Promise<ContactFormState> {
   const rawData = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
   };

   const schema = getContactSchema(lang);

   const validatedFields = schema.safeParse(rawData);

   if (!validatedFields.success) {
      return {
         errors: validatedFields.error.flatten().fieldErrors,
         inputs: rawData,
         success: false,
      };
   }

   try {
      const { error } = await supabase.from("requests").insert({
         name: validatedFields.data.name,
         phone: validatedFields.data.phone,
         title: validatedFields.data.title,
         description: validatedFields.data.description,
      });

      if (error) throw error;

      return {
         success: true,
         message:
            lang === "en"
               ? "Your request has been sent successfully"
               : "درخواست شما با موفقیت ثبت شد",
      };
   } catch (error) {
      console.error("Supabase Error:", error);
      return {
         success: false,
         message:
            lang === "en"
               ? "Connection error. Please try again later."
               : "خطایی در برقراری ارتباط رخ داد. لطفا بعدا تلاش کنید.",
         inputs: rawData,
      };
   }
}
