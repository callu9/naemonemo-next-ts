# Next Modernization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the existing App Router application to Next.js 16 and remove client imports of Route Handler modules.

**Architecture:** Keep the existing UI, Sass, Zustand, and mock-backed demo behavior. Move reusable types and mock-backed catalog/cart logic into `src/lib`; Route Handlers become HTTP adapters and browser code uses relative `/api` requests.

**Tech Stack:** Next.js 16, React 19.2, TypeScript, ESLint CLI, Turbopack, Node built-in test runner with `tsx`.

## Global Constraints

- Work only on `refactor/modernize`, branched from `dev`.
- Do not create a Git worktree.
- Do not add UI, state-management, or data-fetching libraries.
- Use Turbopack-compatible SVG configuration.
- Keep cart storage in memory; persistence is out of scope.

---

### Task 1: Extract catalog logic behind a reusable module

**Files:**
- Create: `tests/catalog.test.ts`
- Create: `src/lib/catalog.ts`
- Modify: `src/app/api/products/route.ts`

- [ ] **Step 1: Write the failing test**

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { getProducts } from "../src/lib/catalog";

test("getProducts returns the next page for matching recommendation codes", () => {
  const result = getProducts([338], 0, 1);
  assert.equal(result.data.length, 1);
  assert.equal(result.offset, 1);
  assert.equal(result.next, 2);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/catalog.test.ts`

- [ ] **Step 3: Implement the smallest reusable catalog module**

```ts
export function getProducts(codeList: number[], offset = 0, limit = 10) {
  const productList = products.filter((product) => codeList.includes(0) || codeList.includes(product.recommendCode));
  return { data: productList.slice(offset * limit, (offset + 1) * limit), offset: offset + 1, next: productList.length > (offset + 1) * limit ? offset + 2 : undefined };
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `npm test -- tests/catalog.test.ts`

### Task 2: Upgrade the toolchain and switch to Turbopack configuration

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `next.config.ts`
- Modify: `eslint.config.mjs`

- [ ] **Step 1: Upgrade Next.js, React, type packages, Sass, Zustand, ESLint, and TypeScript to their latest stable compatible releases**
- [ ] **Step 2: Replace `next lint` with `eslint .`**
- [ ] **Step 3: Replace the custom Webpack SVG rule with `turbopack.rules["*.svg"]` using `@svgr/webpack`**
- [ ] **Step 4: Run `npm run lint`, `npm test`, and `npm run build`**

### Task 3: Make Route Handlers HTTP adapters

**Files:**
- Create: `src/lib/cart.ts`
- Create: `src/lib/client-api.ts`
- Modify: `src/app/api/{banner,cart,feeds,gates,products}/route.ts`
- Modify: `src/app/page.tsx`, `src/store/cart.ts`, and UI files importing `@/app/api/*/route`

- [ ] **Step 1: Move exported types and mock-backed catalog/cart operations into `src/lib`**
- [ ] **Step 2: Update Route Handlers to call `src/lib` and return HTTP responses only**
- [ ] **Step 3: Update browser code to import types or call relative `/api` endpoints, never Route Handlers**
- [ ] **Step 4: Run `npm run lint`, `npm test`, and `npm run build`**

### Task 4: Commit and publish

**Files:**
- Modify: all verified Task 1–3 files

- [ ] **Step 1: Inspect `git diff --check` and `git status --short`**
- [ ] **Step 2: Commit with `refactor: modernize Next.js application stack`**
- [ ] **Step 3: Push `refactor/modernize` to `origin`**
