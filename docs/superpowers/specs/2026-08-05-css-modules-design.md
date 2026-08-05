# CSS Modules 전환 설계

## 목표

- 모든 `.scss`를 표준 `.css` 또는 `*.module.css`로 전환한다.
- `sass`와 Sass 전용 선택 의존성을 제거한다.
- 기존 화면과 컴포넌트 API를 유지한다.

## 구조

- `src/styles/global.css`는 리셋, 폰트, 색상 토큰, `Container`와 `Text`가 생성하는 공용 유틸리티만 가진다.
- 페이지와 컴포넌트 고유 스타일은 사용하는 TSX 파일 옆의 `*.module.css`로 옮긴다.
- `layout.tsx`와 Storybook preview는 새 전역 CSS만 가져온다.

## 전환 범위

1. Sass의 반복·믹스인으로 생성하던 색상, 레이아웃, 타이포그래피, 버튼 유틸리티를 필요한 표준 CSS 클래스로 명시한다.
2. 홈, 상품 추천, 장바구니의 레이아웃 선택자를 CSS Module로 옮기고 TSX에서 `styles`를 사용한다.
3. 모든 `.scss` import와 Sass 소스 파일을 제거하고 `sass` 패키지를 제거한다.
4. 직접 의존성과 import를 확인해 실제 미사용인 패키지·모듈만 함께 제거한다. SVG 변환 설정처럼 사용 중인 도구는 유지한다.

## 검증

- `npm test`, `npm run lint`, `npm run build`, `npm run storybook:build`
- `npm audit --json`에서 취약점 0건
- SCSS import 및 `sass` 의존성이 남지 않았는지 검색

## 제외

- Tailwind 도입
- 컴포넌트 공개 API 변경
- 디자인·레이아웃 의도 변경
