/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Sinaps consulting site (static SPA) lives under /home with
      // path-based routing — serve its index.html for every sub-route.
      { source: '/home', destination: '/home/index.html' },
      { source: '/home/:path*', destination: '/home/index.html' },
    ];
  },
};

export default nextConfig;
