# 프론트엔드 포트폴리오: 기술적 문제 해결 능력

## 1. **Next.js App Router 기반 파일 시스템 라우팅 구축**

- Next.js 15.x의 App Router를 활용하여 파일 기반 라우팅 구조 설계
- `/app/api/*` 경로에서 API 라우트 핸들러 구현 (GET, PUT, DELETE)
- 클라이언트/서버 컴포넌트 분리로 렌더링 최적화 (`"use client"` 지시문 활용)

**관련 파일:**

- [src/app/api/products/route.ts](src/app/api/products/route.ts)
- [src/app/api/cart/route.ts](src/app/api/cart/route.ts)

---

## 2. **TypeScript 타입 안정성 구현**

- strict 모드 활성화로 런타임 에러 사전 방지
- 타입 정의를 통한 API 응답 구조 명시 (`Product`, `CartItem`, `CartStoreType` 타입)
- 제네릭을 활용한 재사용 가능한 타입 설계

**관련 파일:**

- [tsconfig.json](tsconfig.json) - strict 모드 설정
- [src/store/cart.ts](src/store/cart.ts) - 타입 정의

**코드 예시:**

```typescript
export type Product = {
	productNo: number;
	productName: string;
	price: number;
	imageUrl?: string;
	priorityScore: number;
	recommendCode: number;
	availableCoupon?: boolean;
};

export type cartStoreType = {
	itemCount: number;
	cartList: CartItem[];
	addToCart: (product: Product) => void;
	updateCartItemCount: (product: Product, count: number) => void;
	removeFromCart: (productNos: number[]) => void;
};
```

---

## 3. **Zustand를 이용한 클라이언트 상태 관리**

- 전역 상태 관리 라이브러리 도입으로 prop-drilling 제거
- 비동기 작업을 포함한 상태 업데이트 로직 구현
- 상태 변경 시점에서 API 호출 및 동기화 처리

**관련 파일:**

- [src/store/cart.ts](src/store/cart.ts)

**코드 예시:**

```typescript
const useCartStore = create((set) => ({
	itemCount: cartList.length,
	cartList: cartList,
	addToCart: async (product: Product) => {
		const result = await addCartItem(product, 1);
		if (result) set(() => ({ itemCount: result.length, cartList: result }));
	},
	removeFromCart: async (productNos: number[]) => {
		const result = await deleteCartItems(productNos);
		if (result) set(() => ({ itemCount: result.length, cartList: result }));
	},
}));
```

---

## 4. **RESTful API 설계 및 쿼리 파라미터 처리**

- `GET`, `PUT`, `DELETE` HTTP 메서드를 통한 표준 CRUD 구현
- URL SearchParams를 활용한 필터링 및 페이지네이션 기능
- 유효성 검증을 포함한 안전한 파라미터 처리

**관련 파일:**

- [src/app/api/cart/route.ts](src/app/api/cart/route.ts)
- [src/app/api/products/route.ts](src/app/api/products/route.ts)

**코드 예시:**

```typescript
// 다중 쿼리 파라미터 파싱
export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const codeList = [];
	for (const [keyNm, value] of searchParams.entries()) {
		if (keyNm === "recommendCode") codeList.push(Number(value));
	}
	const offset = Number(searchParams.get("offset") || 0);
	const limit = Number(searchParams.get("limit") || 10);
	const filteredResult = getFilteredProducts(codeList, offset, limit);
	return new Response(JSON.stringify(filteredResult), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}
```

---

## 5. **컴포넌트 기반 설계 패턴 구현**

- Atomic Design 원칙 적용 (Atom, Components, Template 계층)
- 재사용 가능한 범용 컴포넌트 개발 (`Container`, `Icon`, `ImageBox`, `Text`)
- props 기반의 유연한 컴포넌트 옵션 설정

**관련 파일:**

- [src/atom/Container.tsx](src/atom/Container.tsx)
- [src/atom/Icon.tsx](src/atom/Icon.tsx)
- [src/components/ProductListItem.tsx](src/components/ProductListItem.tsx)

