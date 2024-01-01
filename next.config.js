/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    // async redirects() {
    //     return [{
    //         source: '/',
    //         destination: '/dashboard',
    //         permanent: true,
    //     },]
    // },
}

module.exports = nextConfig