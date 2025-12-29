"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const RealGridGlobe = dynamic(() => import("./GridGlobe"), {
   ssr: false,
});

export default function DelayedGlobe() {
   const [shouldLoad, setShouldLoad] = useState(false);

   useEffect(() => {
      let delayTimer: NodeJS.Timeout;

      const handleInteraction = () => {
         cleanupListeners();

         delayTimer = setTimeout(() => {
            setShouldLoad(true);
         }, 3000);
      };

      const cleanupListeners = () => {
         window.removeEventListener("mousemove", handleInteraction);
         window.removeEventListener("scroll", handleInteraction);
         window.removeEventListener("touchstart", handleInteraction);
         window.removeEventListener("keydown", handleInteraction);
      };

      window.addEventListener("mousemove", handleInteraction);
      window.addEventListener("scroll", handleInteraction);
      window.addEventListener("touchstart", handleInteraction);
      window.addEventListener("keydown", handleInteraction);

      return () => {
         cleanupListeners();
         clearTimeout(delayTimer);
      };
   }, []);

   if (!shouldLoad) {
      return <div className="w-full h-full bg-transparent min-h-[160px]" />;
   }

   return <RealGridGlobe />;
}
