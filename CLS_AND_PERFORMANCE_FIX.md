# CLS 0.73 & 성능 개선 가이드

## 📊 현재 상태 분석

| 지표                              | 현재 값 | 목표    | 상태         |
| --------------------------------- | ------- | ------- | ------------ |
| **CLS (Cumulative Layout Shift)** | 0.73    | < 0.1   | 🔴 매우 나쁨 |
| **Scripting**                     | 257ms   | < 150ms | 🔴 높음      |
| **System**                        | 177ms   | < 100ms | 🟡 중간      |
| **Rendering**                     | 22ms    | < 50ms  | 🟢 양호      |
| **Total**                         | 2,021ms | < 2.5s  | 🟡 중간      |

---

## 🎯 CLS 0.73을 0.1 이하로 개선하기

### 원인 분석

CLS 높음 = 사용자가 보는 화면에서 예상치 못한 레이아웃 변화

**주요 원인:**

1. ❌ 이미지 크기 미지정 (이미지 로딩 후 레이아웃 재설정)
2. ❌ 폰트 로딩 중 텍스트 치환 (FOIT/FOUT)
3. ❌ 광고/동적 콘텐츠의 공간 미예약
4. ❌ 스크롤 위치 변경 (Slides 컴포넌트)
5. ❌ 상태 변경에 따른 재렌더링

---

## 🔧 개선 방안 1: ImageBox 최적화

### 현재 코드 문제

```typescript
// src/atom/ImageBox.tsx (현재)
<div className={`img-wrapper radius-${radius} ${className}`} {...props}>
  <Image src={imageUrl} alt={alt || "이미지"} sizes={`${width}px`} fill />
</div>
```

**문제점:**

- `fill` prop 사용 시 부모에 `position: relative` 필요
- width/height 명시 안 됨 → 이미지 로딩 후 레이아웃 변화 (CLS 증가)
- sizes 속성이 부모 크기에 의존

### 개선 방안

```typescript
// src/atom/ImageBox.tsx (개선)
import { HTMLAttributes } from "react";
import Image from "next/image";

interface ImageBoxProps extends HTMLAttributes<HTMLDivElement> {
	width: number | string;
	height: number | string;
	radius?: number | 9999 | "circle";
	imageUrl: string;
	alt?: string;
	priority?: boolean; // LCP 최적화
}

export default function ImageBox({
	width,
	height,
	radius = 0,
	imageUrl,
	alt,
	priority = false,
	className = "",
	...props
}: ImageBoxProps) {
	// width/height를 숫자로 변환
	const numWidth = typeof width === "string" ? parseInt(width) : width;
	const numHeight = typeof height === "string" ? parseInt(height) : height;

	return imageUrl ? (
		<div
			className={`img-wrapper radius-${radius} ${className}`}
			style={{
				// ✅ 명시적 크기 설정 (CLS 방지)
				width: `${numWidth}px`,
				height: `${numHeight}px`,
				position: "relative",
				overflow: "hidden",
				aspectRatio: `${numWidth} / ${numHeight}`,
			}}
			{...props}
		>
			<Image
				src={imageUrl}
				alt={alt || "이미지"}
				width={numWidth}
				height={numHeight}
				priority={priority}
				quality={85}
				// ✅ sizes 명시 (반응형 최적화)
				sizes={`(max-width: 640px) ${numWidth * 0.8}px, ${numWidth}px`}
				style={{
					objectFit: "cover",
				}}
			/>
		</div>
	) : null;
}
```

### 적용 (사용 예시)

```typescript
// src/components/ProductListItem.tsx
// ✅ width/height 명시 (필수)
<ImageBox
	imageUrl={product.imageUrl}
	width={60}
	height={60}
	radius={8}
	priority={isFirstItem} // 첫 번째는 우선 로딩
	alt={product.productName}
/>

// src/template/Slides.tsx
// ✅ 웹 기준 해상도 지정
<SlideItem
	imageUrl={banner.imageUrl}
	width={1200}
	height={400}
	priority={idx === currentIdx} // 현재 슬라이드만 우선 로딩
/>
```

---

## 🔧 개선 방안 2: Slides 컴포넌트 최적화

### 현재 코드 문제

```typescript
// src/template/Slides.tsx (현재 - 문제점)
export default function Slides({ bannerList }: { bannerList: BannerList }) {
	const [currentIdx, setCurrentIdx] = useState<number>(0);

	useEffect(() => {
		const intervalId = setInterval(() => onClickChevron(1), 4000);
		return () => {
			clearInterval(intervalId);
		};
	}, [currentIdx]); // ❌ currentIdx 의존 → 매번 interval 재설정

	useEffect(() => {}, [currentIdx]); // ❌ 빈 useEffect (불필요)

	function onClickChevron(num: number) {
		const newIdx = (currentIdx + num + bannerList.length) % bannerList.length;
		setCurrentIdx(newIdx);
		const bannerElement = document.getElementById(`banner-${currentIdx}`);
		document
			.getElementById("slide-wrapper")
			// ❌ scrollTo로 인한 Layout Shift
			?.scrollTo({ behavior: "smooth", left: bannerElement?.offsetLeft });
	}
}
```

