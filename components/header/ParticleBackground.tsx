"use client";

import { useEffect, useRef, useState } from "react";
import { Particle } from "./Particle";

export default function ParticleBackground() {
   const canvasRef = useRef<HTMLCanvasElement | null>(null);
   const rafRef = useRef<number | null>(null);

   // track dark/light mode
   const [isDark, setIsDark] = useState(false);

   useEffect(() => {
      const match = window.matchMedia("(prefers-color-scheme: dark)");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(match.matches);

      const listener = (e: MediaQueryListEvent) => setIsDark(e.matches);
      match.addEventListener("change", listener);

      return () => match.removeEventListener("change", listener);
   }, []);

   useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let DPR = Math.min(2, window.devicePixelRatio || 1);
      let W = 0,
         H = 0;

      const getBounds = () => ({ W, H, DPR });
      const particles: Particle[] = [];
      const mouse = { x: null as number | null, y: null as number | null };

      const resize = () => {
         DPR = Math.min(2, window.devicePixelRatio || 1);
         W = canvas.width = Math.floor(window.innerWidth * DPR);
         H = canvas.height = Math.floor(window.innerHeight * DPR);
         canvas.style.width = "100%";
         canvas.style.height = "100%";
      };

      const computeParticles = () => {
         const area = (W * H) / (DPR * DPR);
         const target = Math.min(
            220,
            Math.max(40, Math.round(0.12 * (area / 10000)))
         );

         while (particles.length < target) {
            particles.push(
               new Particle(
                  ctx,
                  {
                     maxSpeed: 0.6,
                     radius: [1, 2.2],
                     mouseInfluence: 110,
                     repelStrength: 0.35,
                  },
                  getBounds
               )
            );
         }

         particles.length = target;
      };

      const drawLinks = () => {
         ctx.strokeStyle = isDark ? "#00f" : "#3b82f6"; // blue-500 in light mode
         ctx.lineWidth = DPR;

         for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
               const a = particles[i];
               const b = particles[j];
               const d = Math.hypot(a.x - b.x, a.y - b.y);

               if (d < 110 * DPR) {
                  ctx.globalAlpha = 0.16 * (1 - d / (110 * DPR));
                  ctx.beginPath();
                  ctx.moveTo(a.x, a.y);
                  ctx.lineTo(b.x, b.y);
                  ctx.stroke();
               }
            }
         }

         ctx.globalAlpha = 1;
      };

      const loop = () => {
         ctx.clearRect(0, 0, W, H);
         for (const p of particles) p.step(mouse.x, mouse.y);
         drawLinks();
         for (const p of particles) p.draw(isDark ? "#00f" : "#1d4ed8"); // blue-700 for light mode
         rafRef.current = requestAnimationFrame(loop);
      };

      resize();
      computeParticles();
      loop();

      window.addEventListener("resize", resize);
      window.addEventListener("mousemove", (e) => {
         mouse.x = e.clientX * DPR;
         mouse.y = e.clientY * DPR;
      });
      window.addEventListener("mouseleave", () => {
         mouse.x = mouse.y = null;
      });

      return () => {
         if (rafRef.current) cancelAnimationFrame(rafRef.current);
         window.removeEventListener("resize", resize);
      };
   }, [isDark]); // re-run if dark/light mode changes

   return (
      <canvas ref={canvasRef} className="particle-bg absolute w-full h-full" />
   );
}
