const { hostname } = require('os');

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	// async redirects() {
	// 	return [
	// 		{
	// 			source: '/',
	// 			destination: '/home',
	// 			permanent: true,
	// 			basePath: false,
	// 		},
	// 	];
	// },
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'redroc.stg.siteservice.net',
				pathname: '/wp-content/uploads/**',
			},
		],
	},
};

module.exports = nextConfig;
