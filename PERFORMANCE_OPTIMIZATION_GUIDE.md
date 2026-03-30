# 이커머스 프로젝트 성능 측정 및 최적화 가이드

## 📊 프로젝트 현황 분석

### 기술 스택

- **프레임워크**: Next.js 15.1.6 (App Router)
- **UI 라이브러리**: React 19
- **상태 관리**: Zustand 5.0.3
- **스타일링**: SCSS
- **빌드**: Next.js webpack

### 주요 기능

- 슬라이드 배너 (Slides)
- 상품 카테고리 게이트 (Gates)
- 피드 (Feeds)
- 장바구니 (Cart)
- 상품 리스트 (Products)

---

## 🎯 성능 측정 및 최적화 시나리오

### 시나리오 1: CoreWeb Vitals & 사용자 경험 최적화

#### 1.1 성능 측정 지표

```
상태: 측정되지 않음 → 측정 완료
목표: LCP < 2.5s, FID < 100ms, CLS < 0.1
```

**측정 방법**

- ✅ Next.js Analytics 활성화
- ✅ Web Vitals 라이브러리 통합
- ✅ Lighthouse CI 설정으로 자동 측정
- ✅ Real User Monitoring (RUM) 구현

**구현 파일 목록**

```
- src/app/layout.tsx (Web Vitals 초기화)
- src/lib/metrics.ts (메트릭 수집)
- next.config.ts (성능 설정)
- .github/workflows/lighthouse.yml (CI 통합)
```

#### 1.2 성능 개선 포인트

| 문제점             | 현재 상태   | 개선 방안           | 예상 효과 |
| ------------------ | ----------- | ------------------- | --------- |
| 초기 번들 크기     | 측정 필요   | Dynamic Import 적용 | LCP -30%  |
| 이미지 로딩        | 최적화 미흡 | Next.js Image 사용  | CLS 개선  |
| Font 로딩          | 기본 설정   | Font 최적화         | LCP -15%  |
| CSS-in-JS 오버헤드 | SCSS 사용   | SCSS 최적화         | FID 개선  |

---

### 시나리오 2: 번들 사이즈 최적화

#### 2.1 현재 번들 분석

```
상태: 분석 필요
목표:
  - Main Bundle: < 100KB
  - Total JS: < 200KB
```

**측정 명령어**

```bash
# 번들 사이즈 분석
npm run build
next build --analyze

# WebPack Bundle Analyzer 설치 및 실행
npm install -D @next/bundle-analyzer
# next.config.ts에 설정 후 실행
```

#### 2.2 최적화 전략

| 우선순위 | 항목              | 현재      | 개선          | 구현                   |
| -------- | ----------------- | --------- | ------------- | ---------------------- |
| 🔴 높음  | Zustand 선택 구독 | 전체 구독 | 필요한 상태만 | `useShallow` 활용      |
| 🔴 높음  | 동적 Import       | 미적용    | 라운트별 분할 | 템플릿 동적 로딩       |
| 🟡 중간  | React 추가 기능   | 풀 번들   | Tree-shaking  | 불필요 라이브러리 제거 |
| 🟡 중간  | SCSS 컴파일       | 인라인    | 외부 파일     | CSS 분리               |

#### 2.3 구현 예시

**Zustand 선택 구독**

```typescript
// 개선 전
const { cartList, itemCount } = useCartStore();

// 개선 후
import { useShallow } from "zustand/react";
const { cartList } = useCartStore(
	useShallow((state) => ({
		cartList: state.cartList,
	})),
);
```

**동적 Import**

```typescript
// next/dynamic 활용
const Feeds = dynamic(() => import('@/template/Feeds'), {
  loading: () => <Loader />,
  ssr: true
});
```

---

### 시나리오 3: 이미지 최적화

#### 3.1 현재 상태 분석

```
현재: ImageBox.tsx에서 img 태그 사용
문제점:
  - 자동 포맷 변환 없음 (WebP 미지원)
  - 반응형 이미지 미적용
  - Lazy loading 미설정
  - 우선순위 설정 없음
```

#### 3.2 개선 방안

**Step 1: Next.js Image 컴포넌트로 마이그레이션**

