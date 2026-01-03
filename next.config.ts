import type { NextConfig } from "next";

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
   dest: "public",
   cacheOnFrontEndNav: true,
   aggressiveFrontEndNavCaching: true,
   reloadOnOnline: true,
   disable: process.env.NODE_ENV === "development",
   workboxOptions: {
      disableDevLogs: true,
   },
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
   reactCompiler: true,
   images: {
      remotePatterns: [{ hostname: "wjbwobxiekyzfcjxjnkt.supabase.co" }],
   },
   turbopack: {},
   poweredByHeader: false,
   productionBrowserSourceMaps: false,
   async headers() {
      return [
         {
            source: "/:path*",
            headers: [
               {
                  key: "X-DNS-Prefetch-Control",
                  value: "on",
               },
               {
                  key: "Strict-Transport-Security",
                  value: "max-age=63072000; includeSubDomains; preload",
               },
               {
                  key: "X-XSS-Protection",
                  value: "1; mode=block",
               },
               {
                  key: "X-Frame-Options",
                  value: "SAMEORIGIN",
               },
               {
                  key: "X-Content-Type-Options",
                  value: "nosniff",
               },
               {
                  key: "Referrer-Policy",
                  value: "origin-when-cross-origin",
               },
               {
                  key: "Server",
                  value: "Apache", // Just a LIE. Can be empty!
               },
            ],
         },
      ];
   },
};

export default withPWA(nextConfig);
