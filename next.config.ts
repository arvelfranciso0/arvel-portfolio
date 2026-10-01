import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Project thumbnails uploaded to Supabase Storage (public bucket)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Room for a 5 MB project thumbnail plus the other form fields
      bodySizeLimit: "6mb",
    },
  },
};

export default nextConfig;
