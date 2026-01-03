import { z } from "zod";
import { Locale } from "@/lib/getDictionary";

export const getContactSchema = (lang: Locale) => {
   const isEn = lang === "en";

   return z.object({
      name: z
         .string()
         .trim()
         .nonempty({
            message: isEn
               ? "Name cannot be empty"
               : "توضیحات نمی‌تواند خالی باشد",
         })
         .min(2, {
            message: isEn
               ? "Name must be at least 2 characters"
               : "نام باید حداقل ۲ کاراکتر باشد",
         })
         .max(50, {
            message: isEn
               ? "Name cannot exceed 50 characters"
               : "نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد",
         }),
      phone: z
         .string()
         .trim()
         .nonempty({
            message: isEn
               ? "Phone number cannot be empty"
               : "توضیحات نمی‌تواند خالی باشد",
         })
         .regex(/^(\+98|0)?9\d{9}$/, {
            message: isEn
               ? "Invalid phone number (e.g., 09123456789 | +989123456789)"
               : "شماره تلفن معتبر نیست (مثال: 09123456789)",
         }),
      title: z
         .string()
         .trim()
         .nonempty({
            message: isEn
               ? "Subject cannot be empty"
               : "توضیحات نمی‌تواند خالی باشد",
         })
         .min(5, {
            message: isEn
               ? "Subject must be at least 5 characters"
               : "عنوان باید حداقل ۵ کاراکتر باشد",
         })
         .max(40, {
            message: isEn
               ? "Subject cannot exceed 40 characters"
               : "عنوان نمی‌تواند بیشتر از ۴۰ کاراکتر باشد",
         }),
      description: z
         .string()
         .trim()
         .nonempty({
            message: isEn
               ? "Description cannot be empty"
               : "توضیحات نمی‌تواند خالی باشد",
         })
         .min(5, {
            message: isEn
               ? "Message must be at least 5 characters"
               : "توضیحات باید حداقل ۵ کاراکتر باشد",
         })
         .max(500, {
            message: isEn
               ? "Message cannot exceed 500 characters"
               : "توضیحات نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد",
         })
         .refine((val) => !/<script/i.test(val), {
            message: isEn
               ? "Invalid characters detected"
               : "کاراکترهای غیرمجاز شناسایی شد",
         }),
   });
};

export type ContactFormState = {
   errors?: {
      name?: string[];
      phone?: string[];
      title?: string[];
      description?: string[];
   };
   message?: string;
   success?: boolean;
   inputs?: {
      name: string;
      phone: string;
      title: string;
      description: string;
   };
};
