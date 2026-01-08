"use client";

import { useEffect, useRef } from "react";
import { Particle, type ParticleConfig } from "./Particle";

type Bounds = {
   W: number;
   H: number;
   DPR: number;
};

type ThemePalette = {
   particle: string;
   linkRGB: string;
   linkAlpha: number;
   glow: string;
   maxSpeed: number;
   radius: [number, number];
   mouseInfluence: number;
   repelStrength: number;
   linkDistance: number;
};

export default function ParticleBackground() {
   const canvasRef = useRef<HTMLCanvasElement | null>(null);
   const rafRef = useRef<number | null>(null);
   const isRunningRef = useRef(false);

   const themeRef = useRef<ThemePalette>({
      particle: "",
      linkRGB: "",
      linkAlpha: 0,
      glow: "",
      maxSpeed: 0,
      radius: [1, 2],
      mouseInfluence: 0,
      repelStrength: 0,
      linkDistance: 0,
   });

   useEffect(() => {
      const root = document.documentElement;

      const applyTheme = () => {
         const isDark = root.classList.contains("dark");

         themeRef.current = isDark
            ? {
                 particle: "rgba(56,189,248,0.85)",
                 linkRGB: "56,189,248",
                 linkAlpha: 0.22,
                 glow: "rgba(56,189,248,0.35)",
                 maxSpeed: 0.6,
                 radius: [1.2, 2.4],
                 mouseInfluence: 130,
                 repelStrength: 0.4,
                 linkDistance: 110,
              }
            : {
                 particle: "rgba(37,99,235,0.55)",
                 linkRGB: "37,99,235",
                 linkAlpha: 0.12,
                 glow: "transparent",
                 maxSpeed: 0.45,
                 radius: [1, 2],
                 mouseInfluence: 90,
                 repelStrength: 0.28,
                 linkDistance: 90,
              };
      };

      applyTheme();

      const observer = new MutationObserver(applyTheme);
      observer.observe(root, {
         attributes: true,
         attributeFilter: ["class"],
      });

      return () => observer.disconnect();
   }, []);

   useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let DPR = Math.min(2, window.devicePixelRatio || 1);
      let W = 0;
      let H = 0;

      const bounds = (): Bounds => ({ W, H, DPR });

      const particles: Particle[] = [];
      const mouse = { x: null as number | null, y: null as number | null };

      const resize = () => {
         DPR = Math.min(2, window.devicePixelRatio || 1);
         W = canvas.width = Math.floor(window.innerWidth * DPR);
         H = canvas.height = Math.floor(window.innerHeight * DPR);
         canvas.style.width = "100%";
         canvas.style.height = "100%";
      };

      const initParticles = () => {
         const area = (W * H) / DPR ** 2;
         const isMobile = window.matchMedia("(pointer: coarse)").matches;

         const density = isMobile ? 26000 : 22000;
         const maxCount = isMobile ? 36 : 56;
         const minCount = isMobile ? 12 : 16;

         const target = Math.min(
            maxCount,
            Math.max(minCount, Math.round(area / density))
         );

         const cfg: ParticleConfig = {
            maxSpeed: themeRef.current.maxSpeed,
            radius: themeRef.current.radius,
            mouseInfluence: themeRef.current.mouseInfluence,
            repelStrength: themeRef.current.repelStrength,
         };

         while (particles.length < target) {
            particles.push(new Particle(ctx, cfg, bounds));
         }

         particles.length = target;
      };

      const drawLinks = () => {
         const { linkRGB, linkAlpha, linkDistance } = themeRef.current;

         const threshold = linkDistance * DPR;
         const thresholdSq = threshold * threshold;

         ctx.lineWidth = DPR;

         for (let i = 0; i < particles.length; i++) {
            const a = particles[i];

            for (let j = i + 1; j < particles.length; j++) {
               const b = particles[j];

               const dx = a.x - b.x;
               const dy = a.y - b.y;
               const d2 = dx * dx + dy * dy;

               if (d2 > thresholdSq) continue;

               const alpha = linkAlpha * (1 - d2 / thresholdSq);
               ctx.strokeStyle = `rgba(${linkRGB},${alpha})`;

               ctx.beginPath();
               ctx.moveTo(a.x, a.y);
               ctx.lineTo(b.x, b.y);
               ctx.stroke();
            }
         }
      };

      const drawParticles = () => {
         const { particle, glow } = themeRef.current;

         ctx.shadowBlur = glow === "transparent" ? 0 : 6;
         ctx.shadowColor = glow;
         ctx.fillStyle = particle;

         for (const p of particles) {
            p.draw(particle);
         }

         ctx.shadowBlur = 0;
      };

      const loop = () => {
         if (!isRunningRef.current) return;

         ctx.clearRect(0, 0, W, H);

         for (const p of particles) {
            p["config"].maxSpeed = themeRef.current.maxSpeed;
            p["config"].mouseInfluence = themeRef.current.mouseInfluence;
            p["config"].repelStrength = themeRef.current.repelStrength;
            p.step(mouse.x, mouse.y);
         }

         drawLinks();
         drawParticles();

         rafRef.current = requestAnimationFrame(loop);
      };

      const start = () => {
         if (isRunningRef.current) return;
         isRunningRef.current = true;
         rafRef.current = requestAnimationFrame(loop);
      };

      const stop = () => {
         isRunningRef.current = false;
         if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
         }
      };

      resize();
      initParticles();

      const header = canvas.closest("header") ?? canvas;

      const io = new IntersectionObserver(
         ([entry]) => {
            entry.isIntersecting ? start() : stop();
         },
         { threshold: 0.25 }
      );

      io.observe(header);

      /* ---------------------------------------------
       * Events
       * ------------------------------------------- */
      const onResize = () => {
         resize();
         initParticles();
      };

      window.addEventListener("resize", onResize);
      window.addEventListener("mousemove", (e) => {
         mouse.x = e.clientX * DPR;
         mouse.y = e.clientY * DPR;
      });
      window.addEventListener("mouseleave", () => {
         mouse.x = mouse.y = null;
      });

      document.addEventListener("visibilitychange", () => {
         document.hidden ? stop() : start();
      });

      return () => {
         stop();
         io.disconnect();
         window.removeEventListener("resize", onResize);
      };
   }, []);

   return (
      <canvas
         ref={canvasRef}
         className="absolute inset-0 z-0 pointer-events-none"
         aria-hidden="true"
      />
   );
}
