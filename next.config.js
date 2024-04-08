/** @type {import('next').NextConfig} */
const path = require('path')
const withNextIntl = require('next-intl/plugin')();
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [{
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
        },
        {
            protocol: 'https',
            hostname: 'cdn.builder.io',

            //   pathname: '/api/v1/image/assets/TEMP/*',
        },
        ],
    },
    async redirects() {
        return [{
            source: '/',
            destination: '/home',
            permanent: true,

        },]
    },
}

module.exports = withNextIntl(nextConfig)