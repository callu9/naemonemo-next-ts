# CSS Modules Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Sass with native CSS and CSS Modules while keeping the existing UI and component APIs working.

**Architecture:** Keep only reset, font faces, design tokens, and dynamic `Container`/`Text` utility classes in `src/styles/global.css`. Co-locate route and shared-component styling in CSS Modules, importing a module from its owning TSX file. Preserve the existing component class-name contracts where a page module scopes descendant selectors with `:global()`.

**Tech Stack:** Next.js 16 App Router, React 19, native CSS Modules, Storybook 10, Node test runner.

## Global Constraints

- Do not add Tailwind or another styling dependency.
- Preserve public component props and visual intent.
- Remove `sass` and every `.scss` source/import after replacement CSS exists.
- Keep `@svgr/webpack`; `next.config.ts` actively uses it.
- Keep the security overrides from the parent dependency-security branch.
- Validate with `npm test`, `npm run lint`, `npm run build`, `npm run storybook:build`, and `npm audit --json`.

---

### Task 1: Replace Sass foundations with standard global CSS

**Files:**
- Create: `src/styles/global.css`
- Modify: `src/app/layout.tsx`, `.storybook/preview.ts`
- Delete: `src/styles/global.scss`, `src/styles/_reset.scss`, `src/styles/_button.scss`, `src/styles/_loader.scss`, `src/foundation/_color.scss`, `src/foundation/_layout.scss`, `src/foundation/_typography.scss`

**Interfaces:**
- Consumes: Existing `Container`, `Text`, `Icon`, and `ImageBox` class contracts.
- Produces: The global classes `container`, `display-*`, `justify-*`, `align-*`, `gap-*`, `radius-*`, `surface-*`, `text-*`, `icon-*`, typography classes, and `img-wrapper`.

- [ ] **Step 1: List the utility values used by the application**

Run: `rg -o 'gap-[0-9]+|radius-[0-9]+|surface-[a-z]+|text-[a-z-]+|body-[a-z-]+|title-[a-z-]+|headline-[a-z-]+|lable-[a-z-]+' src --glob '*.tsx' | sort -u`

Expected: a finite set of utility selectors that the plain-CSS foundation must preserve.

- [ ] **Step 2: Create the global CSS foundation**

Write standard CSS for reset, `@font-face`, color variables, typography classes, dynamic layout utilities, image wrappers, icon color/rotation, shared focus styles, and the global dimmed wrapper. Use explicit declarations instead of Sass loops and mixins. For example:

```css
.display-flex { display: flex; flex-direction: row; justify-content: center; align-items: center; }
.gap-8 { gap: 8px; }
.surface-primary { background-color: var(--gray-0); }
.body-medium { font-family: "Pretendard400"; font-size: 15px; line-height: 130%; }
@media (width < 800px) { .body-medium { font-size: 15px; } }
```

- [ ] **Step 3: Point app and Storybook at the new global stylesheet**

```tsx
import "../styles/global.css";
```

Use this import in `src/app/layout.tsx`, and import `../src/styles/global.css` from `.storybook/preview.ts`.

- [ ] **Step 4: Verify no Sass foundation import remains**

Run: `rg -n '\.scss|@use|@mixin|@extend|@include' src .storybook`

Expected: only still-unmigrated route files are reported before Tasks 2 and 3; no foundation references remain.

- [ ] **Step 5: Commit the foundation conversion**

```bash
git add src/styles/global.css src/app/layout.tsx .storybook/preview.ts src/styles src/foundation
git commit -m "refactor: Sass 기반 스타일을 전역 CSS로 전환"
```

### Task 2: Scope home and product presentation styles with CSS Modules

**Files:**
- Create: `src/app/home.module.css`, `src/template/products/RecommendList.module.css`
- Modify: `src/app/page.tsx`, `src/template/products/RecommendList.tsx`
- Delete: `src/app/home.scss`, `src/template/products/products.scss`

**Interfaces:**
- Consumes: Existing descendants such as `slide-list`, `gate-list`, `feed-list`, `recommend-product-list`, and `scroll-footer`.
- Produces: `styles.home`, `styles.recommendProductList`, and `styles.scrollFooter` class names.

- [ ] **Step 1: Move home rules under the module root**

Create `home.module.css` with a local root and scoped descendants:

```css
.home { padding-bottom: 48px; }
.home :global(.slide-list) { position: relative; height: calc(400px * 4 / 3); }
.home :global(.gate-list) { padding: 0 32px; max-width: 400px; overflow-x: scroll; }
.home :global(.feed-list) { padding: 0 32px; }
```

Translate nested Sass selectors to explicit CSS selectors and replace each Sass `rgba()` invocation with standard `rgb()` alpha syntax.

- [ ] **Step 2: Bind the home root to the module**

```tsx
import styles from "./home.module.css";

<Container className={styles.home} gap={48}>
```

- [ ] **Step 3: Move recommendation-list rules to a module**

```tsx
import styles from "./RecommendList.module.css";

<Container className={`${styles.recommendProductList} recommend-product-list`}>
<div className={styles.scrollFooter} id="infinite-scroll" ref={targetRef}>
```

Keep the legacy `recommend-product-list` class only where the cart page module needs it as a descendant selector.

- [ ] **Step 4: Verify the route has no global SCSS import**

Run: `rg -n 'home\.scss|products\.scss' src`

Expected: no matches.

- [ ] **Step 5: Build the affected page and Storybook**

Run: `npm run build && npm run storybook:build`

Expected: both commands exit 0.

- [ ] **Step 6: Commit the scoped presentation styles**

```bash
git add src/app/page.tsx src/app/home.module.css src/template/products/RecommendList.tsx src/template/products/RecommendList.module.css src/app/home.scss src/template/products/products.scss
git commit -m "refactor: 홈과 상품 스타일을 CSS Modules로 분리"
```