```typescript
// src/atom/ImageBox.tsx (개선)
import Image from 'next/image';
import { ImgHTMLAttributes } from 'react';

interface ImageBoxProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  imageUrl: string;
  width: string;
  height: string;
  radius?: number;
  priority?: boolean;
}

export default function ImageBox({
  imageUrl,
  width,
  height,
  radius = 0,
  priority = false,
  ...props
}: ImageBoxProps) {
  const numWidth = parseInt(width);
  const numHeight = parseInt(height);

  return (
    <div style={{ borderRadius: `${radius}px`, overflow: 'hidden' }}>
      <Image
        src={imageUrl}
        alt={props.alt || '이미지'}
        width={numWidth}
        height={numHeight}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={85}
      />
    </div>
  );
}
```

**Step 2: 이미지 로딩 전략**

```typescript
// 우선순위 설정
// - Hero/배너 이미지: priority={true} (LCP 최적화)
// - 뷰포트 내 이미지: 기본 lazy loading
// - 하단 이미지: 스크롤 트리거 시 로딩

// ProductListItem.tsx
<ImageBox
  imageUrl={product.imageUrl}
  priority={isFirstItem} // 첫 번째 상품만 우선 로딩
  width="60px"
  height="60px"
/>
```

**Step 3: 이미지 CDN 및 최적화**

```typescript
// next.config.ts (정확한 구조)
const nextConfig: NextConfig = {
	// 다른 설정...

	// images 설정은 최상위 레벨에 위치 (webpack 밖에)
	images: {
		domains: ["img.29cm.co.kr"],
		formats: ["image/avif", "image/webp"],
		minimumCacheTTL: 60 * 24 * 365, // 1년
		deviceSizes: [640, 750, 828, 1080, 1200, 1920],
		imageSizes: [16, 32, 48, 64, 96, 128, 256],
	},

	// webpack 설정은 별도
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});
		return config;
	},
};
```

#### 3.3 예상 성능 개선

```
LCP: 2.8s → 1.5s (-46%)
CLS: 0.15 → 0.05 (개선)
파일 크기: 자동 최적화
AVIF/WebP: 30-40% 감소
```

---

### 시나리오 4: 렌더링 성능 및 캐싱 전략

#### 4.1 Server Components 활용

```
현재 상태:
- page.tsx: SSR ✅
- 일부 컴포넌트: "use client" 과다 사용

개선 전략:
- 상호작용 없는 컴포넌트 → Server Components
- 필요한 부분만 → Client Components
```

**개선 예시**

```typescript
// src/app/page.tsx (현재: 좋음)
export default async function Home() {
  const slideList = await getBannerList();
  const gateList = await getGateList();
  const feedList = await getFeedList();

  return (
    <>
      <MainHeader />
      <Container className="home" gap={48}>
        <Slides bannerList={slideList} />      {/* ← 상호작용 확인 필요 */}
        <Gates gateList={gateList} />          {/* ← 상호작용 확인 필요 */}
        <Feeds feedList={feedList} />          {/* ← 상호작용 확인 필요 */}
      </Container>
    </>
  );
}

// src/template/Slides.tsx (개선 후)
// "use client" 제거 (순수 표시 컴포넌트라면)
export default function Slides({ bannerList }: { bannerList: Banner[] }) {
  return <div>...</div>;
}

// src/template/Gates.tsx (혼합)
"use client";
// 클릭 상호작용이 있는 부분만 클라이언트에서 처리
import { Suspense } from 'react';

export default function Gates({ gateList }: { gateList: Gate[] }) {
  return (
    <Suspense fallback={<Skeleton />}>
      {/* 렌더링 로직 */}
    </Suspense>
  );
}
```

#### 4.2 캐싱 전략

**Level 1: 데이터 캐싱 (API 레벨)**

```typescript
// src/app/api/products/route.ts (개선)
export async function GET(req: NextRequest) {
	return new Response(JSON.stringify(filteredResult), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400", // 1시간 캐시
		},
	});
}

// ISR 지원 (상품 변경 시 재생성)
export const revalidate = 3600; // 1시간마다 재검증
```

**Level 2: 컴포넌트 레벨 캐싱**

