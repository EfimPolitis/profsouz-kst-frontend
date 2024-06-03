/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '5284',
        pathname: '/api/uploads/**'
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
