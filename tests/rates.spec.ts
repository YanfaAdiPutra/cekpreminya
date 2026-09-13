import { test, expect } from "@playwright/test";
import { ageFromBirthDate, recommend } from "../src/lib/engagement";
import { quoteProduct } from "../src/lib/premiumRates";

test("birthdays, leap dates, invalid dates, and future dates", () => {
  const today = new Date(2026, 8, 13);
  expect(ageFromBirthDate("2000-09-13", today)).toBe(26);
  expect(ageFromBirthDate("2000-09-14", today)).toBe(25);
  expect(ageFromBirthDate("2000-02-29", today)).toBe(26);
  expect(ageFromBirthDate("2001-02-29", today)).toBeNull();
  expect(ageFromBirthDate("2027-01-01", today)).toBeNull();
  expect(ageFromBirthDate("", today)).toBeNull();
});

test("quote boundaries and payment totals", () => {
  expect(quoteProduct("asuransi-kesehatan", 0, "wanita")).toHaveLength(3);
  expect(quoteProduct("asuransi-kesehatan", 75, "pria")).toHaveLength(3);
  expect(quoteProduct("asuransi-kesehatan", 76, "pria")).toEqual([]);
  expect(quoteProduct("asuransi-jiwa", 16, "pria")).toEqual([]);
  expect(quoteProduct("asuransi-jiwa", 30.5, "pria")).toEqual([]);
  expect(
    quoteProduct("asuransi-dana-pensiun", 55, "pria").map((q) => q.tier.id),
  ).not.toContain("pensiun-55");
  expect(
    quoteProduct("asuransi-dana-pensiun", 60, "pria").map((q) => q.tier.id),
  ).toEqual(["pensiun-75"]);
  const basic = quoteProduct("asuransi-jiwa", 30, "wanita").find(
    (q) => q.tier.id === "dasar",
  )!;
  expect(basic.annual).toBe(1320000);
  expect(basic.monthlyInstallment).toBe(120000);
  expect(basic.effectiveMonthly).toBe(110000);
});

test("explicit priorities override fallback recommendations", () => {
  expect(
    recommend({ concern: "asuransi-kritis", stage: "retirement" }).slug,
  ).toBe("asuransi-kritis");
  expect(recommend({ stage: "retirement" }).slug).toBe("asuransi-dana-pensiun");
  expect(recommend({ dependents: "2" }).slug).toBe("asuransi-jiwa");
  expect(recommend({}).slug).toBe("asuransi-kesehatan");
});
