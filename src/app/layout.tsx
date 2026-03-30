import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { PerformanceMonitor } from "@/components/common/PerformanceMonitor";
import "../styles/global.scss";
import Favicon from "./favicon.ico";

// ✅ Font 최적화 설정
const notoSansKr = Noto_Sans_KR({
	subsets: ["korean"],
	weight: ["400", "500", "700"],
	variable: "--font-noto-sans-kr",
	preload: false, // ✅ Korean subset은 preload 불가능
	display: "swap", // ✅ 폰트 로드 중에는 시스템 폰트 표시 (CLS 방지)
	fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
	title: "내모네모",
	description: "내 모든 네모 속 취향 : 내모네모 셀렉트샵",
	icons: { icon: Favicon.src },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko" className={notoSansKr.variable}>
			<head>
				{/* ✅ Font Preconnect */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				{/* ✅ DNS Prefetch for CDN */}
				<link rel="dns-prefetch" href="https://img.29cm.co.kr" />
			</head>
			<body className={notoSansKr.className}>
				{/* ✅ 성능 모니터링 초기화 */}
				<PerformanceMonitor />
				<div className="dimmed">
					<section className="container-wrapper">{children}</section>
				</div>
			</body>
		</html>
	);
}
