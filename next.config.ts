import type { NextConfig } from "next";

/**
 * The site is published under one address only.
 *
 * A second Vercel project builds this same repository at
 * gregorio-ferreira-portfolio.vercel.app. Every request to that host is sent
 * permanently (308) to the main address, so older links — including the one
 * printed on CVs already sent out — keep working without serving a duplicate.
 */
const CANONICAL_ORIGIN = "https://gregorioferreira-portfolio.vercel.app";
const LEGACY_HOST = "gregorio-ferreira-portfolio\\.vercel\\.app";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: LEGACY_HOST }],
        destination: `${CANONICAL_ORIGIN}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