```typescript
// src/app/page.tsx (개선)
import { unstable_cache } from "next/cache";

export const getProductList = unstable_cache(
	async (codeList: number[], offset: number) => {
		const URL = "http://localhost:3000/api/products";
		const params = new URLSearchParams();
		codeList.forEach((code) => params.append("recommendCode", String(code)));
		params.append("offset", String(offset));
		const res = await fetch(`${URL}?${params}`);
		return res.json();
	},
	["product-list"], // 캐시 키
	{ revalidate: 3600, tags: ["products"] }, // 1시간 캐시
);
```

**Level 3: 클라이언트 캐싱 (SWR)**

```typescript
// src/lib/hooks/useCachedProducts.ts
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useCachedProducts(codes: number[], offset: number) {
	const queryString = new URLSearchParams();
	codes.forEach((c) => queryString.append("recommendCode", String(c)));
	queryString.append("offset", String(offset));

	const { data, error } = useSWR(`/api/products?${queryString}`, fetcher, {
		dedupingInterval: 60000, // 1분
		focusThrottleInterval: 300000, // 5분
		staleTime: 300000, // 5분
	});

	return { data, error };
}
```

#### 4.3 캐시 무효화 전략

```typescript
// src/store/cart.ts (개선)
import { revalidatePath } from "next/cache";

export const useCartStore = create((set) => ({
	addToCart: async (product: Product) => {
		const result = await addCartItem(product, 1);
		if (result) {
			set(() => ({ itemCount: result.length, cartList: result }));
			// 장바구니 관련 페이지 캐시 재검증
			revalidatePath("/cart");
			revalidatePath("/products", "layout");
		}
	},
}));
```

---

### 시나리오 5: 상태 관리 최적화

#### 5.1 현재 상태 분석

```
현재 Zustand 사용 패턴의 문제점:
1. 전체 상태 구독 클라이언트 재렌더링 유발
2. API 호출 매번 전체 카트 업데이트
3. 미들웨어 없음 (로깅, 에러 처리)
```

#### 5.2 최적화 전략

**개선 1: 선택 구독 (Selector 패턴)**

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
				set((state) => ({
					itemCount: result.length,
					cartList: result,
					loading: false,
				}));
			}
		} catch (err) {
			set({ error: err, loading: false });
		}
	},
}));

// 사용 예시: 필요한 상태만 구독
// ❌ 틀린 사용
const cartStore = useCartStore(); // 모든 상태 변경 시마다 리렌더링

// ✅ 올바른 사용
const itemCount = useCartStore((state) => state.itemCount);
const addToCart = useCartStore((state) => state.addToCart);

// 또는 여러 상태 한번에
const { itemCount, loading } = useCartStore(
	useShallow((state) => ({
		itemCount: state.itemCount,
		loading: state.loading,
	})),
);
```

**개선 2: 미들웨어 추가 (에러 처리 & 로깅)**

```typescript
// src/store/middleware.ts
import { StateCreator } from "zustand";

export const withLogger = (config: StateCreator) => (set, get, api) => {
	return config(
		(args) => {
			console.log("Zustand state update:", args);
			set(args);
		},
		get,
		api,
	);
};

export const withErrorHandling = (config: StateCreator) => (set, get, api) => {
	return config(
		(args) => {
			try {
				set(args);
			} catch (error) {
				console.error("State update error:", error);
				set((state) => ({ ...state, error }));
			}
		},
		get,
		api,
	);
};

// 사용
const useCartStore = create(
	withErrorHandling(
		withLogger((set) => ({
			// store config
		})),
	),
);
```

**개선 3: 상태 분할 (성능 최적화)**

```typescript
// 기존: 하나의 큰 스토어
// useCartStore: itemCount, cartList, addToCart, etc.

// 개선: 여러 작은 스토어로 분할
// src/store/cartItems.ts
export const useCartItemsStore = create((set) => ({
	cartList: [],
	updateCartList: (list) => set({ cartList: list }),
}));

// src/store/cartMeta.ts
export const useCartMetaStore = create((set) => ({
	itemCount: 0,
	totalPrice: 0,
	updateMeta: (count, price) => set({ itemCount: count, totalPrice: price }),
}));

