import assert from "node:assert/strict";
import test from "node:test";
import { getRecommendationKey } from "../src/lib/client-api";

test("recommendation key is stable for equal code values", () => {
  assert.equal(getRecommendationKey([354, 338]), "354,338");
  assert.equal(getRecommendationKey([354, 338]), getRecommendationKey([354, 338]));
});