**설명:**

- 최상위 수준의 기본 컴포넌트 (Button, Text, Icon 등)
- 비즈니스 로직을 포함한 중간 레벨 컴포넌트 (CartItem, ProductListItem)
- 페이지 구조를 정의하는 템플릿 레벨 컴포넌트

---

## 6. **동적 CSS 클래스 생성 로직**

- JavaScript 객체를 순회하여 동적 CSS 클래스명 생성
- CSS-in-JS 패턴으로 스타일 속성을 클래스로 매핑
- 조건부 스타일링으로 런타임 유연성 확보

**관련 파일:**

- [src/atom/Container.tsx](src/atom/Container.tsx)

**코드 예시:**

```typescript
const Container = ({ display = "grid", className, color, ...props }: ContainerProps) => {
	const STYLE_KEYS = [
		"display",
		"direction",
		"justify",
		"align",
		"gap",
		"radius",
		"surface",
		"border",
		"text",
	];
	const entries = Object.entries({ ...{ ...props, display, text: color } });
	const styles = entries
		.map(([keyNm, value]: string[]) =>
			STYLE_KEYS.includes(keyNm) ? value && `${keyNm}-${value}` : undefined
		)
		.filter((el: string | undefined) => el);
	return (
		<div {...props} className={`container ${className} ${styles.join(" ")}`}>
			{props.children}
		</div>
	);
};
```

---

## 7. **SCSS 모듈화 및 설계 시스템 구축**

- Foundation 레벨에서 색상, 레이아웃, 타이포그래피 정의
- 전역 스타일과 컴포넌트별 스타일 분리
- SCSS 변수를 통한 일관된 디자인 시스템 관리

**관련 파일:**

- [src/foundation/\_color.scss](src/foundation/_color.scss)
- [src/foundation/\_layout.scss](src/foundation/_layout.scss)
- [src/foundation/\_typography.scss](src/foundation/_typography.scss)
- [src/styles/global.scss](src/styles/global.scss)

**구조:**

```
src/
├── foundation/          # 디자인 시스템 기초
│   ├── _color.scss
│   ├── _layout.scss
│   └── _typography.scss
├── styles/             # 전역 및 컴포넌트 스타일
│   ├── global.scss
│   ├── _button.scss
│   ├── _loader.scss
│   └── _reset.scss
└── components/         # 컴포넌트별 로컬 스타일
    └── cart/
        └── cart.scss
```

---

## 8. **폼 입력 처리 및 유효성 검증**

- 장바구니 수량 조절 시 범위 제한 로직 (`1 <= count <= 999`)
- 버튼 disabled 상태 동적 관리로 UX 개선
- 조건부 기능 활성화 (쿠폰 적용 가능 여부 확인)

**관련 파일:**

- [src/components/cart/CartItem.tsx](src/components/cart/CartItem.tsx)

**코드 예시:**

```typescript
<button
  className="icon-wrapper"
  onClick={() => item.count > 1 && updateCartItemCount(item, item.count - 1)}
  disabled={item.count <= 1}
>
  <Icon iconNm="remove" iconSize={18} />
</button>
<Text fontStyle="small">{item.count}</Text>
<button
  className="icon-wrapper"
  onClick={() => item.count < 999 && updateCartItemCount(item, item.count + 1)}
  disabled={item.count >= 999}
>
  <Icon iconNm="add" iconSize={18} />
</button>
```

---

## 9. **데이터 필터링 및 정렬 알고리즘**

- 배열 필터링으로 카테고리별 상품 구분
- 다중 정렬 옵션 구현 (priorityScore, price, productName)
- 오프셋 기반 페이지네이션 로직

**관련 파일:**

- [src/app/api/products/route.ts](src/app/api/products/route.ts)

**코드 예시:**

