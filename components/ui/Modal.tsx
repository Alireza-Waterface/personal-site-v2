"use client";

import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import { IoClose } from "react-icons/io5";

export default function Modal({ children }: { children: React.ReactNode }) {
   const router = useRouter();

   const onDismiss = useCallback(() => {
      router.back();
   }, [router]);

   // Close on Escape key
   useEffect(() => {
      const onKeyDown = (e: KeyboardEvent) => {
         if (e.key === "Escape") onDismiss();
      };
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
   }, [onDismiss]);

   return (
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
         {/* Backdrop Click */}
         <div className="absolute inset-0" onClick={onDismiss} />

         {/* Close Button */}
         <button
            onClick={onDismiss}
            className="absolute top-4 right-4 z-110 p-2 text-white bg-black/50 rounded-full hover:bg-white/20 transition-colors"
         >
            <IoClose size={32} />
         </button>

         {/* Content */}
         <div className="relative z-105 w-full max-w-7xl max-h-[90vh] flex items-center justify-center outline-none">
            {children}
         </div>
      </div>
   );
}
