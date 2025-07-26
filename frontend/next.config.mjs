/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,                           // disable server optimisation
    domains: [
      'images.unsplash.com',
      'res.cloudinary.com',                      // allow Cloudinary
    ],
  },
};

export default nextConfig;
