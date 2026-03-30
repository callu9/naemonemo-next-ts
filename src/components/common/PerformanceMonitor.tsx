"use client";

import { useEffect } from "react";
import { logPerformanceMetrics } from "@/lib/monitoring/performance";

/**
 * 성능 모니터링 클라이언트 컴포넌트
 * layout.tsx에서 사용됩니다.
 */
export function PerformanceMonitor() {
	useEffect(() => {
		logPerformanceMetrics();
	}, []);

	return null;
}
