/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages compatibility:
  // Use static export if deploying as a static site, or
  // ensure the build target is compatible with the Edge runtime.
  output: 'export',
};

export default nextConfig;
