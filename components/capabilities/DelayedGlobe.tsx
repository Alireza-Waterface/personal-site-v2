"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const RealGridGlobe = dynamic(() => import("./GridGlobe"), {
   ssr: false,
});

export default function DelayedGlobe() {
   const [isLoaded, setIsLoaded] = useState(false);

   useEffect(() => {
      const loadGlobe = () => setIsLoaded(true);

      if ("requestIdleCallback" in window) {
         // Modern browsers: Run when CPU is free
         const handle = window.requestIdleCallback(loadGlobe, {
            timeout: 5000,
         });
         return () => window.cancelIdleCallback(handle);
      } else {
         const timer = setTimeout(loadGlobe, 3000);
         return () => clearTimeout(timer);
      }
   }, []);

   if (!isLoaded) {
      return <div className="w-full h-full bg-transparent min-h-[160px]" />;
   }

   return <RealGridGlobe />;
}
