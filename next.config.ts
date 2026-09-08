import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/yieldlens.co.uk/how-much-rent-can-a-cafe-afford",
        destination: "/how-much-rent-can-a-cafe-afford",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
