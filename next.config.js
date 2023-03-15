/** @type {import('next').NextConfig} */
const nextConfig = {
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/units',
  //       permanent: true,
  //     },
  //   ]
  // },

  reactStrictMode: true,
  swcMinify: true,
  env: {
    logInConsole: false,
    ddInConsole: false,
  },
}

module.exports = nextConfig
