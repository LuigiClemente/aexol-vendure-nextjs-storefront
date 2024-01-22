/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    pageExtensions: ['page.tsx', 'page.ts'],
    swcMinify: true,
    reactStrictMode: true,
    i18n: {
        locales: ['default', 'en', 'pl'],
        defaultLocale: 'default',
        localeDetection: false,
    },
};

module.exports = nextConfig;
