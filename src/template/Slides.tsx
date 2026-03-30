"use client";

import { BannerList } from "@/app/api/banner/route";
import { Container } from "@/atom/Container";
import { Icon } from "@/atom/Icon";
import SlideItem from "@/components/SlideItem";
import { useEffect, useState, useRef, useCallback } from "react";

export default function Slides({ bannerList }: { bannerList: BannerList }) {
	const [currentIdx, setCurrentIdx] = useState<number>(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	// ✅ useCallback으로 함수 메모이제이션
	const onClickChevron = useCallback(
		(num: number) => {
			setCurrentIdx((prevIdx) => {
				const newIdx = (prevIdx + num + bannerList.length) % bannerList.length;
				return newIdx;
			});
		},
		[bannerList.length],
	);

	// ✅ interval 설정 (currentIdx 변경과 분리)
	useEffect(() => {
		intervalRef.current = setInterval(() => {
			onClickChevron(1);
		}, 4000);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []); // ✅ 의존성 배열 비움 (한 번만 실행)

	// ✅ 스크롤 처리 (currentIdx 변경 시에만 실행)
	useEffect(() => {
		if (!wrapperRef.current) return;

		const currentBanner = bannerList[currentIdx];
		if (!currentBanner) return;

		const bannerElement = document.getElementById(`banner-${currentBanner.bannerNo}`);
		if (!bannerElement) return;

		// ✅ requestAnimationFrame으로 레이아웃 최적화
		requestAnimationFrame(() => {
			wrapperRef.current?.scrollTo({
				behavior: "smooth",
				left: bannerElement.offsetLeft,
			});
		});
	}, [currentIdx, bannerList]);

	return (
		<div className="slide-list">
			<Icon
				iconNm="chevronLeft"
				iconColor="invert"
				iconSize={48}
				onClick={() => onClickChevron(-1)}
				className="slide-chevron"
			/>
			<Container
				className="slide-wrapper"
				display="flex"
				justify="left"
				id="slide-wrapper"
				ref={wrapperRef}>
				{bannerList.map((banner, idx) => (
					// ✅ 각 슬라이드에 flex-shrink: 0 적용 (크기 고정)
					<div key={banner.bannerNo} className="slide-item-wrapper">
						<SlideItem
							{...banner}
							// ✅ 현재/인접 슬라이드만 우선 로딩
							priority={Math.abs(idx - currentIdx) <= 1}
						/>
					</div>
				))}
			</Container>
			<Container className="progress-bar" display="flex" justify="stretch">
				{new Array(bannerList.length).fill(undefined).map((_, idx) => (
					<div key={idx} className={idx === currentIdx ? "active" : "inactive"} />
				))}
			</Container>
			<Icon
				iconNm="chevronRight"
				iconColor="invert"
				iconSize={48}
				onClick={() => onClickChevron(1)}
				className="slide-chevron"
			/>
		</div>
	);
}
