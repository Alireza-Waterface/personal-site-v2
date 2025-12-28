"use client";

import { useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";

export default function CopyEmail({ email }: { email: string }) {
   const [copied, setCopied] = useState(false);

   const copyToClipboard = async (text: string) => {
      // 1. Try Modern API
      if (navigator.clipboard && window.isSecureContext) {
         try {
            await navigator.clipboard.writeText(text);
            return true;
         } catch (err) {
            console.warn("Modern copy failed, trying legacy...", err);
         }
      }

      try {
         const textArea = document.createElement("textarea");
         textArea.value = text;

         textArea.style.position = "fixed";
         textArea.style.left = "-9999px";
         textArea.style.top = "0";
         textArea.setAttribute("readonly", "");
         document.body.appendChild(textArea);

         textArea.focus();
         textArea.select();

         const successful = document.execCommand("copy");
         document.body.removeChild(textArea);

         return successful;
      } catch (err) {
         console.error("Fallback copy failed", err);
         return false;
      }
   };

   const handleCopy = async () => {
      const success = await copyToClipboard(email);

      if (success) {
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } else {
         window.location.href = `mailto:${email}`;
      }
   };

   return (
      <button
         onClick={handleCopy}
         className="group relative flex items-center gap-3 p-4 w-full bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl hover:ring-1 active:ring-1 ring-red-600 transition-all duration-300 overflow-hidden cursor-pointer"
      >
         <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full group-hover:bg-red-50 dark:group-hover:bg-red-900/20 transition-colors">
            {copied ? (
               <FaCheck size={20} className="text-green-500" />
            ) : (
               <IoMail
                  size={20}
                  className="text-gray-600 dark:text-gray-300 group-hover:text-red-600"
               />
            )}
         </div>

         <div className="flex flex-col items-start">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
               {copied ? "Copied! | کپی‌ شد!" : "Drop me a line | ارتباط"}
            </span>
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-red-600 transition-colors">
               {email}
            </span>
         </div>

         <FaCopy
            size={16}
            className="absolute end-4 text-gray-400 opacity-100 lg:opacity-0 lg:-translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
         />
      </button>
   );
}
