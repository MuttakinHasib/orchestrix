/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 95 keeps product screenshots crisp; 75 is the default for everything else.
    qualities: [75, 95],
  },
};

export default nextConfig;
