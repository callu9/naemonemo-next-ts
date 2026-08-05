import assert from "node:assert/strict";
import test from "node:test";
import { clampQuantity } from "../src/components/cart/QuantityStepper";

test("clampQuantity keeps cart quantity within its allowed range", () => {
  assert.equal(clampQuantity(0, 1, 999), 1);
  assert.equal(clampQuantity(4, 1, 999), 4);
  assert.equal(clampQuantity(1000, 1, 999), 999);
});
