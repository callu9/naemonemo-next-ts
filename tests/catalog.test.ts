import assert from "node:assert/strict";
import test from "node:test";
import { getProducts } from "../src/lib/catalog";

test("getProducts returns a page for the requested recommendation code", () => {
  const result = getProducts([338], 0, 1);

  assert.equal(result.data.length, 1);
  assert.equal(result.data[0].recommendCode, 338);
  assert.equal(result.offset, 1);
  assert.equal(result.next, 2);
});
