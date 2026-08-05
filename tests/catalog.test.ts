import assert from "node:assert/strict";
import test from "node:test";
import { toRecommendedProducts } from "../src/lib/client-api";
import { getProducts } from "../src/lib/catalog";

test("getProducts returns a page for the requested recommendation code", () => {
  const result = getProducts([338], 0, 1);

  assert.equal(result.data.length, 1);
  assert.equal(result.data[0].recommendCode, 338);
  assert.equal(result.offset, 1);
  assert.equal(result.next, 2);
});

test("toRecommendedProducts maps an API page to component state", () => {
  const product = getProducts([338], 0, 1).data[0];

  assert.deepEqual(toRecommendedProducts({ data: [product], offset: 1, next: 2 }), {
    productList: [product],
    offset: 1,
    next: 2,
  });
});