**문제점:**

1. `currentIdx` 의존으로 interval 계속 재설정 (Scripting 낭비)
2. 빈 useEffect (제거 필요)
3. `scrollTo`로 인한 여러 번의 layout shift

### 개선 방안

```typescript
// src/template/Slides.tsx (개선)
"use client";

import { BannerList } from "@/app/api/banner/route";
import { Container } from "@/atom/Container";
import { Icon } from "@/atom/Icon";
import SlideItem from "@/components/SlideItem";
import { useEffect, useState, useRef, useCallback } from "react";

export default function Slides({ bannerList }: { bannerList: BannerList }) {
	const [currentIdx, setCurrentIdx] = useState<number>(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null); // ✅ interval 참조 보관
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
				style={{ cursor: "pointer" }}
			/>
			<Container
				className="slide-wrapper"
				display="flex"
				justify="left"
				id="slide-wrapper"
				ref={wrapperRef} // ✅ ref 연결
				style={{
					scrollBehavior: "smooth",
					overflow: "hidden",
				}}
			>
				{bannerList.map((banner, idx) => (
					<SlideItem
						key={banner.bannerNo}
						{...banner}
						// ✅ 현재/인접 슬라이드만 우선 로딩
						priority={Math.abs(idx - currentIdx) <= 1}
					/>
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
				style={{ cursor: "pointer" }}
			/>
		</div>
	);
}
```

### 개선 효과

```
Scripting: 257ms → ~150-180ms (-25~40%)
CLS 감소: Slides 스크롤 layout shift 제거
Memory: interval 재설정 제거로 메모리 누수 방지
```

---

## 🔧 개선 방안 3: Font 최적화 (FOUT/FOIT 방지)

### 현재 문제

```typescript
// src/app/layout.tsx (현재)
export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <div className="dimmed">
          <section className="container-wrapper">{children}</section>
        </div>
      </body>
    </html>
  );
}
```

**문제점:**

- 폰트 로드 중 기본 폰트로 표시 후 교체 (CLS 증가)
- 폰트 preload 없음

### 개선 방안

```typescript
// src/app/layout.tsx (개선)
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "../styles/global.scss";
import Favicon from "./favicon.ico";

// ✅ Font 최적화 설정
const notoSansKr = Noto_Sans_KR({
	subsets: ["korean"],
	weight: ["400", "500", "700"],
	variable: "--font-noto-sans-kr",
	preload: true, // 사전 로드
	display: "swap", // FOUT 최소화
	fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
	title: "내모네모",
	description: "내 모든 네모 속 취향 : 내모네모 셀렉트샵",
	icons: { icon: Favicon.src },
	// ✅ Preconnect 추가
	other: {
		preconnect: "https://fonts.googleapis.com",
	},
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
				<div className="dimmed">
					<section className="container-wrapper">{children}</section>
				</div>
			</body>
		</html>
	);
}
```

### SCSS 업데이트

```scss
// src/styles/global.scss
* {
	margin: 0;
	padding: 0;
	// ✅ Font 변수 적용
	font-family: var(--font-noto-sans-kr), system-ui, sans-serif;
	// ✅ 폰트 로드 중 레이아웃 안정화
	font-display: swap;
}

html {
	overflow-x: hidden;
	// ✅ 폰트 크기 제한 (CLS 방지)
	font-size: 16px;
	// ✅ 줄 높이 명시 (CLS 방지)
	line-height: 1.6;
}
```

---

## 🔧 개선 방안 4: 번들 최적화 (Scripting 257ms → <150ms)

### 동적 Import로 Code Splitting