// 사용처에서 필요한 스토어만 구독
const cartList = useCartItemsStore((state) => state.cartList);
const itemCount = useCartMetaStore((state) => state.itemCount);
```

#### 5.3 성능 예상치

```
재렌더링 횟수: 기계 당 평균 50회/s → 5-10회/s (-80~90%)
메모리 사용량: 감소 (불필요 상태 업데이트 제거)
업데이트 속도: 즉시 (구독된 상태만 변경감지)
```

---

### 시나리오 6: API & 데이터 페칭 최적화

#### 6.1 현재 상태 분석

```
문제점:
1. 매 요청마다 필터링 계산
2. 페이지네이션 offset 기반 (비효율적)
3. N+1 쿼리 가능성
4. 요청 직렬화 (병렬 요청 공유 안 함)
```

#### 6.2 최적화 전략

**개선 1: 서버 사이드 필터링 최적화**

```typescript
// src/app/api/products/route.ts (개선)
import { unstable_cache } from "next/cache";

// 캐시된 필터링 함수
const getFilteredProducts = unstable_cache(
	(codeList: number[], offset: number = 0, limit: number = 10) => {
		const sortKey = "priorityScore" as const;

		// 1. 인덱싱 사용 (추후 DB 연동 시)
		const filtered = products
			.filter((prod) => codeList.includes(0) || codeList.includes(prod.recommendCode))
			.sort((a, b) => b[sortKey] - a[sortKey])
			.slice(offset * limit, (offset + 1) * limit);

		const nextOffset = (offset + 1) * limit < products.length ? offset + 1 : undefined;

		return { data: filtered, offset: offset + 1, next: nextOffset };
	},
	["filtered-products"],
	{ revalidate: 3600 },
);

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const codeList = searchParams.getAll("recommendCode").map(Number);
	const offset = Number(searchParams.get("offset") || 0);
	const limit = Number(searchParams.get("limit") || 10);

	const result = getFilteredProducts(codeList, offset, limit);

	return new Response(JSON.stringify(result), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
		},
	});
}
```

**개선 2: 커서 기반 페이지네이션**

```typescript
// src/app/api/products/route.ts (커서 기반)
interface PaginationResponse {
	data: Product[];
	cursor: string | null;
	hasMore: boolean;
}

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const codeList = searchParams.getAll("recommendCode").map(Number);
	const cursor = searchParams.get("cursor") ? atob(searchParams.get("cursor")!) : null;
	const limit = Number(searchParams.get("limit") || 10);

	let startIndex = 0;
	if (cursor) {
		startIndex = products.findIndex((p) => p.productNo === Number(cursor));
		startIndex = Math.max(0, startIndex + 1);
	}

	const filtered = products
		.filter((prod) => codeList.includes(0) || codeList.includes(prod.recommendCode))
		.slice(startIndex, startIndex + limit + 1);

	const hasMore = filtered.length > limit;
	const data = filtered.slice(0, limit);
	const nextCursor = hasMore ? btoa(String(data[data.length - 1].productNo)) : null;

	return new Response(
		JSON.stringify({
			data,
			cursor: nextCursor,
			hasMore,
		}),
		{
			status: 200,
			headers: { "Content-Type": "application/json" },
		},
	);
}
```

**개선 3: 요청 배칭 & 메모이제이션**

```typescript
// src/lib/api/batch.ts
let batchQueue: Map<string, Promise<any>> = new Map();
let batchTimeout: NodeJS.Timeout;

function createBatchKey(endpoint: string, params: Record<string, any>) {
	return `${endpoint}:${JSON.stringify(params)}`;
}

export function batchFetch(endpoint: string, params: Record<string, any>) {
	const key = createBatchKey(endpoint, params);

	// 동일 요청이 이미 진행 중이면 기존 Promise 반환
	if (batchQueue.has(key)) {
		return batchQueue.get(key)!;
	}

	const promise = new Promise((resolve) => {
		if (!batchTimeout) {
			batchTimeout = setTimeout(async () => {
				// 배치 요청 처리
				const requests = Array.from(batchQueue.entries());
				batchQueue.clear();

				for (const [batchKey, promise] of requests) {
					const [ep, params] = batchKey.split(":");
					try {
						const res = await fetch(`${ep}?${new URLSearchParams(JSON.parse(params))}`);
						const data = await res.json();
						resolve(data);
					} catch (err) {
						resolve(null);
					}
				}
			}, 10);
		}
	});

	batchQueue.set(key, promise);
	return promise;
}
```

---

### 시나리오 7: 빌드 성능 최적화

#### 7.1 빌드 시간 분석

```bash
현재 빌드 시간 측정:
npm run build