```typescript
function getFilteredProducts(
	codeList: number[],
	offset = 0,
	limit = 10,
	sort: "priorityScore" | "price" | "productName" = "priorityScore"
) {
	const productList = products
		.filter((prod) => codeList.includes(0) || codeList.includes(prod.recommendCode))
		.sort((a, b) => (sort === "productName" ? (a[sort] > b[sort] ? 1 : -1) : b[sort] - a[sort]));
	const filtered = productList.slice(offset * limit, (offset + 1) * limit);
	const nextOffset = offset + 1;
	const next = productList.length > (offset + 1) * limit ? nextOffset + 1 : undefined;
	return { data: filtered, offset: nextOffset, next };
}
```

---

## 10. **비동기 데이터 페칭 및 에러 처리**

- Fetch API를 통한 클라이언트 사이드 데이터 로드
- HTTP 상태 코드 검증 (`if (!res.ok) return []`)
- 비동기 함수를 통한 재사용 가능한 API 추상화

**관련 파일:**

- [src/app/api/cart/route.ts](src/app/api/cart/route.ts)
- [src/app/api/products/route.ts](src/app/api/products/route.ts)

**코드 예시:**

```typescript
export async function getProductList(codeList: number[], offset: number) {
	const URL = "http://localhost:3000/api/products";
	const params = new URLSearchParams();
	codeList.map((recommendCode) => params.append("recommendCode", String(recommendCode)));
	params.append("offset", String(offset));
	const res = await fetch(`${URL}?${params}`);
	const result = await res.json();
	return result;
}

export async function addCartItem(product: Product, count: number) {
	const res = await fetch("http://localhost:3000/api/cart", {
		method: "PUT",
		body: JSON.stringify({ product, count }),
	});
	if (!res.ok) return [];
	const data = await res.json();
	return data;
}
```

---

## 11. **국제화(Internationalization) 처리**

- `Intl.NumberFormat` API를 활용한 지역별 화폐 포맷팅
- 한국어 로케일 적용으로 가격 표시 (예: `69,000원`)
- 다국어 지원 기반 마련

**관련 파일:**

- [src/components/ProductListItem.tsx](src/components/ProductListItem.tsx)
- [src/components/cart/CartItem.tsx](src/components/cart/CartItem.tsx)

**코드 예시:**

```typescript
// 상품 목록에서 가격 표시
<Text>{new Intl.NumberFormat("ko-KR").format(product.price)}원</Text>;

// 장바구니에서 할인 적용 가격 표시
const strPriceWon = (price: number) =>
	`${new Intl.NumberFormat("ko-KR").format(item.availableCoupon ? price * 0.9 : price)}원`;
```

---

## 12. **메타데이터 및 SEO 최적화**

- Next.js Metadata API를 활용한 동적 메타 정보 설정
- 페이지 제목, 설명, 파비콘 관리
- HTML lang 속성으로 언어 명시

**관련 파일:**

- [src/app/layout.tsx](src/app/layout.tsx)

**코드 예시:**

```typescript
import type { Metadata } from "next";

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

---

## 기술 스택 요약

| 분류              | 기술                   |
| ----------------- | ---------------------- |
| **프레임워크**    | Next.js 15.1.6         |
| **언어**          | TypeScript 5           |
| **상태관리**      | Zustand 5.0.3          |
| **스타일링**      | SCSS                   |
| **UI 라이브러리** | React 19.0.0           |
| **빌드 도구**     | Next.js (Webpack 기반) |
| **린팅**          | ESLint 9               |

---

## 주요 학습 포인트

이 프로젝트를 통해 다음을 습득할 수 있습니다:

1. **모던 프론트엔드 아키텍처**: Next.js App Router와 서버/클라이언트 컴포넌트 분리
2. **타입 안정성**: TypeScript strict 모드로 안전한 코드 작성
3. **상태 관리**: Zustand를 통한 효율적인 전역 상태 관리
4. **API 설계**: RESTful API 구축과 클라이언트 페칭 로직
5. **컴포넌트 설계**: Atomic Design 패턴 적용
6. **스타일 시스템**: SCSS를 활용한 확장 가능한 디자인 시스템
7. **성능 최적화**: 렌더링 전략과 메모리 효율성
8. **UX 개선**: 폼 유효성 검증과 조건부 UI 표현
