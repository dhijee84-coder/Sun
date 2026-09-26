import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { csvCell, warrantyStatus } from "./ids.ts";

describe("warrantyStatus", () => {
  it("marks far-future dates ACTIVE", () => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 10);
    assert.equal(warrantyStatus(d.toISOString().slice(0, 10), 90), "ACTIVE");
  });
  it("marks near dates EXPIRING_SOON", () => {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() + 10);
    assert.equal(warrantyStatus(d.toISOString().slice(0, 10), 90), "EXPIRING_SOON");
  });
  it("marks past dates EXPIRED", () => {
    assert.equal(warrantyStatus("2020-01-01", 90), "EXPIRED");
  });
  it("marks missing dates VOID", () => {
    assert.equal(warrantyStatus(null, 90), "VOID");
  });
});

describe("csvCell", () => {
  it("prefixes formula-like cells", () => {
    assert.equal(csvCell("=1+1"), "'=1+1");
    assert.equal(csvCell("+cmd"), "'+cmd");
  });
  it("quotes commas", () => {
    assert.equal(csvCell("a,b"), '"a,b"');
  });
});
