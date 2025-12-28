"use client";

import { useEffect, useRef, useState } from "react";
import { Particle } from "./Particle";

export default function ParticleBackground() {
   const canvasRef = useRef<HTMLCanvasElement | null>(null);
   const rafRef = useRef<number | null>(null);
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
      const ctx = canvas.getContext("2d", { alpha: false });
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
            100,
            Math.max(30, Math.round(0.08 * (area / 10000)))
         );

         if (particles.length < target) {
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
         } else if (particles.length > target) {
            particles.length = target;
         }
      };

      const drawLinks = () => {
         const threshold = 110 * DPR;
         const thresholdSq = threshold * threshold;

         ctx.lineWidth = DPR;

         const baseColor = isDark ? "0, 0, 255" : "59, 130, 246";

         for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
               const a = particles[i];
               const b = particles[j];

               const dx = a.x - b.x;
               const dy = a.y - b.y;
               const distSq = dx * dx + dy * dy;

               if (distSq < thresholdSq) {
                  const dist = Math.sqrt(distSq);
                  const alpha = 0.16 * (1 - dist / threshold);

                  ctx.beginPath();
                  ctx.strokeStyle = `rgba(${baseColor}, ${alpha})`;
                  ctx.moveTo(a.x, a.y);
                  ctx.lineTo(b.x, b.y);
                  ctx.stroke();
               }
            }
         }
      };

      const loop = () => {
         ctx.clearRect(0, 0, W, H);

         for (const p of particles) p.step(mouse.x, mouse.y);

         drawLinks();

         ctx.fillStyle = isDark ? "#00f" : "#1d4ed8";
         ctx.globalAlpha = 0.9;

         for (const p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
         }

         rafRef.current = requestAnimationFrame(loop);
      };

      resize();
      computeParticles();
      loop();

      window.addEventListener("resize", () => {
         resize();
         computeParticles();
      });
      window.addEventListener("mousemove", (e) => {
         mouse.x = e.clientX * DPR;
         mouse.y = e.clientY * DPR;
      });
      window.addEventListener("mouseleave", () => {
         mouse.x = mouse.y = null;
      });

      return () => {
         if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
   }, [isDark]);

   return (
      <canvas
         ref={canvasRef}
         className="absolute w-full h-full z-0 pointer-events-none"
         aria-hidden="true"
      />
   );
}
