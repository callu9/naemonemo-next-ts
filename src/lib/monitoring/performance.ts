// src/lib/monitoring/performance.ts
"use client";

/**
 * CLS(Cumulative Layout Shift) 실시간 모니터링
 * 페이지 로드 후 레이아웃 변화를 추적합니다.
 */
export function observeCLS() {
	let clsValue = 0;
	let sessionValue = 0;
	const layoutShifts: Array<{ value: number; time: number; source: string }> = [];

	// ✅ PerformanceObserver로 layout-shift 감지
	if ("PerformanceObserver" in window) {
		try {
			const observer = new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) {
					const layoutShift = entry as any;
					
					// ✅ 사용자 입력으로 인한 shift는 제외
					if (!layoutShift.hadRecentInput) {
						clsValue += layoutShift.value;
						sessionValue += layoutShift.value;

						layoutShifts.push({
							value: layoutShift.value,
							time: layoutShift.startTime,
							source: layoutShift.sources?.[0]?.node?.className || "unknown",
						});

						console.log(`[CLS] +${layoutShift.value.toFixed(4)} (총: ${clsValue.toFixed(4)})`);
						
						// ✅ 임계값 초과 알림
						if (clsValue > 0.1) {
							console.warn(
								`⚠️ CLS 임계값 초과: ${clsValue.toFixed(4)} > 0.1`,
								layoutShifts,
							);
						}
					}
				}
			});

			observer.observe({ entryTypes: ["layout-shift"] });
			return observer;
		} catch (e) {
			console.error("CLS 모니터링 불가:", e);
		}
	}
}

/**
 * LCP(Largest Contentful Paint) 측정
 */
export function observeLCP() {
	if ("PerformanceObserver" in window) {
		try {
			const observer = new PerformanceObserver((list) => {
				const entries = list.getEntries();
				const lastEntry = entries[entries.length - 1];
				console.log(
					`[LCP] ${(lastEntry as any).renderTime || (lastEntry as any).loadTime}ms`,
				);
			});

			observer.observe({ entryTypes: ["largest-contentful-paint"] });
			return observer;
		} catch (e) {
			console.error("LCP 모니터링 불가:", e);
		}
	}
}

/**
 * Scripting 시간 측정 (Long Tasks 모니터링)
 */
export function observeLongTasks() {
	if ("PerformanceObserver" in window) {
		try {
			const observer = new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) {
					const longTask = entry as any;
					console.warn(
						`[Long Task] ${longTask.duration}ms at ${longTask.startTime}ms`,
						longTask.attribution,
					);
				}
			});

			observer.observe({ entryTypes: ["longtask"] });
			return observer;
		} catch (e) {
			console.error("Long Task 모니터링 불가:", e);
		}
	}
}

/**
 * 종합 성능 리포트
 */
export function logPerformanceMetrics() {
	if (typeof window === "undefined") return;

	window.addEventListener("load", () => {
		// ✅ 약간의 지연 후 측정 (모든 리소스 로드 완료)
		setTimeout(() => {
			const perfData = performance.getEntriesByType("navigation")[0] as any;

			if (perfData) {
				const metrics = {
					DNS: perfData.domainLookupEnd - perfData.domainLookupStart,
					TCP: perfData.connectEnd - perfData.connectStart,
					TTFB: perfData.responseStart - perfData.fetchStart,
					Download: perfData.responseEnd - perfData.responseStart,
					DOMIM: perfData.domInteractive - perfData.responseEnd,
					DOMComplete: perfData.domComplete - perfData.responseEnd,
					PageLoad: perfData.loadEventEnd - perfData.fetchStart,
				};

				console.log("📊 Performance Metrics (ms):", metrics);
				
				// ✅ 분석 서비스로 전송 (선택)
				if (window.gtag) {
					window.gtag("event", "page_view", {
						page_load_time: metrics.PageLoad,
						dns_time: metrics.DNS,
						ttfb: metrics.TTFB,
					});
				}
			}

			// ✅ CLS, LCP 모니터링 시작
			observeCLS();
			observeLCP();
			observeLongTasks();
		}, 1000);
	});
}
