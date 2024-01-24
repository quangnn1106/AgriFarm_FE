/** @type {import('next').NextConfig} */
const path = require('path')
const withNextIntl = require('next-intl/plugin')();
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
        },],
    },
    async redirects() {
        return [{
            source: '/',
            destination: '/statistic',
            permanent: true,

        },]
    },
}

module.exports = withNextIntl(nextConfig)