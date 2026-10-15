/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_BASE_PATH || "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },
  trailingSlash: true,
  transpilePackages: ["@cstf/core"],
};

export default nextConfig;
