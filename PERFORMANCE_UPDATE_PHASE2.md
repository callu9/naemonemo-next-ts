# 성능 개선 업데이트 (Phase 2)

## 📊 이전 수치

- **LCP**: 0.82s → 목표: < 2.0s
- **CLS**: 0.73 → 목표: < 0.1 (🔴 매우 높음)
- **Scripting**: 248ms → 목표: < 150ms
- **System**: 179ms
- **Total**: 996ms

---

## 🔧 적용된 추가 개선 사항

### 1️⃣ ImageBox.tsx - 퍼센트 단위 처리 개선

```typescript
// 이전: width="100%" 사용 시 NaN 발생
// 현재: 퍼센트 단위 감지 및 처리
if (typeof width === "string" && width.includes("%")) {
	numWidth = 100;
}

// ✅ NaN 체크 추가
if (isNaN(numWidth)) numWidth = 100;
```

**효과**: FeedItem의 이미지 크기 정상화 → CLS 감소

---

### 2️⃣ FeedItem.tsx - 이미지 컨테이너 크기 고정

```typescript
// 이전: width="100%" height="100%" (크기 정의 안 됨)
// 현재:
<div
  style={{
    width: "100%",
    height: "250px", // ✅ 명시적 높이 지정
    position: "relative",
    overflow: "hidden",
  }}
>
  <ImageBox imageUrl={imageUrl} width={400} height={250} />
</div>
```

**효과**: 카드 이미지 로딩 전 공간 예약 → CLS 대폭 감소

---

### 3️⃣ Slides.tsx - 레이아웃 shift 최소화

```typescript
// ✅ 각 슬라이드에 flex-shrink: 0 추가
<div
  key={banner.bannerNo}
  style={{
    flexShrink: 0,
    width: "100%",
  }}
>
  <SlideItem priority={Math.abs(idx - currentIdx) <= 1} />
</div>

// ✅ 컨테이너에 하드웨어 가속화
style={{
  scrollBehavior: "smooth",
  overflow: "hidden",
  WebkitOverflowScrolling: "touch",
  willChange: "scroll-position",
}}
```

**효과**: 스크롤 시 안정적인 레이아웃 유지 → CLS 개선

---

### 4️⃣ page.tsx - LCP 최적화

```typescript
// 이전: <Suspense fallback={<Loader />}>
// 현재: Slides는 동적 import 제거
import Slides from "@/template/Slides"; // ✅ 직접 import

export default async function Home() {
  // ...
  return (
    <>
      {/* Suspense 없이 직접 렌더링 */}
      <Slides bannerList={slideList} />
      <Suspense fallback={<Loader />}>
        <Gates gateList={gateList} />
      </Suspense>
    </>
  );
}
```

**효과**: LCP 지연 제거 → LCP 0.82s 개선

---

### 5️⃣ global.scss - 렌더링 성능 최적화

```scss
body {
	// ✅ 레이아웃 계산 최적화
	contain: layout style paint;
}

.slide-wrapper,
.product-list,
.feed-list {
	contain: layout style paint;
	will-change: scroll-position;
	-webkit-overflow-scrolling: touch;
}

.product-list-item,
.feed-card,
.gate-wrapper {
	contain: content;
	will-change: auto;
}
```

**효과**: 렌더링 성능 향상 → System 179ms 개선, Rendering 최적화

---

### 6️⃣ 성능 모니터링 추가

**새 파일: `src/lib/monitoring/performance.ts`**

```typescript
export function observeCLS() {
	// ✅ 실시간 CLS 측정 및 로깅
	// ✅ 각 layout shift의 원인 추적
}

export function observeLCP() {
	// ✅ LCP 수치 모니터링
}

export function observeLongTasks() {
	// ✅ 50ms 이상의 long tasks 감지
}
```

**새 파일: `src/components/common/PerformanceMonitor.tsx`**

```typescript
// layout.tsx에서 호출되어 페이지 로드 후 모니터링 시작
```

**효과**:

- 개발/배포 후 성능 문제 즉시 감지
- CLS 원인 추적 가능
- console에서 상세 로그 확인

---

## 🎯 예상 성능 개선

| 항목          | 이전    | 개선 후   | 개선율  |
| ------------- | ------- | --------- | ------- |
| **CLS**       | 0.73    | 0.15~0.25 | -60~80% |
| **LCP**       | 0.82s   | 0.6~0.7s  | -15~25% |
| **Scripting** | 248ms   | 200-220ms | -10~20% |
| **System**    | 179ms   | 120-150ms | -15~30% |
| **Rendering** | Unknown | <20ms     | 개선    |
| **Total**     | 996ms   | 800-900ms | -10~20% |

---

## 🚀 검증 방법

### 1. Console 확인 (개발 서버)

```bash
npm run dev
```

브라우저 DevTools → Console에서:

```
📊 Performance Metrics (ms): {
  DNS: ...,
  TCP: ...,
  TTFB: ...,
  PageLoad: ...
}

[CLS] +0.0523 (총: 0.0523)  // CLS 감지
[LCP] 620ms                 // LCP 측정
```

### 2. Lighthouse 측정

```bash
npm run build
npm start
# Chrome DevTools → Lighthouse
```

### 3. Chrome DevTools Performance 탭

1. F12 → Performance 탭
2. "Reload" 클릭
3. "Rendering" 섹션에서 Layout Shifts 확인
4. 각 shift의 위치와 원인 확인

---

## 💡 주요 포인트

✅ **이미지 컨테이너 크기 명시** = CLS 직접 영향
✅ **Slides 컨테이너 안정화** = 스크롤 shift 제거
✅ **Suspense 제거** = LCP 개선
✅ **CSS contain 속성** = 렌더링 성능 향상
✅ **실시간 모니터링** = 문제 조기 감지

---

## 📋 다음 단계 (Phase 3)

- [ ] Lighthouse 재측정 및 CLS < 0.1 확인
- [ ] LCP < 0.7s 검증
- [ ] 실제 사용자 환경에서 성능 확인
- [ ] 네트워크 제한 환경(3G)에서 테스트
- [ ] Production 배포 후 RUM 모니터링

---

**마지막 업데이트**: 2026년 3월 30일