### Task 3: Scope cart styles with a CSS Module

**Files:**
- Create: `src/app/(route)/cart/cart.module.css`
- Modify: `src/app/(route)/cart/page.tsx`, `src/template/cart/PixidBottom.tsx`
- Delete: `src/app/(route)/cart/cart.scss`

**Interfaces:**
- Consumes: Existing `cart-*`, `recommend-area`, and `pixid-bottom` class contracts.
- Produces: `styles.cart`, `styles.pixidBottom`, and `styles.dimmed` class names.

- [ ] **Step 1: Translate the cart SCSS to scoped CSS**

Use a local cart root for descendants and standard alpha colors:

```css
.cart { min-height: calc(100vh - 52px); position: relative; }
.cart :global(.cart-list) { padding: 0 20px; }
.cart :global(.recommend-area:not(:has(.recommend-product-list))) { min-height: 300px; }
.pixidBottom { position: fixed; bottom: 0; }
.dimmed { z-index: 5; inset: 0; background-color: rgb(0 0 0 / 30%); }
```

- [ ] **Step 2: Bind page and fixed-bottom markup to local names**

```tsx
import styles from "./cart.module.css";

<Container className={styles.cart} ...>
<div className={`${styles.pixidBottom} ${isOpen ? styles.dimmed : ""}`}>
```

Pass `styles.pixidBottom` and `styles.dimmed` into `PixidBottom` as explicit props, so the component does not import route styling.

- [ ] **Step 3: Preserve modal scroll locking with a local selector**

```css
:global(body:has(.pixid-bottom--dimmed)) { overflow: hidden; }
```

Add `pixid-bottom--dimmed` only while open; keep it as the intentional global state hook because `body` cannot be targeted by a local module class.

- [ ] **Step 4: Verify the cart route**

Run: `npm run build`

Expected: `/cart` remains listed as a static route and the command exits 0.

- [ ] **Step 5: Commit the cart conversion**

```bash
git add 'src/app/(route)/cart/page.tsx' 'src/app/(route)/cart/cart.module.css' src/template/cart/PixidBottom.tsx 'src/app/(route)/cart/cart.scss'
git commit -m "refactor: 장바구니 스타일을 CSS Modules로 분리"
```

### Task 4: Co-locate shared component styles

**Files:**
- Create: `src/components/common/Button.module.css`, `src/components/common/Header.module.css`, `src/components/common/Loader.module.css`, `src/components/common/IconButton.module.css`, `src/components/cart/QuantityStepper.module.css`
- Modify: `src/components/common/Button.tsx`, `src/components/common/Header.tsx`, `src/components/common/Loader.tsx`, `src/components/common/IconButton.tsx`, `src/components/cart/QuantityStepper.tsx`

**Interfaces:**
- Consumes: Existing Button variants, header layout, loader overlay, icon-button semantics, and quantity stepper behavior.
- Produces: Local `styles` imports without global component-specific selectors.

- [ ] **Step 1: Move each shared component selector into its module**

For Button, use local variant selectors and compose the consumer class safely:

```tsx
className={`${styles.button} ${styles[size]} ${styles[property]} ${styles[`radius${radius}`]} ${className}`}
```

Keep focus and disabled styles in `Button.module.css`. Put header spacing and cart badge rules in `Header.module.css`; move loader keyframes and overlay to `Loader.module.css`; move icon-button layout and stepper controls to their matching modules.

- [ ] **Step 2: Remove consumer reliance on shared global button classes**

Replace `button-small`, `button-medium`, `button-invert`, and related raw class strings with `Button` or a local module class in `FeedItem.tsx`, `CartList.tsx`, and `ProductItem.tsx`.

- [ ] **Step 3: Run the component interaction test suite**

Run: `npm test`

Expected: 5 tests pass, including `clampQuantity keeps cart quantity within its allowed range`.

- [ ] **Step 4: Build Storybook**

Run: `npm run storybook:build`

Expected: Button, IconButton, and QuantityStepper autodocs build successfully.

- [ ] **Step 5: Commit co-located component styles**

```bash
git add src/components/common src/components/cart/QuantityStepper.tsx src/components/FeedItem.tsx src/components/ProductListItem.tsx src/components/products/ProductItem.tsx src/template/cart/CartList.tsx
git commit -m "refactor: 공통 컴포넌트 스타일을 CSS Modules로 이동"
```

### Task 5: Remove Sass and verify the finished dependency graph

**Files:**
- Modify: `package.json`, `package-lock.json`
- Delete: any remaining `*.scss` files

**Interfaces:**
- Consumes: Completed CSS imports and modules from Tasks 1-4.
- Produces: An installable package graph without `sass` or SCSS imports.

- [ ] **Step 1: Prove there are no active SCSS references**

Run: `rg -n '\.scss|@use|@mixin|@extend|@include|sass/' src .storybook package.json`

Expected: no matches.

- [ ] **Step 2: Remove Sass without touching active tooling**

Run: `npm uninstall sass`

Do not remove `@svgr/webpack`: `next.config.ts` references it in the Turbopack SVG rule.

- [ ] **Step 3: Verify direct dependencies are referenced**

Run: `rg -n '@svgr/webpack|zustand|storybook|next/image|from "next"' next.config.ts src package.json .storybook`

Expected: every retained direct dependency has an active configuration or import path.

- [ ] **Step 4: Run the final verification suite**

Run: `npm test && npm run lint && npm run build && npm run storybook:build && npm audit --json`

Expected: all commands exit 0 and the audit JSON reports `"total": 0`.

- [ ] **Step 5: Commit dependency removal**

```bash
git add package.json package-lock.json src .storybook
git commit -m "chore: Sass 의존성 제거"
```
