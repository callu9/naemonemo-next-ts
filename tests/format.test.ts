import assert from "node:assert/strict";
import test from "node:test";
import { formatWon } from "../src/lib/format";

test("formatWon renders Korean currency", () => {
  assert.equal(formatWon(317790), "317,790원");
});
