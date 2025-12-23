import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   /* config options here */
   reactCompiler: true,
   images: {
      remotePatterns: [{ hostname: "wjbwobxiekyzfcjxjnkt.supabase.co" }],
   },
};

export default nextConfig;
