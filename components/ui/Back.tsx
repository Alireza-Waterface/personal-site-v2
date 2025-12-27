"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { cn } from "@/lib/utils";

interface BackProps {
   text: string;
   path: string;
   className?: string;
}

export default function Back({ text, path, className }: BackProps) {
   const router = useRouter();

   const handleNavigation = () => router.replace(path);

   return (
      <button
         onClick={handleNavigation}
         type="button"
         className={cn(
            "group inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors duration-200 cursor-pointer",
            className
         )}
      >
         <FaArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1" />
         <span>{text}</span>
      </button>
   );
}
