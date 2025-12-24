import { useEffect, RefObject } from "react";

type OutsideClickEvent = MouseEvent | TouchEvent;

export function useOutsideClick<T extends HTMLElement>(
   ref: RefObject<T | null>,
   callback: (event: OutsideClickEvent) => void
): void {
   useEffect(() => {
      const listener = (event: OutsideClickEvent) => {
         const el = ref.current;
         if (!el || el.contains(event.target as Node)) return;

         callback(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
         document.removeEventListener("mousedown", listener);
         document.removeEventListener("touchstart", listener);
      };
   }, [ref, callback]);
}
