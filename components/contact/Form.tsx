"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContact } from "@/app/actions/contact";
import { Locale } from "@/lib/getDictionary";
import { ContactFormState } from "@/lib/schemas";

const initialState = {
   message: "",
   errors: {},
};

export default function Form({ lang }: { lang: Locale }) {
   const submitWithLang = submitContact.bind(null, lang);

   const [state, formAction, isPending] = useActionState(
      submitWithLang,
      initialState
   );

   const [displayState, setDisplayState] =
      useState<ContactFormState>(initialState);

   const formRef = useRef<HTMLFormElement>(null);

   useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayState(state);
      if (state.success && formRef.current) {
         formRef.current.reset();

         const inputs = formRef.current.querySelectorAll("input, textarea");
         inputs.forEach((input) => ((input as HTMLInputElement).value = ""));
      }
   }, [state]);

   const handleReset = () => {
      setDisplayState({ errors: {}, message: "", success: false });

      if (formRef.current) {
         formRef.current.reset();
         const inputs = formRef.current.querySelectorAll("input, textarea");
         inputs.forEach((input) => ((input as HTMLInputElement).value = ""));
      }
   };

   const inputClass =
      "w-full rounded-lg border-none p-3 bg-gray-200 dark:bg-gray-800 shadow-inner focus:ring-2 focus:ring-red-600 transition-all outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-500";
   const labelClass =
      "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300";
   const requiredSpan = <span className="text-red-600 ms-1">*</span>;

   return (
      <form
         ref={formRef}
         action={formAction}
         className="flex flex-col gap-4 p-4 rounded-lg shadow-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
      >
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
               <label htmlFor="name" className={labelClass}>
                  {lang === "en" ? "Full Name" : "نام کامل"} {requiredSpan}
               </label>
               <input
                  id="name"
                  name="name"
                  type="text"
                  inputMode="text"
                  defaultValue={state.inputs?.name}
                  className={inputClass}
               />
               {displayState.errors?.name && (
                  <p className="text-red-500 text-xs mt-1">
                     {displayState.errors.name[0]}
                  </p>
               )}
            </div>

            <div>
               <label htmlFor="phone" className={labelClass}>
                  {lang === "en" ? "Phone Number" : "شماره تلفن"} {requiredSpan}
               </label>
               <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  dir="ltr"
                  placeholder="09123456789"
                  defaultValue={state.inputs?.phone}
                  className={`${inputClass} text-end`}
               />
               {displayState.errors?.phone && (
                  <p className="text-red-500 text-xs mt-1">
                     {displayState.errors.phone[0]}
                  </p>
               )}
            </div>
         </div>

         <div>
            <label htmlFor="title" className={labelClass}>
               {lang === "en" ? "Subject" : "عنوان درخواست"} {requiredSpan}
            </label>
            <input
               id="title"
               name="title"
               type="text"
               inputMode="text"
               placeholder={lang === "en" ? "Min 5 chars" : "حداقل ۵ کاراکتر"}
               defaultValue={state.inputs?.title}
               className={inputClass}
            />
            {displayState.errors?.title && (
               <p className="text-red-500 text-xs mt-1">
                  {displayState.errors.title[0]}
               </p>
            )}
         </div>

         <div>
            <label htmlFor="description" className={labelClass}>
               {lang === "en" ? "Message" : "توضیحات"} {requiredSpan}
            </label>
            <textarea
               id="description"
               name="description"
               inputMode="text"
               rows={5}
               placeholder={lang === "en" ? "Min 5 chars" : "حداقل ۵ کاراکتر"}
               defaultValue={state.inputs?.description}
               className={`${inputClass} resize-y min-h-[160px]`}
            />
            {displayState.errors?.description && (
               <p className="text-red-500 text-xs mt-1">
                  {displayState.errors.description[0]}
               </p>
            )}
         </div>

         <div className="flex gap-4 mt-2">
            <button
               type="button"
               disabled={isPending}
               onClick={handleReset}
               className="px-6 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:bg-gray-300 dark:hover:bg-gray-700 disabled:opacity-50 cursor-pointer active:translate-y-[3px] transition-all"
            >
               {lang === "en" ? "Cancel" : "لغو"}
            </button>
            <button
               type="submit"
               disabled={isPending}
               className="px-8 py-2 rounded-md bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 font-medium border-2 border-transparent hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer active:translate-y-[3px]"
            >
               {isPending
                  ? lang === "en"
                     ? "Sending..."
                     : "در حال ارسال..."
                  : lang === "en"
                  ? "Submit"
                  : "ثبت درخواست"}
            </button>
         </div>

         {displayState.success && (
            <div className="p-4 mt-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md text-center font-medium animate-in fade-in slide-in-from-bottom-2">
               {displayState.message}
            </div>
         )}

         {!displayState.success && displayState.message && (
            <div className="p-4 mt-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md text-center font-medium animate-in fade-in slide-in-from-bottom-2">
               {displayState.message}
            </div>
         )}
      </form>
   );
}
