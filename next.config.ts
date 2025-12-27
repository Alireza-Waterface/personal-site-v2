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
};

export default withPWA(nextConfig);
