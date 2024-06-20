/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'profunions.ru',
        pathname: '/api/upload/**'
      },
      {
        protocol: 'https',
        hostname: 'www.eseur.ru',
        pathname: '/Images/**'
      },
      {
        protocol: 'https',
        hostname: 'mgoprof.ru',
        pathname: '/wp-content/uploads/**'
      },
      {
        protocol: 'https',
        hostname: 'ugso.mgoprof.ru',
        pathname: '/wp-content/uploads/**'
      }
    ]
  }
}

export default nextConfig