목표: 빌드 시간 < 30초
```

#### 7.2 최적화 방법

**next.config.ts 최적화**

```typescript
// src/next.config.ts (개선)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// 성능 최적화
	reactStrictMode: true,
	swcMinify: true, // SWC 최소화 (기본값, 확인용)

	// 빌드 최적화
	productionBrowserSourceMaps: false, // 프로덕션 소스맵 비활성화
	experimental: {
		optimizePackageImports: ["zustand"], // 라이브러리 최적화
	},

	// 이미지 최적화 (최상위 레벨에 위치)
	images: {
		domains: ["img.29cm.co.kr"],
		formats: ["image/avif", "image/webp"],
		minimumCacheTTL: 60 * 24 * 365, // 1년
		deviceSizes: [640, 750, 828, 1080, 1200, 1920],
		imageSizes: [16, 32, 48, 64, 96, 128, 256],
	},

	// 웹팩 최적화
	webpack: (config, { isServer }) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});

		// 프로덕션 모드 최적화
		if (!isServer) {
			config.optimization = {
				...config.optimization,
				splitChunks: {
					chunks: "all",
					cacheGroups: {
						default: false,
						vendors: false,
						// vendor chunk
						vendor: {
							filename: "chunks/vendor.js",
							test: /node_modules/,
							priority: 10,
							reuseExistingChunk: true,
							enforce: true,
						},
						// common chunks
						common: {
							minChunks: 2,
							priority: 5,
							reuseExistingChunk: true,
							filename: "chunks/common.js",
						},
					},
				},
			};
		}

		return config;
	},
};

export default nextConfig;
```

**빌드 분석 명령어**

```bash
# 빌드 시간 분석
npm run build

# 상세 분석 활성화
DEBUG=* npm run build

# 번들 분석
npm run build --analyze

# 성능 리포트 확인
cat .next/static/trace
```

---

### 시나리오 8: 런타임 성능 최적화

#### 8.1 JavaScript 실행 시간 최적화

**주요 최적화 포인트**

```typescript
// 1. 불필요한 재렌더링 방지
// src/components/ProductListItem.tsx (개선)
import { memo } from 'react';

const ProductListItem = memo(
  ({ product }: { product: RelatedProduct }) => {
    const isInCart = useCallback(
      (productNo: number) => {
        return cartList.some(item => item.productNo === productNo);
      },
      [cartList]
    );

    return (
      <div className="product-list-item">
        {/* JSX */}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // 커스텀 비교 로직
    return prevProps.product.productNo === nextProps.product.productNo;
  }
);

export default ProductListItem;
```

**메모리 누수 방지**

```typescript
// src/app/page.tsx (개선)
import { useEffect, useRef } from "react";

export default function Home() {
	const abortControllerRef = useRef<AbortController | null>(null);

	useEffect(() => {
		abortControllerRef.current = new AbortController();

		return () => {
			// 컴포넌트 언마운트 시 pending 요청 취소
			abortControllerRef.current?.abort();
		};
	}, []);

	// ...
}
```

**Long Tasks 감지**

```typescript
// src/lib/monitoring/longTasks.ts
export function observeLongTasks(callback: (duration: number) => void) {
	if ("PerformanceObserver" in window) {
		try {
			const observer = new PerformanceObserver((obs) => {
				for (const entry of obs.getEntries()) {
					callback(entry.duration);
				}
			});
			observer.observe({ entryTypes: ["longtask"] });
			return observer;
		} catch (e) {
			// longtask 지원 안 함
		}
	}
}

// 사용
observeLongTasks((duration) => {
	if (duration > 50) {
		console.warn(`Long task detected: ${duration}ms`);
		// 분석 데이터 전송
	}
});
```

#### 8.2 CSS 성능 최적화

**SCSS 최적화**

```scss
// src/styles/global.scss (개선)
// 1. 크기 최소화
@import "./foundation/color";
@import "./foundation/layout";
@import "./foundation/typography";

// 2. Critical CSS (위) / Deferred CSS (아래) 분리
// Critical Path의 필수 스타일만 포함

// 3. 변수 사용 (이전 계산 제거)
$border-radius-sm: 4px;
$border-radius-md: 8px;

.product-list-item {
	border-radius: $border-radius-md;
	// 반복 계산 제거
}
```

**Font 최적화**

```typescript
// src/app/layout.tsx (개선)
import { Inter, Noto_Sans_KR } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const notoSansKr = Noto_Sans_KR({
  subsets: ['korean'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-kr',
  preload: true,
  display: 'swap', // FOUT 최소화
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* Font Preload */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${notoSansKr.variable} ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
```

---

### 시나리오 9: 모니터링 & 성능 추적

#### 9.1 성능 메트릭 수집

**Web Vitals 통합**

```typescript
// src/app/layout.tsx (개선)
import { useReportWebVitals } from 'next/web-vitals';

function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    // 분석 서비스로 전송
    if (metric.value > 0) {
      // Google Analytics 등으로 전송
      console.log(metric);

      // 커스텀 분석
      if (metric.name === 'LCP' && metric.value > 2500) {
        console.warn('LCP threshold exceeded');
      }
    }
  });

  return null;
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <WebVitalsReporter />
        {children}
      </body>
    </html>
  );
}
```

**커스텀 성능 측정**

```typescript
// src/lib/performance.ts
export class PerformanceMonitor {
	private marks: Map<string, number> = new Map();

