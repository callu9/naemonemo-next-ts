import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	images: {
		domains: ["img.29cm.co.kr"],
		formats: ["image/avif", "image/webp"],
		minimumCacheTTL: 60 * 24 * 365, // 1년
		deviceSizes: [640, 750, 828, 1080, 1200, 1920],
		imageSizes: [16, 32, 48, 64, 96, 128, 256],
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});
		return config;
	},
};

export default nextConfig;
