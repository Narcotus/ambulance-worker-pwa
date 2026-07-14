/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/ambulance-worker-pwa',
  assetPrefix: '/ambulance-worker-pwa',
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
}

export default nextConfig