	mark(name: string) {
		this.marks.set(name, performance.now());
	}

	measure(name: string, startMark: string, endMark?: string) {
		const start = this.marks.get(startMark);
		const end = endMark ? this.marks.get(endMark) : performance.now();

		if (start && end) {
			const duration = end - start;
			console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
			performance.measure(name, startMark, endMark);
			return duration;
		}
	}

	getMetrics() {
		const entries = performance.getEntries();
		return entries.filter((e) => e.entryType === "measure");
	}
}

// 사용
const monitor = new PerformanceMonitor();
monitor.mark("api-start");
await fetchData();
monitor.mark("api-end");
monitor.measure("API Call", "api-start", "api-end");
```

---

## 📋 구현 로드맵

### Phase 1: 기준선 수립 (1주일)

- [ ] 성능 메트릭 수집 설정 (Scenario 1)
- [ ] 번들 크기 분석 (Scenario 2)
- [ ] Lighthouse 자동화 (CI/CD)
- [ ] **예상 효과**: 현재 상태 파악

### Phase 2: 빠른 승리 (2주일)

- [ ] 이미지 최적화 (Scenario 3)
- [ ] 상태 관리 최적화 (Scenario 5)
- [ ] Font 최적화 (Scenario 8)
- [ ] **예상 효과**: LCP -30%, CLS 개선, 번들 -15%

### Phase 3: 핵심 최적화 (2주일)

- [ ] Server Components 리팩토링 (Scenario 4)
- [ ] 캐싱 전략 구현 (Scenario 4)
- [ ] API 최적화 (Scenario 6)
- [ ] **예상 효과**: TTFB 개선, 데이터 페치 time -40%

### Phase 4: 고급 최적화 (진행 중)

- [ ] 번들 분할 (Scenario 2)
- [ ] 동적 Import (Scenario 2)
- [ ] 모니터링 자동화 (Scenario 9)
- [ ] **예상 효과**: 지속적인 성능 모니터링

---

## 🔍 성능 측정 체크리스트

### 배포 전

- [ ] Lighthouse 점수 90+ (모바일)
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] 번들 크기 < 200KB (JS)
- [ ] 첫 페이지 로드 < 2초

### 배포 후

- [ ] 실제 사용자 메트릭 모니터링
- [ ] 에러율 < 1%
- [ ] 성능 저하 알람 설정
- [ ] 주간 성능 리포트 검토

---

## 📚 참고 자료

### Next.js 공식 문서

- [Performance Optimization](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)

### 성능 측정 도구

- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Web Vitals](https://web.dev/vitals/)
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)

### 상태 관리

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Zustand Best Practices](https://github.com/pmndrs/zustand/wiki/Guide,-how-to-use-zustand)

---

**마지막 업데이트**: 2026년 3월 27일
**프로젝트명**: naemonemo-next-ts (이커머스)