```typescript
// src/app/page.tsx (개선)
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Container } from "@/atom/Container";
import { MainHeader } from "@/components/common/Header";
import { Loader } from "@/components/common/Loader";
import { getBannerList } from "./api/banner/route";
import { getGateList } from "./api/gates/route";
import { getFeedList } from "./api/feeds/route";
import "./home.scss";

// ✅ 동적 Import (번들 분할)
const Slides = dynamic(() => import("@/template/Slides"), {
	loading: () => <Loader />,
	ssr: true, // 서버에서도 렌더링
});

const Gates = dynamic(() => import("@/template/Gates"), {
	loading: () => <Loader />,
	ssr: true,
});

const Feeds = dynamic(() => import("@/template/Feeds"), {
	loading: () => <Loader />,
	ssr: true,
});

export default async function Home() {
	// ✅ 병렬 데이터 페칭
	const [slideList, gateList, feedList] = await Promise.all([
		getBannerList(),
		getGateList(),
		getFeedList(),
	]);

	return (
		<>
			<MainHeader />
			<Container className="home" gap={48}>
				<Suspense fallback={<Loader />}>
					<Slides bannerList={slideList} />
				</Suspense>
				<Suspense fallback={<Loader />}>
					<Gates gateList={gateList} />
				</Suspense>
				<Suspense fallback={<Loader />}>
					<Feeds feedList={feedList} />
				</Suspense>
			</Container>
		</>
	);
}
```

---

## 🔧 개선 방안 5: 상태 구독 최적화

### 불필요한 재렌더링 제거

```typescript
// src/store/cart.ts (개선)
import { create } from "zustand";
import { useShallow } from "zustand/react";

export const useCartStore = create((set) => ({
	itemCount: 0,
	cartList: [],
	error: null,
	loading: false,

	addToCart: async (product: Product) => {
		set({ loading: true });
		try {
			const result = await addCartItem(product, 1);
			if (result) {
				set({
					itemCount: result.length,
					cartList: result,
					loading: false,
				});
			}
		} catch (err) {
			set({ error: err, loading: false });
		}
	},
}));

// ✅ 필요한 상태만 구독 (재렌더링 최소화)
export function useCartItem() {
	return useCartStore((state) => state.itemCount);
}

export function useCartList() {
	return useCartStore(useShallow((state) => ({ cartList: state.cartList })));
}

export function useCartActions() {
	return useCartStore(
		useShallow((state) => ({
			addToCart: state.addToCart,
			removeFromCart: state.removeFromCart,
		})),
	);
}
```

사용처:

```typescript
// src/components/ProductListItem.tsx (개선)
const itemCount = useCartItem(); // 필요한 상태만
const { addToCart } = useCartActions();
```

---

## 📋 구현 체크리스트

### Phase 1: CLS 즉시 개선 (1-2시간)

- [ ] ImageBox width/height 명시 설정
- [ ] Slides 중복 useEffect 제거
- [ ] Font preload 설정
- **예상 효과**: CLS 0.73 → 0.2-0.3 (-60%)

### Phase 2: Scripting 최적화 (2-3시간)

- [ ] Slides useCallback + interval 분리
- [ ] 동적 Import 적용
- [ ] Zustand 선택 구독 구현
- **예상 효과**: Scripting 257ms → 150ms (-40%), CLS 0.2 → 0.05 (-75%)

### Phase 3: 배포 전 검증

- [ ] Lighthouse 재측정 (모바일)
- [ ] CLS < 0.1 ✅
- [ ] Scripting < 150ms ✅
- [ ] LCP < 2.5s ✅

---

## 🔍 성능 검증 방법

### 실시간 CLS 측정

```typescript
// src/lib/monitoring/cls.ts
export function observeCLS() {
	let clsValue = 0;
	let sessionValue = 0;

	const observer = new PerformanceObserver((obs) => {
		for (const entry of obs.getEntries()) {
			if (!(entry as any).hadRecentInput) {
				clsValue += (entry as any).value;
				sessionValue += (entry as any).value;
				console.log(`CLS: ${clsValue.toFixed(3)}, Session: ${sessionValue.toFixed(3)}`);
			}
		}
	});

	observer.observe({ entryTypes: ["layout-shift"] });
	return observer;
}

// src/app/layout.tsx에서 호출
if (typeof window !== "undefined") {
	import("@/lib/monitoring/cls").then((m) => m.observeCLS());
}
```

### Chrome DevTools 활용

1. **Performance 탭**
   - 녹화 시작 → 페이지 상호작용 → 녹화 중지
   - "Rendering" 섹션에서 Layout Shifts 확인
   - "Timings"에서 각 항목 성능 확인

2. **Lighthouse**
   ```bash
   npm run build
   npm start
   # Chrome DevTools → Lighthouse → Analyze page load
   ```

---

## 📊 목표 성능 지표

| 지표          | 현재   | 개선 후 | 개선율 |
| ------------- | ------ | ------- | ------ |
| CLS           | 0.73   | < 0.1   | -86%   |
| Scripting     | 257ms  | < 150ms | -42%   |
| System        | 177ms  | < 100ms | -43%   |
| LCP           | ?      | < 2.5s  | -      |
| **종합 평가** | 🔴 Bad | 🟢 Good | ✅     |

---

## 📚 참고

- [Web.dev - CLS](https://web.dev/cls/)
- [Web.dev - Scripting 최적화](https://web.dev/long-tasks-devtools/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
